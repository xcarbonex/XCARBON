/**
 * Project Catalog Service
 * 
 * Handles:
 * - Project normalization from multiple sources
 * - Crosswalk mapping (vendor ID → canonical project key)
 * - Project search and filtering
 * - Price aggregation
 */

import { createHash } from 'crypto';
import Database, { QueryBuilder, buildPagination, createPaginatedResult, type PaginatedResult } from '../db/index.js';
import logger from '../utils/logger.js';
import type { 
  CarbonProject, 
  SourceCrosswalk, 
  PricingSnapshot,
  SearchProjectsRequest,
  ProjectDetailResponse,
  Registry 
} from '../types/index.js';

export class ProjectCatalogService {
  /**
   * Derive deterministic project key from registry and project ID
   * projectKey = keccak256(lowercase(registry) + ":" + projectId)
   */
  static deriveProjectKey(registry: string, projectId: string): string {
    const normalized = `${registry.toLowerCase()}:${projectId}`;
    return '0x' + createHash('sha256').update(normalized).digest('hex');
  }

  /**
   * Upsert a project into the catalog
   */
  static async upsertProject(project: Omit<CarbonProject, 'createdAt' | 'updatedAt'>): Promise<CarbonProject> {
    const metadataHash = this.computeMetadataHash(project);
    
    const query = `
      INSERT INTO registry_project (
        project_key, registry, project_id, name, description,
        country, coordinates, methodology, category, developer,
        standard, status, vintage_start, vintage_end,
        images, documents, tags, source_attributions, metadata_hash
      ) VALUES (
        $1, $2, $3, $4, $5, $6, $7, $8, $9, $10,
        $11, $12, $13, $14, $15, $16, $17, $18, $19
      )
      ON CONFLICT (project_key) DO UPDATE SET
        name = EXCLUDED.name,
        description = EXCLUDED.description,
        country = EXCLUDED.country,
        coordinates = EXCLUDED.coordinates,
        methodology = EXCLUDED.methodology,
        category = EXCLUDED.category,
        developer = EXCLUDED.developer,
        standard = EXCLUDED.standard,
        status = EXCLUDED.status,
        vintage_start = EXCLUDED.vintage_start,
        vintage_end = EXCLUDED.vintage_end,
        images = EXCLUDED.images,
        documents = EXCLUDED.documents,
        tags = EXCLUDED.tags,
        source_attributions = EXCLUDED.source_attributions,
        metadata_hash = EXCLUDED.metadata_hash,
        updated_at = NOW()
      RETURNING *
    `;

    const result = await Database.query<CarbonProject>(query, [
      project.projectKey,
      project.registry,
      project.projectId,
      project.name,
      project.description || null,
      project.country || null,
      project.coordinates ? JSON.stringify(project.coordinates) : null,
      project.methodology || null,
      project.category || null,
      project.developer || null,
      project.standard || null,
      project.status || null,
      project.vintageStart || null,
      project.vintageEnd || null,
      project.images ? JSON.stringify(project.images) : null,
      project.documents ? JSON.stringify(project.documents) : null,
      project.tags || null,
      project.sourceAttributions ? JSON.stringify(project.sourceAttributions) : null,
      metadataHash,
    ]);

    logger.info({
      projectKey: project.projectKey,
      registry: project.registry,
      projectId: project.projectId,
    }, 'Project upserted');

    return result.rows[0];
  }

  /**
   * Create or update crosswalk mapping
   */
  static async upsertCrosswalk(
    projectKey: string,
    source: string,
    externalId: string,
    externalKey?: string,
    metadata?: Record<string, any>
  ): Promise<SourceCrosswalk> {
    const query = `
      INSERT INTO source_crosswalk (
        project_key, source, external_id, external_key, metadata
      ) VALUES ($1, $2, $3, $4, $5)
      ON CONFLICT (source, external_id) DO UPDATE SET
        project_key = EXCLUDED.project_key,
        external_key = EXCLUDED.external_key,
        metadata = EXCLUDED.metadata
      RETURNING *
    `;

    const result = await Database.query<SourceCrosswalk>(query, [
      projectKey,
      source,
      externalId,
      externalKey || null,
      metadata ? JSON.stringify(metadata) : null,
    ]);

    return result.rows[0];
  }

  /**
   * Search projects with filters and pagination
   */
  static async searchProjects(params: SearchProjectsRequest): Promise<PaginatedResult<CarbonProject>> {
    const qb = new QueryBuilder();
    const { limit, offset } = buildPagination({
      page: params.page,
      limit: params.limit,
    });

    // Build WHERE clause
    if (params.query) {
      qb.whereLike('name', params.query);
    }
    if (params.registry && params.registry.length > 0) {
      qb.whereIn('registry', params.registry);
    }
    if (params.country && params.country.length > 0) {
      qb.whereIn('country', params.country);
    }
    if (params.category && params.category.length > 0) {
      qb.whereIn('category', params.category);
    }
    if (params.methodology && params.methodology.length > 0) {
      qb.whereIn('methodology', params.methodology);
    }
    if (params.vintageStart || params.vintageEnd) {
      qb.whereRange('vintage_start', params.vintageStart, params.vintageEnd);
    }

    const { where, params: whereParams } = qb.build();

    // Get total count
    const countQuery = `SELECT COUNT(*) FROM registry_project ${where}`;
    const countResult = await Database.query<{ count: string }>(countQuery, whereParams);
    const total = parseInt(countResult.rows[0].count);

    // Get paginated data
    const sortBy = params.sortBy || 'name';
    const sortOrder = params.sortOrder || 'asc';
    
    const dataQuery = `
      SELECT * FROM registry_project
      ${where}
      ORDER BY ${sortBy} ${sortOrder}
      LIMIT $${whereParams.length + 1} OFFSET $${whereParams.length + 2}
    `;
    
    const dataResult = await Database.query<CarbonProject>(dataQuery, [
      ...whereParams,
      limit,
      offset,
    ]);

    logger.info({
      filters: params,
      total,
      returned: dataResult.rowCount,
    }, 'Projects searched');

    return createPaginatedResult(
      dataResult.rows,
      total,
      params.page || 1,
      limit
    );
  }

