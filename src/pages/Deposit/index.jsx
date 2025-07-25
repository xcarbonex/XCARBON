import React, { useState } from "react";
import { Formik, Form as FormikForm } from "formik";
import * as Yup from "yup";
import {
  Breadcrumb,
  SelectField,
  Input,
  Typography,
  Button,
  Table,
} from "@/components";
import { FaCcVisa, FaCcMastercard } from "react-icons/fa";
import { SiAmericanexpress } from "react-icons/si";
import QRCode from "react-qr-code";
import caution from "../../assets/caution.svg";
import clsx from "clsx";
import Form from "@/components/Form";
import { FaRegCopy } from "react-icons/fa6";

const breadcrumbItems = [
  { label: "Wallet", path: "/wallet" },
  { label: "Deposit", path: "/deposit" },
];

// Form configuration
const FIAT_CURRENCIES = [
  { label: "USD - US Dollar", value: "USD" },
  { label: "EUR - Euro", value: "EUR" },
  { label: "GBP - British Pound", value: "GBP" },
  { label: "JPY - Japanese Yen", value: "JPY" },
];

const CRYPTO_ASSETS = [
  { label: "XCB - CarbonChain Token", value: "XCB" },
  { label: "BTC - Bitcoin", value: "BTC" },
  { label: "ETH - Ethereum", value: "ETH" },
];

const NETWORKS = [
  { label: "Polygon Network", value: "polygon" },
  { label: "Binance Smart Chain", value: "bsc" },
  { label: "Ethereum", value: "ethereum" },
];

const PAYMENT_METHODS = {
  CARD: "card",
  BANK: "bank",
};

// Validation schemas
const fiatDepositSchema = Yup.object().shape({
  currency: Yup.string().required("Currency is required"),
  amount: Yup.number()
    .required("Amount is required")
    .positive("Amount must be positive")
    .min(10, "Minimum deposit amount is $10"),
  paymentMethod: Yup.string()
    .required("Payment method is required")
    .oneOf(
      [PAYMENT_METHODS.CARD, PAYMENT_METHODS.BANK],
      "Invalid payment method"
    ),
});

const cryptoDepositSchema = Yup.object().shape({
  asset: Yup.string().required("Asset is required"),
  network: Yup.string().required("Network is required"),
});

// Table configuration
const depositHistoryColumns = [
  {
    accessorKey: "date",
    header: "Date",
    cell: ({ row }) => new Date(row.original.date).toLocaleDateString(),
  },
  {
    accessorKey: "asset",
    header: "Asset",
  },
  {
    accessorKey: "amount",
    header: "Amount",
    cell: ({ row }) =>
      `${row.original.amount} ${row.original.currency || row.original.asset}`,
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => (
      <span
        className={clsx("px-2 py-1 rounded-full text-xs font-medium", {
          "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200":
            row.original.status === "Completed",
          "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200":
            row.original.status === "Pending",
          "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200":
            row.original.status === "Failed",
        })}
      >
        {row.original.status}
      </span>
    ),
  },
  {
    accessorKey: "transactionId",
    header: "Transaction ID",
    cell: ({ row }) => (
      <span className="font-mono text-sm">{row.original.transactionId}</span>
    ),
  },
];

// Mock data - in real app, this would come from API
const mockDepositHistory = [
  {
    id: 1,
    date: "2024-04-15T10:30:00Z",
    asset: "XCB",
    amount: 1000,
    status: "Completed",
    transactionId: "0x3a5f...e9d2",
  },
  {
    id: 2,
    date: "2024-04-14T15:45:00Z",
    asset: "USD",
    amount: 500,
    currency: "USD",
    status: "Pending",
    transactionId: "0x7b2c...f4a8",
  },
  {
    id: 3,
    date: "2024-04-13T09:15:00Z",
    asset: "ETH",
    amount: 0.5,
    status: "Failed",
    transactionId: "0x9d4e...c1b7",
  },
];

