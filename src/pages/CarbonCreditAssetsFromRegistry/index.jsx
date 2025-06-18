import { Input } from "@/components";
import React from "react";
import { Input as SearchInput } from "../../../src/components/index";
import { IoIosSearch } from "react-icons/io";
import { VscRefresh } from "react-icons/vsc";
import certificate from "../../assets/certificate.svg";
import license from "../../assets/license.svg";
import { formFields } from "@/appData";
import { impactTags } from "@/appData";
import SelectField from "@/components/Select";
const bgTags = ["bg-[#A6B3B1]", "bg-[#4C6663]", "bg-[#C2A57B]", "bg-[#949494]"];
 
const CarbonCreditAssetsFromRegistry = () => {
  return (
    <>
      <div className="bg-white transition-all duration-fast dark:bg-[#141517]">
        <div className="space-y-5 text-black dark:text-[#FFFFFF]/80 ">
          {/* Row 1 */}
 
          <div className=" dark:bg-[#141517] bg-[#FDFDFB] border-[#363638] border rounded-xl p-4">
            {/* Element 1 */}
            <div className="grid space-y-3 ">
              <h1 className="text-[24px]">Registry Asset Lookup</h1>
              <p className="text-[14px] text-[#949494] dark:text-white/30  border-b-2 border-[#363638] pb-[10px]">
                Search for a carbon credit asset from an official registry
              </p>
            </div>
 
            {/* Element 2 */}
            <div className="grid grid-cols-1 2xl:grid-cols-2 gap-3">
              <div className="mt-5">
                <div className="mb-3">
                  <h1 className="text-[16px]">Registry</h1>
                </div>
                <SelectField
                isClearable
                  options={[{value: '', label: 'Select From List'}, {value: 'veera', label: 'Verra'}, {value: 'gold_standard', label: 'Gold Standard'}, {value: 'climate_action_reserve', label: 'Climate Action Reserve'}]}
                />
              </div>
              <div className="mt-5">
                <div className="mb-3">
                  <h1 className="text-[16px]">Asset Reference Type</h1>
                </div>
 
                <div className="flex flex-wrap">
                  <label htmlFor="Serial Number / Batch ID">
                    <Input
                      id="Sno"
                      type="radio"
                      name="option"
                      value="2"
                      suffix={
                        <span className="text-[#949494] text-[20px]">
                          Serial Number / Batch ID
                        </span>
                      }
                      className="px-[0px] mr-5 bg-transparent accent-tbase border-transparent shadow-transparent focus-within:ring-transparent focus-within:border-transparent focus-within:outline-transparent"
                    />
                  </label>
 
                  <label htmlFor="ProjectID">
                    <Input
                      id="ProjectID"
                      type="radio"
                      name="option"
                      value="2"
                      suffix={
                        <span className="text-[#949494] text-[20px]">
                          ProjectID
                        </span>
                      }
                      className="px-[0px] mr-5 bg-transparent accent-tbase border-transparent shadow-transparent focus-within:ring-transparent focus-within:border-transparent focus-within:outline-transparent"
                    />
                  </label>
 
                  <label htmlFor="Registry URL">
                    <Input
                      id="RegisURL"
                      type="radio"
                      name="option"
                      value="2"
                      suffix={
                        <span className="text-[#949494] text-[20px]">
                          Registry URL
                        </span>
                      }
                      className="px-[0px] mr-5 bg-transparent accent-tbase border-transparent shadow-transparent focus-within:ring-transparent focus-within:border-transparent focus-within:outline-transparent"
                    />
                  </label>
                </div>
              </div>
            </div>
 
            {/* Element 3 */}
 
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
                    />
                  </div>
                  <div className="w-3/12">
                    <button className="flex justify-center items-center gap-x-3 text-center h-12 w-full !bg-[#C2A57B] dark:!bg-black !text-white !border  !rounded-none">
                      <span>
                        <IoIosSearch className="w-6 h-6" />
                      </span>
                      <span className="hidden sm:flex text-[16px]">
                        Search Registry
                      </span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
 
          {/* Row 2 */}
          <div className=" dark:bg-[#141517] bg-[#FDFDFB] border-[#363638] border rounded-xl p-4">
            <div className="flex justify-between items-center border-b-2 border-[#363638] pb-[10px]">
              {/* Section 1 */}
              <div className="relative space-y-3 ">
                <h1 className="text-[24px]">Registry Data Results</h1>
                <p className="text-[14px] text-[#949494] dark:text-white/30 ">
                  Asset information retrieved from registry
                </p>
              </div>
              <div className="hidden sm:flex absolute right-10 items-center gap-2">
                <div>
                  <p className="bg-[#4C6663]  text-white dark:bg-[#949494] px-4 py-1 text-[13px] rounded-[50px]">
                    Verified
                  </p>
                </div>
 
                <VscRefresh className="h-6 w-6 cursor-pointer" />
              </div>
              <h1></h1>
            </div>
            <div>
              {/* Form Elements */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {formFields.map((field, index) => (
                  <div className="grid mt-2" key={index}>
                    <div className="mb-3">
                      <h1 className="text-[16px] text-black dark:text-white">
                        {field.label}
                      </h1>
                    </div>
                    <div>
                      <Input readOnly placeholder={field.placeholder} />
                    </div>
                  </div>
                ))}
              </div>
 
              <div>
                <div>
                  <h1 className="text-[16px] text-black dark:text-white mb-3 mt-2">
                    SDG Impact Tags
                  </h1>
                  <div className=" bg-[#4c666326] dark:bg-[#ffffff14] rounded-md">
                    <div className="py-3 pl-3">
                      <div className="flex flex-wrap gap-2">
                        {impactTags.map((tag, index) => (
                          <div
                            key={index}
                            className={`text-[12px] w-fit text-white text-nowrap px-2 py-1 dark:bg-[#949494] rounded-[50px] ${
                              bgTags[index % bgTags.length]
                            }`}
                          >
                            {tag.tag}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
 
          {/* Row 3 */}
 
          <div className=" dark:bg-[#141517] bg-[#FDFDFB] border-[#363638] border rounded-xl p-4">
            {/* Element 1 */}
            <div className="grid space-y-3 ">
              <h1 className="text-[24px]">Tokenization Confirmation</h1>
              <p className="text-[14px] text-[#949494] dark:text-white/30  border-b-2 border-[#363638] pb-[10px]">
                Search for a carbon credit asset from an official registry
              </p>
            </div>
            {/* Form Element */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="mt-3">
                <h1 className="text-[16px] text-black dark:text-white mb-3 mt-2">
                  Token Symbol or Display Name
                </h1>
                <div>
                  <Input placeholder="Enter Token Symbol" />
                </div>
              </div>
              <div className="mt-3">
                <h1 className="text-[16px] text-black dark:text-white mb-3 mt-2">
                  Transfer Restrictions
                </h1>
                <div>
                  <SelectField
                  isClearable
                  options={[{value: 'false', label: 'None'}, {value: 'true', label: 'Restricted'}]}
                />
                </div>
              </div>
              <div className="mt-3">
                <h1 className="text-[16px] text-black dark:text-white mb-3 mt-2">
                  Listing Price (USD)
                </h1>
                <div>
                  <Input placeholder="Enter Token Symbol" />
                </div>
              </div>
              <div className="mt-3">
                <h1 className="text-[16px] text-black dark:text-white mb-3 mt-2">
                  Listing Duration
                </h1>
                <div>
                   <SelectField
                    isClearable
                    options={[{value: '', label: 'Select'}, {value: 30, label: '30 Days'}, {value: 60, label: '60 Days'}, {value: 90, label: '90 Days'}]}
                  />
                </div>
              </div>
 
              <div>
                <label
                  for="uploadFile1"
                  class=" text-[#949494] font-semibold  rounded p-[40px] flex flex-col items-center justify-center cursor-pointer border-2 border-[#363638] border-dashed mx-auto"
                >
                  <img
                    src={certificate}
                    alt="certificate"
                    className="mb-[5px]"
                  />
                  <p className="text-center">Legal Opinion</p>
                  <input type="file" id="uploadFile1" class="hidden" />
                  <p class="text-[10px] font-medium text-[#949494] mt-2">
                    Upload PDF, DOCX, or JPG (Max 10MB)
                  </p>
                </label>
              </div>
 
              <div>
                <label
                  for="uploadFile2"
                  class=" text-[#949494] font-semibold h-full rounded p-[40px] flex flex-col items-center justify-center cursor-pointer border-2 border-[#363638] border-dashed mx-auto"
                >
                  <img src={license} alt="license" />
                  <p className="text-center">Verification PDF </p>
                  <input type="file" id="uploadFile2" class="hidden" />
                  <p class="text-[10px] font-medium text-[#949494] mt-2">
                    (including Articles of Association)
                  </p>
                </label>
              </div>
            </div>
          </div>
 
          {/* Row -4 */}
          <div className=" dark:bg-[#141517] bg-[#FDFDFB] border-[#363638] border rounded-xl p-4 ">
            <div className="grid space-y-3">
              {/* Section 1 */}
              <div className="border-[#363636] border-b-2 pb-[10px] ">
                <h1 className="text-[24px]">Tokenization Parameters</h1>
              </div>
 
              {/* Section 2 */}
 
              <div className="grid grid-cols-2 gap-3">
                <div className="grid mt-3 gap-3">
                  <div>
                    <h1>Token Standarization</h1>
                  </div>
 
                  <div className="relative ">
                    <Input
                      readOnly
                      placeholder="QRC20"
                      suffix={
                        <p className="absolute text-[11px] left-32 z-50 px-2 rounded-md text-nowrap w-fit bg-[#4C6663] dark:bg-[#949494] text-white">
                          Auto Detected
                        </p>
                      }
                    />
                  </div>
                </div>
                {/* Radios */}
                <div className="grid mt-3 gap-3">
                  <div>
                    <h1>Allow Factorization</h1>
                  </div>
 
                  <div className="flex gap-4">
                    <label htmlFor="Yes">
                      <Input
                        id="yes"
                        type="radio"
                        name="option"
                        value="2"
                        suffix={
                          <span className="text-[#949494] text-[20px]">
                            Yes
                          </span>
                        }
                        className="px-[0px] bg-transparent accent-tbase border-transparent shadow-transparent focus-within:ring-transparent focus-within:border-transparent focus-within:outline-transparent"
                      />
                    </label>
 
                    <label htmlFor="No">
                      <Input
                        id="NoSPOT"
                        type="radio"
                        name="option"
                        value="2"
                        suffix={
                          <span className="text-[#949494] text-[20px]">
                            No (SPOT 1:1 Only)
                          </span>
                        }
                        className="px-[0px] bg-transparent accent-tbase border-transparent shadow-transparent focus-within:ring-transparent focus-within:border-transparent focus-within:outline-transparent"
                      />
                    </label>
                  </div>
                </div>
              </div>
              <div>
                <div className="flex flex-row-reverse gap-x-5">
                  <div>
                    <button className="py-2 px-8 dark:bg-[#3B3B3B] bg-[#C2A57B] text-white rounded-lg">
                      Submit For Review
                    </button>
                  </div>
                  <div>
                    <button className="py-2 px-3 border text-white dark:bg-black bg-[#4C6663] dark:border-[#363638] rounded-lg">
                      Save as Draft
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
 
export default CarbonCreditAssetsFromRegistry;