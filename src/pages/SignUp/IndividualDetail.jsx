
import certificate from "@/assets/certificate.svg";
import license from "@/assets/license.svg";
import { Input } from "@/components";
const IndividualDetail = () => {
  const inputFields = [
    {
      label: "Full Name (Per ID)",
      type: "text",
      placeholder: "Full Name",
    },
    {
      label: "Nationality",
      type: "text",
      placeholder: "Nationality (as per match ID)",
    },
    {
      label: "Date of Birth",
      type: "date",
      placeholder: "Select Date",
    },
    {
      label: "Country of Residence",
      type: "text",
      placeholder: "Residential Address",
    },
  ];

  return (
    <>
      <form>
        <div className="grid grid-cols-2 gap-3 md:gap-4">
          {inputFields.map((field, index) => (
            <div key={index} className="col-span-2 md:col-span-1 space-y-2">
              <label>{field.label}</label>
              <Input type={field.type} placeholder={field.placeholder} />
            </div>
          ))}

          <div className="col-span-2 space-y-2">
            <label>Mobile Number (with country code)</label>
            <div className="flex gap-3">
              <select className=" mt-3 bg-input border rounded-md  focus:ring-1 focus:ring-input px-3 py-3">
                <option value="">91</option>
                <option value="">92</option>
                <option value="">93</option>
                <option value="">95</option>
                <option value="">96 </option>
              </select>
              <input
                type="text"
                placeholder="Enter Mobile Number"
                className="w-full mt-3 bg-input border rounded-md  focus:ring-1 focus:ring-input px-3 py-3"
              />
            </div>
          </div>

          <div className="col-span-2 space-y-2">
            <label className="text-sm font-medium mb-1">
              Individual ID Number
            </label>
            <Input type="text" placeholder="Individual ID Number" />
          </div>

          <div className="col-span-2 space-y-2">
            <label className="text-sm font-medium mb-1">
              Residential Address
            </label>
            <textarea
              type="text"
              placeholder=" Residential Address"
              className="w-full mt-3 bg-input border rounded-md  focus:ring-1 focus:ring-input px-3 py-3"
            />
          </div>

          <div className="col-span-2 md:col-span-1">
            <label
              for="uploadFile1"
              class=" text-[#949494] font-semibold  rounded p-[30px] flex flex-col items-center justify-center cursor-pointer border-2 border-[#363638] border-dashed mx-auto"
            >
              <img src={certificate} alt="certificate" className="mb-[5px]" />
              <p className="text-center text-[10px]">
                Upload Passport or ID/Driver’s License
              </p>
              <input type="file" id="uploadFile1" class="hidden" />
            </label>
          </div>

          <div className="col-span-2 md:col-span-1">
            <label
              for="uploadFile2"
              class=" text-[#949494] h-full font-semibold  rounded p-[30px] flex flex-col items-center justify-center cursor-pointer border-2 border-[#363638] border-dashed mx-auto"
            >
              <img src={license} alt="license" />
              <p className="text-center text-[10px]">
                Selfie with ID usually required
              </p>
              <input type="file" id="uploadFile2" class="hidden" />
            </label>
          </div>

          <div className=" col-span-2 space-y-2">
            <p className=" text-lg md:text-2xl font-bold ">
              Agreements & Certifications
            </p>
            <div>
              <input
                type="checkbox"
                name="UBO"
                className="h-4 w-4 accent-tbase  border-gray-300 rounded"
              />
              <label className="ml-3 text-[14px] text-[#8996A9]  ">
                I accept the Platform Terms of Use and Data Privacy Policy
              </label>
            </div>
            <div>
              <input
                type="checkbox"
                name="UBO"
                className="h-4 w-4 accent-tbase border-gray-300 rounded"
              />
              <label className="ml-3 text-[14px] text-[#8996A9]  ">
                I agree to comply with the XCarbon Exchange Rulebook
              </label>
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

        {/* <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 w-[90%] m-auto mt-5"> */}

        {/* </div> */}

        
      </form>
    </>
  );
};

export default IndividualDetail;
