import certificate from "@/assets/certificate.svg";
import license from "@/assets/license.svg";
import { Input } from "@/components";
import Form from "@/components/Form";
import * as Yup from "yup";
import {DatePicker, Select, SelectItem} from "@heroui/react";
import {FileUpload} from "@/components";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const countryCodes = [
  '91', '1', '93', '95', '96',
  '44', '61', '81', '86', '49',
  '33', '39', '7', '34', '47',
  '90', '55', '62', '27', '82',
  '66', '971', '970', '880', '92', '98'
];
const IndividualDetail = () => {
  const navigate = useNavigate();
  const initialValues = {
    fullName: "",
    nationality: "",
    dateOfBirth: "",
    countryOfResidence: "",
    mobileCountryCode: "1",
    mobileNumber: "",
    idNumber: "",
    residentialAddress: "",
    certificate: null,
    license: null,
    acceptTerms: false,
    acceptRulebook: false,
  };

  // const validationSchema = Yup.object().shape({
  //   fullName: Yup.string().required("Full Name is required"),
  //   nationality: Yup.string().required("Nationality is required"),
  //   dateOfBirth: Yup.string().required("Date of Birth is required"),
  //   countryOfResidence: Yup.string().required(
  //     "Country of Residence is required"
  //   ),
  //   mobileCountryCode: Yup.string().required("Country Code is required"),
  //   mobileNumber: Yup.string().required("Mobile Number is required"),
  //   idNumber: Yup.string().required("Individual ID Number is required"),
  //   residentialAddress: Yup.string().required(
  //     "Residential Address is required"
  //   ),
  //   certificate: Yup.mixed().nullable(),
  //   license: Yup.mixed().nullable(),
  //   acceptTerms: Yup.boolean().oneOf(
  //     [true],
  //     "You must accept the Platform Terms of Use"
  //   ),
  //   acceptRulebook: Yup.boolean().oneOf(
  //     [true],
  //     "You must agree to comply with the Rulebook"
  //   ),
  // });

  const handleSubmit = (values, { setSubmitting, resetForm }) => {
    // setSubmitting(false);
              navigate("/");
              // resetForm();
              toast.success("Registration completed successfully!");
  };
  return (
    <>
      <Form
        initialValues={initialValues}
        onSubmit={handleSubmit}
      >
        {({
          values,
          handleChange,
          setFieldValue,
          handleBlur,
          errors,
          touched,
        }) => {
          return (
          <div className="grid grid-cols-2 gap-3 md:gap-4">
            {[
              {
                label: "Full Name (Per ID)",
                name: "fullName",
                type: "text",
                placeholder: "Full Name",
              },
              {
                label: "Nationality",
                name: "nationality",
                type: "text",
                placeholder: "Nationality (as per match ID)",
              },
              {
                label: "Date of Birth",
                name: "dateOfBirth",
                type: "date",
                placeholder: "Select Date",
              },
              {
                label: "Country of Residence",
                name: "countryOfResidence",
                type: "text",
                placeholder: "Residential Address",
              },
            ].map((field, index) => (
              <div key={index} className="col-span-2 md:col-span-1 space-y-2">
                <label>{field.label}</label>
               {/* {field.name !== "dateOfBirth" && */}
                 <Input
                   type={field.type}
                   name={field.name}
                   placeholder={field.placeholder}
                   value={values[field.name]}
                   onChange={handleChange}
                  onBlur={handleBlur}
                />
              

                {errors[field.name] && touched[field.name] && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors[field.name]}
                  </p>
                )}
              </div>
            ))}
            <div className="col-span-2 space-y-2">
              <label>Mobile Number (with country code)</label>
              <div className="flex gap-3">
                <Select name="mobileCountryCode" size="lg" className="w-1/6" radius="sm" defaultSelectedKeys={'1'} variant={'flat'} renderValue={(items) => `+${items[0]?.props?.value}`} onChange={(value) => setFieldValue("mobileCountryCode", value) }>
                  {countryCodes.map((code, index) => (
                    <SelectItem key={index} value={code}>
                      {code}
                    </SelectItem>
                  ))}
                </Select>

                <Input
                  type="text"
                  name="mobileNumber"
                  placeholder="Enter Mobile Number"
                  className="w-full mt-3 bg-input border rounded-md  focus:ring-1 focus:ring-input px-3 py-3"
                  value={values.mobileNumber}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
              </div>
              {errors.mobileCountryCode && touched.mobileCountryCode && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.mobileCountryCode}
                </p>
              )}
              {errors.mobileNumber && touched.mobileNumber && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.mobileNumber}
                </p>
              )}
            </div>
            <div className="col-span-2 space-y-2">
              <label className="text-sm font-medium mb-1">
                Individual ID Number
              </label>
              <Input
                type="text"
                name="idNumber"
                placeholder="Individual ID Number"
                value={values.idNumber}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {errors.idNumber && touched.idNumber && (
                <p className="text-red-500 text-sm mt-1">{errors.idNumber}</p>
              )}
            </div>
            <div className="col-span-2 space-y-2">
              <label className="text-sm font-medium mb-1">
                Residential Address
              </label>
              <textarea
                name="residentialAddress"
                type="text"
                placeholder=" Residential Address"
                className="w-full mt-3 bg-input border rounded-md  focus:ring-1 focus:ring-input px-3 py-3"
                value={values.residentialAddress}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {errors.residentialAddress && touched.residentialAddress && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.residentialAddress}
                </p>
              )}
            </div>
            <FileUpload
              name="certificate"
              label="Upload Passport or ID/Driver's License"
              icon={certificate}
              helperText="Upload PDF, JPG (Max 10MB)"
            />
            <FileUpload
              name="license"
              label="Selfie with ID usually required"
              icon={license}
              helperText="Upload PDF, JPG (Max 10MB)"
            />
            <div className=" col-span-2 space-y-2">
              <p className=" text-lg md:text-2xl font-bold ">
                Agreements & Certifications
              </p>
              <div>
                <input
                  type="checkbox"
                  name="acceptTerms"
                  checked={values.acceptTerms}
                  onBlur={handleBlur}
                  onChange={(e)=>setFieldValue("acceptTerms", e.target.checked)}
                  className="h-4 w-4 accent-tbase  border-gray-300 rounded"
                />
                <label className="ml-3 text-[14px] text-[#8996A9]  ">
                  I accept the Platform Terms of Use and Data Privacy Policy
                </label>
                {errors.acceptTerms && touched.acceptTerms && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.acceptTerms}
                  </p>
                )}
              </div>
              <div>
                <input
                  type="checkbox"
                  name="acceptRulebook"
                  checked={values.acceptRulebook}
                  onBlur={handleBlur}
                  onChange={(e)=>setFieldValue("acceptRulebook", e.target.checked)}
                  className="h-4 w-4 accent-tbase border-gray-300 rounded"
                />
                <label className="ml-3 text-[14px] text-[#8996A9]  ">
                  I agree to comply with the XCarbon Exchange Rulebook
                </label>
                {errors.acceptRulebook && touched.acceptRulebook && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.acceptRulebook}
                  </p>
                )}
              </div>
            </div>
            <div className="col-span-2">
              <button
                type="submit"
                className="bg-btn text-white px-6 py-[10px] w-full border border-solid rounded hover:bg-white hover:text-black transition duration-700"
              >
                Complete Registration
              </button>
            </div>
          </div>
        )}}
      </Form>
    </>
  );
};

export default IndividualDetail;
