import { Breadcrumb } from "@/components";
import { SelectField } from "@/components";
import { Input } from "@/components";
import { FaCcVisa } from "react-icons/fa";
import { FaCcMastercard } from "react-icons/fa6";
import { SiAmericanexpress } from "react-icons/si";
import QRCode from "react-qr-code";
import Qrcode from "../../../src/assets/qrcode.svg";
import caution from "../../../src/assets/caution.svg";
import React, { useState } from "react";
import { Table, Typography, Button } from "@/components";
import clsx from "clsx";
const breadcrumbItems = [
  { label: "Wallet", path: "/wallet" },
  { label: "Deposit", path: "/" },
];

const fiatDeposit = [
  {
    key: "SelectCurrency",
    label: "Select Currency",
    options: ["USD", "YEN ", "EURO ", "POUND"],
    placeholder: "USD - US Dollar",
  },
];

const cryptoDeposit = [
  {
    key: "Selectassest",
    label: "Select Asset",
    options: [
      "XCB - CarbonChain Token",
      "XCB - CarbonChain Token",
      "XCB - CarbonChain Token",
    ],
    placeholder: "XCB - CarbonChain Token",
  },
  {
    key: "network",
    label: "Network",
    options: ["Polygon Network", "Binance Smart Chain", "Ethereum"],
    placeholder: "Polygon Network",
  },
  {
    key: "depositAddress",
    label: "Your Deposit Address",
    placeholder: "0x7a8b9c1d2e3f4a5b6c7d8e9f0a1b2c3d4e5f6a7b",
  },
];
const deliveryColumns = [
  {
    accessorKey: "date",
    header: "Date",
  },
  {
    accessorKey: "asset",
    header: "Asset",
  },
  {
    accessorKey: "amount",
    header: "Amount",
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => (
      <p
        className={clsx("text-center max-w-20 py-1 px-2 rounded-full text-sm", {
          "bg-[#52886C] text-white": row.original.status === "On Track",
          "bg-[#D94F0B] text-white": row.original.status === "Pending",
          "bg-[#174954] text-white": row.original.status === "Delayed",
        })}
      >
        {row.original.status}
      </p>
    ),
  },
  {
    accessorKey: "transactionID",
    header: "Transaction ID",
  },
];

const deliveryData = [
  {
    date: "2024-04-15",
    asset: "Amazon Rainforest REDD+",
    amount: "10000",
    status: "Delayed",
    transactionID: "0x3a5f...e9d Tx",
  },
  {
    date: "2024-04-15",
    asset: "Amazon Rainforest REDD+",
    amount: "10000",
    status: "Pending",
    transactionID: "0x3a5f...e9d Tx",
  },
  {
    date: "2024-04-15",
    asset: "Amazon Rainforest REDD+",
    amount: "10000",
    status: "On Track",
    transactionID: "0x3a5f...e9d Tx",
  },
];

