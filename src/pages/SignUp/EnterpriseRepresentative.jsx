import { Link } from "react-router-dom";
import logox from "@/assets/logoX.svg";
import certificate from "@/assets/certificate.svg";
import camera from "@/assets/camera.svg";
import { Input } from "@/components";
import clsx from "clsx";

const EnterpriseRepresentative = () => {
  // Fields Information
  const inputFields = [
    {
      label: "Entity Name / Company Name",
      type: "text",
      placeholder: "Company Name",
    },
    {
      label: "Date of Birth",
      type: "date",
      placeholder: "Select Date",
    },
    {
      label: "Nationality ",
      type: "text",
      placeholder: "Nationality",
    },
    {
      label: "Company Role",
      type: "text",
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
      name: "T&C and Privacy Policy  ",
      label: "I agree to the Terms and Conditions and Privacy Policy",
      description:
        "I have read and agree to the Terms and Conditions and  Privacy Policy.",
    },
    {
      name: "Conformation",
      label: "I confirm that all information provided is accurate and complete",
      description:
        "I understand that providing false information may result in the rejection of my application and may have legal consequences.",
    },
  ];
  return (
    <>
      <form className="grid grid-cols-2 gap-4">
        {inputFields.map((field, index) => (
          <div key={index} className="space-y-2 col-span-2 md:col-span-1">
            <label>{field.label}</label>
            <Input type={field.type} placeholder={field.placeholder} />
          </div>
        ))}

        <div className="col-span-2 space-y-2">
          <label>Company ID Number</label>
          <Input
            type="text"
            placeholder="Company ID Number"
            // className="w-full mt-3 text-white px-3 py-3 bg-[#363638]/50 text-[14px] rounded-md focus:outline-none focus:ring-2 focus:ring-[#363638]"
          />
        </div>

        <div className="col-span-2 space-y-2">
          <label>Residential Address</label>
          <textarea
            type="text"
            placeholder="Registered Office Address"
            className="w-full mt-3 bg-input border rounded-md  focus:ring-1 focus:ring-input px-3 py-3"
          />
        </div>

        <div className="col-span-2  space-y-2">
          <label>LinkedIn URL (optional)</label>
          <Input type="text" placeholder="Company ID Number" />
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
                suffix={<span className="text-[#949494]">No</span>}
                className="bg-transparent accent-tbase border-transparent px-0 shadow-none focus-within:ring-transparent focus-within:border-transparent focus-within:outline-transparent"
              />
            </label>
          </div>
        </div>

        <div className="col-span-2 md:col-span-1 h-full">
          <label
            for="uploadFile3"
            class=" text-[#949494] font-semibold  rounded p-[37px] h-full flex flex-col items-center justify-center cursor-pointer border-2 border-[#363638] border-dashed mx-auto"
          >
            <img src={certificate} alt="certificate" className="mb-[5px]" />
            <p className="text-center">Upload a valid government-issued ID</p>
            <input type="file" id="uploadFile3" class="hidden" />
            <p class="text-[10px] font-medium text-[#949494] mt-2">
              (Passport, ID card, or Driver's License)
            </p>
          </label>
        </div>

        <div className="col-span-2 md:col-span-1 h-full">
          <label
            for="uploadFile4"
            class=" text-[#949494] font-semibold  rounded p-[37px] h-full  flex flex-col items-center justify-center cursor-pointer border-2 border-[#363638] border-dashed mx-auto"
          >
            <img src={camera} alt="license" />
            <p className="text-center">Upload a selfie holding your ID</p>
            <input type="file" id="uploadFile4" class="hidden" />
            <p class="text-[10px] text-center font-medium text-[#949494] mt-2">
              (Make sure your face and ID are clearly visible)
            </p>
          </label>
        </div>

        <div className="col-span-2 mt-10 bg-input space-y-3 rounded-xl p-10">
          <p className="text-lg md:text-2xl font-bold">Declarations</p>
          {declarations.map((item, index) => (
            <div key={index}>
              <Input
                type="checkbox"
                name={item.name}
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
      </form>
    </>
  );
};

export default EnterpriseRepresentative;
