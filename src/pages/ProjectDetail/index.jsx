import React, { useState } from "react";
import { Input, Typography } from "@/components";
import info from "../../../src/assets/info.svg";
import { BsFillBox2Fill } from "react-icons/bs";
import { PiBagSimpleFill } from "react-icons/pi";
import { IoDocumentSharp } from "react-icons/io5";
import { FaHandshake } from "react-icons/fa";
import { FaRobot } from "react-icons/fa";
import { LuNotebookPen } from "react-icons/lu";
import LineChart from "@/components/Chart/Line";

const ProjectDetail = () => {
  const [pricePerCredit, setPricePerCredit] = useState("");
  const [quantity, setQuantity] = useState("");
 
  const parsedPrice = parseFloat(pricePerCredit);
  const parsedQuantity = parseFloat(quantity);
  const totalCost =
    !isNaN(parsedPrice) && !isNaN(parsedQuantity)
      ? (parsedPrice * parsedQuantity).toFixed(2)
      : "0.00";
 
  //   For the contract terms
  const contractTerms = [
    {
      duration: "3 Months",
      minCredits: "Min. 100 assets/month",
      pricePerCredit: "$18.50/assets",
      discount: "1.3% discount",
    },
    {
      duration: "6 Months",
      minCredits: "Min. 100 assets/months",
      pricePerCredit: "$18.25/assets",
      discount: "2.7% discount",
    },
    {
      duration: "12 Months",
      minCredits: "Min. 100 assets/months",
      pricePerCredit: "$18.80/assets",
      discount: "5.1% discount",
    },
    {
      duration: "Custom Term",
      minCredits: "Min. 100 assets/month",
      pricePerCredit: "Request Quote",
      discount: "Negotiable terms",
    },
  ];
 
  const contracts = [
    {
      icon: <BsFillBox2Fill />,
      title: "Scheduled Delivery",
      description: "Automatic monthly delivery of credits",
    },
    {
      icon: <PiBagSimpleFill />,
      title: "Price Stability",
      description: "Lock in prices for contract duration",
    },
    {
      icon: <IoDocumentSharp />,
      title: "Smart Contracts",
      description: "Automated settlement and verification",
    },
  ];
 
  const features = [
    {
      icon: <FaHandshake />,
      title: "Custom Deal Negotiation",
      description:
        "Negotiate volume-based pricing and custom delivery schedules tailored to your organization's needs",
    },
    {
      icon: <FaRobot />,
      title: "AI Compliance Validation",
      description:
        "Our AI system validates compliance requirements before finalizing deals ensuring regulatory alignment.",
    },
    {
      icon: <LuNotebookPen />,
      title: "Custom Deal Negotiation",
      description:
        "Securely sign and manage agreements with ours blockchain-based documents system.",
    },
  ];
 
  return (
    <>
      <div className="bg-white transition-all duration-slow dark:bg-[#141517]">
        <div className="space-y-5 text-black dark:text-[#FFFFFF]/80 ">
          {/* Row 1 */}
          <div className="w-full grid sm:flex items-start gap-3">
            {/* Col 1 */}
            <div className="w-full sm:w-7/12 dark:bg-[#191919] bg-[#FDFDFB] dark:border-[#363638] border rounded-xl p-4">
              <div>
                <Typography variant="h4" className="border-b-2 border-[#363638] pb-[20px]">
                  VCS-REDD+ Brazil Forest 2019
                </Typography>
              </div>
              <div className="mt-10">
                <Typography variant="h4">Project Overview</Typography>
                <Typography variant="body1" className="mt-5">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras
                  mattis purus odio, eu fermentum metus porta eu. Nullam
                  tincidunt dolor non vulputate pharetra.Lorem ipsum dolor sit
                  amet, consectetur adipiscing elit. Cras mattis purus odio, eu
                  fermentum metus porta eu. Nullam tincidunt dolor non vulputate
                  pharetra.Lorem ipsum dolor sit amet, consectetur adipiscing
                  elit. Cras mattis purus odio, eu fermentum metus porta eu.
                  Nullam tincidunt dolor non vulputate pharetra.Lorem ipsum
                  dolor sit amet, consectetur adipiscing elit. Cras mattis purus
                  odio, eu fermentum metus porta eu. Nullam tincidunt dolor non
                  vulputate pharetra.
                </Typography>
              </div>
              <div className="bg-transparent dark:bg-black p-2 rounded-xl mt-2">
                <div className="flex justify-between">
                  <div className="text-tbase">
                    <Typography variant="subtitle1" className="font-semibold">Price history</Typography>
                    <Typography variant="h5" className="text-[#bababa]">$18.75 per assets</Typography>
                  </div>
                  <div className="bg-tertiary text-white space-x-3 rounded-xl p-2">
                    <button className="p-2 dark:text-[#9291A5]">Daily</button>
                    <button className="p-2 dark:text-[#9291A5]">Weekly</button>
                    <button className="p-2 bg-[#4C6663] rounded-xl dark:bg-[#555556] text-white">Annually</button>
                  </div>
                </div>
                <LineChart/>
              </div>
            </div>
 
            {/* Col 2 */}
            <div className="w-full sm:w-5/12 dark:bg-[#191919] bg-[#FDFDFB] dark:border-[#363638] border rounded-xl p-4">
              <div className="flex items-center justify-between">
                <Typography variant="h5" className="font-bold">
                  Available Balance: <span>5,240.00</span> USD
                </Typography>
                <div>
                  <img src={info} alt="info" className="cursor-pointer" />
                </div>
              </div>
 
              <div className="grid gap-3">
                {/* Price per assets */}
                <div className="mt-5">
                  <Typography variant="subtitle1" className="font-bold">Price per assets</Typography>
                  <div className="mt-1">
                    <Input
                      type="Number"
                      prefix="$"
                      placeholder=""
                      value={pricePerCredit}
                      onChange={(e) => setPricePerCredit(e.target.value)}
                      suffix={
                        <Typography variant="body2" className="text-nowrap text-[#A2A4A2] font-medium">
                          Fixed Price
                        </Typography>
                      }
                    />
                  </div>
                </div>
 
                {/* Quantity */}
                <div className="mt-3">
                  <Typography variant="subtitle1" className="font-bold">Quantity</Typography>
                  <div className="mt-1">
                    <Input
                      type="Number"
                      placeholder="Quantity"
                      value={quantity}
                      onChange={(e) => setQuantity(e.target.value)}
                      suffix={
                        <Typography variant="body2" className="text-nowrap text-[#A2A4A2] font-medium">
                          Assets
                        </Typography>
                      }
                    />
                  </div>
                </div>
 
                {/* Total Cost */}
                <div className="mt-3">
                  <Typography variant="subtitle1" className="font-bold">Total Cost</Typography>
                  <div className="mt-1">
                    <Input
                      type="Number"
                      readOnly
                      value={totalCost}
                      prefix={<Typography variant="body2" className="text-nowrap font-bold">$</Typography>}
                      suffix={
                        <Typography variant="body2" className="text-nowrap text-[#A2A4A2] font-medium">
                          USD
                        </Typography>
                      }
                    />
                  </div>
                </div>
 
                {/* Buy Button */}
                <div className="w-full mt-3">
                  <button className="w-full text-[19px] text-center font-bold py-2 px-8 bg-btn text-text rounded-lg">
                    Buy Now
                  </button>
                </div>
 
                {/* Agreement Note */}
                <div className="mt-3">
                  <Typography variant="subtitle2" className="text-center">
                    By purchasing, you agree to our Terms of Service and Carbon
                    assets Policies
                  </Typography>
                </div>
              </div>
            </div>
          </div>
 
          {/* Row 2 */}
          <div className="dark:bg-[#191919] bg-[#FDFDFB] dark:border-[#363638] border rounded-xl p-4">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
              <div className="border border-[#363638] rounded-md p-4">
                {/* row 1 */}
                <div>
                  <Typography variant="h5" className="font-semibold">
                    What are Monthly contracts?
                  </Typography>
                  <Typography variant="body2" className="mt-5 font-medium">
                    Schedule recurring purchases of carbon assets with smart
                    contract-based delivery. Perfect for organizations with ESG
                    commitments and regular offsetting needs.
                  </Typography>
                </div>
 
                {/* row 2 */}
                <div className="mt-5">
                  <div className="flex flex-col gap-y-4">
                    {contracts.map((item, index) => (
                      <div key={index} className="flex items-center gap-x-2">
                        <div>{item.icon}</div>
                        <div>
                          <Typography variant="subtitle2" className="font-semibold">
                            {item.title}
                          </Typography>
                          <Typography variant="caption" className="font-medium">
                            {item.description}
                          </Typography>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="border border-[#363638] rounded-md p-4">
                <div className="grid gap-3">
                  <div>
                    <Typography variant="h5" className="font-semibold">
                      Available Contract Terms
                    </Typography>
                  </div>
                  <div className="">
                    {contractTerms.map((contract, index) => (
                      <div
                        key={index}
                        className="grid xs:flex justify-between border-[#363638] border rounded-md p-2 mt-3"
                      >
                        <div>
                          <Typography variant="subtitle2" className="font-semibold">
                            {contract.duration}
                          </Typography>
                          <Typography variant="caption" className="font-medium">
                            {contract.minCredits}
                          </Typography>
                        </div>
                        <div className="text-left xs:text-right">
                          <Typography variant="subtitle2" className="font-semibold">
                            {contract.pricePerCredit}
                          </Typography>
                          <Typography variant="caption" className="font-medium">
                            {contract.discount}
                          </Typography>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="border border-[#363638] rounded-md">
                <div className="grid gap-3 p-4">
                  <div></div>
                  <div>
                    <Typography variant="h5" className="font-semibold">
                      Institutional Features
                    </Typography>
                  </div>
                  <div className="mt-3">
                    {features.map((feature, index) => (
                      <div key={index} className="mt-5">
                        <div className="flex items-center gap-2">
                          <div>{feature.icon}</div>
                          <div>
                            <Typography variant="subtitle2" className="font-semibold">
                              {feature.title}
                            </Typography>
                          </div>
                        </div>
                        <Typography variant="caption" className="font-medium">
                          {feature.description}
                        </Typography>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
 
export default ProjectDetail;
 