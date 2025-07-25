import {Input, Button, Typography} from "@/components";
import React, {useState, useRef} from "react";
import {IoIosSearch} from "react-icons/io";
import SelectField from "@/components/Select";
import useStore from "@/store/store";
import Form from "@/components/Form";
import * as Yup from "yup";
import RegistryForms from "./RegistryForms";
import CarbonCreditList from "./CarbonCreditList";
import Pagination from "@/components/Table/Pagination";
import {RiResetLeftFill} from "react-icons/ri";
import {Tooltip} from "react-tooltip";
import AssetsProgress from "./AssetsProgress";
import clsx from "clsx";
import {
  MdOutlineKeyboardArrowUp,
  MdOutlineKeyboardArrowDown,
} from "react-icons/md";

const CarbonCreditAssetsFromRegistry = () => {
  const registryFormRef = useRef();
  const [lastSearchCriteria, setLastSearchCriteria] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState("");
  const [isOpen, setIsOpen] = useState(true);
  const {
    filteredPamaeter,
    registryDataList,
    isLoading,
    searchRegistry,
    clearSearchResults,
    isLoadingRegistryProjectList,
    fetchCarbonCreditById,
    registryProjectListError,
    selectedCarbonCreditDetails,
    isCarbonCreditDetailsLoading,
    registryDataListCount,
    getRegistryAssets,
  } = useStore();

  const projectsPerPage = 25;

  const searchValidationSchema = Yup.object().shape({
    registry: Yup.string().required("Registry is required"),
    assetReferenceType: Yup.string().required(
      "Asset Reference Type is required"
    ),
    reference: Yup.string().required("Reference is required"),
  });

  const handleSearchSubmit = (values) => {
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

    if (values.assetReferenceType === "registryURL") {
      window.open(values.reference, "_blank");
    } else {
      searchRegistry(
        values.registry,
        values.assetReferenceType,
        "",
        values.reference
      );
    }
  };

  const handleSelectCarbonCredit = async (selectedCredit, registry) => {
    await fetchCarbonCreditById(registry, selectedCredit.id);
  };

  const handleBackToList = () => {
    useStore.setState({
      selectedCarbonCreditDetails: null,
    });
  };

  const registryOptions = [
    {value: "", label: "Select From List"},
    {value: "verra", label: "Verra"},
    {value: "gold_standard", label: "Gold Standard"},
    {value: "climate_action_reserve", label: "Climate Action Reserve"},
  ];

  const LastSearchInfo = ({lastSearchCriteria, resetForm = () => {}}) => {
    if (!lastSearchCriteria) return null;
    const resetCriteria = () => {
      clearSearchResults();
      resetForm();
    };
    return (
      <div className="bg-[#4C6663] text-white p-4 rounded-xl mb-4 mt-3">
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-bold mb-2">Last Search Criteria:</h2>
          <Button
            rounded
            size="sm"
            variant="primary"
            className={"py-2"}
            data-tooltip-id={"assets_registry"}
            data-tooltip-content={"Reset search criteria."}
            onClick={resetCriteria}
          >
            <RiResetLeftFill />
          </Button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
          <p>
            <strong>Registry:</strong> {lastSearchCriteria.registry}
          </p>
          <p>
            <strong>Asset Reference Type:</strong>{" "}
            {lastSearchCriteria.assetReferenceType}
          </p>
          {lastSearchCriteria.reference && (
            <p>
              <strong>Reference:</strong> {lastSearchCriteria.reference}
            </p>
          )}
        </div>
      </div>
    );
  };

  const handleSearchQuery = (query, values) => {
    setSearch(query);
    searchRegistry(
      values.registry,
      values.assetReferenceType,
      values.reference,
      query
    );
  };

  return (
    <>
      <Tooltip id="assets_registry" />

      <div className="bg-white transition-all duration-fast dark:bg-[#141517]">
        <div className="space-y-5 text-black dark:text-[#FFFFFF]/80 ">
          <Form
            ref={registryFormRef}
            initialValues={filteredPamaeter}
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
              resetForm,
            }) => {
              return (
                <>
                  <div
                    aria-label="Accordion 1"
                    className=" bg-secondary border-[#363638] border rounded-xl px-3 pt-2 pb-3"
                  >
                    <div
                      onClick={() => setIsOpen((prev) => !prev)}
                      className="space-y-1 py-2 flex flex-nowrap cursor-pointer justify-between items-center"
                    >
                      <div>
                        <Typography variant="h4">
                          Registry Asset Lookup
                        </Typography>
                        <Typography
                          variant="subtitle"
                          className="text-sm text-muted-foreground"
                        >
                          Search for a carbon credit asset from an official
                          registry
                        </Typography>
                      </div>
                      <span className="p-1 bg-input text-tbase rounded-full">
                        {isOpen ? (
                          <MdOutlineKeyboardArrowDown />
                        ) : (
                          <MdOutlineKeyboardArrowUp />
                        )}
                      </span>
                    </div>
                    <div className={clsx({hidden: isOpen})}>
                      <div className="grid grid-cols-1 2xl:grid-cols-2 gap-3 border-t pt-2 border-[#363638]">
                        <div className="mt-0 z-50">
                          <div className="mb-3">
                            <h1 className="text-[16px]">Registry</h1>
                          </div>
                          <SelectField
                            isClearable
                            options={registryOptions}
                            name="registry"
                            isDisabled={
                              isLoading || registryDataList?.length > 0
                            }
                            value={registryOptions.find(
                              (option) => option.value === values.registry
                            )}
                            onChange={(selectedOption) => {
                              const newRegistryValue = selectedOption
                                ? selectedOption.value
                                : "";
                              setFieldValue("registry", newRegistryValue);
                              setFieldValue("assetReferenceType", "sno");
                              setFieldValue("reference", "");
                            }}
                            onBlur={handleBlur("registry")}
                          />
                          {touched.registry && errors.registry && (
                            <div className="text-red-500 text-sm mt-1">
                              {errors.registry}
                            </div>
                          )}
                        </div>
                        <div className="mt-0">
                          <div className="mb-3">
                            <h1 className="text-[16px]">
                              Asset Reference Type
                            </h1>
                          </div>

                          <div className="flex">
                            <Input
                              id="Sno"
                              type="radio"
                              name="assetReferenceType"
                              value="sno"
                              checked={values.assetReferenceType === "sno"}
                              onChange={(e) => {
                                setFieldValue("reference", "");
                                setFieldValue(
                                  "assetReferenceType",
                                  e.target.value
                                );
                              }}
                              onBlur={handleBlur}
                              width="fit"
                              className="bg-transparent accent-tbase border-transparent shadow-none focus-within:ring-transparent focus-within:border-transparent focus-within:outline-transparent"
                              suffix={
                                <label htmlFor="Sno" className="">
                                  Serial Number
                                </label>
                              }
                              disabled={
                                !values.registry ||
                                isLoading ||
                                registryDataList?.length > 0
                              }
                            />
                            <Input
                              id="ProjectID"
                              type="radio"
                              name="assetReferenceType"
                              value="projectID"
                              checked={
                                values.assetReferenceType === "projectID"
                              }
                              onChange={(e) => {
                                setFieldValue("reference", "");
                                setFieldValue(
                                  "assetReferenceType",
                                  e.target.value
                                );
                                getRegistryAssets(
                                  values.registry,
                                  e.target.value
                                );
                              }}
                              onBlur={handleBlur}
                              width="fit"
                              className="bg-transparent accent-tbase  border-transparent shadow-none focus-within:ring-transparent focus-within:border-transparent focus-within:outline-transparent"
                              suffix={
                                <label htmlFor="ProjectID" className="">
                                  Assets
                                </label>
                              }
                              disabled={
                                !values.registry ||
                                isLoading ||
                                registryDataList?.length > 0
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
                              onChange={(e) => {
                                setFieldValue("reference", "");
                                setFieldValue(
                                  "assetReferenceType",
                                  e.target.value
                                );
                              }}
                              onBlur={handleBlur}
                              width="fit"
                              className="bg-transparent accent-tbase border-transparent shadow-none focus-within:ring-transparent focus-within:border-transparent focus-within:outline-transparent"
                              suffix={
                                <label htmlFor="RegisURL" className="">
                                  Registry URL
                                </label>
                              }
                              disabled={
                                !values.registry ||
                                isLoading ||
                                registryDataList?.length > 0
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

                      {(values.assetReferenceType === "registryURL" ||
                        values.assetReferenceType === "sno") && (
                        <div>
                          <div className="mt-5">
                            <div className="mb-3">
                              <h1 className="text-[16px]">Enter Reference</h1>
                            </div>

                            <div className="flex rounded-lg">
                              <div className="w-full sm:w-9/12">
                                <Input
                                  placeholder="e.g., VCS-123456"
                                  className="rounded-none rounded-l-md"
                                  name="reference"
                                  value={values.reference}
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                  disabled={
                                    !values.registry ||
                                    isLoading ||
                                    registryDataList?.length > 0
                                  }
                                />
                              </div>
                              <div className="w-3/12">
                                <Button
                                  type="submit"
                                  className="h-full w-full rounded-none rounded-r-md"
                                  disabled={
                                    registryDataList.length > 0 || search
                                  }
                                >
                                  <span>
                                    <IoIosSearch className="w-5 h-5" />
                                  </span>
                                  <span className="hidden sm:flex text-[16px]">
                                    {isLoading || isLoadingRegistryProjectList
                                      ? "Searching..."
                                      : "Search Assets"}
                                  </span>
                                </Button>
                              </div>
                            </div>
                            {touched.reference && errors.reference && (
                              <div className="text-red-500 text-sm mt-1">
                                {errors.reference}
                              </div>
                            )}
                            {registryProjectListError && (
                              <div className="text-red-500 text-sm mt-1">
                                {registryProjectListError}
                              </div>
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                  {registryDataList.length > 0 ||
                  selectedCarbonCreditDetails ? (
                    <div className="">
                      {/* Todo : Render Assets from Registry */}
                      {(registryDataList.length > 0 || search) && (
                        <LastSearchInfo
                          lastSearchCriteria={values}
                          resetForm={resetForm}
                        />
                      )}
                      {!selectedCarbonCreditDetails &&
                        !isCarbonCreditDetailsLoading && (
                          <>
                            <CarbonCreditList
                              carbonCredits={registryDataList}
                              onSelectCredit={(credit) =>
                                handleSelectCarbonCredit(
                                  credit,
                                  values.registry
                                )
                              }
                              isLoading={isLoading}
                              onSearch={(query) =>
                                handleSearchQuery(query, values)
                              }
                            />
                            {registryDataListCount > 0 && (
                              <Pagination
                                currentPage={currentPage}
                                totalCount={registryDataListCount}
                                pageSize={projectsPerPage}
                                onPageChange={(page) => {
                                  setCurrentPage(page);
                                  if (
                                    lastSearchCriteria &&
                                    lastSearchCriteria.assetReferenceType ===
                                      "Project ID"
                                  ) {
                                    searchRegistry(
                                      lastSearchCriteria.registry
                                        .toLowerCase()
                                        .replace(/ /g, "_"),
                                      "projectID",
                                      lastSearchCriteria.reference,
                                      search,
                                      page,
                                      projectsPerPage
                                    );
                                  }
                                }}
                              />
                            )}
                          </>
                        )}
                    </div>
                  ) : (
                    <AssetsProgress />
                  )}
                </>
              );
            }}
          </Form>
          <RegistryForms
            onBackToList={handleBackToList}
            showBackToList={true}
            resetParentForm={registryFormRef}
          />
        </div>
      </div>
    </>
  );
};

export default CarbonCreditAssetsFromRegistry;
