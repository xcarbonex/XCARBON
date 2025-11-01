import React, { useState } from "react";
import user from "@/assets/user.svg";
import edit from "@/assets/editProfile.svg";
import { MdDarkMode, MdLightMode } from "react-icons/md";
import { useTheme } from "@/components/ThemeProvider";
import { Typography, Button, Card } from "@/components";
import { IoSettingsOutline, IoShieldCheckmarkOutline, IoKeyOutline, IoGlobeOutline, IoTrashOutline } from "react-icons/io5";
import {
  ChangePasswordModal,
  MFAModal,
  AppearanceModal,
  APIKeyModal,
  UserOverviewModal,
  EditProfileModal,
} from "@/components/Modals";

interface SecuritySetting {
  label: string;
  action: string;
  modal: string;
}

interface Preference {
  label: string;
  type: string;
  options?: string[];
  modal?: string;
  action?: string;
}

interface UserDocument {
  type: string;
  status: string;
  date: string;
}

interface IndividualData {
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  nationality: string;
  address: string;
  phone: string;
  email: string;
  kycStatus: string;
  documents: UserDocument[];
}

interface Representative {
  name: string;
  position: string;
  email: string;
  phone: string;
}

interface EnterpriseData {
  companyName: string;
  registrationNumber: string;
  taxId: string;
  companyAddress: string;
  companyPhone: string;
  companyEmail: string;
  representative: Representative;
  kycStatus: string;
  documents: UserDocument[];
}

interface UserData {
  type: "enterprise" | "individual";
  individual: IndividualData;
  enterprise: EnterpriseData;
}

