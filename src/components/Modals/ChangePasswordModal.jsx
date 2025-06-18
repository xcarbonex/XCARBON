import React, { useState } from 'react';
import { Modal, Input, Typography, Button } from '@/components';
import clsx from 'clsx';

const ChangePasswordModal = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.currentPassword) {
      newErrors.currentPassword = 'Current password is required';
    }

    if (!formData.newPassword) {
      newErrors.newPassword = 'New password is required';
    } else if (formData.newPassword.length < 8) {
      newErrors.newPassword = 'Password must be at least 8 characters long';
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your new password';
    } else if (formData.newPassword !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = validateForm();

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // TODO: Implement password change logic here
    console.log('Password change submitted:', formData);
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Change Password"
      className={clsx(
        'w-full max-w-md p-6',
        
        'text-black dark:text-white',
        'border border-[#D8D8D8] dark:border-[#363638]'
      )}
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Typography variant="body2" className="mb-1 text-black dark:text-white">
            Current Password
          </Typography>
          <Input
            type="password"
            name="currentPassword"
            value={formData.currentPassword}
            onChange={handleChange}
            className={clsx(
              'bg-[#4C666326] dark:bg-[#FFFFFF14]',
              'border-[#D8D8D8] dark:border-[#363638]',
              errors.currentPassword && 'border-red-500'
            )}
          />
          {errors.currentPassword && (
            <Typography variant="caption" className="text-red-500 mt-1">
              {errors.currentPassword}
            </Typography>
          )}
        </div>

        <div>
          <Typography variant="body2" className="mb-1 text-black dark:text-white">
            New Password
          </Typography>
          <Input
            type="password"
            name="newPassword"
            value={formData.newPassword}
            onChange={handleChange}
            className={clsx(
              'bg-[#4C666326] dark:bg-[#FFFFFF14]',
              'border-[#D8D8D8] dark:border-[#363638]',
              errors.newPassword && 'border-red-500'
            )}
          />
          {errors.newPassword && (
            <Typography variant="caption" className="text-red-500 mt-1">
              {errors.newPassword}
            </Typography>
          )}
        </div>

        <div>
          <Typography variant="body2" className="mb-1 text-black dark:text-white">
            Confirm New Password
          </Typography>
          <Input
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            className={clsx(
              'bg-[#4C666326] dark:bg-[#FFFFFF14]',
              'border-[#D8D8D8] dark:border-[#363638]',
              errors.confirmPassword && 'border-red-500'
            )}
          />
          {errors.confirmPassword && (
            <Typography variant="caption" className="text-red-500 mt-1">
              {errors.confirmPassword}
            </Typography>
          )}
        </div>

        <div className="flex justify-end gap-3 mt-6">
          <Button 
            variant="outline" 
            onClick={onClose}
            className="border-[#D8D8D8] dark:border-[#363638] text-black dark:text-white"
          >
            Cancel
          </Button>
          <Button 
            variant="primary" 
            type="submit"
            className="bg-[#C2A57B] hover:bg-opacity-90 text-white dark:bg-[#3B3B3B]"
          >
            Change Password
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default ChangePasswordModal; 