import certificate from "@/assets/certificate.svg";
import license from "@/assets/license.svg";
import { Input } from "@/components";
import Form from "@/components/Form";
import * as Yup from 'yup';

const IndividualDetail = () => {
  const initialValues = {
    fullName: "",
    nationality: "",
    dateOfBirth: "",
    countryOfResidence: "",
    mobileCountryCode: "91",
    mobileNumber: "",
    idNumber: "",
    residentialAddress: "",
    certificate: null,
    license: null,
    acceptTerms: false,
    acceptRulebook: false,
  };

  const validationSchema = Yup.object().shape({
    fullName: Yup.string().required("Full Name is required"),
    nationality: Yup.string().required("Nationality is required"),
    dateOfBirth: Yup.string().required("Date of Birth is required"),
    countryOfResidence: Yup.string().required("Country of Residence is required"),
    mobileCountryCode: Yup.string().required("Country Code is required"),
    mobileNumber: Yup.string().required("Mobile Number is required"),
    idNumber: Yup.string().required("Individual ID Number is required"),
    residentialAddress: Yup.string().required("Residential Address is required"),
    certificate: Yup.mixed().nullable(),
    license: Yup.mixed().nullable(),
    acceptTerms: Yup.boolean().oneOf([true], "You must accept the Platform Terms of Use"),
    acceptRulebook: Yup.boolean().oneOf([true], "You must agree to comply with the Rulebook"),
  });

  const handleSubmit = (values, { setSubmitting }) => {
    // TODO: Implement registration logic
    setSubmitting(false);
  };
  return (
    <>
      <Form initialValues={initialValues} onSubmit={handleSubmit} validationSchema={validationSchema}>
        {({ values, handleChange, setFieldValue, handleBlur, handleSubmit, errors, touched }) => (
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-2 gap-3 md:gap-4">
              {[
                { label: "Full Name (Per ID)", name: "fullName", type: "text", placeholder: "Full Name" },
                { label: "Nationality", name: "nationality", type: "text", placeholder: "Nationality (as per match ID)" },
                { label: "Date of Birth", name: "dateOfBirth", type: "date", placeholder: "Select Date" },
                { label: "Country of Residence", name: "countryOfResidence", type: "text", placeholder: "Residential Address" },
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
              <div className="col-span-2 space-y-2">
                <label>Mobile Number (with country code)</label>
                <div className="flex gap-3">
                  <select
                    name="mobileCountryCode"
                    className=" mt-3 bg-input border rounded-md  focus:ring-1 focus:ring-input px-3 py-3"
                    value={values.mobileCountryCode}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  >
                    <option value="91">91</option>
                    <option value="92">92</option>
                    <option value="93">93</option>
                    <option value="95">95</option>
                    <option value="96">96</option>
                  </select>
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
                  <p className="text-red-500 text-sm mt-1">{errors.mobileCountryCode}</p>
                )}
                {errors.mobileNumber && touched.mobileNumber && (
                  <p className="text-red-500 text-sm mt-1">{errors.mobileNumber}</p>
                )}
              </div>
              <div className="col-span-2 space-y-2">
                <label className="text-sm font-medium mb-1">Individual ID Number</label>
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
                <label className="text-sm font-medium mb-1">Residential Address</label>
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
                  <p className="text-red-500 text-sm mt-1">{errors.residentialAddress}</p>
                )}
              </div>
              <div className="col-span-2 md:col-span-1">
                <label htmlFor="uploadFile1" className=" text-[#949494] font-semibold  rounded p-[30px] flex flex-col items-center justify-center cursor-pointer border-2 border-[#363638] border-dashed mx-auto">
                  <img src={certificate} alt="certificate" className="mb-[5px]" />
                  <p className="text-center text-[10px]">Upload Passport or ID/Driver's License</p>
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
                </label>
              </div>
              <div className="col-span-2 md:col-span-1">
                <label htmlFor="uploadFile2" className=" text-[#949494] h-full font-semibold  rounded p-[30px] flex flex-col items-center justify-center cursor-pointer border-2 border-[#363638] border-dashed mx-auto">
                  <img src={license} alt="license" />
                  <p className="text-center text-[10px]">Selfie with ID usually required</p>
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
                </label>
              </div>
              <div className=" col-span-2 space-y-2">
                <p className=" text-lg md:text-2xl font-bold ">Agreements & Certifications</p>
                <div>
                  <input
                    type="checkbox"
                    name="acceptTerms"
                    checked={values.acceptTerms}
                    onChange={handleChange}
                    className="h-4 w-4 accent-tbase  border-gray-300 rounded"
                  />
                  <label className="ml-3 text-[14px] text-[#8996A9]  ">
                    I accept the Platform Terms of Use and Data Privacy Policy
                  </label>
                  {errors.acceptTerms && touched.acceptTerms && (
                    <p className="text-red-500 text-sm mt-1">{errors.acceptTerms}</p>
                  )}
                </div>
                <div>
                  <input
                    type="checkbox"
                    name="acceptRulebook"
                    checked={values.acceptRulebook}
                    onChange={handleChange}
                    className="h-4 w-4 accent-tbase border-gray-300 rounded"
                  />
                  <label className="ml-3 text-[14px] text-[#8996A9]  ">
                    I agree to comply with the XCarbon Exchange Rulebook
                  </label>
                  {errors.acceptRulebook && touched.acceptRulebook && (
                    <p className="text-red-500 text-sm mt-1">{errors.acceptRulebook}</p>
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
          </form>
        )}
      </Form>
    </>
  );
};

export default IndividualDetail;
