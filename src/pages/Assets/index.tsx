import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { Tabs, Card, Button, Typography, ListAssetDrawer } from "@/components";
import { TokenizationModal, MintingModal } from "@/components/Modals";
import type { Tab } from "@/components/Tabs";
import { IoLeafOutline, IoSearchOutline, IoRocketOutline } from "react-icons/io5";
import { FaCoins, FaListAlt } from "react-icons/fa";
import Portfolio from "../Portfolio";
import SearchAssetFromRegistry from "../CarbonCreditAssetsFromRegistry/SearchAssetFromRegistry";

/**
 * Unified Assets Hub Page
 * 
 * Consolidates:
 * - Portfolio Analytics (formerly /portfolio)
 * - Registry Lookup (formerly /assets/look-up)
 * - Asset Actions (Tokenize, Mint, List - to be converted to modals/drawers)
 * 
 * Design: Premium card-based layout with tabs for different views
 * URL State: Supports ?tab=portfolio or ?tab=registry for deep linking
 */
const Assets: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [activeTab, setActiveTab] = useState<string>("portfolio");
  const [isTokenizeModalOpen, setIsTokenizeModalOpen] = useState(false);
  const [isMintModalOpen, setIsMintModalOpen] = useState(false);
  const [isListDrawerOpen, setIsListDrawerOpen] = useState(false);

  // Initialize tab from URL query parameter on mount
  useEffect(() => {
    const tabParam = searchParams.get("tab");
    if (tabParam === "portfolio" || tabParam === "registry") {
      setActiveTab(tabParam);
    }

    // Check for action parameter to open modals/drawer
    const actionParam = searchParams.get("action");
    if (actionParam === "tokenize") {
      setIsTokenizeModalOpen(true);
    } else if (actionParam === "mint") {
      setIsMintModalOpen(true);
    } else if (actionParam === "list") {
      setIsListDrawerOpen(true);
    }
  }, [searchParams]);

  // Handle Tokenize modal
  const handleOpenTokenizeModal = () => {
    setIsTokenizeModalOpen(true);
    const newParams = new URLSearchParams(searchParams);
    newParams.set("action", "tokenize");
    setSearchParams(newParams);
  };

  const handleCloseTokenizeModal = () => {
    setIsTokenizeModalOpen(false);
    const newParams = new URLSearchParams(searchParams);
    newParams.delete("action");
    setSearchParams(newParams);
  };

  // Handle Mint modal
  const handleOpenMintModal = () => {
    setIsMintModalOpen(true);
    const newParams = new URLSearchParams(searchParams);
    newParams.set("action", "mint");
    setSearchParams(newParams);
  };

  const handleCloseMintModal = () => {
    setIsMintModalOpen(false);
    const newParams = new URLSearchParams(searchParams);
    newParams.delete("action");
    setSearchParams(newParams);
  };

  // Handle List drawer
  const handleOpenListDrawer = () => {
    setIsListDrawerOpen(true);
    const newParams = new URLSearchParams(searchParams);
    newParams.set("action", "list");
    setSearchParams(newParams);
  };

  const handleCloseListDrawer = () => {
    setIsListDrawerOpen(false);
    const newParams = new URLSearchParams(searchParams);
    newParams.delete("action");
    setSearchParams(newParams);
  };

  const tabs: Tab[] = [
    {
      id: "portfolio",
      label: "📊 My Portfolio",
    },
    {
      id: "registry",
      label: "🔍 Registry Lookup",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-50 via-white to-accent-50/30 dark:from-neutral-900 dark:via-neutral-900 dark:to-neutral-950 p-6">
      <div className="space-y-6">
        {/* Premium Page Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <div className="p-3 rounded-xl bg-gradient-to-br from-success-100 to-success-200 dark:from-success-900/30 dark:to-success-800/30 shadow-lg shadow-success-500/30">
              <IoLeafOutline className="w-7 h-7 text-success-700 dark:text-success-400" />
            </div>
            <div>
              <Typography variant="h4" className="typography-heading text-neutral-900 dark:text-white font-bold mb-1">
                Carbon Assets
              </Typography>
              <Typography variant="body2" className="text-neutral-600 dark:text-neutral-400">
                Manage your portfolio, discover registry assets, and take action
              </Typography>
            </div>
          </div>

          {/* Quick Action Buttons */}
          <div className="hidden lg:flex items-center gap-3">
            <Button
              variant="tonal-primary"
              size="md"
              className="shadow-lg"
              onClick={handleOpenTokenizeModal}
            >
              <div className="flex items-center gap-2">
                <IoRocketOutline className="w-4 h-4" />
                <span>Tokenize</span>
              </div>
            </Button>
            <Button
              variant="tonal-primary"
              size="md"
              className="shadow-lg"
              onClick={handleOpenMintModal}
            >
              <div className="flex items-center gap-2">
                <FaCoins className="w-4 h-4" />
                <span>Mint New</span>
              </div>
            </Button>
            <Button
              variant="secondary"
              size="md"
              className="shadow-lg"
              onClick={handleOpenListDrawer}
            >
              <div className="flex items-center gap-2">
                <FaListAlt className="w-4 h-4" />
                <span>List for Sale</span>
              </div>
            </Button>
          </div>
        </div>

        {/* Premium Tabs Navigation */}
        <Card className="border-2 border-neutral-200 dark:border-neutral-700 shadow-2xl backdrop-blur-xl overflow-hidden">
          <Tabs
            tabs={tabs}
            activeTab={activeTab}
            onTabChange={(tabId) => {
              const newTab = tabId as string;
              setActiveTab(newTab);
              setSearchParams({ tab: newTab });
            }}
          />

          {/* Tab Content */}
          <div className="p-6">
            {activeTab === "portfolio" && (
              <div>
                {/* Embed Portfolio Component */}
                <Portfolio />
              </div>
            )}

            {activeTab === "registry" && (
              <div>
                {/* Embed Registry Lookup Component */}
                <SearchAssetFromRegistry />
              </div>
            )}
          </div>
        </Card>

        {/* Mobile Quick Actions - Bottom Sheet Style */}
        <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white dark:bg-neutral-800 border-t-2 border-neutral-200 dark:border-neutral-700 shadow-2xl p-4 z-40">
          <div className="grid grid-cols-3 gap-3">
            <Button
              variant="tonal-primary"
              size="sm"
              fullWidth
              onClick={handleOpenTokenizeModal}
            >
              <IoRocketOutline className="w-4 h-4" />
            </Button>
            <Button
              variant="tonal-primary"
              size="sm"
              fullWidth
              onClick={handleOpenMintModal}
            >
              <FaCoins className="w-4 h-4" />
            </Button>
            <Button
              variant="secondary"
              size="sm"
              fullWidth
              onClick={handleOpenListDrawer}
            >
              <FaListAlt className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Modals & Drawer */}
        <TokenizationModal isOpen={isTokenizeModalOpen} onClose={handleCloseTokenizeModal} />
        <MintingModal isOpen={isMintModalOpen} onClose={handleCloseMintModal} />
        <ListAssetDrawer isOpen={isListDrawerOpen} onClose={handleCloseListDrawer} />
      </div>
    </div>
  );
};

export default Assets;