const Deposit = () => {
  const [depositAddress] = useState(
    "0x7a8b9c1d2e3f4a5b6c7d8e9f0a1b2c3d4e5f6a7b"
  );
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Initial form values
  const fiatInitialValues = {
    currency: "",
    amount: "",
    paymentMethod: "",
  };

  const cryptoInitialValues = {
    asset: "",
    network: "",
  };

  // Form handlers
  const handleFiatDeposit = async (values, { setSubmitting, resetForm }) => {
    try {
      setIsSubmitting(true);
      // console.log("Fiat deposit:", values);

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Handle success (redirect to payment processor, show success message, etc.)
      alert("Redirecting to payment processor...");
      resetForm();
    } catch (error) {
      console.error("Fiat deposit error:", error);
      alert("Deposit failed. Please try again.");
    } finally {
      setIsSubmitting(false);
      setSubmitting(false);
    }
  };

  const handleCryptoDeposit = async (values, { setSubmitting }) => {
    try {
      setIsSubmitting(true);
      // console.log("Crypto deposit:", values);

      // Simulate API call to generate deposit address
      await new Promise((resolve) => setTimeout(resolve, 1000));

      alert(
        "Deposit address generated. Please send your crypto to the displayed address."
      );
    } catch (error) {
      console.error("Crypto deposit error:", error);
      alert("Failed to generate deposit address. Please try again.");
    } finally {
      setIsSubmitting(false);
      setSubmitting(false);
    }
  };

  const copyToClipboard = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      alert("Address copied to clipboard!");
    } catch (error) {
      console.error("Failed to copy:", error);
      alert("Failed to copy address");
    }
  };

  return (
    <div className="space-y-6">
      <Breadcrumb items={breadcrumbItems} />

      {/* Header */}
      <div className="border-b-2 border-border pb-4">
        <Typography variant="h4" className="mb-2">
          Deposit
        </Typography>
        <Typography variant="body1" className="text-muted-foreground">
          Add funds to your wallet using fiat currency or cryptocurrency
        </Typography>
      </div>

      {/* Deposit Forms */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Fiat Deposit */}
        <div className="border border-border rounded-xl p-6 bg-card">
          <Typography variant="h6">Deposit Fiat Currency</Typography>
          <hr className="my-3" />
          <Form
            initialValues={fiatInitialValues}
            validationSchema={fiatDepositSchema}
            onSubmit={handleFiatDeposit}
          >
            {({
              values,
              errors,
              touched,
              setFieldValue,
              isSubmitting: formSubmitting,
            }) => (
              <FormikForm className="space-y-6">
                {/* Currency Selection */}
                <div>
                  <Typography variant="body2" className="mb-2">
                    Select Currency *
                  </Typography>
                  <SelectField
                    options={FIAT_CURRENCIES}
                    value={FIAT_CURRENCIES.find(
                      (option) => option.value === values.currency
                    )}
                    onChange={(selectedOption) =>
                      setFieldValue("currency", selectedOption?.value || "")
                    }
                    placeholder="Select currency"
                    isClearable
                  />
                  {touched.currency && errors.currency && (
                    <Typography
                      variant="caption"
                      className="text-destructive mt-1"
                    >
                      {errors.currency}
                    </Typography>
                  )}
                </div>

                {/* Amount */}
                <div>
                  <Typography variant="body2" className="mb-2">
                    Amount *
                  </Typography>
                  <Input
                    name="amount"
                    type="number"
                    placeholder="Enter amount"
                    prefix={<span className="text-tbase">$</span>}
                    suffix={
                      <span className="text-tbase">
                        {values.currency || "USD"}
                      </span>
                    }
                  />
                  {touched.amount && errors.amount && (
                    <Typography
                      variant="caption"
                      className="text-destructive mt-1"
                    >
                      {errors.amount}
                    </Typography>
                  )}
                </div>

                {/* Payment Method */}
                <div>
                  <Typography variant="body2" className="mb-4">
                    Payment Method *
                  </Typography>

                  <div className="space-y-3">
                    <label className="flex items-start py-4 border border-border rounded-lg cursor-pointer bg-input ">
                      <Input
                        type="radio"
                        name="paymentMethod"
                        width="fit"
                        value={PAYMENT_METHODS.CARD}
                        className="bg-transparent accent-tbase border-transparent shadow-none focus-within:ring-transparent focus-within:border-transparent focus-within:outline-transparent"
                        inputClassName="self-start mt-1"
                      />
                      <div className="flex-1">
                        <Typography
                          variant="body2"
                          className="font-medium mb-1"
                        >
                          Credit/Debit Card
                        </Typography>
                        <Typography
                          variant="caption"
                          className="text-muted-foreground mb-2"
                        >
                          Visa, Mastercard, American Express
                        </Typography>
                        <div className="flex gap-2 text-2xl">
                          <FaCcVisa className="text-blue-600" />
                          <FaCcMastercard className="text-red-600" />
                          <SiAmericanexpress className="text-blue-800" />
                        </div>
                      </div>
                    </label>

                    <label className="flex items-start py-4 border border-border rounded-lg cursor-pointer bg-input">
                      <Input
                        type="radio"
                        name="paymentMethod"
                        value={PAYMENT_METHODS.BANK}
                        width="fit"
                        inputClassName={"self-start mt-1"}
                        className="bg-transparent accent-tbase border-transparent shadow-none focus-within:ring-transparent focus-within:border-transparent focus-within:outline-transparent"
                      />
                      <div>
                        <Typography
                          variant="body2"
                          className="font-medium mb-1"
                        >
                          Bank Transfer
                        </Typography>
                        <Typography
                          variant="caption"
                          className="text-muted-foreground"
                        >
                          Direct bank deposit (ACH, SEPA, Wire)
                        </Typography>
                      </div>
                    </label>
                  </div>
                  {touched.paymentMethod && errors.paymentMethod && (
                    <Typography
                      variant="caption"
                      className="text-destructive mt-1"
                    >
                      {errors.paymentMethod}
                    </Typography>
                  )}
                </div>

                <Button
                  type="submit"
                  variant="primary"
                  fullWidth
                  disabled={formSubmitting || isSubmitting}
                  className="mt-6"
                >
                  {formSubmitting || isSubmitting
                    ? "Processing..."
                    : "Continue to Payment"}
                </Button>
              </FormikForm>
            )}
          </Form>
        </div>

        {/* Crypto Deposit */}
        <div className="border border-border rounded-xl p-6 bg-card">
          <Typography variant="h6">Deposit Cryptocurrency</Typography>
          <hr className="my-3" />
          <Form
            initialValues={cryptoInitialValues}
            validationSchema={cryptoDepositSchema}
            onSubmit={handleCryptoDeposit}
          >
            {({
              values,
              errors,
              touched,
              setFieldValue,
              isSubmitting: formSubmitting,
            }) => (
              <FormikForm className="space-y-6">
                {/* Asset Selection */}
                <div>
                  <Typography variant="body2" className="mb-2">
                    Select Asset *
                  </Typography>
                  <SelectField
                    options={CRYPTO_ASSETS}
                    value={CRYPTO_ASSETS.find(
                      (option) => option.value === values.asset
                    )}
                    onChange={(selectedOption) =>
                      setFieldValue("asset", selectedOption?.value || "")
                    }
                    placeholder="Select cryptocurrency"
                    isClearable
                  />
                  {touched.asset && errors.asset && (
                    <Typography
                      variant="caption"
                      className="text-destructive mt-1"
                    >
                      {errors.asset}
                    </Typography>
                  )}
                </div>

                {/* Network Selection */}
                <div>
                  <Typography variant="body2" className="mb-2">
                    Network *
                  </Typography>
                  <SelectField
                    options={NETWORKS}
                    value={NETWORKS.find(
                      (option) => option.value === values.network
                    )}
                    onChange={(selectedOption) =>
                      setFieldValue("network", selectedOption?.value || "")
                    }
                    placeholder="Select network"
                    isClearable
                  />
                  {touched.network && errors.network && (
                    <Typography
                      variant="caption"
                      className="text-destructive mt-1"
                    >
                      {errors.network}
                    </Typography>
                  )}
                </div>

                {/* Deposit Address */}
                {values.asset && values.network && (
                  <>
                    <div>
                      <Typography variant="body2" className="mb-2">
                        Your Deposit Address
                      </Typography>
                      <Input
                        value={depositAddress}
                        disabled
                        title="Click to copy address"
                        suffix={
                          <FaRegCopy
                            className="cursor-pointer text-muted-foreground"
                            onClick={() => copyToClipboard(depositAddress)}
                          />
                        }
                      />
                    </div>

                    {/* QR Code */}
                    <div className="border border-border rounded-md p-8 text-center">
                      <QRCode
                        value={depositAddress}
                        size={150}
                        className="mx-auto mb-4"
                      />
                      <Typography
                        variant="caption"
                        className="text-muted-foreground"
                      >
                        Scan this QR code to deposit {values.asset}
                      </Typography>
                    </div>

                    {/* Warning */}
                    <div className="flex gap-3 p-4 border border-warning bg-warning/10 rounded-lg">
                      <img
                        src={caution}
                        alt="Warning"
                        className="w-5 h-5 mt-0.5 flex-shrink-0"
                      />
                      <div>
                        <Typography variant="body2">
                          <strong>Important:</strong> Only send {values.asset}{" "}
                          tokens on the{" "}
                          {
                            NETWORKS.find((n) => n.value === values.network)
                              ?.label
                          }{" "}
                          to this address. Sending unsupported tokens or using
                          the wrong network may result in permanent loss of
                          funds.
                        </Typography>
                      </div>
                    </div>
                  </>
                )}

                <Button
                  type="submit"
                  variant="secondary"
                  fullWidth
                  disabled={
                    !values.asset ||
                    !values.network ||
                    formSubmitting ||
                    isSubmitting
                  }
                  className="mt-6"
                >
                  {formSubmitting || isSubmitting
                    ? "Generating..."
                    : "Generate Deposit Address"}
                </Button>
              </FormikForm>
            )}
          </Form>
        </div>
      </div>

      {/* Deposit History */}
      <div className="border border-border rounded-xl p-6 bg-card">
        <Table
          columns={depositHistoryColumns}
          data={mockDepositHistory}
          title="Recent Deposits"
        />
      </div>
    </div>
  );
};

export default Deposit;