  /**
   * Get project detail with current prices
   */
  static async getProjectDetail(
    registry: string,
    projectId: string
  ): Promise<ProjectDetailResponse | null> {
    const projectKey = this.deriveProjectKey(registry, projectId);

    // Get project
    const projectQuery = `
      SELECT * FROM registry_project WHERE project_key = $1
    `;
    const projectResult = await Database.query<CarbonProject>(projectQuery, [projectKey]);
    
    if (projectResult.rowCount === 0) {
      return null;
    }

    const project = projectResult.rows[0];

    // Get current prices
    const pricesQuery = `
      SELECT DISTINCT ON (asset_price_source_id)
        id, project_key, source, source_type, asset_price_source_id,
        unit_price, currency, min_fill, supply, vintage, metadata, as_of
      FROM pricing_snapshot
      WHERE project_key = $1
      ORDER BY asset_price_source_id, as_of DESC
    `;
    const pricesResult = await Database.query<PricingSnapshot>(pricesQuery, [projectKey]);

    // Build availability array
    const availability = pricesResult.rows
      .filter(p => p.supply && parseFloat(p.supply) > 0)
      .map(p => ({
        assetPriceSourceId: p.assetPriceSourceId,
        sourceType: p.sourceType,
        supply: p.supply!,
        minFill: p.minFill || '0',
        unitPrice: p.unitPrice,
      }));

    return {
      ...project,
      prices: pricesResult.rows,
      availability,
    };
  }

  /**
   * Get project by key
   */
  static async getProjectByKey(projectKey: string): Promise<CarbonProject | null> {
    const query = `SELECT * FROM registry_project WHERE project_key = $1`;
    const result = await Database.query<CarbonProject>(query, [projectKey]);
    
    return result.rows[0] || null;
  }

  /**
   * Lookup project key by external ID
   */
  static async lookupProjectByExternalId(
    source: string,
    externalId: string
  ): Promise<string | null> {
    const query = `
      SELECT project_key FROM source_crosswalk
      WHERE source = $1 AND external_id = $2
    `;
    const result = await Database.query<{ project_key: string }>(query, [source, externalId]);
    
    return result.rows[0]?.project_key || null;
  }

  /**
   * Upsert pricing snapshot
   */
  static async upsertPricing(snapshot: Omit<PricingSnapshot, 'id' | 'createdAt'>): Promise<PricingSnapshot> {
    const query = `
      INSERT INTO pricing_snapshot (
        project_key, source, source_type, asset_price_source_id,
        unit_price, currency, min_fill, supply, vintage, metadata, as_of
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
      ON CONFLICT (asset_price_source_id, as_of) DO UPDATE SET
        unit_price = EXCLUDED.unit_price,
        min_fill = EXCLUDED.min_fill,
        supply = EXCLUDED.supply,
        metadata = EXCLUDED.metadata
      RETURNING *
    `;

    const result = await Database.query<PricingSnapshot>(query, [
      snapshot.projectKey || null,
      snapshot.source,
      snapshot.sourceType,
      snapshot.assetPriceSourceId,
      snapshot.unitPrice,
      snapshot.currency,
      snapshot.minFill || null,
      snapshot.supply || null,
      snapshot.vintage || null,
      snapshot.metadata ? JSON.stringify(snapshot.metadata) : null,
      snapshot.asOf,
    ]);

    return result.rows[0];
  }

  /**
   * Compute metadata hash for integrity checking
   */
  private static computeMetadataHash(project: Partial<CarbonProject>): string {
    const canonical = {
      registry: project.registry,
      projectId: project.projectId,
      name: project.name,
      methodology: project.methodology,
      country: project.country,
      vintageStart: project.vintageStart,
      vintageEnd: project.vintageEnd,
    };
    
    const hash = createHash('sha256')
      .update(JSON.stringify(canonical))
      .digest('hex');
    
    return '0x' + hash;
  }

  /**
   * Get facets for search filters
   */
  static async getFacets(): Promise<{
    registries: Record<string, number>;
    countries: Record<string, number>;
    categories: Record<string, number>;
  }> {
    const queries = {
      registries: `
        SELECT registry, COUNT(*) as count
        FROM registry_project
        GROUP BY registry
        ORDER BY count DESC
      `,
      countries: `
        SELECT country, COUNT(*) as count
        FROM registry_project
        WHERE country IS NOT NULL
        GROUP BY country
        ORDER BY count DESC
      `,
      categories: `
        SELECT category, COUNT(*) as count
        FROM registry_project
        WHERE category IS NOT NULL
        GROUP BY category
        ORDER BY count DESC
      `,
    };

    const [registries, countries, categories] = await Promise.all([
      Database.query<{ registry: string; count: string }>(queries.registries),
      Database.query<{ country: string; count: string }>(queries.countries),
      Database.query<{ category: string; count: string }>(queries.categories),
    ]);

    return {
      registries: Object.fromEntries(registries.rows.map(r => [r.registry, parseInt(r.count)])),
      countries: Object.fromEntries(countries.rows.map(r => [r.country, parseInt(r.count)])),
      categories: Object.fromEntries(categories.rows.map(r => [r.category, parseInt(r.count)])),
    };
  }
}
