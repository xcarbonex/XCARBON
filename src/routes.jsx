import {createBrowserRouter} from "react-router-dom";
import {
  Dashboard,
  Settings,
  Portfolio,
  Wallet,
  Deposit,
  Membership,
  Login,
  SignUp,
  Logout,
  Help,
  ListTokenizedAssets,
  CarbonCreditAssetsFromRegistry,
  WalletInfoScreen,
  MarketPlaceAssets,
  ProjectDetail,
  CarbonCreditTokenization,
  ForgotPassword,
  ResetPassword,
  MintCarbonCreditsSummary,
} from "./pages";
import NotificationsPage from "./pages/Notifications";
import NotificationDetail from "./pages/Notifications/NotificationDetail";
import TestError from "@/pages/TestError";
import Layout from "@/components/AppLayout";
import WithdrawTokenizedCarbonCredit from "./pages/Wallet/WithdrawTokenizedCarbonCredit";
import ErrorBoundary from "@/components/ErrorBoundary";
import NotFound from "@/pages/NotFound";
import TwoFactorAuth from "./pages/TwoFactorAuth";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <ErrorBoundary />,
    children: [
      {
        path: "",
        element: <Dashboard />,
        children: [
          {
            path: "",
            element: <MarketPlaceAssets />,
          },
          {
            path: "project-detail/:assets-id",
            element: <ProjectDetail />,
          },
        ],
      },
      {
        path: "portfolio",
        element: <Portfolio />,
      },
      {
        path: "wallet",
        element: <Wallet />,
        children: [
          {
            path: "",
            element: <WalletInfoScreen />,
          },
          {
            path: "deposit",
            element: <Deposit />,
          },
          {
            path: "withdraw-tokenized-carbon-credit",
            element: <WithdrawTokenizedCarbonCredit />,
          },
        ],
      },
      {
        path: "membership",
        element: <Membership />,
      },
      {
        path: "settings",
        element: <Settings />,
      },
      {
        path: "help",
        element: <Help />,
      },
      {
        path: "logout",
        element: <Logout />,
      },
      {
        path: "notifications",
        element: <NotificationsPage />,
      },
      {
        path: "notifications/:id",
        element: <NotificationDetail />,
      },
      {
        path: "carbon-credit-registry",
        element: <CarbonCreditAssetsFromRegistry />,
        children: [
          {
            path: "carbon-credit-registry",
            element: <CarbonCreditAssetsFromRegistry />,
          },
        ],
      },
      {
        path: "list-tokenized-assets",
        element: <ListTokenizedAssets />,
      },
      {
        path: "carbon-credit-tokenization",
        element: <CarbonCreditTokenization />,
      },
      {
        path: "MintCarbonCreditsSummary",
        element: <MintCarbonCreditsSummary />,
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
    errorElement: <ErrorBoundary />,
  },
  {
    path: "/forgot-password",
    element: <ForgotPassword />,
    errorElement: <ErrorBoundary />,
  },
  {
    path: "/reset-password",
    element: <ResetPassword />,
    errorElement: <ErrorBoundary />,
  },
  {
    path: "/signup",
    element: <SignUp />,
    errorElement: <ErrorBoundary />,
  },
  {
    path: "/2fa",
    element: <TwoFactorAuth />,
    errorElement: <ErrorBoundary />,
  },
  {
    path: "*",
    element: <NotFound />,
  },
  {
    path: "test-error",
    element: <TestError />,
    errorElement: <ErrorBoundary />,
  },
]);
