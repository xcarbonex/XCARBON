import { Link } from "react-router-dom";
import logox from "@/assets/logoX.svg";
import certificate from "@/assets/certificate.svg";
import camera from "@/assets/camera.svg";
import { Input } from "@/components";
import clsx from "clsx";
import { FileUpload } from "@/components";
import Form from "@/components/Form";
import * as Yup from "yup";
import { DatePicker } from "@heroui/react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
const EnterpriseRepresentative = () => {
  const navigate = useNavigate();

  const initialValues = {
    entityName: "",
    dateOfBirth: "",
    nationality: "",
    companyRole: "",
    companyIdNumber: "",
    residentialAddress: "",
    linkedinUrl: "",
    isUBO: false,
    governmentId: null,
    selfieId: null,
    declarations: {
      PEP: false,   
      SanctionScreening: false,
      TAndC: false,
      Conformation: false,
    },
    option: "1", // Default to Yes
  };

  const inputFields = [
    {
      label: "Entity Name / Company Name",
      type: "text",
      name: "entityName",
      placeholder: "Company Name",
    },
    {
      label: "Date of Birth",
      type: "date",
      name: "dateOfBirth",
      placeholder: "Select Date",
    },
    {
      label: "Nationality ",
      type: "text",
      name: "nationality",
      placeholder: "Nationality",
    },
    {
      label: "Company Role",
      type: "text",
      name: "companyRole",
      placeholder: "eg CEO, Director, CFO ",
    },
  ];

  //   Declatarions Field
  const declarations = [
    {
      name: "PEP",
      label: "Are you a PEP (Politically Exposed Person)?",
      description:
        "A UBO is someone who ultimately owns or controls a customer and/or the person on whose behalf a transaction is being conducted.",
    },
    {
      name: "SanctionScreening",
      label: "I consent to Sanctions Screening",
      description:
        " understand and agree that my information will be screened against global sanctions lists as part of the verification process.",
    },

    {
      name: "TAndC",
      label: "I agree to the Terms and Conditions and Privacy Policy",
      description:
        "I have read and agree to the Terms and Conditions and  Privacy Policy.",
    },
    {
      name: "Confirmation",
      label: "I confirm that all information provided is accurate and complete",
      description:
        "I understand that providing false information may result in the rejection of my application and may have legal consequences.",
    },
  ];
  return (
    <>
      <Form
        initialValues={initialValues}
        onSubmit={(values, { setSubmitting, resetForm }) => {
          
          setSubmitting(false);
          navigate("/");
          resetForm();
          toast.success("Registration completed successfully!");
        }}
        validationSchema={Yup.object().shape({
          entityName: Yup.string().required("Entity Name is required"),
          dateOfBirth: Yup.date().required("Date of Birth is required"),
          nationality: Yup.string().required("Nationality is required"),
          companyRole: Yup.string().required("Company Role is required"),
          companyIdNumber: Yup.string().required("Company ID Number is required"),
          residentialAddress: Yup.string().required(
            "Residential Address is required"
          ),
          isUBO: Yup.boolean(),
          governmentId: Yup.mixed().nullable(), 
          selfieId: Yup.mixed().nullable(),
          declarations: Yup.object().shape({
            PEP: Yup.boolean(),
            SanctionScreening: Yup.boolean(),
            "T&C and Privacy Policy": Yup.boolean(),
            Conformation: Yup.boolean(),
          }),
        })}
      >
        {({
          values,
          handleChange,
          setFieldValue,
          handleBlur,
          errors,
          touched,
        }) => (
          <div className="grid grid-cols-2 gap-5">
            {inputFields.map((field, index) => (
              <div key={index} className="space-y-2 col-span-2 md:col-span-1">
                <label>{field.label}</label>
               <Input type={field.type}
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
              <label>Company ID Number</label>
              <Input
                name="companyIdNumber"
                type="text"
                placeholder="Company ID Number"
                value={values.companyIdNumber}
                  onChange={handleChange}
                  onBlur={handleBlur}
              // className="w-full mt-3 text-white px-3 py-3 bg-[#363638]/50 text-[14px] rounded-md focus:outline-none focus:ring-2 focus:ring-[#363638]"
              />
               {errors.companyIdNumber && touched.companyIdNumber && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.companyIdNumber}
                  </p>
                )}
            </div>

            <div className="col-span-2 space-y-2">
              <label>Residential Address</label>
              <textarea
                name="residentialAddress"
                type="text"
                value={values.residentialAddress}
                  onChange={handleChange}
                  onBlur={handleBlur}
                placeholder="Registered Office Address"
                className="w-full mt-3 bg-input border rounded-md  focus:ring-1 focus:ring-input px-3 py-3"
              />
               {errors.residentialAddress && touched.residentialAddress && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.residentialAddress}
                  </p>
                )}
            </div>

            <div className="col-span-2  space-y-2">
              <label>LinkedIn URL (optional)</label>
              <Input name="linkedinUrl" type="text" placeholder="LinkedIn URL"  value={values.linkedinUrl}
                  onChange={handleChange}
                  onBlur={handleBlur}/>
                   {errors.linkedinUrl && touched.linkedinUrl && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.linkedinUrl}
                  </p>
                )}
            </div>

            <div className="col-span-2 space-y-2">
              <h2>Are you a Beneficial Owner ?</h2>
              <div className="flex flex-col-2 gap-5">
                <label htmlFor="yes" className="flex items-center space-x-2">
                  <Input
                    id="yes"
                    type="radio"
                    name="option"
                    value="1"
                    checked={values.option === "1"}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    suffix={<span className="text-[#949494]">Yes</span>}
                    className="bg-transparent accent-tbase border-transparent shadow-none focus-within:ring-transparent focus-within:border-transparent focus-within:outline-transparent"
                  />
                </label>
                <label htmlFor="no" className="flex items-center space-x-2">
                  <Input
                    id="no"
                    type="radio"
                    name="option"
                    value="2"
                    checked={values.option === "2"}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    suffix={<span className="text-[#949494]">No</span>}
                    className="bg-transparent accent-tbase border-transparent px-0 shadow-none focus-within:ring-transparent focus-within:border-transparent focus-within:outline-transparent"
                  />
                </label>
              </div>
               {errors.option && touched.option && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.option}
                  </p>
                )}
            </div>

              <FileUpload
              name="governmentId"
              label="Upload a valid government-issued ID"
              icon={certificate}
              helperText="JPG (Max 10MB)"
            />
            <FileUpload
              name="selfieId"
              label="Upload a selfie holding your ID"
              icon={camera}
              helperText="JPG (Max 10MB)"
            />
         
            <div className="col-span-2 mt-10 bg-input space-y-3 rounded-xl p-10">
              <p className="text-lg md:text-2xl font-bold">Declarations</p>
              {declarations.map((item, index) => (
                <div key={index}>
                  <Input
                    type="checkbox"
                    name={item.name}
                    checked={values.declarations[item.name]}
                    onChange={e => {  
                      handleChange(e);
                      setFieldValue(`declarations.${item.name}`, e.target.checked);
                    }}
                    className="bg-transparent accent-tbase border-transparent px-0 shadow-none focus-within:ring-transparent focus-within:border-transparent focus-within:outline-transparent"
                    suffix={
                      <div className="ml-2">
                        <label className=" text-[14px] text-[#8996A9]">
                          {item.label}
                        </label>
                        <p
                          className={clsx("text-[9px] text-[#8996A9]", {
                            hidden: !item.description,
                          })}
                        >
                          {item.description}
                        </p>
                      </div>
                    }
                    required
                  />
                </div>
              ))}
            </div>

            <div className="col-span-2 mt-8">
              <button
                type="submit"
                className="w-full p-3 bg-btn rounded-lg text-text hover:drop-shadow"
              >
                Complete Registration
              </button>
            </div>
          </div>
        )}
      </Form>


    </>
  );
};

export default EnterpriseRepresentative;
