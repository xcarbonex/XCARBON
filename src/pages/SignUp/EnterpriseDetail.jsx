import { useState } from "react";
import { Link } from "react-router-dom";
// import logox from "@/assets/logoX.svg";
import certificate from "@/assets/certificate.svg";
import license from "@/assets/license.svg";
import Input from "@/components/Input";
import EnterpriseRepresentative from "./EnterpriseRepresentative";
import clsx from "clsx";
import Form from "@/components/Form";
import * as Yup from 'yup';

const Enterprise = () => {
  const [isrepresentative, setIsRepresentative] = useState(false);
  const [showRepresentative, setShowRepresentative] = useState(false);

  const initialValues = {
    entityName: "",
    companyNumber: "",
    taxNumber: "",
    dateOfIncorporation: "",
    countryOfIncorporation: "",
    website: "",
    companyEmail: "",
    businessPhone: "",
    businessType: "",
    industrySector: "",
    officeAddress: "",
    certificate: null,
    license: null,
    isUBO: false,
  };

  const validationSchema = Yup.object().shape({
    entityName: Yup.string().required("Entity Name is required"),
    companyNumber: Yup.string().required("Company Number is required"),
    taxNumber: Yup.string().required("Tax Number is required"),
    dateOfIncorporation: Yup.string().required("Date of Incorporation is required"),
    countryOfIncorporation: Yup.string().required("Country of Incorporation is required"),
    website: Yup.string().url("Invalid URL").required("Website URL is required"),
    companyEmail: Yup.string().email("Invalid email address").required("Company Email is required"),
    businessPhone: Yup.string().required("Business Phone Number is required"),
    businessType: Yup.string().required("Business Type is required"),
    industrySector: Yup.string().required("Industry Sector is required"),
    officeAddress: Yup.string().required("Registered Office Address is required"),
    certificate: Yup.mixed().nullable(),
    license: Yup.mixed().nullable(),
    isUBO: Yup.boolean(),
  });

  const handleSubmit = (values, { setSubmitting }) => {
    if (isrepresentative) {
      setShowRepresentative(true);
    }
    setSubmitting(false);
  };

  return (
    <>
      <Form initialValues={initialValues} onSubmit={handleSubmit} validationSchema={validationSchema}>
        {({ values, handleChange, setFieldValue, handleBlur, handleSubmit, errors, touched }) => (
          <form className={clsx('grid grid-cols-2 gap-3 md:gap-4', { hidden: showRepresentative })} onSubmit={handleSubmit}>
            {[
              { label: "Entity Name / Company Name", name: "entityName", type: "text", placeholder: "Company Name" },
              { label: "Company Number", name: "companyNumber", type: "text", placeholder: "Company Number" },
              { label: "Tax Number", name: "taxNumber", type: "text", placeholder: "Tax Number" },
              { label: "Date of Incorporation", name: "dateOfIncorporation", type: "date", placeholder: "Select Date" },
              { label: "Country of Incorporation", name: "countryOfIncorporation", type: "text", placeholder: "Country of Incorporation" },
              { label: "Website URL", name: "website", type: "url", placeholder: "Website URL" },
              { label: "Company Email", name: "companyEmail", type: "email", placeholder: "Company Email" },
              { label: "Business Phone Number", name: "businessPhone", type: "tel", placeholder: "Business Phone Number" },
            ].map((field, index) => (
              <div key={index} className="col-span-2 md:col-span-1 space-y-2">
                <label>{field.label}</label>
                <Input
                  type={field.type}
                  name={field.name}
                  placeholder={field.placeholder}
                  value={values[field.name]}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors[field.name] && touched[field.name] && (
                  <p className="text-red-500 text-sm mt-1">{errors[field.name]}</p>
                )}
              </div>
            ))}
            <div className="col-span-2 md:col-span-1 space-y-2">
              <label>Business Type</label>
              <select
                name="businessType"
                className="w-full mt-3 bg-input border rounded-md  focus:ring-1 focus:ring-input px-3 py-3"
                value={values.businessType}
                onChange={handleChange}
                onBlur={handleBlur}
              >
                <option value="">Select Business Type</option>
                <option value="LLC">LLC</option>
                <option value="Corporation">Corporation</option>
                <option value="Partnership">Partnership</option>
              </select>
              {errors.businessType && touched.businessType && (
                <p className="text-red-500 text-sm mt-1">{errors.businessType}</p>
              )}
            </div>
            <div className="col-span-2 md:col-span-1 space-y-2">
              <label>Industry Sector</label>
              <select
                name="industrySector"
                className="w-full mt-3 bg-input border rounded-md  focus:ring-1 focus:ring-input px-3 py-3"
                value={values.industrySector}
                onChange={handleChange}
                onBlur={handleBlur}
              >
                <option value="">Select Industry Sector</option>
                <option value="Technology">Technology</option>
                <option value="Finance">Finance</option>
                <option value="Healthcare">Healthcare</option>
              </select>
              {errors.industrySector && touched.industrySector && (
                <p className="text-red-500 text-sm mt-1">{errors.industrySector}</p>
              )}
            </div>
            <div className="col-span-2 space-y-2">
              <label>Registered Office Address</label>
              <textarea
                name="officeAddress"
                type="text"
                placeholder="Registered Office Address"
                className="w-full mt-3 bg-input border rounded-md  focus:ring-1 focus:ring-input px-3 py-3"
                value={values.officeAddress}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {errors.officeAddress && touched.officeAddress && (
                <p className="text-red-500 text-sm mt-1">{errors.officeAddress}</p>
              )}
            </div>
            <div className="col-span-2 md:col-span-1">
              <label htmlFor="uploadFile1" className=" text-[#949494] font-semibold  rounded p-[30px] flex flex-col items-center justify-center cursor-pointer border-2 border-[#363638] border-dashed mx-auto">
                <img src={certificate} alt="certificate" className="mb-[5px]" />
                <p className="text-center">Certificate of Incorporation</p>
                <input
                  type="file"
                  id="uploadFile1"
                  name="certificate"
                  className="hidden"
                  onChange={e => setFieldValue('certificate', e.currentTarget.files[0])}
                />
                {errors.certificate && touched.certificate && (
                  <p className="text-red-500 text-sm mt-1">{errors.certificate}</p>
                )}
                <p className="text-[10px] font-medium text-[#949494] mt-2">(Including article of association)</p>
              </label>
            </div>
            <div className="col-span-2 md:col-span-1">
              <label htmlFor="uploadFile2" className=" text-[#949494] font-semibold h-full rounded p-[30px] flex flex-col items-center justify-center cursor-pointer border-2 border-[#363638] border-dashed mx-auto">
                <img src={license} alt="license" />
                <p className="text-center">Company license</p>
                <input
                  type="file"
                  id="uploadFile2"
                  name="license"
                  className="hidden"
                  onChange={e => setFieldValue('license', e.currentTarget.files[0])}
                />
                {errors.license && touched.license && (
                  <p className="text-red-500 text-sm mt-1">{errors.license}</p>
                )}
                <p className="text-[10px] font-medium text-[#949494] mt-2">(Including article of association)</p>
              </label>
            </div>
            <div className="col-span-2">
              <p className=" text-lg md:text-2xl font-bold ">Representative Information</p>
              <div>
                <input
                  type="checkbox"
                  name="isUBO"
                  checked={values.isUBO}
                  onChange={e => {
                    handleChange(e);
                    setIsRepresentative(e.target.checked);
                  }}
                  className="h-4 w-4 accent-tbase  mt-3 border-gray-300 rounded"
                />
                <label className="ml-3 text-[14px] text-[#8996A9]  ">
                  Are you a UBO (Ultimate Beneficial Owner) a0Person?
                </label>
                {errors.isUBO && touched.isUBO && (
                  <p className="text-red-500 text-sm mt-1">{errors.isUBO}</p>
                )}
              </div>
            </div>
            <button type='submit' className="col-span-2 p-3 mt-10 bg-btn rounded-lg text-text hover:drop-shadow">
              { values.isUBO ? 'Next' : 'Complete Registration' }
            </button>
          </form>
        )}
      </Form>
      {showRepresentative && <EnterpriseRepresentative />}
    </>
  );
};

export default Enterprise;
