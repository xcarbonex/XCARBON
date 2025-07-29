import React, {useState} from "react";
import user from "@/assets/user.svg";
import edit from "@/assets/editProfile.svg";
import {MdDarkMode, MdLightMode} from "react-icons/md";
import {useTheme} from "@/components/ThemeProvider";
import {Typography, Button} from "@/components";
import {
  ChangePasswordModal,
  MFAModal,
  AppearanceModal,
  APIKeyModal,
  CurrencyModal,
  UserOverviewModal,
  EditProfileModal,
} from "@/components/Modals";

import {SelectField} from "@/components";

const Settings = () => {
  const [activeModal, setActiveModal] = useState(null);
  const [isUserOverviewModalOpen, setIsUserOverviewModalOpen] = useState(false);
  const [isEditProfileModalOpen, setIsEditProfileModalOpen] = useState(false);

  // For settings
  const securitySettings = [
    {label: "Password", action: "Edit", modal: "password"},
    {label: "Multi-factor Authorization", action: "Edit", modal: "mfa"},
    {label: "API Keys", action: "Manage", modal: "apikey"},
  ];

  const preferences = [
    {
      label: "Language",
      type: "select",
      options: ["English", "Hindi", "French"],
    },
    {label: "Appearance", type: "toggle"},
  ];

  const handleModalOpen = (modalName) => {
    setActiveModal(modalName);
  };

  const handleModalClose = () => {
    setActiveModal(null);
  };

  // Mock user data - In real app, this would come from your user context/state
  const mockUserData = {
    type: "enterprise", // or 'individual'
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
        {type: "ID Card", status: "verified", date: "2024-01-15"},
        {type: "Proof of Address", status: "verified", date: "2024-01-15"},
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
        {type: "Tax Certificate", status: "verified", date: "2024-01-15"},
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
        <div className="space-y-4">
          <Typography variant="h4" className="border-b-2 pb-2 border-[#363638]">
            User Settings
          </Typography>

          <div className="flex items-center justify-between bg-tertiary px-4 py-4 rounded-xl">
            <div className="flex items-center gap-4">
              <div className="relative">
                <img
                  src={user}
                  alt="user"
                  className="bg-[#C4C4C4] rounded-lg p-2 w-16 h-16"
                />
                <div
                  className="absolute -bottom-3 -right-3"
                  onClick={() => setIsEditProfileModalOpen(true)}
                >
                  <img src={edit} alt="" className="cursor-pointer w-6 h-6" />
                </div>
              </div>
              <div>
                <Typography variant="h5" className="text-tbase dark:text-white">
                  John Doe
                </Typography>
                <Typography variant="body2" className="text-gray-500">
                  john.doe@example.com
                </Typography>
              </div>
            </div>
            <Button
              variant="primary"
              size="sm"
              onClick={() => setIsUserOverviewModalOpen(true)}
              className="absolute right-10 hidden sm:block"
            >
              Overview
            </Button>
          </div>

          {/* row 2 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Col 1 - Security Settings */}
            <div className="grid bg-[#FDFDFB] shadow-xl dark:bg-[#191919] p-4 border dark:border-[#363638] rounded-xl">
              <Typography
                variant="h5"
                className="border-b-2 dark:text-white text-tbase  border-[#363638] pb-2"
              >
                Security Settings
              </Typography>
              <div className="grid gap-4 p-2">
                {securitySettings.map((item, index) => (
                  <div
                    key={index}
                    className="flex justify-between items-center"
                  >
                    <Typography variant="body1" className="dark:text-white text-tbase">{item.label}</Typography>
                    <Button
                      variant="dark"
                      size="sm"
                      onClick={() => item.modal && handleModalOpen(item.modal)}
                    >
                      {item.action}
                    </Button>
                  </div>
                ))}

                <div className="flex justify-between items-center">
                  <div>
                    <p className=" text-tbase dark:text-white"> Currency</p>
                  </div>
                  <div>
                    <select
                      name=""
                      id=""
                      className="text-white text-[14px]  bg-black rounded-md px-3 py-1"
                    >
                      <option value="">USD</option>
                      <option value="" disabled>
                        {" "}
                        JPY
                      </option>
                      <option value=""> EUR</option>
                      <option value=""> CAD</option>
                      <option value=""> AUD</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>

            {/* Col 2 - Preferences */}
            <div className="bg-[#FDFDFB] shadow-xl dark:bg-[#191919] p-4 border border-[#D8D8D8] dark:border-[#363638] rounded-xl">
              <Typography
                variant="h5"
                className="border-b-2 border-[#363638] dark:text-white text-tbase pb-2"
              >
                Preferences
              </Typography>
              <div className="grid gap-4 p-2">
                {preferences.map((item, index) => (
                  <div
                    key={index}
                    className="flex justify-between items-center"
                  >
                    <Typography variant="body1" className="dark:text-white text-tbase">{item.label}</Typography>
                    {item.type === "select" ? (
                      <select className="bg-[#191919] text-white px-3 py-1 rounded-md border border-[#363638] text-sm">
                        {item.options.map((option, idx) => (
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
                        onClick={() =>
                          item.modal && handleModalOpen(item.modal)
                        }
                      >
                        {item.action}
                      </Button>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* row 3 */}
          <div className="p-4 border shadow-xl border-[#D8D8D8] dark:border-[#363638] rounded-xl">
            <Typography
              variant="h5"
              className="border-b-2 dark:text-white text-tbase border-[#363638] pb-2"
            >
              Active Sessions
            </Typography>
            <div className="flex justify-between items-center py-4">
              <Typography variant="body1" className="dark:text-white text-tbase ">Delete Account</Typography>
              <button
                size="sm"
                className="bg-[#C2615F] rounded px-3 py-1 hover:bg-[#c2615fcb]"
              >
                Permanently Delete Your Account
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Modals */}
      <ChangePasswordModal
        isOpen={activeModal === "password"}
        onClose={handleModalClose}
      />
      <MFAModal isOpen={activeModal === "mfa"} onClose={handleModalClose} />
      <AppearanceModal
        isOpen={activeModal === "appearance"}
        onClose={handleModalClose}
      />
      <APIKeyModal
        isOpen={activeModal === "apikey"}
        onClose={handleModalClose}
      />
      {/* <CurrencyModal
        isOpen={activeModal === "currency"}
        onClose={handleModalClose}
      /> */}

      <UserOverviewModal
        isOpen={isUserOverviewModalOpen}
        onClose={() => setIsUserOverviewModalOpen(false)}
        userData={mockUserData}
      />

      <EditProfileModal
        isOpen={isEditProfileModalOpen}
        onClose={() => setIsEditProfileModalOpen(false)}
        userData={mockUserData}
      />
    </>
  );
};

export default Settings;

const Switcher11 = () => {
  const [isChecked, setIsChecked] = useState(false);
  const {theme, toggleTheme} = useTheme();

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
