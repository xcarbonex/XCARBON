import React from "react";
import {Input, FileUpload} from "@/components";
import SelectField from "@/components/Select";
import * as Yup from "yup";
import {formFields} from "@/appData";
import {VscRefresh} from "react-icons/vsc";
import {IoIosArrowBack} from "react-icons/io";
import certificate from "../../assets/certificate.svg";
import Form from "@/components/Form";
import clsx from "clsx";
import useStore from "@/store/store";
import TokenizationPreview from "./TokenizationPreview";
import {toast, Bounce} from "react-toastify";
import {useNavigate} from "react-router-dom";

const bgTags = [
  "bg-[#A6B3B1]",
  "bg-[#4C6663]",

  "bg-[#C2A57B]",
  "bg-[#949494]",
  "bg-[#A6B3B1]",
];

const RegistryForms = ({
  onBackToList,
  showBackToList = false,
  resetParentForm = () => {},
}) => {
  const navigate = useNavigate();
  const {
    selectedCarbonCreditDetails,
    carbonCreditDetailsError,
    isCarbonCreditDetailsLoading,
    preview,
    togglePreview,
    draft,
    setDraft,
    draftLoading,
    setMintedAssets,
    mintedAssetsLoading,
    mintedError,
  } = useStore();

  const tokenizationInitialValues = {
    id: selectedCarbonCreditDetails?.projectId,
    registry: selectedCarbonCreditDetails?.registry,
    projectName: selectedCarbonCreditDetails?.projectName || "",
    vintageYear: selectedCarbonCreditDetails?.vintageYear || "",
    location: selectedCarbonCreditDetails?.country || "",
    impactTags: selectedCarbonCreditDetails?.impactTags || [],
    quantity: selectedCarbonCreditDetails?.quantity || "",
    status: selectedCarbonCreditDetails?.status || "",
    type: selectedCarbonCreditDetails?.type || "",
    project_developer: selectedCarbonCreditDetails?.project_developer || "",
    serial_number: selectedCarbonCreditDetails?.serial_number || "",
    transferable: selectedCarbonCreditDetails?.transferable,
    verification_body: selectedCarbonCreditDetails?.verification_body || "",
    tokenSymbol: selectedCarbonCreditDetails?.tokenSymbol || "",
    listingPrice: selectedCarbonCreditDetails?.listingPrice || "",
    listingDuration: selectedCarbonCreditDetails?.listingDuration || "",
    allowFactorization: selectedCarbonCreditDetails?.allowFactorization || "",
    fraction: selectedCarbonCreditDetails?.fraction || "",
    files: selectedCarbonCreditDetails?.files || [],
    mintQuantity: selectedCarbonCreditDetails?.mintQuantity || "", // Add for FileUpload component
  };
  const handleTokenizationSubmit = async (values, {resetForm}) => {
    await setMintedAssets(values);
    await resetForm();
    await togglePreview();
    await resetParentForm?.current?.resetForm();
    await navigate("/assets");
    toast.success("Tokenization request submitted successfully!", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  };

  const handleSaveAsDraft = async (values) => {
    await setDraft(values);
    await togglePreview();
    await resetParentForm?.current?.resetForm();
    await navigate("/assets");
    toast.success("Draft successfully saved", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      transition: Bounce,
    });
  };

  const transferRestrictionsOptions = [
    {value: false, label: "None"},
    {value: true, label: "Restricted"},
  ];

  const listingDurationOptions = [
    {value: "", label: "Select"},
    {value: "30", label: "30 Days"},
    {value: "60", label: "60 Days"},
    {value: "90", label: "90 Days"},
  ];

  const validationSchema = Yup.object({
    tokenSymbol: Yup.string().required("Token name is Required."),
    listingPrice: Yup.string().required("Listing price is Required."),
    listingDuration: Yup.string().required("Duration is Required."),
    files: Yup.array()
      .length(
        2,
        "Exactly 2 files must be uploaded for Proof of Ownership/Retirement."
      )
      .required("Proof of Ownership/Retirement files are required."),
    allowFactorization: Yup.boolean(),
    fraction: Yup.string().when("allowFactorization", {
      is: true,
      then: (schema) => schema.trim().required("Field is required"),
      otherwise: (schema) => schema.notRequired(),
    }),
  });

  const handlePreviewBtnClick = () => togglePreview();
  return (
    <>
      {carbonCreditDetailsError && (
        <div className="text-red-500 text-center mt-3">
          Error: {carbonCreditDetailsError}
        </div>
      )}
      {isCarbonCreditDetailsLoading && (
        <div className="dark:bg-[#141517] bg-[#FDFDFB] border rounded-xl p-4 mt-3">
          <div className="flex justify-center items-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#C2A57B]"></div>
            <span className="ml-3 text-[#949494]">
              Loading carbon credits...
            </span>
          </div>
        </div>
      )}

      {selectedCarbonCreditDetails && (
        <Form
          initialValues={tokenizationInitialValues}
          validationSchema={validationSchema}
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
            return (
              <>
                {!preview && (
                  <div>
                    <div className=" dark:bg-[#141517] bg-[#FDFDFB]  border rounded-xl p-4 mt-2">
                      <div className="flex justify-between items-center border-b-2 border-[#363638] pb-[10px]">
                        <div className="relative space-y-3 flex items-center gap-4">
                          {showBackToList && (
                            <button
                              onClick={onBackToList}
                              className="flex items-center gap-2 p-2 text-[#949494] hover:text-[#C2A57B] transition-colors border border-[#363638] rounded-lg hover:border-[#C2A57B]"
                            >
                              <IoIosArrowBack className="h-4 w-4" />
                            </button>
                          )}
                          <div>
                            <h1 className="text-[24px]">
                              Registry Data Results
                            </h1>
                            <p className="text-[14px] text-[#949494] dark:text-white/30 ">
                              Asset information retrieved from registry
                            </p>
                          </div>
                        </div>
                        <div className="hidden sm:flex absolute right-10 items-center gap-2">
                          <div>
                            <p className="bg-[#4C6663]  text-white dark:bg-[#949494] px-4 py-1 text-[13px] rounded-[50px]">
                              {values.status}
                            </p>
                          </div>
                        </div>
                        <h1></h1>
                      </div>
                      <div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          {formFields.map((field, index) => {
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
                            hidden:
                              !selectedCarbonCreditDetails?.impactTags?.length,
                          })}
                        >
                          <div>
                            <h1 className="text-[16px] text-black dark:text-white mb-3 mt-2">
                              SDG Impact Tags
                            </h1>
                            <div className=" bg-[#4c666326] dark:bg-[#ffffff14] rounded-md">
                              <div className="py-3 pl-3">
                                <div className="flex flex-wrap gap-2">
                                  {selectedCarbonCreditDetails?.impactTags?.map(
                                    (tag, index) => (
                                      <div
                                        key={index}
                                        className={`text-[12px] w-fit text-white text-nowrap px-2 py-1 dark:bg-[#949494] rounded-[50px] ${
                                          bgTags[index % bgTags.length]
                                        }`}
                                      >
                                        {tag.tag}
                                      </div>
                                    )
                                  )}
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Row 3 - Tokenization Confirmation (Now Formik Controlled) */}
                    <div className=" dark:bg-[#141517] bg-[#FDFDFB] border rounded-xl p-4 mt-5">
                      {/* Element 1 */}
                      <div className="grid space-y-3 ">
                        <h1 className="text-[24px]">
                          Tokenization Confirmation
                        </h1>
                        <p className="text-[14px] text-[#949494] dark:text-white/30  border-b-2 border-[#363638] pb-[10px]">
                          Search for a carbon credit asset from an official
                          registry
                        </p>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div >
                          <h1 className="text-[16px] text-black dark:text-white mb-2 mt-2">
                            Token Symbol or Display Name
                          </h1>
                          <div>
                            <Input
                              placeholder="Enter Token Symbol"
                              name="tokenSymbol"
                              value={
                                values.tokenSymbol.startsWith("{X}")
                                  ? values.tokenSymbol
                                  : "{X}" + values.tokenSymbol
                              }
                              onChange={(e) => {
                                const newValue = e.target.value;
                                if (!newValue.startsWith("{X}")) {
                                  handleChange({
                                    target: {
                                      name: "tokenSymbol",
                                      value:
                                        "{X}" + newValue.replace("{X}", ""),
                                    },
                                  });
                                } else {
                                  handleChange(e);
                                }
                              }}
                              onBlur={handleBlur}
                            />
                            {touched.tokenSymbol && errors.tokenSymbol && (
                              <div className="text-red-500 text-sm mt-1">
                                {errors.tokenSymbol}
                              </div>
                            )}
                          </div>
                        </div>
                        <div>
                          <h1 className="text-[16px] text-black dark:text-white mb-2 mt-2">
                            Transfer Restrictions
                          </h1>
                          <div>
                            <SelectField
                              isClearable
                              options={transferRestrictionsOptions}
                              name="transferable"
                              isDisabled={true}
                              value={transferRestrictionsOptions.find(
                                (option) => option.value === values.transferable
                              )}
                              onChange={(selectedOption) => {
                                console.log(
                                  "Selected Option:",
                                  selectedOption,
                                  values.transferable
                                );
                                // Update the field value based on the selected option
                                setFieldValue(
                                  "transferable",
                                  selectedOption ? selectedOption.value : ""
                                );
                              }}
                              onBlur={handleBlur("transferable")}
                            />
                            {touched.transferable && errors.transferable && (
                              <div className="text-red-500 text-sm mt-1">
                                {errors.transferable}
                              </div>
                            )}
                          </div>
                        </div>
                         <div >
                          <h1 className="text-[16px] text-black dark:text-white mb-2 mt-2">
                            Quantity To Mint (USD)
                          </h1>
                          <div>
                            <Input
                              placeholder="Enter Quantity To Mint"
                              name="mintQuantity"
                              type="number"
                              value={values.mintQuantity}
                              onChange={handleChange}
                              onBlur={handleBlur}
                            />
                            {touched.mintQuantity && errors.mintQuantity && (
                              <div className="text-red-500 text-sm mt-1">
                                {errors.mintQuantity}
                              </div>
                            )}
                          </div>
                        </div>
                        <div >
                          <h1 className="text-[16px] text-black dark:text-white mb-2 mt-2">
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
                        <div >
                          <h1 className="text-[16px] text-black dark:text-white mb-2 mt-2">
                            Listing Duration
                          </h1>
                          <div>
                            <SelectField
                              isClearable
                              options={listingDurationOptions}
                              name="listingDuration"
                              value={listingDurationOptions.find(
                                (option) =>
                                  option.value === values.listingDuration
                              )}
                              onChange={(selectedOption) =>
                                setFieldValue(
                                  "listingDuration",
                                  selectedOption ? selectedOption.value : ""
                                )
                              }
                              onBlur={handleBlur("listingDuration")}
                            />
                            {touched.listingDuration &&
                              errors.listingDuration && (
                                <div className="text-red-500 text-sm mt-1">
                                  {errors.listingDuration}
                                </div>
                              )}
                          </div>
                        </div>
                        {/* Replace the existing file upload for Legal Opinion */}
                        <div className="mb-2 mt-2">
                          <FileUpload
                            name="files"
                            label="Proof of Ownership/Retirement"
                            icon={certificate}
                            maxFiles={2}
                            helperText="Upload PDF, JPG (Max 10MB)"
                          />
                        </div>
                        {/* Replace the existing file upload for Verification PDF */}
                        {/* <FileUpload
                      name="verificationPdfFile"
                      label="Verification PDF"
                      icon={license}
                      helperText="(including Articles of Association)"
                      previewPosition="below"
                    /> */}
                      </div>
                    </div>

                    <div className=" dark:bg-[#141517] bg-[#FDFDFB] border rounded-xl p-3 mb-2 mt-2">
                      <div className="grid space-y-3">
                        {/* Section 1 */}
                        <div className="border-[#363636] border-b-2 pb-[10px] ">
                          <h1 className="text-[24px]">
                            Tokenization Parameters
                          </h1>
                        </div>

                        {/* Section 2 */}

                        <div className="grid grid-cols-2 gap-3">
                          <div className=" mt-3 gap-3">
                            <div>
                              <h1>Token Standarization</h1>
                            </div>

                            <div className=" mt-3 ">
                              <Input
                                name="tokenStandard"
                                readOnly
                                placeholder="QRC20"
                                suffix={
                                  <p className=" text-[11px] left-32 z-50 px-2 rounded-md text-nowrap w-fit bg-[#4C6663] dark:bg-[#949494] text-white">
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
                              <label htmlFor="factorization-yes">
                                <Input
                                  id="factorization-yes"
                                  type="radio"
                                  name="allowFactorization"
                                  value={true}
                                  checked={values.allowFactorization === "true"}
                                  onChange={handleChange}
                                  suffix={
                                    <span className="text-[#949494] text-[20px]">
                                      Yes
                                    </span>
                                  }
                                  className="px-[0px] bg-transparent accent-tbase border-transparent shadow-transparent focus-within:ring-transparent focus-within:border-transparent focus-within:outline-transparent"
                                />
                              </label>

                              <label htmlFor="factorization-no">
                                <Input
                                  id="factorization-no"
                                  type="radio"
                                  name="allowFactorization"
                                  value={false}
                                  checked={
                                    values.allowFactorization === "false"
                                  }
                                  onChange={handleChange}
                                  suffix={
                                    <span className="text-[#949494] text-[20px]">
                                      No (SPOT 1:1 Only)
                                    </span>
                                  }
                                  className="px-[0px] bg-transparent accent-tbase border-transparent shadow-transparent focus-within:ring-transparent focus-within:border-transparent focus-within:outline-transparent"
                                />
                              </label>
                            </div>
                            {values.allowFactorization == "true" && (
                              <div className="mt-4 p-4 border rounded bg-[#f5f5f5] dark:bg-[#222]">
                                <h2 className="text-lg font-semibold mb-2">
                                  Factorization
                                </h2>
                                <div>
                                  {/* <label className="block mb-2">
                                <span className="text-sm">
                                  Minimum Fraction Size
                                </span>
                                <Input
                                  name="minFractionSize"
                                  type="number"
                                  value={values.minFractionSize}
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                  placeholder="Enter minimum fraction size"
                                />
                              </label> */}
                                  <label className="block mb-2">
                                    <span className="text-sm">Fractions</span>
                                    <Input
                                      name="fraction"
                                      type="number"
                                      value={values.maxFractions}
                                      onChange={handleChange}
                                      onBlur={handleBlur}
                                      placeholder="Enter number of fractions"
                                    />
                                    {touched.fraction && errors.fraction && (
                                      <div className="text-red-500 text-sm mt-1">
                                        {errors.fraction}
                                      </div>
                                    )}
                                  </label>
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                {preview && (
                  <div className=" dark:bg-[#141517] bg-[#FDFDFB] border rounded-xl p-4 mt-5">
                    <TokenizationPreview reviewData={values} />
                  </div>
                )}
                <div className=" dark:bg-[#141517] bg-[#FDFDFB] border rounded-xl p-4 mt-5">
                  {preview ? (
                    <div className="flex justify-end gap-x-5">
                      <div>
                        <button
                          onClick={(e) => {
                            e.preventDefault();
                            handleSaveAsDraft(values);
                          }}
                          disabled={draftLoading}
                          className="py-2 px-3 border text-white dark:bg-black bg-[#4C6663] dark:border-[#363638] rounded-lg"
                        >
                          Save as Draft
                        </button>
                      </div>
                      <div>
                        <button
                          disabled={draftLoading}
                          type="submit"
                          className="py-2 px-8 dark:bg-[#3B3B3B] bg-[#C2A57B] text-white rounded-lg"
                        >
                          Mint Asset
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="text-end">
                      <button
                        onClick={handlePreviewBtnClick}
                        className="py-2 px-8 dark:bg-[#3B3B3B] bg-[#C2A57B] text-white rounded-lg"
                      >
                        Review
                      </button>
                    </div>
                  )}
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
