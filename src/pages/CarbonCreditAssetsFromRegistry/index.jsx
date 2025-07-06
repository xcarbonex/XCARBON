import { Input } from "@/components";
import React, { useState } from "react";
import { IoIosSearch } from "react-icons/io";
import { VscRefresh } from "react-icons/vsc";
import { IoIosArrowBack } from "react-icons/io";
import SelectField from "@/components/Select";
import useStore from "@/store/store";
import Form from "@/components/Form";
import * as Yup from "yup";
import { ErrorMessage } from "formik";
import RegistryForms from "./RegistryForms";
import CarbonCreditList from "./CarbonCreditList";
import NoDataFound from "./NoDataFound";

const CarbonCreditAssetsFromRegistry = () => {
  const [lastSearchCriteria, setLastSearchCriteria] = useState(null);

  const {
    registryData,
    registryDataList,
    isLoading,
    error,
    searchType,
    searchRegistry,
    selectCarbonCredit,
    clearSearchResults,
  } = useStore();

  const searchInitialValues = {
    registry: "",
    assetReferenceType: "",
    reference: "",
  };

  const searchValidationSchema = Yup.object().shape({
    registry: Yup.string().required("Registry is required"),
    assetReferenceType: Yup.string().required(
      "Asset Reference Type is required"
    ),
    reference: Yup.string().required("Reference is required"),
  });

  const handleSearchSubmit = (values) => {
    console.log("Search Form submitted with values:", values);

    // Store search criteria for potential "no data found" display
    setLastSearchCriteria({
      registry:
        registryOptions.find((opt) => opt.value === values.registry)?.label ||
        values.registry,
      assetReferenceType:
        values.assetReferenceType === "sno"
          ? "Serial Number / Batch ID"
          : values.assetReferenceType === "projectID"
          ? "Project ID"
          : values.assetReferenceType === "registryURL"
          ? "Registry URL"
          : values.assetReferenceType,
      reference: values.reference,
    });

    searchRegistry(
      values.registry,
      values.assetReferenceType,
      values.reference
    );
  };

  const handleSelectCarbonCredit = (selectedCredit) => {
    console.log("Selected carbon credit:", selectedCredit);
    selectCarbonCredit(selectedCredit);
  };

  const handleBackToSearch = () => {
    clearSearchResults();
    setLastSearchCriteria(null);
  };

  const handleBackToList = () => {
    // Clear single result to go back to list view
    useStore.setState({ registryData: null, searchType: "multiple" });
  };

  const handleRetrySearch = () => {
    clearSearchResults();
    setLastSearchCriteria(null);
  };

  const registryOptions = [
    { value: "", label: "Select From List" },
    { value: "verra", label: "Verra" },
    { value: "gold_standard", label: "Gold Standard" },
    { value: "climate_action_reserve", label: "Climate Action Reserve" },
  ];

  return (
    <>
      <div className="bg-white transition-all duration-fast dark:bg-[#141517]">
        <div className="space-y-5 text-black dark:text-[#FFFFFF]/80 ">
          {/* Row 1 - Search Section (Independent Formik) */}
          <div className=" dark:bg-[#141517] bg-[#FDFDFB] border-[#363638] border rounded-xl p-4">
            {/* Element 1 */}
            <div className="grid space-y-3 ">
              <h1 className="text-[24px]">Registry Asset Lookup</h1>
              <p className="text-[14px] text-[#949494] dark:text-white/30  border-b-2 border-[#363638] pb-[10px]">
                Search for a carbon credit asset from an official registry
              </p>
            </div>

            <Form
              initialValues={searchInitialValues}
              validationSchema={searchValidationSchema}
              onSubmit={handleSearchSubmit}
            >
              {({
                values,
                handleChange,
                handleBlur,
                errors,
                touched,
                setFieldValue,
              }) => {
                return (
                  <>
                    {/* Element 2 - Search Criteria */}
                    <div className="grid grid-cols-1 2xl:grid-cols-2 gap-3">
                      <div className="mt-5">
                        <div className="mb-3">
                          <h1 className="text-[16px]">Registry</h1>
                        </div>
                        <SelectField
                          isClearable
                          options={registryOptions}
                          name="registry"
                          value={registryOptions.find(
                            (option) => option.value === values.registry
                          )}
                          onChange={(selectedOption) =>
                            setFieldValue(
                              "registry",
                              selectedOption ? selectedOption.value : ""
                            )
                          }
                          onBlur={handleBlur("registry")}
                        />
                        {touched.registry && errors.registry && (
                          <div className="text-red-500 text-sm mt-1">
                            {errors.registry}
                          </div>
                        )}
                      </div>
                      <div className="mt-5">
                        <div className="mb-3">
                          <h1 className="text-[16px]">Asset Reference Type</h1>
                        </div>

                        <div className="flex">
                          <Input
                            id="Sno"
                            type="radio"
                            name="assetReferenceType"
                            value="sno"
                            checked={values.assetReferenceType === "sno"}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            width="fit"
                            className="bg-transparent accent-tbase border-transparent shadow-none focus-within:ring-transparent focus-within:border-transparent focus-within:outline-transparent"
                            suffix={
                              <label htmlFor="Sno" className="">
                                Serial Number / Batch ID
                              </label>
                            }
                          />
                          <Input
                            id="ProjectID"
                            type="radio"
                            name="assetReferenceType"
                            value="projectID"
                            checked={values.assetReferenceType === "projectID"}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            width="fit"
                            className="bg-transparent accent-tbase  border-transparent shadow-none focus-within:ring-transparent focus-within:border-transparent focus-within:outline-transparent"
                            suffix={
                              <label htmlFor="ProjectID" className="">
                                Project ID
                              </label>
                            }
                          />
                          <Input
                            id="RegisURL"
                            type="radio"
                            name="assetReferenceType"
                            value="registryURL"
                            checked={
                              values.assetReferenceType === "registryURL"
                            }
                            onChange={handleChange}
                            onBlur={handleBlur}
                            width="fit"
                            className="bg-transparent accent-tbase border-transparent shadow-none focus-within:ring-transparent focus-within:border-transparent focus-within:outline-transparent"
                            suffix={
                              <label htmlFor="RegisURL" className="">
                                Registry URL
                              </label>
                            }
                          />
                        </div>
                        {touched.assetReferenceType &&
                          errors.assetReferenceType && (
                            <div className="text-red-500 text-sm mt-1">
                              {errors.assetReferenceType}
                            </div>
                          )}
                      </div>
                    </div>

                    {/* Element 3 - Reference Input */}
                    <div>
                      <div className="mt-5">
                        <div className="mb-3">
                          <h1 className="text-[16px]">Enter Reference</h1>
                        </div>

                        <div className="flex rounded-lg overflow-hidden">
                          <div className="w-full sm:w-9/12">
                            <Input
                              placeholder="e.g., VCS-123456"
                              className="rounded-none"
                              name="reference"
                              value={values.reference}
                              onChange={handleChange}
                              onBlur={handleBlur}
                            />
                          </div>
                          <div className="w-3/12">
                            <button
                              type="submit"
                              className="flex justify-center items-center gap-x-3 text-center h-12 w-full !bg-[#C2A57B] dark:!bg-black !text-white !border  !rounded-none"
                              disabled={isLoading}
                            >
                              <span>
                                <IoIosSearch className="w-6 h-6" />
                              </span>
                              <span className="hidden sm:flex text-[16px]">
                                {isLoading ? "Searching..." : "Search Registry"}
                              </span>
                            </button>
                          </div>
                        </div>
                        {touched.reference && errors.reference && (
                          <div className="text-red-500 text-sm mt-1">
                            {errors.reference}
                          </div>
                        )}
                      </div>
                    </div>

                    {error && error !== "no_data_found" && (
                      <div className="text-red-500 text-center mt-4">
                        Error: {error}
                      </div>
                    )}
                  </>
                );
              }}
            </Form>
          </div>

          {/* Show NoDataFound component when no data is found */}
          {error === "no_data_found" && (
            <NoDataFound
              onRetry={handleRetrySearch}
              searchCriteria={lastSearchCriteria}
            />
          )}

          {/* Conditional rendering based on search results */}
          {searchType === "multiple" && registryDataList && !registryData && (
            <>
              {/* Back to Search Button */}
              <div className="flex justify-start mb-4">
                <button
                  onClick={handleBackToSearch}
                  className="flex items-center gap-2 px-4 py-2 text-[#949494] hover:text-[#C2A57B] transition-colors"
                >
                  <IoIosArrowBack className="h-4 w-4" />
                  <span className="text-[14px]">Back to Search</span>
                </button>
              </div>

              {/* Carbon Credit List */}
              <CarbonCreditList
                carbonCredits={registryDataList}
                onSelectCredit={handleSelectCarbonCredit}
                isLoading={isLoading}
              />
            </>
          )}

          {/* Registry Forms - Show when single result or when credit selected from list */}
          {registryData &&
            (searchType === "single" || searchType === "multiple") && (
              <>
                {/* Back Button - Show different text based on context */}
                <div className="flex justify-start mb-4">
                  <button
                    onClick={
                      searchType === "single"
                        ? handleBackToSearch
                        : handleBackToList
                    }
                    className="flex items-center gap-2 px-4 py-2 text-[#949494] hover:text-[#C2A57B] transition-colors"
                  >
                    <IoIosArrowBack className="h-4 w-4" />
                    <span className="text-[14px]">
                      {searchType === "single"
                        ? "Back to Search"
                        : "Back to List"}
                    </span>
                  </button>
                </div>

                <RegistryForms
                  registryData={registryData}
                  // Formik props will be handled internally by RegistryForms
                />
              </>
            )}
        </div>
      </div>
    </>
  );
};

export default CarbonCreditAssetsFromRegistry;
