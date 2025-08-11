import React from "react";
import { Input, Typography, Button } from "@/components";
import { SelectField } from "@/components";
import token from "@/assets/token.svg";
import caution from "@/assets/caution.svg";
import certificate from "@/assets/upload.svg";
import arrow from "@/assets/arrow.svg";
import { projects, reasonsWithdrawl, projectDetails } from "@/appData";
import { Breadcrumb } from "@/components";
import { ImFire } from "react-icons/im";
import { TfiReload } from "react-icons/tfi";
import { FaCheckCircle } from "react-icons/fa";
import { Formik, Form } from "formik";
import FileUpload from "../../../components/FileUpload";
import * as Yup from "yup";

const breadcrumbItems = [
  { label: "Wallet", path: "/wallet" },
  { label: "Withdraw Tokenized Carbon Credit", path: "/" },
];

const inputFields = [
  {
    label: "Organization/Entity Name",
    name: "organizationName",
    placeholder: "Enter Token Symbol",
  },
  {
    label: "Registry Account ID",
    name: "registryId",
    placeholder: "E.g., VCS-ACC-123456",
  },
];

const tokenStatusList = [
  {
    img: <ImFire className="w-6 h-6 text-white" />,
    title: "Token is Burned",
    description:
      "The digital asset is permanently removed from blockchain circulation",
  },
  {
    img: <TfiReload className="w-6 h-6 text-white" />,
    title: "Registry Updated",
    description: "The official registry is notified via API or manual update",
  },
  {
    img: <FaCheckCircle className="w-6 h-6 text-white" />,
    title: "Status Changed",
    description: "Asset marked as Retired or Transferred on platform",
  },
];

