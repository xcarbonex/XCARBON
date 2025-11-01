import React, { useState } from "react";
import { Input, Typography, Breadcrumb, Card } from "@/components";
import info from "../../../src/assets/info.svg";
import { BsFillBox2Fill } from "react-icons/bs";
import { PiBagSimpleFill } from "react-icons/pi";
import { IoDocumentSharp, IoCheckmarkCircle, IoCartOutline, IoTrendingUpOutline } from "react-icons/io5";
import { FaHandshake, FaLeaf } from "react-icons/fa";
import { FaRobot } from "react-icons/fa";
import { LuNotebookPen } from "react-icons/lu";
import LineChart from "@/components/Chart/Line";

interface ContractTerm {
  duration: string;
  minCredits: string;
  pricePerCredit: string;
  discount: string;
}

interface Contract {
  icon: React.ReactElement;
  title: string;
  description: string;
}

interface Feature {
  icon: React.ReactElement;
  title: string;
  description: string;
}

interface BreadcrumbItem {
  label: string;
  path: string;
}

const ProjectDetail: React.FC = () => {
  const [pricePerCredit, setPricePerCredit] = useState<string>("");
  const [quantity, setQuantity] = useState<string>("");

  const parsedPrice = parseFloat(pricePerCredit);
  const parsedQuantity = parseFloat(quantity);
  const totalCost =
    !isNaN(parsedPrice) && !isNaN(parsedQuantity)
      ? (parsedPrice * parsedQuantity).toFixed(2)
      : "0.00";

  //   For the contract terms
  const contractTerms: ContractTerm[] = [
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

  const contracts: Contract[] = [
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

  const features: Feature[] = [
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

  const breadcrumbItems: BreadcrumbItem[] = [
    { label: "Dashboard", path: "/" },
    { label: "Product Detail(VCS-REDD+ Brazil Forest 2019)", path: "/" },
  ];
  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-neutral-50 via-white to-accent-50/30 dark:from-neutral-950 dark:via-neutral-900 dark:to-accent-950/20 p-6">
        <div className="max-w-7xl mx-auto space-y-6">
          <Breadcrumb items={breadcrumbItems} />
          
          {/* Premium Project Header Card */}
          <Card className="border-2 border-success-200 dark:border-success-800 shadow-xl">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-xl bg-gradient-to-br from-success-100 to-success-200 dark:from-success-900/30 dark:to-success-800/30 shadow-lg shadow-success-500/30">
                  <FaLeaf className="w-8 h-8 text-success-700 dark:text-success-400" />
                </div>
                <div>
                  <Typography variant="h4" className="text-neutral-900 dark:text-white font-bold">
                    VCS-REDD+ Brazil Forest 2019
                  </Typography>
                  <Typography variant="body2" className="text-neutral-600 dark:text-neutral-400">
                    Amazon Rainforest Conservation Project
                  </Typography>
                </div>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-success-100 to-success-200 dark:from-success-900/30 dark:to-success-800/30 border-2 border-success-300 dark:border-success-700">
                <IoCheckmarkCircle className="w-5 h-5 text-success-700 dark:text-success-400" />
                <span className="text-sm font-bold text-success-700 dark:text-success-400">Verified Registry</span>
              </div>
            </div>
          </Card>

          {/* Main Content Grid */}
          <div className="grid lg:grid-cols-3 gap-6">
            {/* Left Column - Project Details (2/3 width) */}
            <div className="lg:col-span-2 space-y-6">
              {/* Project Overview Card */}
              <Card className="border-2 border-info-200 dark:border-info-800 shadow-xl">
                <Typography variant="h5" className="text-neutral-900 dark:text-white font-bold mb-4">
                  Project Overview
                </Typography>
                <Typography variant="body1" className="text-neutral-700 dark:text-neutral-300 leading-relaxed">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras mattis purus odio,
                  eu fermentum metus porta eu. Nullam tincidunt dolor non vulputate pharetra.Lorem
                  ipsum dolor sit amet, consectetur adipiscing elit. Cras mattis purus odio, eu
                  fermentum metus porta eu. Nullam tincidunt dolor non vulputate pharetra.Lorem
                  ipsum dolor sit amet, consectetur adipiscing elit. Cras mattis purus odio, eu
                  fermentum metus porta eu. Nullam tincidunt dolor non vulputate pharetra.Lorem
                  ipsum dolor sit amet, consectetur adipiscing elit. Cras mattis purus odio, eu
                  fermentum metus porta eu. Nullam tincidunt dolor non vulputate pharetra.
                </Typography>
              </Card>

              {/* Premium Price History Card */}
              <Card className="border-2 border-brand-200 dark:border-brand-800 shadow-xl">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-xl bg-gradient-to-br from-brand-100 to-brand-200 dark:from-brand-900/30 dark:to-brand-800/30">
                      <IoTrendingUpOutline className="w-6 h-6 text-brand-700 dark:text-brand-400" />
                    </div>
                    <div>
                      <Typography variant="h6" className="text-neutral-900 dark:text-white font-bold">
                        Price History
                      </Typography>
                      <Typography variant="body2" className="text-neutral-600 dark:text-neutral-400 font-medium">
                        $18.75 per asset
                      </Typography>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button className="px-4 py-2 rounded-lg bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 font-medium hover:bg-neutral-200 dark:hover:bg-neutral-700 transition-colors">
                      Daily
                    </button>
                    <button className="px-4 py-2 rounded-lg bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 font-medium hover:bg-neutral-200 dark:hover:bg-neutral-700 transition-colors">
                      Weekly
                    </button>
                    <button className="px-4 py-2 rounded-lg bg-gradient-to-r from-brand-600 to-brand-700 text-white font-medium shadow-lg shadow-brand-600/30">
                      Annually
                    </button>
                  </div>
                </div>
                <LineChart />
              </Card>
            </div>

            {/* Right Column - Purchase Card (1/3 width) */}
            <div className="lg:col-span-1">
              <Card className="border-2 border-success-200 dark:border-success-800 shadow-xl sticky top-6">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-2">
                    <IoCartOutline className="w-6 h-6 text-success-700 dark:text-success-400" />
                    <div>
                      <Typography variant="subtitle2" className="text-neutral-600 dark:text-neutral-400">
                        Available Balance
                      </Typography>
                      <Typography variant="h6" className="text-neutral-900 dark:text-white font-bold">
                        $5,240.00 USD
                      </Typography>
                    </div>
                  </div>
                  <img src={info} alt="info" className="cursor-pointer w-5 h-5" />
                </div>

                <div className="space-y-4">
                  {/* Price per assets */}
                  <div>
                    <Typography variant="subtitle2" className="text-neutral-700 dark:text-neutral-300 font-medium mb-2">
                      Price per asset
                    </Typography>
                    <Input
                      type="Number"
                      prefix="$"
                      placeholder="Enter price"
                      value={pricePerCredit}
                      onChange={(e) => setPricePerCredit(e.target.value)}
                      suffix={
                        <span className="text-info-600 dark:text-info-400 font-medium text-sm">
                          Fixed Price
                        </span>
                      }
                      className="h-12"
                    />
                  </div>

                  {/* Quantity */}
                  <div>
                    <Typography variant="subtitle2" className="text-neutral-700 dark:text-neutral-300 font-medium mb-2">
                      Quantity
                    </Typography>
                    <Input
                      type="Number"
                      placeholder="Enter quantity"
                      value={quantity}
                      onChange={(e) => setQuantity(e.target.value)}
                      suffix={
                        <span className="text-neutral-500 dark:text-neutral-400 font-medium text-sm">
                          Assets
                        </span>
                      }
                      className="h-12"
                    />
                  </div>

                  {/* Total Cost */}
                  <div className="p-4 rounded-xl bg-gradient-to-br from-brand-50 to-accent-50 dark:from-brand-950/20 dark:to-accent-950/20 border-2 border-brand-200 dark:border-brand-800">
                    <Typography variant="subtitle2" className="text-neutral-700 dark:text-neutral-300 font-medium mb-2">
                      Total Cost
                    </Typography>
                    <Typography variant="h4" className="text-neutral-900 dark:text-white font-bold">
                      ${totalCost} USD
                    </Typography>
                  </div>

                  {/* Buy Button */}
                  <button className="w-full py-4 bg-gradient-to-r from-success-600 to-success-700 hover:from-success-700 hover:to-success-800 text-white text-lg font-bold rounded-xl shadow-lg shadow-success-600/40 hover:shadow-success-600/60 transition-all">
                    Buy Now
                  </button>

                  {/* Agreement Note */}
                  <Typography variant="caption" className="text-center text-neutral-600 dark:text-neutral-400 block">
                    By purchasing, you agree to our Terms of Service and Carbon Assets Policies
                  </Typography>
                </div>
              </Card>
            </div>
          </div>

          {/* Premium Contracts & Features Section */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* What are Monthly Contracts */}
            <Card className="border-2 border-info-200 dark:border-info-800 shadow-xl">
              <Typography variant="h6" className="text-neutral-900 dark:text-white font-bold mb-4">
                What are Monthly Contracts?
              </Typography>
              <Typography variant="body2" className="text-neutral-700 dark:text-neutral-300 leading-relaxed mb-6">
                Schedule recurring purchases of carbon assets with smart contract-based
                delivery. Perfect for organizations with ESG commitments and regular offsetting
                needs.
              </Typography>

              <div className="space-y-4">
                {contracts.map((item, index) => (
                  <div key={index} className="flex items-start gap-3 p-3 rounded-xl bg-gradient-to-r from-neutral-50 to-neutral-100 dark:from-neutral-800 dark:to-neutral-900">
                    <div className="p-2 rounded-lg bg-info-100 dark:bg-info-900/30 text-info-700 dark:text-info-400">
                      {item.icon}
                    </div>
                    <div>
                      <Typography variant="subtitle2" className="text-neutral-900 dark:text-white font-bold mb-1">
                        {item.title}
                      </Typography>
                      <Typography variant="caption" className="text-neutral-600 dark:text-neutral-400">
                        {item.description}
                      </Typography>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            {/* Available Contract Terms */}
            <Card className="border-2 border-warning-200 dark:border-warning-800 shadow-xl">
              <Typography variant="h6" className="text-neutral-900 dark:text-white font-bold mb-4">
                Available Contract Terms
              </Typography>
              
              <div className="space-y-3">
                {contractTerms.map((contract, index) => (
                  <div
                    key={index}
                    className="flex flex-col xs:flex-row justify-between gap-2 p-4 rounded-xl bg-gradient-to-r from-warning-50 to-warning-100 dark:from-warning-950/20 dark:to-warning-900/20 border border-warning-200 dark:border-warning-800"
                  >
                    <div>
                      <Typography variant="subtitle2" className="text-neutral-900 dark:text-white font-bold">
                        {contract.duration}
                      </Typography>
                      <Typography variant="caption" className="text-neutral-600 dark:text-neutral-400">
                        {contract.minCredits}
                      </Typography>
                    </div>
                    <div className="text-left xs:text-right">
                      <Typography variant="subtitle2" className="text-warning-700 dark:text-warning-400 font-bold">
                        {contract.pricePerCredit}
                      </Typography>
                      <Typography variant="caption" className="text-success-600 dark:text-success-400 font-medium">
                        {contract.discount}
                      </Typography>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            {/* Institutional Features */}
            <Card className="border-2 border-brand-200 dark:border-brand-800 shadow-xl">
              <Typography variant="h6" className="text-neutral-900 dark:text-white font-bold mb-4">
                Institutional Features
              </Typography>
              
              <div className="space-y-5">
                {features.map((feature, index) => (
                  <div key={index}>
                    <div className="flex items-center gap-3 mb-2">
                      <div className="p-2 rounded-lg bg-brand-100 dark:bg-brand-900/30 text-brand-700 dark:text-brand-400">
                        {feature.icon}
                      </div>
                      <Typography variant="subtitle2" className="text-neutral-900 dark:text-white font-bold">
                        {feature.title}
                      </Typography>
                    </div>
                    <Typography variant="caption" className="text-neutral-600 dark:text-neutral-400 leading-relaxed">
                      {feature.description}
                    </Typography>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProjectDetail;
