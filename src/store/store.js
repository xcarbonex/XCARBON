import {create} from "zustand";
import axios from "axios";
import {withDevtools} from "./withDevtools";
import {GOLD_STANDARD} from "./appData";

const useStore = create(
  withDevtools(
    (set, get) => ({
      filteredPamaeter: {
        registry: "",
        assetReferenceType: "sno",
        reference: "",
      },
      //Todo: Registry Project List
      registryProjectListError: null,
      registryProjectList: [],
      isLoadingRegistryProjectList: false,
      totalProjectCount: 0, // New state for total project count
      //Todo:  States for carbon assets fetched.
      registryData: null,
      registryDataList: [], // For multiple results (Project ID searches)
      isLoading: false,
      error: null,
      searchType: null, // 'single' or 'multiple'
      registryDataListCount: 0,
      //Todo:  State for selected carbon assets.
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
      //Todo: State for saving data draft.
      draft: [
        {
          id: "515883",
          registry: "gold_standard",
          projectName: "Tropical Mix ",
          vintageYear: "2023",
          location: "Panama",
          impactTags: [
            {
              tag: "Goal 1: No Poverty",
            },
            {
              tag: "Goal 8: Decent Work and Economic Growth",
            },
            {
              tag: "Goal 12: Responsible Production and Consumption",
            },
            {
              tag: "Goal 13: Climate Action",
            },
            {
              tag: "Goal 15: Life On Land",
            },
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

      setMintedAssets: (asset) => {
        set({mintedAssetsLoading: true, mintedError: null});
        try {
          set((state) => {
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
          set({mintedError: err.message || "Failed to add draft"});
        } finally {
          set({mintedAssetsLoading: false});
        }
      },
      setDraft: (asset) => {
        set({draftLoading: true, draftError: null});
        try {
          set((state) => {
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
          set({draftError: err.message || "Failed to add draft"});
        } finally {
          set({draftLoading: false});
        }
      },

      getDraft: (id, navigate) => {
        const {draft} = get();
        const draftItem = draft.find((item) => item.id === id) || null;

        set({selectedCarbonCreditDetails: draftItem});
        if (draftItem) {
          navigate(`/assets/look-up`);
        }
      },
      // Helper function to map individual record
      mapSingleRecord: (data, registry, assetType, reference) => {
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
              ? data.project.sustainable_development_goals.map((goal) => ({
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

      // State for selected carbon credit details

      // Helper function to construct API URL
      getRegistryApiUrl: (
        registry,
        assetType,
        reference,
        query,
        page = 1,
        size = 5
      ) => {
        const registryURL = {
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
              projectID: `/credits?query=${query}&page=${page}&size=${size}&projects=${reference}&issuances=false`, //`/projects/${reference}`,
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

      getRegistryAssets: async (registry, assetType) => {
        // set({
        //   isLoading: true,
        //   error: null,
        // });
        try {
          // await get().fetchRegistryProjectList(registry);
          await get().searchRegistry(registry, assetType);
        } catch (error) {
          set({
            error: error.message || "Failed to fetch registry data.",
            isLoading: false,
          });
        }
      },

      fetchRegistryProjectList: async (registry, page = 1, size = 25) => {
        set({
          isLoadingRegistryProjectList: true,
        });
        try {
          const apiUrl = get().getRegistryApiUrl(
            registry,
            "list",
            "",
            page,
            size
          );
          const response = await axios.get(apiUrl);
          const totalCount =
            parseInt(response.headers["x-total-count"], 10) || 0;
          let list = response?.data
            ?.map((project) => ({
              value: project.id,
              label: /*`${project.gs_id} | */ project.name,
            }))
            .sort((a, b) => a.value - b.value);
          set({
            isLoadingRegistryProjectList: false,
            totalProjectCount: totalCount,
            registryProjectList: list,
          });
        } catch (error) {
          set({
            isLoadingRegistryProjectList: false,
            registryProjectListError:
              error.message || "Failed to fetch project list.",
          });
        }
      },

      filterRegistryAssets: async (
        registry,
        assetType,
        project,
        type,
        volume,
        query,
        page = 1,
        size = 25
      ) => {
        let {min, max} = volume || {};
        let appendUrl =
          min && max && type
            ? `&minQuantity=${min}&maxQuantity=${max}&projectTypes=${type}`
            : min && max
            ? `&minQuantity=${min}&maxQuantity=${max}`
            : type
            ? `&projectTypes=${type}`
            : "";

        set({
          isLoading: true,
          error: null,
        });

        try {
          const apiUrl = get().getRegistryApiUrl(
            registry,
            assetType,
            project,
            query,
            page,
            size
          );
          const response = await axios.get(apiUrl + appendUrl);
          const totalCount =
            parseInt(response.headers["x-total-count"], 10) || 0;
          set({
            isLoading: false,
            registryDataList: response.data,
            registryDataListCount: totalCount,
          });
        } catch (error) {
          set({
            error: error.message || "Failed to fetch registry data.",
            isLoading: false,
          });
        }
      },

      // New function to fetch carbon credit details by ID
      fetchCarbonCreditById: async (registry, projectId) => {
        set({
          isCarbonCreditDetailsLoading: true,
          carbonCreditDetailsError: null,
          selectedCarbonCreditDetails: null,
          // Clear main search results state when fetching a single credit by ID
          // registryData: null,
          // registryDataList: null, // Keep the list intact
          // isLoading: false, // Ensure main isLoading is false
          // error: null, // Ensure main error is null
          // searchType: null, // Reset search type
        });
        try {
          const apiUrl = get().getRegistryApiUrl(
            registry,
            "creditById",
            projectId
          );
          const response = await axios.get(apiUrl);

          const getProjectByIdURL = get().getRegistryApiUrl(
            registry,
            "getProjectById",
            response?.data?.project.id
          );
          const res = await axios.get(getProjectByIdURL);

          const updatedResponse = {
            ...response.data,
            project: res.data, // replace project with detailed info
          };
          if (response.data) {
            const singleResult = get().mapSingleRecord(
              updatedResponse,
              registry,
              "projectID", // Treat as a projectID search for mapping consistency
              projectId
            );
            set({
              selectedCarbonCreditDetails: singleResult,
              isCarbonCreditDetailsLoading: false,
            });
            // return { success: true, data: singleResult };
          }
          // else {
          //   set({
          //     carbonCreditDetailsError: "no_data_found",
          //     isCarbonCreditDetailsLoading: false,
          //     selectedCarbonCreditDetails: null,
          //   });
          //   return {
          //     success: false,
          //     message: "No data found for this project ID.",
          //   };
          // }
        } catch (error) {
          // console.error("API call error (fetchCarbonCreditById):", error);
          if (error.response?.data?.message) {
            set({
              carbonCreditDetailsError:
                error.response?.data?.message || "record_not_found",
              isCarbonCreditDetailsLoading: false,
              selectedCarbonCreditDetails: null,
            });
            // return { success: false, message: "Record not found." };
          }
          // else {
          //   set({
          //     carbonCreditDetailsError:
          //       error.message || "Failed to fetch carbon credit details.",
          //     isCarbonCreditDetailsLoading: false,
          //   });
          //   return {
          //     success: false,
          //     message:
          //       error.message || "Failed to fetch carbon credit details.",
          //   };
          // }
        }
      },

      searchRegistry: async (
        registry,
        assetType,
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
          const apiUrl = get().getRegistryApiUrl(
            registry,
            assetType,
            reference,
            query,
            page,
            size
          );
          console.log(registry, assetType, reference, query, apiUrl);

          const response = await axios.get(apiUrl);
          const totalCount =
            parseInt(response.headers["x-total-count"], 10) || 0;
          set({
            isLoading: false,
            registryDataList: response.data,
            registryDataListCount: totalCount,
          });
        } catch (error) {
          set({
            error: error.message || "Failed to fetch registry data.",
            isLoading: false,
          });
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

      togglePreview: () => {
        set((state) => ({
          preview: !state.preview,
        }));
      },

      // Action to clear search results and go back to search
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
          totalProjectCount: 0, // New state for total project count

          registryData: null,
          registryDataList: [], // For multiple results (Project ID searches)
          isLoading: false,
          error: null,
          searchType: null, // 'single' or 'multiple'
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
