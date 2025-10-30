import { create } from "zustand";
import axios from "axios";
import { withDevtools } from "./withDevtools";
import { GOLD_STANDARD } from "./appData";
import type { ProjectType } from "./appData";

// Types for the store
interface FilteredParameter {
  registry: string;
  assetReferenceType: string;
  reference: string;
}

interface ProjectListItem {
  value: number;
  label: string;
}

interface ImpactTag {
  tag: string;
}

interface MintedAsset {
  projectName: string;
  vintageYear: string;
  location: string;
  quantity: number;
  mintedQuantity: number;
  totalQuantity: number;
  blockchain: string;
  tokenSymbol: string;
  status: string;
  walletAddress: string;
  transactionHash: string;
  blockNumber: number | null;
  mintedAt: string | null;
}

interface DraftAsset {
  id: string;
  registry: string;
  projectName: string;
  vintageYear: string;
  location: string;
  impactTags: ImpactTag[];
  quantity: number;
  status: string;
  type: string;
  project_developer: string;
  serial_number: string;
  transferable: boolean;
  verification_body: string;
  tokenSymbol: string;
  listingPrice: number;
  listingDuration: string;
  allowFactorization: string;
  fraction: number;
  files: unknown[];
}

interface CarbonCreditDetails {
  projectId: string;
  projectName: string;
  country: string;
  vintageYear: string | number;
  quantity: number | string;
  status: string;
  description: string;
  registry: string;
  assetType: string;
  reference: string;
  impactTags: ImpactTag[];
  type?: string;
  transferable?: boolean;
  project_developer?: string;
  serial_number?: string;
  verification_body?: string;
}

interface VolumeFilter {
  min?: number;
  max?: number;
}

interface RetirementTypeFilter {
  retired?: boolean;
  assigned?: boolean;
}

interface MainStoreState {
  filteredPamaeter: FilteredParameter;
  registryProjectListError: string | null;
  registryProjectList: ProjectListItem[];
  isLoadingRegistryProjectList: boolean;
  totalProjectCount: number;
  registryData: CarbonCreditDetails | null;
  registryDataList: unknown[];
  isLoading: boolean;
  error: string | null;
  searchType: string | null;
  registryDataListCount: number;
  selectedCarbonCreditDetails: CarbonCreditDetails | null;
  isCarbonCreditDetailsLoading: boolean;
  carbonCreditDetailsError: string | null;
  preview: boolean;
  mintedAssets: MintedAsset[];
  mintedAssetsLoading: boolean;
  mintedError: string | null;
  draft: DraftAsset[];
  draftLoading: boolean;
  draftError: string | null;
  selectedProjectType: ProjectType | null;
  projectTypeList: ProjectType[];
  setProjectType: () => void;
  setMintedAssets: (_asset: MintedAsset | MintedAsset[]) => void;
  setDraft: (_asset: DraftAsset | DraftAsset[]) => void;
  getDraft: (_id: string, _navigate: (path: string) => void) => void;
  mapSingleRecord: (
    _data: any,
    _registry: string,
    _assetType: string,
    _reference: string
  ) => CarbonCreditDetails;
  getRegistryApiUrl: (
    _registry: string,
    _assetType: string,
    _reference: string,
    _query?: string,
    _page?: number,
    _size?: number
  ) => string;
  getRegistryAssets: (_registry: string, _assetType: string) => Promise<void>;
  fetchRegistryProjectList: (_registry: string, _page?: number, _size?: number) => Promise<void>;
  filterRegistryAssets: (
    _registry: string,
    _assetType: string,
    _project: string,
    _type: string,
    _volume: VolumeFilter,
    _retirementType: RetirementTypeFilter,
    _query: string,
    _page?: number,
    _size?: number
  ) => Promise<void>;
  fetchCarbonCreditById: (_registry: string, _projectId: string) => Promise<void>;
  searchRegistry: (
    _registry: string,
    _assetType: string,
    _reference?: string,
    _query?: string,
    _page?: number,
    _size?: number
  ) => Promise<void>;
  selectCarbonCredit: (_selectedCredit: CarbonCreditDetails) => void;
  togglePreview: () => void;
  clearSearchResults: () => void;
}

