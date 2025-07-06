import { create } from "zustand";
import axios from "axios";

const useStore = create((set) => ({
  // API call state for CarbonCreditAssetsFromRegistry
  registryData: null,
  registryDataList: null, // For multiple results (Project ID searches)
  isLoading: false,
  error: null,
  searchType: null, // 'single' or 'multiple'

  searchRegistry: async (registry, assetType, reference) => {
    set({
      isLoading: true,
      error: null,
      registryData: null,
      registryDataList: null,
    });

    const registryURL = {
      verra: {
        url: `https://registry.verra.org/uiapi/resource`,
        assetRefType: {
          sno: `/resourceSummary/${reference}`,
          projectID: `/resourceSummary/${reference}`,
          registryURL: `/resourceSummary/${reference}`,
        },
      },
      gold_standard: {
        url: `https://public-api.goldstandard.org`,
        assetRefType: {
          sno: `/projects/${reference}`,
          projectID: `/projects/${reference}`,
          registryURL: `/projects/${reference}`,
        },
      },
      climate_action_reserve: {
        url: `https://public-api.goldstandard.org`,
        assetRefType: {
          sno: `/projects/${reference}`,
          projectID: `/projects/${reference}`,
          registryURL: `/projects/${reference}`,
        },
      },
    };

    try {
      const baseUrl = registryURL[registry]?.url;
      const endpoint = registryURL[registry]?.assetRefType[assetType];
      console.log("API URL:", baseUrl, endpoint);
      if (!baseUrl || !endpoint) {
        throw new Error("Invalid registry or asset type selected.");
      }

      const apiUrl = `${baseUrl}${endpoint}`;

      // Determine if this is a Project ID search (which should return multiple results)
      const isProjectIdSearch = assetType === "projectID";

      const response = await axios.get(apiUrl);

      // Helper function to map individual record
      const mapSingleRecord = (data, registry, assetType, reference) => {
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
            projectName: data.name,
            country: data.country,
            vintageYear: data.crediting_period_start_date
              ? new Date(data.crediting_period_start_date)
                  .getFullYear()
                  .toString()
              : "N/A",
            quantity: data.estimated_annual_credits,
            status: data.status,
            description: data.description || data.project_description || "",
            registry: registry,
            assetType: assetType,
            reference: reference,
            type: data.type,
            project_developer: data.project_developer || "N/A",
            impactTags: data.sustainable_development_goals
              ? data.sustainable_development_goals.map((goal) => ({
                  tag: goal.name,
                }))
              : [],
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
      };

      if (isProjectIdSearch) {
        // For Project ID searches, handle multiple results
        let multipleResults = [];

        if (Array.isArray(response.data)) {
          // If API returns array directly
          multipleResults = response.data.map((item) =>
            mapSingleRecord(item, registry, assetType, reference)
          );
        } else {
          // If API returns single object, wrap it in array
          multipleResults = [
            mapSingleRecord(response.data, registry, assetType, reference),
          ];
        }

        // Check if no results found
        if (multipleResults.length === 0) {
          set({
            error: "no_data_found",
            isLoading: false,
            registryData: null,
            registryDataList: null,
          });
        } else {
          set({
            registryDataList: multipleResults,
            searchType: "multiple",
            isLoading: false,
          });
        }
      } else {
        // For Serial/Batch ID searches, return single result
        if (
          !response.data ||
          (typeof response.data === "object" &&
            Object.keys(response.data).length === 0)
        ) {
          set({
            error: "no_data_found",
            isLoading: false,
            registryData: null,
            registryDataList: null,
          });
        } else {
          const singleResult = mapSingleRecord(
            response.data,
            registry,
            assetType,
            reference
          );
          set({
            registryData: singleResult,
            searchType: "single",
            isLoading: false,
          });
        }
      }
    } catch (error) {
      console.error("API call error:", error);

      // Handle specific "Record not found" response
      if (
        error.response?.data?.message === "Record not found" ||
        error.response?.data?.message === "Recod not found"
      ) {
        set({
          error: "no_data_found",
          isLoading: false,
          registryData: null,
          registryDataList: null,
        });
      } else {
        set({
          error: error.message || "Failed to fetch data",
          isLoading: false,
        });
      }
    }
  },

  // Action to select a specific carbon credit from the list
  selectCarbonCredit: (selectedCredit) => {
    set({
      registryData: selectedCredit,
      registryDataList: null,
      searchType: "single",
    });
  },

  // Action to clear search results and go back to search
  clearSearchResults: () => {
    set({
      registryData: null,
      registryDataList: null,
      searchType: null,
      error: null,
    });
  },
}));

export default useStore;
