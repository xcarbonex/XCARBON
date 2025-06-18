import React, { useState } from 'react';
import user from "@/assets/user.svg";
import edit from "@/assets/editProfile.svg";
import { Typography, Button } from '@/components';
import {
  ChangePasswordModal,
  MFAModal,
  AppearanceModal,
  APIKeyModal,
  CurrencyModal,
  UserOverviewModal,
  EditProfileModal
} from '@/components/Modals';
import { FiEdit2 } from 'react-icons/fi';

const Settings = () => {
  const [activeModal, setActiveModal] = useState(null);
  const [isUserOverviewModalOpen, setIsUserOverviewModalOpen] = useState(false);
  const [isEditProfileModalOpen, setIsEditProfileModalOpen] = useState(false);
  
  // For settings
  const securitySettings = [
    { label: "Password", action: "Edit", modal: "password" },
    { label: "Multi-factor Authorization", action: "Edit", modal: "mfa" },
    { label: "API Keys", action: "Manage", modal: "apikey" },
    { label: "Preferred Currency", action: "USD", modal: "currency" },
  ];

  const preferences = [
    {
      label: "Language",
      type: "select",
      options: ["English", "Hindi", "French"],
    },
    { label: "Appearance", action: "Dark/Light", modal: "appearance" },
  ];

  const handleModalOpen = (modalName) => {
    setActiveModal(modalName);
  };

  const handleModalClose = () => {
    setActiveModal(null);
  };

  // Mock user data - In real app, this would come from your user context/state
  const mockUserData = {
    type: 'enterprise', // or 'individual'
    individual: {
      firstName: 'John',
      lastName: 'Doe',
      dateOfBirth: '1990-05-15',
      nationality: 'United States',
      address: '123 Main St, New York, NY 10001',
      phone: '+1 234-567-8900',
      email: 'john.doe@example.com',
      kycStatus: 'verified',
      documents: [
        { type: 'ID Card', status: 'verified', date: '2024-01-15' },
        { type: 'Proof of Address', status: 'verified', date: '2024-01-15' }
      ]
    },
    enterprise: {
      companyName: 'Tech Solutions Inc.',
      registrationNumber: 'REG123456789',
      taxId: 'TAX987654321',
      companyAddress: '456 Business Ave, San Francisco, CA 94105',
      companyPhone: '+1 987-654-3210',
      companyEmail: 'contact@techsolutions.com',
      representative: {
        name: 'Jane Smith',
        position: 'CEO',
        email: 'jane.smith@techsolutions.com',
        phone: '+1 876-543-2100'
      },
      kycStatus: 'verified',
      documents: [
        { type: 'Business Registration', status: 'verified', date: '2024-01-15' },
        { type: 'Tax Certificate', status: 'verified', date: '2024-01-15' },
        { type: 'Company Address Proof', status: 'pending', date: '2024-03-15' }
      ]
    }
  };

  const handleSaveProfile = (formData) => {
    console.log('Saving profile data:', formData);
  };

  return (
    <>
      <div className="h-screen transition-all duration-slow">
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
                <div className="absolute -bottom-3 -right-3" onClick={() => setIsEditProfileModalOpen(true)}>
                  <img src={edit} alt="" className="cursor-pointer w-6 h-6" />
                </div>
              </div>
              <div>
                <Typography variant="h5" className="text-black dark:text-white">
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
              <Typography variant="h5" className="border-b-2 border-[#363638] pb-2">
                Security Settings
              </Typography>
              <div className="grid gap-4 p-2">
                {securitySettings.map((item, index) => (
                  <div key={index} className="flex justify-between items-center">
                    <Typography variant="body1">{item.label}</Typography>
                    <Button 
                      variant="dark" 
                      size="sm"
                      onClick={() => item.modal && handleModalOpen(item.modal)}
                    >
                      {item.action}
                    </Button>
                  </div>
                ))}
              </div>
            </div>

            {/* Col 2 - Preferences */}
            <div className="bg-[#FDFDFB] shadow-xl dark:bg-[#191919] p-4 border border-[#D8D8D8] dark:border-[#363638] rounded-xl">
              <Typography variant="h5" className="border-b-2 border-[#363638] pb-2">
                Preferences
              </Typography>
              <div className="grid gap-4 p-2">
                {preferences.map((item, index) => (
                  <div key={index} className="flex justify-between items-center">
                    <Typography variant="body1">{item.label}</Typography>
                    {item.type === "select" ? (
                      <select className="bg-[#191919] text-white px-3 py-1 rounded-md border border-[#363638] text-sm">
                        {item.options.map((option, idx) => (
                          <option key={idx} value={option}>
                            {option}
                          </option>
                        ))}
                      </select>
                    ) : (
                      <Button 
                        variant="dark" 
                        size="sm"
                        onClick={() => item.modal && handleModalOpen(item.modal)}
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
            <Typography variant="h5" className="border-b-2 border-[#363638] pb-2">
              Active Sessions
            </Typography>
            <div className="flex justify-between items-center py-4">
              <Typography variant="body1">Delete Account</Typography>
              <Button 
                variant="outline" 
                size="sm"
                className="bg-[#C2615F] dark:bg-[#363638] text-white border-transparent dark:text-red-600"
              >
                Permanently Delete Your Account
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Modals */}
      <ChangePasswordModal
        isOpen={activeModal === 'password'}
        onClose={handleModalClose}
      />
      <MFAModal
        isOpen={activeModal === 'mfa'}
        onClose={handleModalClose}
      />
      <AppearanceModal
        isOpen={activeModal === 'appearance'}
        onClose={handleModalClose}
      />
      <APIKeyModal
        isOpen={activeModal === 'apikey'}
        onClose={handleModalClose}
      />
      <CurrencyModal
        isOpen={activeModal === 'currency'}
        onClose={handleModalClose}
      />

      <UserOverviewModal
        isOpen={isUserOverviewModalOpen}
        onClose={() => setIsUserOverviewModalOpen(false)}
        userData={mockUserData}
      />

      <EditProfileModal
        isOpen={isEditProfileModalOpen}
        onClose={() => setIsEditProfileModalOpen(false)}
        userData={mockUserData}
        onSave={handleSaveProfile}
      />
    </>
  );
};

export default Settings;
