import React, { useState } from 'react';
import { Modal, Typography, Button, Input } from '@/components';
import clsx from 'clsx';

const EditProfileModal = ({ isOpen, onClose, userData, onSave }) => {
  const [formData, setFormData] = useState({
    ...(userData.type === 'individual' ? {
      firstName: userData.individual.firstName,
      lastName: userData.individual.lastName,
      phone: userData.individual.phone,
      email: userData.individual.email,
      address: userData.individual.address,
    } : {
      companyName: userData.enterprise.companyName,
      companyPhone: userData.enterprise.companyPhone,
      companyEmail: userData.enterprise.companyEmail,
      companyAddress: userData.enterprise.companyAddress,
      representative: {
        name: userData.enterprise.representative.name,
        position: userData.enterprise.representative.position,
        email: userData.enterprise.representative.email,
        phone: userData.enterprise.representative.phone,
      }
    })
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name.startsWith('representative.')) {
      const field = name.split('.')[1];
      setFormData(prev => ({
        ...prev,
        representative: {
          ...prev.representative,
          [field]: value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Edit Profile"
      className={clsx(
        'w-full max-w-2xl p-6',
        'bg-[#FDFDFB] dark:bg-[#191919]',
        'text-black dark:text-white',
        'border border-[#D8D8D8] dark:border-[#363638]'
      )}
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        <Typography variant="h5" className="text-black dark:text-white mb-6">
          {userData.type === 'individual' ? 'Edit Personal Details' : 'Edit Company Details'}
        </Typography>

        {userData.type === 'individual' ? (
          <>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Typography variant="caption" className="text-gray-500 dark:text-gray-400 mb-1">
                  First Name
                </Typography>
                <Input
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  className="w-full"
                  required
                />
              </div>
              <div>
                <Typography variant="caption" className="text-gray-500 dark:text-gray-400 mb-1">
                  Last Name
                </Typography>
                <Input
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  className="w-full"
                  required
                />
              </div>
            </div>

            <div>
              <Typography variant="caption" className="text-gray-500 dark:text-gray-400 mb-1">
                Phone Number
              </Typography>
              <Input
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                className="w-full"
                required
              />
            </div>

            <div>
              <Typography variant="caption" className="text-gray-500 dark:text-gray-400 mb-1">
                Email
              </Typography>
              <Input
                name="email"
                type="email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full"
                required
              />
            </div>

            <div>
              <Typography variant="caption" className="text-gray-500 dark:text-gray-400 mb-1">
                Address
              </Typography>
              <Input
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                className="w-full"
                required
              />
            </div>
          </>
        ) : (
          <>
            <div>
              <Typography variant="caption" className="text-gray-500 dark:text-gray-400 mb-1">
                Company Name
              </Typography>
              <Input
                name="companyName"
                value={formData.companyName}
                onChange={handleInputChange}
                className="w-full"
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Typography variant="caption" className="text-gray-500 dark:text-gray-400 mb-1">
                  Company Phone
                </Typography>
                <Input
                  name="companyPhone"
                  value={formData.companyPhone}
                  onChange={handleInputChange}
                  className="w-full"
                  required
                />
              </div>
              <div>
                <Typography variant="caption" className="text-gray-500 dark:text-gray-400 mb-1">
                  Company Email
                </Typography>
                <Input
                  name="companyEmail"
                  type="email"
                  value={formData.companyEmail}
                  onChange={handleInputChange}
                  className="w-full"
                  required
                />
              </div>
            </div>

            <div>
              <Typography variant="caption" className="text-gray-500 dark:text-gray-400 mb-1">
                Company Address
              </Typography>
              <Input
                name="companyAddress"
                value={formData.companyAddress}
                onChange={handleInputChange}
                className="w-full"
                required
              />
            </div>

            <div className={clsx(
              'p-4 rounded-lg border mt-6',
              'bg-[#4C666326] dark:bg-[#FFFFFF14]',
              'border-[#D8D8D8] dark:border-[#363638]'
            )}>
              <Typography variant="h6" className="text-black dark:text-white mb-4">
                Representative Details
              </Typography>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Typography variant="caption" className="text-gray-500 dark:text-gray-400 mb-1">
                    Name
                  </Typography>
                  <Input
                    name="representative.name"
                    value={formData.representative.name}
                    onChange={handleInputChange}
                    className="w-full"
                    required
                  />
                </div>
                <div>
                  <Typography variant="caption" className="text-gray-500 dark:text-gray-400 mb-1">
                    Position
                  </Typography>
                  <Input
                    name="representative.position"
                    value={formData.representative.position}
                    onChange={handleInputChange}
                    className="w-full"
                    required
                  />
                </div>
                <div>
                  <Typography variant="caption" className="text-gray-500 dark:text-gray-400 mb-1">
                    Email
                  </Typography>
                  <Input
                    name="representative.email"
                    type="email"
                    value={formData.representative.email}
                    onChange={handleInputChange}
                    className="w-full"
                    required
                  />
                </div>
                <div>
                  <Typography variant="caption" className="text-gray-500 dark:text-gray-400 mb-1">
                    Phone
                  </Typography>
                  <Input
                    name="representative.phone"
                    value={formData.representative.phone}
                    onChange={handleInputChange}
                    className="w-full"
                    required
                  />
                </div>
              </div>
            </div>
          </>
        )}

        <div className="flex justify-end gap-3 pt-4">
          <Button
            variant="outline"
            onClick={onClose}
            className="border-[#D8D8D8] dark:border-[#363638] text-black dark:text-white"
          >
            Cancel
          </Button>
          <Button
            type="submit"
            variant="primary"
            className="bg-[#C2A57B] dark:bg-[#3B3B3B] text-white"
          >
            Save Changes
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default EditProfileModal; 