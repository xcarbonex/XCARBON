import { createBrowserRouter, Navigate, useLocation } from "react-router-dom";
import {
  Dashboard,
  Settings,
  Portfolio,
  Wallet,
  Membership,
  Login,
  SignUp,
  Logout,
  Help,
  ListTokenizedAssets,
  CarbonCreditAssetsFromRegistry,
  Assets,
  WalletInfoScreen,
  MarketPlaceAssets,
  DashboardHome,
  ProjectDetail,
  CarbonCreditTokenization,
  MintCarbonCreditsSummary,
  SearchAssetFromRegistry,
  AssetsProgress,
} from "./pages";
import NotificationsPage from "./pages/Notifications";
import TestError from "@/pages/TestError";
import Layout from "@/components/AppLayout";
import ErrorBoundary from "@/components/ErrorBoundary";
import NotFound from "@/pages/NotFound";
import TwoFactorAuth from "./pages/TwoFactorAuth";

// Redirect component for reset-password that preserves token parameter
const ResetPasswordRedirect = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const token = searchParams.get("token") || "";
  return <Navigate to={`/login?modal=reset-password&token=${token}`} replace />;
};

// Redirect component for notification detail
const NotificationDetailRedirect = () => {
  const location = useLocation();
  const id = location.pathname.split("/").pop();
  return <Navigate to={`/notifications?detail=${id}`} replace />;
};

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <ErrorBoundary />,
    children: [
      {
        path: "",
        element: <DashboardHome />,
      },
      {
        path: "marketplace",
        element: <MarketPlaceAssets />,
      },
      {
        path: "project-detail/:assets-id",
        element: <ProjectDetail />,
      },
      // Redirect old marketplace route to new top-level
      {
        path: "dashboard/marketplace",
        element: <Navigate to="/marketplace" replace />,
      },
      // Redirect old assets lookup to unified assets hub
      {
        path: "assets/look-up",
        element: <Navigate to="/assets?tab=registry" replace />,
      },
      // Redirect old portfolio to unified assets hub
      {
        path: "portfolio",
        element: <Navigate to="/assets?tab=portfolio" replace />,
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
            element: <Navigate to="/wallet?action=deposit" replace />,
          },
          {
            path: "withdraw-tokenized-carbon-credit",
            element: <Navigate to="/wallet?action=withdraw" replace />,
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
        element: <NotificationDetailRedirect />,
      },
      // New unified Assets hub (consolidates Portfolio + Registry Assets)
      {
        path: "assets",
        element: <Assets />,
      },
      // Redirect old portfolio route to assets
      {
        path: "assets-old",
        element: <CarbonCreditAssetsFromRegistry />,
        children: [
          {
            path: "",
            element: <AssetsProgress />,
          },
          {
            path: "look-up",
            element: <SearchAssetFromRegistry />,
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
    element: <Navigate to="/login?modal=forgot-password" replace />,
  },
  {
    path: "/reset-password",
    element: <ResetPasswordRedirect />,
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
