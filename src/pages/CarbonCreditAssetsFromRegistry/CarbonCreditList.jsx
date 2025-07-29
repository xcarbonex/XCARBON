import React, {useState, useEffect, useCallback} from "react";
import {
  HiOutlineLocationMarker,
  HiOutlineCalendar,
  HiOutlineCube,
} from "react-icons/hi";
import {IoIosArrowForward} from "react-icons/io";
import clsx from "clsx";
import {debounce} from "../../utils/debounce";
import dayjs from "dayjs";
import NoDataFound from "./NoDataFound";
import useStore from "@/store/store";
import Dropdown from "@/components/Dropdown";
import {Typography, Input} from "@/components"; // Import Typography for custom renderOption
import {Tooltip} from "react-tooltip";
import {Button} from "@/components";
import {toast} from "react-toastify";
const bgTags = ["bg-[#A6B3B1]", "bg-[#4C6663]", "bg-[#C2A57B]", "bg-[#949494]"];

const CarbonCreditList = ({
  carbonCredits = [],
  onSelectCredit,
  isLoading,
  onSearch = () => {},
}) => {
  const {
    filteredPamaeter,
    registryProjectList,
    fetchRegistryProjectList,
    projectTypeList,
    setProjectType,
    filterRegistryAssets,
    isLoadingRegistryProjectList,
  } = useStore();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedProjects, setSelectedProjects] = useState([]); // State for multi-select dropdown
  const [selectedProjedType, setSelectedProjectedType] = useState([]);
  const [volume, setVolume] = useState({
    min: "",
    max: "",
  });

  useEffect(() => {
    setProjectType();
  }, [setProjectType]);
  const debouncedSearch = useCallback(
    debounce((query) => {
      if (query.trim() === "") {
        onSearch("");
        return;
      }
      onSearch(query);
    }, 300),
    [onSearch]
  );
  const handleSearch = (e) => {
    const newQuery = e.target.value;
    setSearchTerm(newQuery);
    debouncedSearch(newQuery);
  };

  const handleProjectSelect = (selected) => {
    setSelectedProjects(selected); // Update selectedProjects state
    // You might want to filter carbonCredits based on selected projects here
  };

  const handleVolumeSearch = async (setIsOpen) => {
    let projectIds =
      selectedProjects.length > 0
        ? selectedProjects.map((project) => project.value).join(",")
        : "";
    let projectTypeIds =
      selectedProjedType.length > 0
        ? selectedProjedType.map((type) => type.value).join(",")
        : "";
    try {
      await filterRegistryAssets(
        filteredPamaeter?.registry,
        filteredPamaeter?.assetReferenceType,
        projectIds,
        projectTypeIds,
        volume,
        searchTerm
      );
    } catch (error) {
      toast.error(error);
    } finally {
      setIsOpen((prev) => !prev);
    }
  };

  const handleVolumeReset = async (setIsOpen) => {
    setVolume({
      min: "",
      max: "",
    });
    let projectIds =
      selectedProjects.length > 0
        ? selectedProjects.map((project) => project.value).join(",")
        : "";
    let projectTypeIds =
      selectedProjedType.length > 0
        ? selectedProjedType.map((type) => type.value).join(",")
        : "";

    try {
      await filterRegistryAssets(
        filteredPamaeter?.registry,
        filteredPamaeter?.assetReferenceType,
        projectIds,
        projectTypeIds,
        {min: "", max: ""},
        searchTerm
      );
    } catch (error) {
      toast.error(error);
    } finally {
      setIsOpen((prev) => !prev);
    }
    setIsOpen((prev) => !prev);
  };

  const handleProjectType = (selected) => {
    setSelectedProjectedType(selected);
  };

  const handleclick = () => {
    if (registryProjectList.length == 0)
      fetchRegistryProjectList(filteredPamaeter?.registry);
  };

  const handlePrjectSearch = async (value, setIsOpen) => {
    let projectIds =
      selectedProjects.length > 0
        ? selectedProjects.map((project) => project.value).join(",")
        : "";
    let projectTypeIds = selectedProjedType.length
      ? selectedProjedType.map((type) => type.value).join(",")
      : "";
    try {
      await filterRegistryAssets(
        filteredPamaeter?.registry,
        filteredPamaeter?.assetReferenceType,
        projectIds,
        projectTypeIds,
        volume,
        searchTerm
      );
    } catch (error) {
      toast.error(error);
    } finally {
      setIsOpen((prev) => !prev);
    }
  };

  const handleProjectTypeSearch = async (value, setIsOpen) => {
    let projectIds =
      selectedProjects.length > 0
        ? selectedProjects.map((project) => project.value).join(",")
        : "";
    let projectTypeIds =
      selectedProjedType.length > 0
        ? selectedProjedType.map((type) => type.value).join(",")
        : "";
    try {
      await filterRegistryAssets(
        filteredPamaeter?.registry,
        filteredPamaeter?.assetReferenceType,
        projectIds,
        projectTypeIds,
        volume,
        searchTerm
      );
    } catch (error) {
      toast.error(error);
    } finally {
      setIsOpen((prev) => !prev);
    }
  };

  const handleProjectTypeReset = async (setIsOpen) => {
    let projectIds =
      selectedProjects.length > 0
        ? selectedProjects.map((project) => project?.value).join(",")
        : "";

    try {
      await filterRegistryAssets(
        filteredPamaeter?.registry,
        filteredPamaeter?.assetReferenceType,
        projectIds,
        "",
        volume,
        searchTerm
      );
    } catch (error) {
      toast.error(error);
    } finally {
      setIsOpen((prev) => !prev);
    }
  };

  const handleResetProjectFilter = async (setIsOpen) => {
    let projectTypeIds =
      selectedProjedType.length > 0
        ? selectedProjedType.map((type) => type?.value).join(",")
        : "";
    try {
      await filterRegistryAssets(
        filteredPamaeter?.registry,
        filteredPamaeter?.assetReferenceType,
        "",
        projectTypeIds,
        volume,
        searchTerm
      );
    } catch (error) {
      toast.error(error);
    } finally {
      setIsOpen((prev) => !prev);
    }
  };

  return (
    <>
      <Tooltip id="filter_val" place="right" className="z-50" />

      <div className="dark:bg-[#141517] bg-[#FDFDFB] border rounded-xl p-4 mt-2">
        <div className="border-b border-[#363638] pb-4 mb-4 flex justify-between items-center">
          <div>
            <h1 className="text-[24px] text-black dark:text-white">
              Carbon Credit Assets
            </h1>
            <p className="text-[14px] text-[#949494] dark:text-white/30">
              Found {carbonCredits.length} carbon credit
              {carbonCredits.length !== 1 ? "s" : ""} matching your search
            </p>
          </div>
          <Input
            type="text"
            placeholder="Search..."
            value={searchTerm}
            width="fit"
            disabled={carbonCredits.length === 0 && !searchTerm}
            variant="xs"
            onChange={handleSearch}
            className="min-w-[400px] "
          />
        </div>
        {filteredPamaeter?.registry &&
          filteredPamaeter?.assetReferenceType === "projectID" && (
            <div className="grid grid-cols-5 gap-4 pb-4 mb-4 border-b border-[#363638]">
              {/* <div className={clsx("w-full")}> */}
              {
                /*registryProjectList.length > 0 && */ <div className="flex flex-col gap-2">
                  <Typography
                    variant="h6"
                    className="text-black dark:text-white"
                  >
                    Filter by Project
                  </Typography>
                  <Dropdown
                    options={registryProjectList}
                    multiSelect={true}
                    customInput={true}
                    selectedOption={selectedProjects}
                    onSelect={handleProjectSelect}
                    label="Projects"
                    width={290}
                    isLoading={isLoadingRegistryProjectList}
                    onClick={handleclick}
                    onSearchApply={(val, setIsOpen) =>
                      handlePrjectSearch(val, setIsOpen)
                    }
                    onReset={handleResetProjectFilter}
                    buttonClassName="w-full text-left flex items-center"
                    dropdownClassName="w-full"
                    placeholder="Select Projects"
                    renderOption={({option, isSelected, onSelect}) => {
                      const isSelectAll = option.value === "_select_all_";
                      const isAllSelected =
                        selectedProjects.length === registryProjectList.length;
                      return (
                        <div
                          data-tooltip-id={"filter_val"}
                          data-tooltip-content={option.label}
                          className="flex items-center px-2 py-1 cursor-pointer hover:bg-input rounded w-full h-fit"
                          onClick={onSelect}
                        >
                          <Input
                            type="checkbox"
                            checked={isSelectAll ? isAllSelected : isSelected}
                            width="fit"
                            onChange={() => onSelect(option)}
                            variant="xs"
                            className="bg-transparent px-[0px] accent-tbase border-transparent shadow-none focus-within:ring-transparent focus-within:border-transparent focus-within:outline-transparent"
                            onClick={(e) => e.stopPropagation()}
                          />
                          <Typography
                            variant="body2"
                            className="pl-2 font-[600] text-nowrap line-clamp-2"
                          >
                            {option.label}
                          </Typography>
                        </div>
                      );
                    }}
                  />
                </div>
              }
              <div className="flex flex-col gap-2">
                <Typography variant="h6" className="text-black dark:text-white">
                  Filter by Volume
                </Typography>
                <Dropdown
                  options={[]}
                  label={() =>
                    `Volume (min: ${volume.min || 0}, max: ${volume.max || 0})`
                  }
                  buttonClassName="w-full text-left flex items-center"
                  dropdownClassName="w-full"
                  placeholder="Choose Volume"
                >
                  {(setIsOpen) => (
                    <>
                      <div className="flex gap-3 p-1">
                        <div className="space-y-1">
                          <label htmlFor="minimum">Minimum</label>
                          <Input
                            id="minimum"
                            type="number"
                            name="minVolume"
                            value={volume.min}
                            onChange={(e) =>
                              setVolume({...volume, min: e.target.value})
                            }
                            variant="xs"
                            placeholder="Minimum"
                          />
                        </div>
                        <div className="space-y-1">
                          <label htmlFor="maximum">Maximum</label>
                          <Input
                            id="maximum"
                            type="number"
                            name="maxVolume"
                            value={volume.max}
                            onChange={(e) =>
                              setVolume({...volume, max: e.target.value})
                            }
                            variant="xs"
                            placeholder="Maximum"
                          />
          </div>
        </div>
                      {parseInt(volume.max) < parseInt(volume.min) && (
                        <p className="text-red-500 text-sm px-1">
                          Invalid: Maximum value must be greater than Minimum
                          Value.
                        </p>
                      )}
                      <div className="flex gap-2 justify-between p-1">
                        <Button
                          type="button"
                          size="xs"
                          onClick={() => handleVolumeReset(setIsOpen)}
                          className="mt-1 w-fit h-full px-2 py-1  bg-gray-300 text-gray-700 rounded-md text-sm hover:bg-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400"
                        >
                          Reset
                        </Button>
                        <Button
                          type="button"
                          size="xs"
                          onClick={() => handleVolumeSearch(setIsOpen)}
                          className={"w-fit px-2 py-1 text-sm rounded-md"}
                        >
                          Apply
                        </Button>
                      </div>
                    </>
                  )}
                </Dropdown>
              </div>
              {projectTypeList.length > 0 && (
                <div className="flex flex-col gap-2">
                  <Typography
                    variant="h6"
                    className="text-black dark:text-white"
                  >
                    Filter by Project Type
                  </Typography>
                  <Dropdown
                    options={projectTypeList}
                    multiSelect
                    customInput
                    selectedOption={selectedProjedType}
                    onSelect={handleProjectType}
                    label="Project Type"
                    width={290}
                    onSearchApply={(val, setIsOpen) =>
                      handleProjectTypeSearch(val, setIsOpen)
                    }
                    onReset={handleProjectTypeReset}
                    buttonClassName="w-full text-left flex items-center"
                    dropdownClassName="w-full"
                    placeholder="Select Projec Type"
                    renderOption={({option, isSelected, onSelect}) => {
                      const isSelectAll = option.value === "_select_all_";
                      const isAllSelected =
                        selectedProjedType.length === projectTypeList.length;
                      return (
                        <div
                          data-tooltip-id={"filter_val"}
                          data-tooltip-content={option.label}
                          className="flex items-center px-2 py-1 cursor-pointer hover:bg-input rounded w-full h-fit"
                          onClick={onSelect}
                        >
                          <Input
                            type="checkbox"
                            checked={isSelectAll ? isAllSelected : isSelected}
                            width="fit"
                            onChange={() => onSelect(option)}
                            variant="xs"
                            className="bg-transparent px-[0px] accent-tbase border-transparent shadow-none focus-within:ring-transparent focus-within:border-transparent focus-within:outline-transparent"
                            onClick={(e) => e.stopPropagation()}
                          />
                          <Typography
                            variant="body2"
                            className="pl-2 font-[600] text-nowrap line-clamp-2"
                          >
                            {option.label}
                          </Typography>
                        </div>
                      );
                    }}
                  />
                </div>
              )}
              {/* </div> */}
            </div>
          )}
        {isLoading && (
          <div className="dark:bg-[#141517] bg-[#FDFDFB] border rounded-xl p-4 mt-3">
            <div className="flex justify-center items-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#C2A57B]"></div>
              <span className="ml-3 text-[#949494]">
                Loading carbon credits...
              </span>
            </div>
          </div>
        )}
        {!carbonCredits ||
          (carbonCredits.length === 0 && !isLoading && <>{<NoDataFound />}</>)}
        {carbonCredits.length > 0 && !isLoading && (
          <>
            <div className="space-y-4">
              {carbonCredits.map((credit, index) => (
                <div
                  key={index}
                  onClick={() => onSelectCredit(credit)}
                  className="group cursor-pointer border  rounded-lg p-4 hover:border-[#C2A57B] hover:bg-[#C2A57B]/5 dark:hover:bg-[#C2A57B]/10 transition-all duration-200"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      {/* Project Name and Status */}
                      <div className="flex items-center justify-between mb-3">
                        <h3 className="text-[18px] font-medium text-black dark:text-white group-hover:text-[#C2A57B] transition-colors">
                          {credit.serial_number || "Unnamed Project"}
                        </h3>
                        <div className="flex items-center gap-2">
                          <span
                            className={clsx(
                              "px-3 py-1 text-[12px] rounded-full text-white",
                              credit.status === "ACTIVE"
                                ? "bg-[#4C6663]"
                                : credit.status === "RETIRED"
                                ? "bg-[#949494]"
                                : "bg-[#A6B3B1]"
                            )}
                          >
                            {credit.status || "Unknown"}
                          </span>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-3">
                        <div className="flex items-center gap-2">
                          <HiOutlineLocationMarker className="h-4 w-4 text-[#949494]" />
                          <span className="text-[14px] text-[#949494] dark:text-white/60">
                            {credit?.project?.country || "Unknown Location"}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <HiOutlineCalendar className="h-4 w-4 text-[#949494]" />
                          <span className="text-[14px] text-[#949494] dark:text-white/60">
                            Vintage: {credit?.vintage || "N/A"}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <HiOutlineCube className="h-4 w-4 text-[#949494]" />
                          <span className="text-[14px] text-[#949494] dark:text-white/60">
                            Quantity: {credit?.number_of_credits || "N/A"}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <HiOutlineCube className="h-4 w-4 text-[#949494]" />
                          <span className="text-[14px] text-[#949494] dark:text-white/60">
                            Issuance Date:{" "}
                            {dayjs(credit?.created_at).format(
                              "MMMM DD, YYYY"
                            ) || "N/A"}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <HiOutlineCube className="h-4 w-4 text-[#949494]" />
                          <span className="text-[14px] text-[#949494] dark:text-white/60">
                            Retirement Date:{" "}
                            {dayjs(credit?.certified_date).format(
                              "MMMM DD, YYYY"
                            ) || "N/A"}
                          </span>
                        </div>
                      </div>

                      <div className="mb-2">
                        <span className="text-[13px] text-[#949494] dark:text-white/40">
                          Project: {credit?.project?.name || "N/A"}
                        </span>
                      </div>

                      {credit?.project?.description && (
                        <div className="mb-2">
                          <p className="text-[12px] text-[#666666] dark:text-white/70 line-clamp-1">
                            {credit?.project?.description}
                          </p>
                        </div>
                      )}

                      {credit?.note && (
                        <div className="mb-2">
                          <span className="text-[12px] text-[#949494] dark:text-white/40">
                            <b>
                              <i>Note:</i>
                            </b>{" "}
                            {credit.note || "N/A"}
                          </span>
                        </div>
                      )}

                      {credit?.impactTags && credit?.impactTags?.length > 0 && (
                        <div className="flex flex-wrap gap-2">
                          {credit.impactTags
                            .slice(0, 3)
                            .map((tag, tagIndex) => (
                              <span
                                key={tagIndex}
                                className={clsx(
                                  "text-[10px] px-2 py-1 rounded-full text-white",
                                  bgTags[tagIndex % bgTags.length]
                                )}
                              >
                                {tag.tag || tag}
                              </span>
                            ))}
                          {credit.impactTags.length > 3 && (
                            <span className="text-[10px] px-2 py-1 rounded-full bg-[#949494] text-white">
                              +{credit.impactTags.length - 3} more
                            </span>
                          )}
                        </div>
                      )}
                    </div>

                    {/* Arrow Icon */}
                    <div className="ml-4">
                      <IoIosArrowForward className="h-5 w-5 text-[#949494] group-hover:text-[#C2A57B] transition-colors" />
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Footer */}
            <div className="mt-6 pt-4 border-t border-[#363638]">
              <p className="text-[12px] text-[#949494] dark:text-white/40 text-center">
                Click on any carbon credit to view details and proceed with
                tokenization
              </p>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default CarbonCreditList;