const WithdrawTokenizedCarbonCredit = () => {
  return (
    <div>
      <Breadcrumb items={breadcrumbItems} />

      <Formik
        initialValues={{
          selectedProject: "",
          reason: "",
          organizationName: "",
          registryId: "",
          contactEmail: "",
          notes: "",
          documentation: null,
        }}
        validationSchema={Yup.object().shape({
          documentation: Yup.mixed().nullable(),
        })}
        onSubmit={(values) => {
          console.log("Form submitted:", values);
        }}
      >
        {({ values, handleChange, handleBlur, setFieldValue }) => (
          <Form className="space-y-6 text-tbase">
            {/* Select Tokenized Asset */}
            <section className="bg-[#FDFDFB] dark:bg-[#141517] border border-[#363638] rounded-xl p-6">
              <div className="flex items-center gap-4 border-b border-[#363638] pb-4 mb-6">
                <div className="rounded-full p-2 bg-[#C2A57B] dark:bg-white/80">
                  <img src={token} alt="token" className="w-6 h-6" />
                </div>
                <div>
                  <Typography variant="h5">Select Tokenized Asset</Typography>
                  <Typography variant="caption">
                    Choose the tokenized carbon credit you wish to withdraw from
                    circulation
                  </Typography>
                </div>
              </div>

              <Typography variant="subtitle2" className="mb-2">
                Available Tokenized Assets
              </Typography>
              <SelectField
                name="selectedProject"
                options={projects}
                onChange={(option) => setFieldValue("selectedProject", option)}
                isClearable
              />

              {/* Example hardcoded preview */}
              <div className="bg-[#E2E6E5] dark:bg-[#363638]/50 rounded-lg p-4 mt-4">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <Typography variant="h6">
                      Rainforest Protection Project
                    </Typography>
                    <Typography variant="caption" className="text-[#949494]">
                      VCS-123456-2022
                    </Typography>
                  </div>
                  <span className="bg-[#C2A57B] dark:bg-white/80 text-white px-3 py-1 text-xs rounded-full">
                    Listed
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  {projectDetails.map((detail, index) => (
                    <div key={index}>
                      <Typography variant="caption" className="text-[#949494]">
                        {detail.label}
                      </Typography>
                      <Typography variant="body1">{detail.value}</Typography>
                    </div>
                  ))}
                </div>

                <div className="flex gap-3 items-center p-3 border border-[#FFA621] bg-white/[8%] rounded-lg mt-4">
                  <img
                    src={caution}
                    alt="caution"
                    className="hidden sm:block"
                  />
                  <Typography variant="body2">
                    <strong>Notice:</strong> This asset is currently listed for
                    sale. Delisting will cancel the active sale listing.
                  </Typography>
                </div>
              </div>
            </section>

            {/* Withdrawal Parameters */}
            <section className="bg-[#FDFDFB] dark:bg-[#141517] border border-[#363638] rounded-xl p-6 space-y-6">
              <div className="flex items-center gap-4 border-b border-[#363638] pb-4 mb-6">
                <div className="rounded-full p-2 bg-[#C2A57B] dark:bg-white/80">
                  <img src={token} alt="parameters" className="w-6 h-6" />
                </div>
                <div>
                  <Typography variant="h5">Withdrawal Parameters</Typography>
                  <Typography variant="caption" className="text-[#949494]">
                    Specify the reason and details for withdrawing this asset
                  </Typography>
                </div>
              </div>

              <div>
                <Typography variant="subtitle2" className="mb-2">
                  Reason for Withdrawal
                </Typography>
                <SelectField
                  name="reason"
                  options={reasonsWithdrawl}
                  onChange={(option) => setFieldValue("reason", option)}
                  isClearable
                />
              </div>

              <div className="bg-[#E2E6E5] dark:bg-[#363638]/50 rounded-lg p-4">
                <Typography variant="h6" className="mb-4">
                  New Owner Information
                </Typography>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {inputFields.map((field, index) => (
                    <div key={index}>
                      <Typography variant="subtitle2" className="mb-1">
                        {field.label}
                      </Typography>
                      <Input
                        name={field.name}
                        placeholder={field.placeholder}
                        value={values[field.name]}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                    </div>
                  ))}
                </div>

                <div className="mt-4">
                  <Typography variant="subtitle2" className="mb-1">
                    Contact E-mail
                  </Typography>
                  <Input
                    name="contactEmail"
                    type="email"
                    placeholder="example@email.com"
                    value={values.contactEmail}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                </div>

                <div className="mt-4">
                  <Typography variant="subtitle2" className="mb-1">
                    Additional Notes
                  </Typography>
                  <textarea
                    name="notes"
                    placeholder="Any specific instructions for the transfer..."
                    value={values.notes}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className="w-full h-24 px-4 py-2 bg-input border rounded-lg resize-none"
                  />
                </div>
              </div>
            </section>

            {/* File Upload Section */}
            <section className="bg-[#FDFDFB] dark:bg-[#141517] border border-[#363638] rounded-xl p-6">
              <Typography variant="h6" className="mb-2">
                Upload Documentation (Optional)
              </Typography>
              <Typography
                variant="caption"
                className="text-[#949494] mb-4 block"
              >
                Proof of ownership or registry transfer intent
              </Typography>
              <FileUpload
                name="documentation"
                label="Proof of ownership or registry transfer intent"
                icon={certificate}
                helperText="Upload PDF, JPG (Max 10MB)"
              />
            </section>

            {/* Confirmation */}
            <div className="flex items-start gap-3">
              <input type="checkbox" className="mt-1.5 accent-tbase" />
              <Typography variant="body2">
                I confirm this asset will be permanently removed from
                circulation and this action cannot be reversed.
              </Typography>
            </div>

            {/* What Happens After */}
            <section className="bg-[#FDFDFB] dark:bg-[#141517] border border-[#363638] rounded-xl p-6">
              <Typography variant="h6" className="mb-6">
                What happens after withdrawal
              </Typography>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {tokenStatusList.map((item, index) => (
                  <div key={index} className="flex items-start gap-4">
                    <div className="rounded-full p-2 bg-[#C2A57B] dark:bg-white/80 shrink-0">
                      <div>{item.img}</div>
                    </div>
                    <div>
                      <Typography variant="subtitle2">{item.title}</Typography>
                      <Typography variant="caption" className="text-[#949494]">
                        {item.description}
                      </Typography>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Actions */}
            <div className="flex justify-between items-center">
              <div></div>
              <div className="flex gap-3">
                <Button variant="outline">Save as Draft</Button>
                <Button
                  variant="primary"
                  type="submit"
                  className="flex items-center gap-2"
                >
                  Withdraw Asset{" "}
                  <img src={arrow} alt="arrow" className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default WithdrawTokenizedCarbonCredit;
