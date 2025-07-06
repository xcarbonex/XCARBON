import React from "react";
import { Input } from "@/components";
import SelectField from "@/components/Select";
import { Formik, Form as FormikForm, ErrorMessage } from "formik";
import * as Yup from "yup";
import { formFields } from "@/appData";
import { VscRefresh } from "react-icons/vsc";
import { IoIosArrowBack } from "react-icons/io";
import certificate from "../../assets/certificate.svg";
import license from "../../assets/license.svg";
import Form from "@/components/Form";
import clsx from "clsx";

const bgTags = ["bg-[#A6B3B1]", "bg-[#4C6663]", "bg-[#C2A57B]", "bg-[#949494]"];

const RegistryForms = ({
  registryData,
  error,
  onBackToList,
  showBackToList = false,
}) => {
  const tokenizationInitialValues = {
    projectName: registryData.projectName || "",
    vintageYear: registryData.vintageYear || "",
    location: registryData.country || "",
    impactTags: registryData.impactTags || [],
    quantity: registryData.quantity || "",
    status: registryData.status || "",
    type: registryData.type || "",
    project_developer: registryData.project_developer || "",
  };

  // const tokenizationValidationSchema = Yup.object().shape({
  //   tokenSymbol: Yup.string().required("Token Symbol is required"),
  //   transferRestrictions: Yup.string().required(
  //     "Transfer Restrictions is required"
  //   ),
  //   listingPrice: Yup.number()
  //     .typeError("Listing Price must be a number")
  //     .required("Listing Price is required")
  //     .positive("Listing Price must be positive"),
  //   listingDuration: Yup.string().required("Listing Duration is required"),
  // });

  const handleTokenizationSubmit = (values) => {
    console.log("Tokenization Form submitted with values:", values);
  };

  const transferRestrictionsOptions = [
    { value: "false", label: "None" },
    { value: "true", label: "Restricted" },
  ];

  const listingDurationOptions = [
    { value: "", label: "Select" },
    { value: "30", label: "30 Days" },
    { value: "60", label: "60 Days" },
    { value: "90", label: "90 Days" },
  ];

  return (
    <>
      {error && (
        <div className="text-red-500 text-center mt-4">Error: {error}</div>
      )}

      {registryData && (
        <Form
          initialValues={tokenizationInitialValues}
          validationSchema={[]}
          onSubmit={handleTokenizationSubmit}
        >
          {({
            values,
            handleChange,
            handleBlur,
            errors,
            touched,
            setFieldValue,
          }) => {
            console.log("Form Values:", values);
            return (
              <>
                <div className=" dark:bg-[#141517] bg-[#FDFDFB] border-[#363638] border rounded-xl p-4 mt-5">
                  <div className="flex justify-between items-center border-b-2 border-[#363638] pb-[10px]">
                    {/* Section 1 */}
                    <div className="relative space-y-3 flex items-center gap-4">
                      {showBackToList && (
                        <button
                          onClick={onBackToList}
                          className="flex items-center gap-2 p-2 text-[#949494] hover:text-[#C2A57B] transition-colors border border-[#363638] rounded-lg hover:border-[#C2A57B]"
                        >
                          <IoIosArrowBack className="h-4 w-4" />
                          {/* <span className="text-[14px]">Back to List</span> */}
                        </button>
                      )}
                      <div>
                        <h1 className="text-[24px]">Registry Data Results</h1>
                        <p className="text-[14px] text-[#949494] dark:text-white/30 ">
                          Asset information retrieved from registry
                        </p>
                      </div>
                    </div>
                    <div className="hidden sm:flex absolute right-10 items-center gap-2">
                      <div>
                        <p className="bg-[#4C6663]  text-white dark:bg-[#949494] px-4 py-1 text-[13px] rounded-[50px]">
                          {registryData.status}
                        </p>
                      </div>

                      {/* <VscRefresh className="h-6 w-6 cursor-pointer" /> */}
                    </div>
                    <h1></h1>
                  </div>
                  <div>
                    {/* Form Elements - Display only */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {formFields.map((field, index) => {
                        console.log(
                          "Field Data:",
                          field.name,
                          values[field.name]
                        );
                        return (
                          <div className="grid mt-2" key={index}>
                            <div className="mb-3">
                              <h1 className="text-[16px] text-black dark:text-white">
                                {field.label}
                              </h1>
                            </div>
                            <div>
                              <Input
                                disabled
                                placeholder={field.placeholder}
                                value={values[field.name]}
                                name={field.name}
                                onChange={handleChange}
                                onBlur={handleBlur}
                              />
                            </div>
                          </div>
                        );
                      })}
                    </div>

                    <div
                      className={clsx({
                        hidden: !registryData.impactTags.length,
                      })}
                    >
                      <div>
                        <h1 className="text-[16px] text-black dark:text-white mb-3 mt-2">
                          SDG Impact Tags
                        </h1>
                        <div className=" bg-[#4c666326] dark:bg-[#ffffff14] rounded-md">
                          <div className="py-3 pl-3">
                            <div className="flex flex-wrap gap-2">
                              {registryData.impactTags.map((tag, index) => (
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

                {/* Row 3 - Tokenization Confirmation (Now Formik Controlled) */}
                <div className=" dark:bg-[#141517] bg-[#FDFDFB] border-[#363638] border rounded-xl p-4 mt-5">
                  {/* Element 1 */}
                  <div className="grid space-y-3 ">
                    <h1 className="text-[24px]">Tokenization Confirmation</h1>
                    <p className="text-[14px] text-[#949494] dark:text-white/30  border-b-2 border-[#363638] pb-[10px]">
                      Search for a carbon credit asset from an official registry
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="mt-3">
                      <h1 className="text-[16px] text-black dark:text-white mb-3 mt-2">
                        Token Symbol or Display Name
                      </h1>
                      <div>
                        <Input
                          placeholder="Enter Token Symbol"
                          name="tokenSymbol"
                          value={values.tokenSymbol}
                          onChange={handleChange}
                          onBlur={handleBlur}
                        />
                        {touched.tokenSymbol && errors.tokenSymbol && (
                          <div className="text-red-500 text-sm mt-1">
                            {errors.tokenSymbol}
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="mt-3">
                      <h1 className="text-[16px] text-black dark:text-white mb-3 mt-2">
                        Transfer Restrictions
                      </h1>
                      <div>
                        <SelectField
                          isClearable
                          options={transferRestrictionsOptions}
                          name="transferRestrictions"
                          value={transferRestrictionsOptions.find(
                            (option) =>
                              option.value === values.transferRestrictions
                          )}
                          onChange={(selectedOption) =>
                            setFieldValue(
                              "transferRestrictions",
                              selectedOption ? selectedOption.value : ""
                            )
                          }
                          onBlur={handleBlur("transferRestrictions")}
                        />
                        {touched.transferRestrictions &&
                          errors.transferRestrictions && (
                            <div className="text-red-500 text-sm mt-1">
                              {errors.transferRestrictions}
                            </div>
                          )}
                      </div>
                    </div>
                    <div className="mt-3">
                      <h1 className="text-[16px] text-black dark:text-white mb-3 mt-2">
                        Listing Price (USD)
                      </h1>
                      <div>
                        <Input
                          placeholder="Enter Listing Price"
                          name="listingPrice"
                          type="number"
                          value={values.listingPrice}
                          onChange={handleChange}
                          onBlur={handleBlur}
                        />
                        {touched.listingPrice && errors.listingPrice && (
                          <div className="text-red-500 text-sm mt-1">
                            {errors.listingPrice}
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="mt-3">
                      <h1 className="text-[16px] text-black dark:text-white mb-3 mt-2">
                        Listing Duration
                      </h1>
                      <div>
                        <SelectField
                          isClearable
                          options={listingDurationOptions}
                          name="listingDuration"
                          value={listingDurationOptions.find(
                            (option) => option.value === values.listingDuration
                          )}
                          onChange={(selectedOption) =>
                            setFieldValue(
                              "listingDuration",
                              selectedOption ? selectedOption.value : ""
                            )
                          }
                          onBlur={handleBlur("listingDuration")}
                        />
                        {touched.listingDuration && errors.listingDuration && (
                          <div className="text-red-500 text-sm mt-1">
                            {errors.listingDuration}
                          </div>
                        )}
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

                <div className=" dark:bg-[#141517] bg-[#FDFDFB] border-[#363638] border rounded-xl p-4 mt-5">
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
              </>
            );
          }}
        </Form>
      )}
    </>
  );
};

export default RegistryForms;