const useStore = create<MainStoreState>()(
  withDevtools(
    (set: any, get: any) => ({
      filteredPamaeter: {
        registry: "",
        assetReferenceType: "sno",
        reference: "",
      },
      registryProjectListError: null,
      registryProjectList: [],
      isLoadingRegistryProjectList: false,
      totalProjectCount: 0,
      registryData: null,
      registryDataList: [],
      isLoading: false,
      error: null,
      searchType: null,
      registryDataListCount: 0,
      selectedCarbonCreditDetails: null,
      isCarbonCreditDetailsLoading: false,
      carbonCreditDetailsError: null,
      preview: false,
      mintedAssets: [
        {
          projectName: "Tropical Mix",
          vintageYear: "2023",
          location: "Panama",
          quantity: 10,
          mintedQuantity: 3,
          totalQuantity: 10,
          blockchain: "Polygon",
          tokenSymbol: "XYZ",
          status: "PENDING",
          walletAddress: "0xabc123...def",
          transactionHash: "",
          blockNumber: null,
          mintedAt: null,
        },
        {
          projectName: "Wind Power Project",
          vintageYear: "2022",
          location: "India",
          quantity: 20,
          mintedQuantity: 20,
          totalQuantity: 20,
          blockchain: "Ethereum",
          tokenSymbol: "WND",
          status: "CONFIRMED",
          walletAddress: "0xdef456...abc",
          transactionHash: "0x789abc...012",
          blockNumber: 1943302,
          mintedAt: "2025-07-18T09:10:00Z",
        },
        {
          projectName: "Biogas Plant",
          vintageYear: "2023",
          location: "Kenya",
          quantity: 12,
          mintedQuantity: 0,
          totalQuantity: 12,
          blockchain: "Polygon",
          tokenSymbol: "BIO",
          status: "FAILED",
          walletAddress: "0xjkl012...mno",
          transactionHash: "",
          blockNumber: null,
          mintedAt: null,
        },
      ],
      mintedAssetsLoading: false,
      mintedError: null,
      draft: [
        {
          id: "515883",
          registry: "gold_standard",
          projectName: "Tropical Mix ",
          vintageYear: "2023",
          location: "Panama",
          impactTags: [
            { tag: "Goal 1: No Poverty" },
            { tag: "Goal 8: Decent Work and Economic Growth" },
            { tag: "Goal 12: Responsible Production and Consumption" },
            { tag: "Goal 13: Climate Action" },
            { tag: "Goal 15: Life On Land" },
          ],
          quantity: 7,
          status: "RETIRED",
          type: "A/R",
          project_developer: "FORLIANCE",
          serial_number: "GS1-1-PA-GS2940-22-2023-28803-38582-38588",
          transferable: false,
          verification_body: "GOLD_STANDARD_CERTIFIED_PROJECT",
          tokenSymbol: "{X}XYZ",
          listingPrice: 12,
          listingDuration: "30",
          allowFactorization: "true",
          fraction: 2,
          files: [],
        },
      ],
      draftLoading: false,
      draftError: null,
      selectedProjectType: null,
      projectTypeList: [],

      setProjectType: () => {
        set({
          projectTypeList: GOLD_STANDARD.PROJECT_TYPE,
        });
      },

      setMintedAssets: (asset: MintedAsset | MintedAsset[]) => {
        set({ mintedAssetsLoading: true, mintedError: null });
        try {
          set((state: MainStoreState) => {
            const newDraft = Array.isArray(asset)
              ? [...state.mintedAssets, ...asset]
              : [...state.mintedAssets, asset];
            return {
              mintedAssets: newDraft,
              selectedCarbonCreditDetails: null,
              registryDataList: [],
            };
          });
        } catch (err) {
          const message = err instanceof Error ? err.message : "Failed to add draft";
          set({ mintedError: message });
        } finally {
          set({ mintedAssetsLoading: false });
        }
      },

      setDraft: (asset: DraftAsset | DraftAsset[]) => {
        set({ draftLoading: true, draftError: null });
        try {
          set((state: MainStoreState) => {
            const newDraft = Array.isArray(asset)
              ? [...state.draft, ...asset]
              : [...state.draft, asset];
            return {
              draft: newDraft,
              selectedCarbonCreditDetails: null,
              registryDataList: [],
            };
          });
        } catch (err) {
          const message = err instanceof Error ? err.message : "Failed to add draft";
          set({ draftError: message });
        } finally {
          set({ draftLoading: false });
        }
      },

      getDraft: (id: string, navigate: (path: string) => void) => {
        const { draft } = get();
        const draftItem = draft.find((item: DraftAsset) => item.id === id) || null;

        set({ selectedCarbonCreditDetails: draftItem });
        if (draftItem) {
          navigate(`/assets/look-up`);
        }
      },

      mapSingleRecord: (
        data: any,
        registry: string,
        assetType: string,
        reference: string
      ): CarbonCreditDetails => {
        if (registry === "verra") {
          return {
            projectId: data.resourceIdentifier,
            projectName: data.resourceName,
            country: data.country,
            vintageYear: data.vintageYear,
            quantity: data.quantity,
            status: data.resourceStatus,
            description: data.description || data.resourceDescription || "",
            registry: registry,
            assetType: assetType,
            reference: reference,
            impactTags: data.sdgImpactTags || [],
          };
        } else if (registry === "gold_standard") {
          return {
            projectId: data.id,
            projectName: data.project?.name,
            country: data.project?.country,
            vintageYear: data.vintage,
            quantity: data.number_of_credits,
            status: data.status,
            description: data.project?.description || "",
            registry: registry,
            assetType: assetType,
            reference: reference,
            type: data.project?.type,
            transferable: data.is_transferable,
            project_developer: data.project?.project_developer || "N/A",
            impactTags: data.project?.sustainable_development_goals
              ? data.project.sustainable_development_goals.map((goal: any) => ({
                  tag: goal.name,
                }))
              : [],
            serial_number: data.serial_number || "N/A",
            verification_body: data.project?.status || "N/A",
          };
        } else {
          return {
            projectId: data.id || reference,
            projectName: data.name || "N/A",
            country: data.country || "N/A",
            vintageYear: data.vintage || "N/A",
            quantity: data.quantity || "N/A",
            status: data.status || "N/A",
            description: data.description || "",
            registry: registry,
            assetType: assetType,
            reference: reference,
            impactTags: data.impacts || [],
          };
        }
      },

      getRegistryApiUrl: (
        registry: string,
        assetType: string,
        reference: string,
        query = "",
        page = 1,
        size = 5
      ): string => {
        const registryURL: Record<string, any> = {
          verra: {
            url: `https://registry.verra.org/uiapi/resource`,
            list: `/list`,
            assetRefType: {
              sno: `/resourceSummary/${reference}`,
              projectID: `/resourceSummary/${reference}`,
              registryURL: `/resourceSummary/${reference}`,
            },
          },
          gold_standard: {
            url: `https://public-api.goldstandard.org`,
            list: `/suggests/projects`,
            assetRefType: {
              creditById: `/credits/${reference}`,
              sno: `/credits?query=${query}&page=${page}&size=${size}&issuances=false`,
              projectID: `/credits?query=${query}&page=${page}&size=${size}&projects=${reference}&issuances=false`,
              registryURL: `/projects/${reference}`,
              getProjectById: `/projects/${reference}`,
            },
          },
          climate_action_reserve: {
            url: `https://public-api.goldstandard.org`,
            list: `/projects?page=${page}&size=${size}`,
            assetRefType: {
              sno: `/projects/${reference}`,
              projectID: `/projects/${reference}`,
              registryURL: `/projects/${reference}`,
            },
          },
        };

        const baseUrl = registryURL[registry]?.url;
        let endpoint = "";

        if (assetType === "list") {
          endpoint = registryURL[registry]?.list;
        } else if (registryURL[registry]?.assetRefType) {
          endpoint = registryURL[registry].assetRefType[assetType];
        }

        if (!baseUrl || !endpoint) {
          throw new Error("Invalid registry or asset type selected.");
        }

        return `${baseUrl}${endpoint}`;
      },

      getRegistryAssets: async (registry: string, assetType: string) => {
        try {
          await get().searchRegistry(registry, assetType);
        } catch (error) {
          const message = error instanceof Error ? error.message : "Failed to fetch registry data.";
          set({
            error: message,
            isLoading: false,
          });
        }
      },

      fetchRegistryProjectList: async (registry: string, page = 1, size = 25) => {
        set({
          isLoadingRegistryProjectList: true,
        });
        try {
          const apiUrl = get().getRegistryApiUrl(registry, "list", "", "", page, size);
          const response = await axios.get(apiUrl);
          const totalCount = parseInt(response.headers["x-total-count"], 10) || 0;
          const list = response?.data
            ?.map((project: any) => ({
              value: project.id,
              label: project.name,
            }))
            .sort((a: ProjectListItem, b: ProjectListItem) => a.value - b.value);
          set({
            isLoadingRegistryProjectList: false,
            totalProjectCount: totalCount,
            registryProjectList: list,
          });
        } catch (error) {
          const message = error instanceof Error ? error.message : "Failed to fetch project list.";
          set({
            isLoadingRegistryProjectList: false,
            registryProjectListError: message,
          });
        }
      },

      filterRegistryAssets: async (
        registry: string,
        assetType: string,
        project: string,
        type: string,
        volume: VolumeFilter,
        retirementType: RetirementTypeFilter,
        query: string,
        page = 1,
        size = 25
      ) => {
        const { min, max } = volume || {};
        const { retired, assigned } = retirementType || {};
        let appendUrl = "";

        if (min && max) {
          appendUrl += `&minQuantity=${min}&maxQuantity=${max}`;
        }

        if (type) {
          appendUrl += `&projectTypes=${type}`;
        }

        if (retired || assigned) {
          if (retired && !assigned) appendUrl += `&retired=${retired}`;
          if (assigned && !retired) appendUrl += `&assigned=${assigned}`;
          if (assigned && retired) appendUrl += `&retired=${retired}&assigned=${assigned}`;
        }

        set({
          isLoading: true,
          error: null,
        });

        try {
          const apiUrl = get().getRegistryApiUrl(registry, assetType, project, query, page, size);
          const response = await axios.get(apiUrl + appendUrl);
          const totalCount = parseInt(response.headers["x-total-count"], 10) || 0;
          set({
            isLoading: false,
            registryDataList: response.data,
            registryDataListCount: totalCount,
          });
        } catch (error) {
          const message = error instanceof Error ? error.message : "Failed to fetch registry data.";
          set({
            error: message,
            isLoading: false,
          });
        }
      },

      fetchCarbonCreditById: async (registry: string, projectId: string) => {
        set({
          isCarbonCreditDetailsLoading: true,
          carbonCreditDetailsError: null,
          selectedCarbonCreditDetails: null,
        });
        try {
          const apiUrl = get().getRegistryApiUrl(registry, "creditById", projectId);
          const response = await axios.get(apiUrl);

          const getProjectByIdURL = get().getRegistryApiUrl(
            registry,
            "getProjectById",
            response?.data?.project.id
          );
          const res = await axios.get(getProjectByIdURL);

          const updatedResponse = {
            ...response.data,
            project: res.data,
          };

          if (response.data) {
            const singleResult = get().mapSingleRecord(
              updatedResponse,
              registry,
              "projectID",
              projectId
            );
            set({
              selectedCarbonCreditDetails: singleResult,
              isCarbonCreditDetailsLoading: false,
            });
          }
        } catch (error: any) {
          if (error.response?.data?.message) {
            set({
              carbonCreditDetailsError: error.response?.data?.message || "record_not_found",
              isCarbonCreditDetailsLoading: false,
              selectedCarbonCreditDetails: null,
            });
          }
        }
      },

      searchRegistry: async (
        registry: string,
        assetType: string,
        reference = "",
        query = "",
        page = 1,
        size = 5
      ) => {
        set({
          isLoading: true,
          error: null,
          filteredPamaeter: {
            registry: registry,
            assetReferenceType: assetType,
            reference: reference,
          },
        });
        try {
          const apiUrl = get().getRegistryApiUrl(registry, assetType, reference, query, page, size);
          console.log(registry, assetType, reference, query, apiUrl);

          const response = await axios.get(apiUrl);
          const totalCount = parseInt(response.headers["x-total-count"], 10) || 0;
          set({
            isLoading: false,
            registryDataList: response.data,
            registryDataListCount: totalCount,
          });
        } catch (error) {
          const message = error instanceof Error ? error.message : "Failed to fetch registry data.";
          set({
            error: message,
            isLoading: false,
          });
        }
      },

      selectCarbonCredit: (selectedCredit: CarbonCreditDetails) => {
        set({
          registryData: selectedCredit,
          registryDataList: null,
          searchType: "single",
        });
      },

      togglePreview: () => {
        set((state: MainStoreState) => ({
          preview: !state.preview,
        }));
      },

      clearSearchResults: () => {
        set({
          filteredPamaeter: {
            registry: "",
            assetReferenceType: "sno",
            reference: "",
          },
          registryProjectListError: null,
          registryProjectList: [],
          isLoadingRegistryProjectList: false,
          totalProjectCount: 0,
          registryData: null,
          registryDataList: [],
          isLoading: false,
          error: null,
          searchType: null,
          registryDataListCount: 0,
          selectedCarbonCreditDetails: null,
          isCarbonCreditDetailsLoading: false,
          carbonCreditDetailsError: null,
          preview: false,
        });
      },
    }),
    "MainStore"
  )
);

export default useStore;