const Settings: React.FC = () => {
  const [activeModal, setActiveModal] = useState<string | null>(null);
  const [isUserOverviewModalOpen, setIsUserOverviewModalOpen] = useState<boolean>(false);
  const [isEditProfileModalOpen, setIsEditProfileModalOpen] = useState<boolean>(false);

  // For settings
  const securitySettings: SecuritySetting[] = [
    { label: "Password", action: "Edit", modal: "password" },
    { label: "Multi-factor Authorization", action: "Edit", modal: "mfa" },
    { label: "API Keys", action: "Manage", modal: "apikey" },
  ];

  const preferences: Preference[] = [
    {
      label: "Language",
      type: "select",
      options: ["English", "Hindi", "French"],
    },
    { label: "Appearance", type: "toggle" },
  ];

  const handleModalOpen = (modalName: string) => {
    setActiveModal(modalName);
  };

  const handleModalClose = () => {
    setActiveModal(null);
  };

  // Mock user data - In real app, this would come from your user context/state
  const mockUserData: UserData = {
    type: "enterprise" as const, // or 'individual'
    individual: {
      firstName: "John",
      lastName: "Doe",
      dateOfBirth: "1990-05-15",
      nationality: "United States",
      address: "123 Main St, New York, NY 10001",
      phone: "+1 234-567-8900",
      email: "john.doe@example.com",
      kycStatus: "verified",
      documents: [
        { type: "ID Card", status: "verified", date: "2024-01-15" },
        { type: "Proof of Address", status: "verified", date: "2024-01-15" },
      ],
    },
    enterprise: {
      companyName: "Tech Solutions Inc.",
      registrationNumber: "REG123456789",
      taxId: "TAX987654321",
      companyAddress: "456 Business Ave, San Francisco, CA 94105",
      companyPhone: "+1 987-654-3210",
      companyEmail: "contact@techsolutions.com",
      representative: {
        name: "Jane Smith",
        position: "CEO",
        email: "jane.smith@techsolutions.com",
        phone: "+1 876-543-2100",
      },
      kycStatus: "verified",
      documents: [
        {
          type: "Business Registration",
          status: "verified",
          date: "2024-01-15",
        },
        { type: "Tax Certificate", status: "verified", date: "2024-01-15" },
        {
          type: "Company Address Proof",
          status: "pending",
          date: "2024-03-15",
        },
      ],
    },
  };

  // const handleSaveProfile = (/*formData*/) => {
  //   // console.log("Saving profile data:", formData);
  // };

  return (
    <>
      <div className="h-[screen] transition-all duration-slow">
        {/* Premium Background Wrapper */}
        <div className="min-h-screen bg-gradient-to-br from-neutral-50 via-white to-accent-50/30 dark:from-neutral-950 dark:via-neutral-900 dark:to-accent-950/20 p-6">
          <div className="max-w-7xl mx-auto space-y-6">
            {/* Premium Header */}
            <Card className="border-2 border-brand-200 dark:border-brand-800 shadow-xl">
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 rounded-xl bg-gradient-to-br from-brand-100 to-brand-200 dark:from-brand-900/30 dark:to-brand-800/30 shadow-lg shadow-brand-500/30">
                  <IoSettingsOutline className="w-6 h-6 text-brand-700 dark:text-brand-400" />
                </div>
                <Typography variant="h4" className="text-neutral-900 dark:text-white font-bold">
                  User Settings
                </Typography>
              </div>
              <Typography variant="body2" className="text-neutral-600 dark:text-neutral-400 ml-14">
                Manage your account preferences and security settings
              </Typography>
            </Card>

            {/* Premium Profile Card */}
            <Card className="border-2 border-info-200 dark:border-info-800 shadow-xl">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className="relative group">
                    <div className="absolute inset-0 bg-gradient-to-r from-brand-500/20 to-accent-500/20 rounded-2xl blur-xl opacity-50 group-hover:opacity-100 transition-opacity" />
                    <img 
                      src={user} 
                      alt="user" 
                      className="relative bg-gradient-to-br from-neutral-100 to-neutral-200 dark:from-neutral-800 dark:to-neutral-700 rounded-2xl p-3 w-20 h-20 border-2 border-info-200 dark:border-info-800" 
                    />
                    <div
                      className="absolute -bottom-2 -right-2 cursor-pointer"
                      onClick={() => setIsEditProfileModalOpen(true)}
                    >
                      <div className="p-2 rounded-xl bg-gradient-to-br from-brand-600 to-brand-700 shadow-lg shadow-brand-600/40 hover:shadow-brand-600/60 transition-shadow">
                        <img src={edit} alt="edit" className="w-4 h-4" />
                      </div>
                    </div>
                  </div>
                  <div>
                    <Typography variant="h5" className="text-neutral-900 dark:text-white font-bold">
                      John Doe
                    </Typography>
                    <Typography variant="body2" className="text-neutral-600 dark:text-neutral-400">
                      john.doe@example.com
                    </Typography>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="w-2 h-2 rounded-full bg-success-500 animate-pulse" />
                      <Typography variant="caption" className="text-success-600 dark:text-success-400 font-medium">
                        Verified Account
                      </Typography>
                    </div>
                  </div>
                </div>
                <Button
                  variant="primary"
                  size="sm"
                  onClick={() => setIsUserOverviewModalOpen(true)}
                  className="bg-gradient-to-r from-brand-600 to-brand-700 hover:from-brand-700 hover:to-brand-800 shadow-lg shadow-brand-600/40 border-none"
                >
                  View Overview
                </Button>
              </div>
            </Card>

            {/* Premium Settings Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Premium Security Settings Card */}
              <Card className="border-2 border-success-200 dark:border-success-800 shadow-xl">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 rounded-xl bg-gradient-to-br from-success-100 to-success-200 dark:from-success-900/30 dark:to-success-800/30 shadow-lg shadow-success-500/30">
                    <IoShieldCheckmarkOutline className="w-6 h-6 text-success-700 dark:text-success-400" />
                  </div>
                  <Typography variant="h5" className="text-neutral-900 dark:text-white font-bold">
                    Security Settings
                  </Typography>
                </div>
                <div className="space-y-4">
                  {securitySettings.map((item, index) => (
                    <div key={index} className="flex justify-between items-center p-3 rounded-xl bg-gradient-to-r from-neutral-50 to-neutral-100 dark:from-neutral-800 dark:to-neutral-900 hover:from-success-50 hover:to-accent-50 dark:hover:from-success-950/30 dark:hover:to-accent-950/30 transition-all duration-300">
                      <div className="flex items-center gap-3">
                        <IoKeyOutline className="w-5 h-5 text-success-600 dark:text-success-400" />
                        <Typography variant="body1" className="text-neutral-900 dark:text-white font-medium">
                          {item.label}
                        </Typography>
                      </div>
                      <Button
                        variant="dark"
                        size="sm"
                        onClick={() => item.modal && handleModalOpen(item.modal)}
                        className="bg-gradient-to-r from-brand-600 to-brand-700 hover:from-brand-700 hover:to-brand-800 text-white border-none shadow-lg shadow-brand-600/30"
                      >
                        {item.action}
                      </Button>
                    </div>
                  ))}

                  <div className="flex justify-between items-center p-3 rounded-xl bg-gradient-to-r from-neutral-50 to-neutral-100 dark:from-neutral-800 dark:to-neutral-900">
                    <div className="flex items-center gap-3">
                      <IoGlobeOutline className="w-5 h-5 text-info-600 dark:text-info-400" />
                      <Typography variant="body1" className="text-neutral-900 dark:text-white font-medium">
                        Currency
                      </Typography>
                    </div>
                    <select className="px-4 py-2 rounded-lg bg-white dark:bg-neutral-900 text-neutral-900 dark:text-white border-2 border-neutral-200 dark:border-neutral-700 focus:border-brand-500 dark:focus:border-brand-500 outline-none text-sm font-medium">
                      <option value="USD">USD</option>
                      <option value="JPY">JPY</option>
                      <option value="EUR">EUR</option>
                      <option value="CAD">CAD</option>
                      <option value="AUD">AUD</option>
                    </select>
                  </div>
                </div>
              </Card>

              {/* Premium Preferences Card */}
              <Card className="border-2 border-info-200 dark:border-info-800 shadow-xl">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 rounded-xl bg-gradient-to-br from-info-100 to-info-200 dark:from-info-900/30 dark:to-info-800/30 shadow-lg shadow-info-500/30">
                    <IoSettingsOutline className="w-6 h-6 text-info-700 dark:text-info-400" />
                  </div>
                  <Typography variant="h5" className="text-neutral-900 dark:text-white font-bold">
                    Preferences
                  </Typography>
                </div>
                <div className="space-y-4">
                  {preferences.map((item, index) => (
                    <div key={index} className="flex justify-between items-center p-3 rounded-xl bg-gradient-to-r from-neutral-50 to-neutral-100 dark:from-neutral-800 dark:to-neutral-900 hover:from-info-50 hover:to-accent-50 dark:hover:from-info-950/30 dark:hover:to-accent-950/30 transition-all duration-300">
                      <div className="flex items-center gap-3">
                        <IoGlobeOutline className="w-5 h-5 text-info-600 dark:text-info-400" />
                        <Typography variant="body1" className="text-neutral-900 dark:text-white font-medium">
                          {item.label}
                        </Typography>
                      </div>
                      {item.type === "select" ? (
                        <select className="px-4 py-2 rounded-lg bg-white dark:bg-neutral-900 text-neutral-900 dark:text-white border-2 border-neutral-200 dark:border-neutral-700 focus:border-brand-500 dark:focus:border-brand-500 outline-none text-sm font-medium">
                          {item.options?.map((option, idx) => (
                            <option key={idx} value={option}>
                              {option}
                            </option>
                          ))}
                        </select>
                      ) : item.type === "toggle" ? (
                        <Switcher11 />
                      ) : (
                        <Button
                          variant="dark"
                          size="sm"
                          onClick={() => item.modal && handleModalOpen(item.modal)}
                          className="bg-gradient-to-r from-brand-600 to-brand-700 hover:from-brand-700 hover:to-brand-800 text-white border-none shadow-lg shadow-brand-600/30"
                        >
                          {item.action}
                        </Button>
                      )}
                    </div>
                  ))}
                </div>
              </Card>
            </div>

            {/* Premium Danger Zone Card */}
            <Card className="border-2 border-error-200 dark:border-error-800 shadow-xl">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 rounded-xl bg-gradient-to-br from-error-100 to-error-200 dark:from-error-900/30 dark:to-error-800/30 shadow-lg shadow-error-500/30">
                  <IoTrashOutline className="w-6 h-6 text-error-700 dark:text-error-400" />
                </div>
                <Typography variant="h5" className="text-neutral-900 dark:text-white font-bold">
                  Danger Zone
                </Typography>
              </div>
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 p-4 rounded-xl bg-gradient-to-r from-error-50 to-warning-50 dark:from-error-950/20 dark:to-warning-950/20 border-2 border-error-200 dark:border-error-800">
                <div>
                  <Typography variant="body1" className="text-neutral-900 dark:text-white font-bold mb-1">
                    Delete Account
                  </Typography>
                  <Typography variant="caption" className="text-neutral-600 dark:text-neutral-400">
                    Once you delete your account, there is no going back. Please be certain.
                  </Typography>
                </div>
                <button className="px-5 py-2.5 bg-gradient-to-r from-error-600 to-error-700 hover:from-error-700 hover:to-error-800 text-white rounded-lg font-medium shadow-lg shadow-error-600/40 hover:shadow-error-600/60 transition-all whitespace-nowrap">
                  Delete Account
                </button>
              </div>
            </Card>
          </div>
        </div>
      </div>

      {/* Modals */}
      <ChangePasswordModal isOpen={activeModal === "password"} onClose={handleModalClose} />
      <MFAModal isOpen={activeModal === "mfa"} onClose={handleModalClose} />
      <AppearanceModal isOpen={activeModal === "appearance"} onClose={handleModalClose} />
      <APIKeyModal isOpen={activeModal === "apikey"} onClose={handleModalClose} />
      {/* <CurrencyModal
        isOpen={activeModal === "currency"}
        onClose={handleModalClose}
      /> */}

      <UserOverviewModal
        isOpen={isUserOverviewModalOpen}
        onClose={() => setIsUserOverviewModalOpen(false)}
      />

      <EditProfileModal
        isOpen={isEditProfileModalOpen}
        onClose={() => setIsEditProfileModalOpen(false)}
        userData={mockUserData}
        onSave={() => {}}
      />
    </>
  );
};

export default Settings;

const Switcher11: React.FC = () => {
  const [isChecked, setIsChecked] = useState<boolean>(false);
  const { theme, toggleTheme } = useTheme();

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
    toggleTheme();
  };

  return (
    <>
      <label className="themeSwitcherTwo shadow-card relative inline-flex cursor-pointer select-none items-center justify-center gap-1 rounded-md bg-secondary p-1 border">
        <input
          type="checkbox"
          className="sr-only"
          checked={isChecked}
          onChange={handleCheckboxChange}
        />
        <span
          className={`flex items-center gap-1 rounded text-tbase p-1 text-sm font-medium ${
            theme == "light" ? "bg-input" : "text-body-color"
          }`}
        >
          <MdLightMode className="w-5 h-5" />
        </span>
        <span
          className={`flex items-center gap-1 rounded text-tbase p-1 text-sm font-medium ${
            theme !== "light" ? "bg-input" : "text-body-color"
          }`}
        >
          <MdDarkMode className="w-5 h-5" />
        </span>
      </label>
    </>
  );
};
