import { useState } from "react";
import { Link } from "react-router-dom";
// import logox from "@/assets/logoX.svg";
import certificate from "@/assets/certificate.svg";
import license from "@/assets/license.svg";
import Input from "@/components/Input";
import EnterpriseRepresentative from "./EnterpriseRepresentative";
import clsx from "clsx";

const Enterprise = () => {
  const [isrepresentative, setIsRepresentative] = useState(false);
    const [showRepresentative, setShowRepresentative] = useState(false);
  const inputFields = [
    {
      label: "Entity Name / Company Name",
      type: "text",
      placeholder: "Company Name",
    },
    {
      label: "Company Number",
      type: "text",
      placeholder: "Company Number",
    },
    {
      label: "Tax Number",
      type: "text",
      placeholder: "Tax Number",
    },
    {
      label: "Date of Incorporation",
      type: "date",
      placeholder: "Select Date",
    },
    {
      label: "Country of Incorporation",
      type: "text",
      placeholder: "Country of Incorporation",
    },
    {
      label: "Website URL",
      type: "url",
      placeholder: "Website URL",
    },
    {
      label: "Company Email",
      type: "email",
      placeholder: "Company Email",
    },
    {
      label: "Business Phone Number",
      type: "tel",
      placeholder: "Business Phone Number",
    },
  ];

    const handleNextClick = (e) => {    
        e.preventDefault();
            if (isrepresentative) {
        setShowRepresentative(true);  
            }
    }
  return (
    <>
      <form className={clsx('grid grid-cols-2 gap-3 md:gap-4', { hidden: showRepresentative })}>
        {/* <div className="grid grid-cols-1 sm:grid-cols-2 gap-4"> */}
          {inputFields.map((field, index) => (
            <div key={index} className="col-span-2 md:col-span-1 space-y-2">
              <label>{field.label}</label>
              <Input type={field.type} placeholder={field.placeholder} />
            </div>
          ))}

          <div className="col-span-2 md:col-span-1 space-y-2">
            <label>Business Type</label>
            <select className="w-full mt-3 bg-input border rounded-md  focus:ring-1 focus:ring-input px-3 py-3">
              <option value="">Select Business Type</option>
              <option value="LLC">LLC</option>
              <option value="Corporation">Corporation</option>
              <option value="Partnership">Partnership</option>
            </select>
          </div>

          <div className="col-span-2 md:col-span-1 space-y-2">
            <label>Industry Sector</label>
            <select className="w-full mt-3 bg-input border rounded-md  focus:ring-1 focus:ring-input px-3 py-3">
              <option value="">Select Industry Sector</option>
              <option value="Technology">Technology</option>
              <option value="Finance">Finance</option>
              <option value="Healthcare">Healthcare</option>
            </select>
          </div>

          <div className="col-span-2 space-y-2">
            <label>Registered Office Address</label>
            <textarea
              type="text"
              placeholder="Registered Office Address"
              className="w-full mt-3 bg-input border rounded-md  focus:ring-1 focus:ring-input px-3 py-3"
            />
          </div>
        {/* </div> */}

        {/* <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 w-[90%] m-auto mt-5"> */}
          <div className="col-span-2 md:col-span-1">
            <label
              for="uploadFile1"
              class=" text-[#949494] font-semibold  rounded p-[30px] flex flex-col items-center justify-center cursor-pointer border-2 border-[#363638] border-dashed mx-auto"
            >
              <img src={certificate} alt="certificate" className="mb-[5px]" />
              <p className="text-center">Certificate of Incorporation</p>
              <input type="file" id="uploadFile1" class="hidden" />
              <p class="text-[10px] font-medium text-[#949494] mt-2">
                (Including article of association)
              </p>
            </label>
          </div>

          <div className="col-span-2 md:col-span-1">
            <label
              for="uploadFile2"
              class=" text-[#949494] font-semibold h-full rounded p-[30px] flex flex-col items-center justify-center cursor-pointer border-2 border-[#363638] border-dashed mx-auto"
            >
              <img src={license} alt="license" />
              <p className="text-center">Company license</p>
              <input type="file" id="uploadFile2" class="hidden" />
              <p class="text-[10px] font-medium text-[#949494] mt-2">
                (Including article of association)
              </p>
            </label>
          </div>
        {/* </div> */}

        <div className="col-span-2">
          <p className=" text-lg md:text-2xl font-bold ">
            Representative Information
          </p>
          <div>
            <input
              type="checkbox"
              name="UBO"
              checked={isrepresentative}
              onChange={(e) => setIsRepresentative(e.target.checked)}
              className="h-4 w-4 accent-tbase  mt-3 border-gray-300 rounded"
            />
            <label className="ml-3 text-[14px] text-[#8996A9]  ">
              Are you a UBO (Ultimate Beneficial Owner) Person?
            </label>
          </div>
        </div>

          <button type='submit' onClick={handleNextClick} className="col-span-2 p-3 mt-10 bg-btn rounded-lg text-text hover:drop-shadow">
           { isrepresentative ? 'Next' : 'Complete Registration' }
          </button>
      </form>
      {showRepresentative && <EnterpriseRepresentative />}
    </>
  );
};

export default Enterprise;