const index = () => {
  const [mockQRCodeData, setMockQRCodeData] = useState(
    "0x7a8b9c1d2e3f4a5b6c7d8e9f0a1b2c3d4e5f6a7b"
  );
  return (
    <>
      <Breadcrumb items={breadcrumbItems} />
      <div>
        <div className="space-y-6 text-black dark:text-[#FFFFFF]/80 ">
          <Typography
            variant="h4"
            className="border-b-2 border-[#363638] pb-[8px]"
          >
            Deposit 
          </Typography>

          <Typography variant="subtitle1">
            Manage your assets and transactions
          </Typography>
        </div>
        {/* Section 1  */}
        <div className="mt-5 grid grid-cols-2  gap-5">
          <div className="grid grid-cols-1 border dark:border-[#363638] rounded-xl p-5 shadow-xl">
            <Typography variant="subtitle1"> Deposit  Fiat</Typography>
            <div className="mt-5">
              {fiatDeposit.map((field) => (
                <div key={field.key} className="mt-5 grid">
                  <Typography variant="body2" className="pb-3">
                    {field.label}
                  </Typography>
                  <SelectField
                    options={field.options.map((option) => ({
                      label: option,
                      value: option,
                    }))}
                    placeholder={field.placeholder}
                    required
                  />
                </div>
              ))}
            </div>
            <div className="mt-5">
              <Typography variant="body2" className="pb-3">
                Amount
              </Typography>
              <Input
                placeholder="10000"
                type="number"
                prefix={<p className="text-[16px] text-[#949494]">$</p>}
                suffix={<p className="text-[16px] text-[#949494]">USD</p>}
              />
            </div>

            <div className="mt-5 space-y-5">
              <Typography variant="body2" className="pb-3">
                Payment Method
              </Typography>
              <Input
                type="radio"
                inputClassName={"self-start mt-1.5"}
                variant="fit"
                suffix={
                  <>
                    <div>
                      <p className="text-[16px] text-[#949494]">
                        Credit/Debit Card
                      </p>
                      <p className="text-[14px] text-[#949494]">
                        Visa, Mastercard, American Express
                      </p>
                      <div className="flex text-[28px] gap-3 mt-2 items-center">
                        <FaCcVisa className="text-[#1A1F71] dark:text-white" />
                        <FaCcMastercard className="text-[#D22A3F] dark:text-white" />
                        <SiAmericanexpress className="text-[#001166] dark:text-white" />
                      </div>
                    </div>
                  </>
                }
              />
              <Input
                type="radio"
                inputClassName={"self-start mt-1"}
                variant="fit"
                suffix={
                  <>
                    <div>
                      <p className="text-[16px] text-[#949494]">
                        Bank Transfer
                      </p>
                      <p className="text-[14px] text-[#949494]">
                        Direct bank deposit (ACH, SEPA, Wire)
                      </p>
                    </div>
                  </>
                }
              />
            </div>

            <div className="flex justify-center  mt-5">
              <button className=" w-[100%] py-2 px-8 dark:bg-[#3B3B3B] bg-[#C2A57B] text-white rounded-lg cursor-pointer">
                Continue To Deposit
              </button>
            </div>
          </div>

          {/* Deposit Crypto */}
          <div>
            <div className="grid grid-cols-1 border dark:border-[#363638] rounded-xl p-5 shadow-xl">
              <Typography variant="subtitle1"> Deposit Crypto</Typography>
              <div className="mt-5">
                {cryptoDeposit.map((field) => (
                  <div key={field.key} className="mt-5 grid">
                    <Typography variant="body2" className="pb-3">
                      {field.label}
                    </Typography>

                    {field.key === "depositAddress" ? (
                      // For Deposit Address
                      <Input
                        value={field.placeholder}
                        readOnly
                        className="bg-[#E2E6E5] text-[#949494] cursor-copy"
                      />
                    ) : (
                      // For normal Select
                      <SelectField
                        options={field.options.map((option) => ({
                          label: option,
                          value: option,
                        }))}
                        placeholder={field.placeholder}
                        required
                      />
                    )}
                  </div>
                ))}
              </div>

              <div className="mt-5 border p-10  dark:border-[#363638] rounded-xl space-y-6">
                <QRCode value={mockQRCodeData} size={150} className="mx-auto" />
                {/* <img src={Qrcode} alt="" className="m-auto" /> */}
                <p className="text-[12px] text-[#949494] text-center">
                  Scan this QR code to deposit
                </p>
              </div>

              <div className="flex gap-3 mt-5 items-center p-3 border border-[#FFA621] bg-[#E2E6E5] dark:bg-white/[8%] rounded-lg">
                <img src={caution} alt="caution" className="hidden sm:block" />
                <Typography variant="body2">
                  <strong>Important:</strong> Only send XCB or other supported
                  tokens on the Polygon network to this address. Sending
                  unsupported tokens may result in permanent loss.
                </Typography>
              </div>
            </div>
          </div>
        </div>

        <div className="grid mt-[20px] bg-secondary rounded-xl border shadow-lg p-5">
          <Table
            columns={deliveryColumns}
            data={deliveryData}
            title="Recent Deposits"
          />
        </div>
      </div>
    </>
  );
};

export default index;
