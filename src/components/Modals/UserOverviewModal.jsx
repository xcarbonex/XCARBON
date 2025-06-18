import React from 'react';
import { Modal, Typography, Button } from '@/components';
import clsx from 'clsx';
import { FiCheck, FiX } from 'react-icons/fi';

// Mock data - In real app, this would come from your backend
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

const StatusBadge = ({ status }) => {
  const isVerified = status === 'verified';
  return (
    <span className={clsx(
      'px-2 py-1 rounded-full text-sm flex items-center gap-1',
      isVerified 
        ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
        : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
    )}>
      {isVerified ? <FiCheck className="w-4 h-4" /> : <FiX className="w-4 h-4" />}
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </span>
  );
};

const DocumentList = ({ documents }) => (
  <div className="space-y-3">
    {documents.map((doc, index) => (
      <div 
        key={index}
        className={clsx(
          'p-3 rounded-lg border',
          'bg-[#4C666326] dark:bg-[#FFFFFF14]',
          'border-[#D8D8D8] dark:border-[#363638]'
        )}
      >
        <div className="flex justify-between items-center">
          <div>
            <Typography variant="body2" className="font-medium text-black dark:text-white">
              {doc.type}
            </Typography>
            <Typography variant="caption" className="text-gray-500 dark:text-gray-400">
              Submitted: {doc.date}
            </Typography>
          </div>
          <StatusBadge status={doc.status} />
        </div>
      </div>
    ))}
  </div>
);

const IndividualDetails = ({ data }) => (
  <div className="space-y-6">
    <div className="grid grid-cols-2 gap-4">
      <div>
        <Typography variant="caption" className="text-gray-500 dark:text-gray-400">
          Full Name
        </Typography>
        <Typography variant="body1" className="text-black dark:text-white">
          {data.firstName} {data.lastName}
        </Typography>
      </div>
      <div>
        <Typography variant="caption" className="text-gray-500 dark:text-gray-400">
          Date of Birth
        </Typography>
        <Typography variant="body1" className="text-black dark:text-white">
          {data.dateOfBirth}
        </Typography>
      </div>
      <div>
        <Typography variant="caption" className="text-gray-500 dark:text-gray-400">
          Nationality
        </Typography>
        <Typography variant="body1" className="text-black dark:text-white">
          {data.nationality}
        </Typography>
      </div>
      <div>
        <Typography variant="caption" className="text-gray-500 dark:text-gray-400">
          Phone
        </Typography>
        <Typography variant="body1" className="text-black dark:text-white">
          {data.phone}
        </Typography>
      </div>
    </div>

    <div>
      <Typography variant="caption" className="text-gray-500 dark:text-gray-400">
        Address
      </Typography>
      <Typography variant="body1" className="text-black dark:text-white">
        {data.address}
      </Typography>
    </div>

    <div>
      <Typography variant="caption" className="text-gray-500 dark:text-gray-400">
        Email
      </Typography>
      <Typography variant="body1" className="text-black dark:text-white">
        {data.email}
      </Typography>
    </div>

    <div>
      <Typography variant="h6" className="mb-3 text-black dark:text-white">
        KYC Documents
      </Typography>
      <DocumentList documents={data.documents} />
    </div>
  </div>
);

const EnterpriseDetails = ({ data }) => (
  <div className="space-y-6">
    <div className="grid grid-cols-2 gap-4">
      <div>
        <Typography variant="caption" className="text-gray-500 dark:text-gray-400">
          Company Name
        </Typography>
        <Typography variant="body1" className="text-black dark:text-white">
          {data.companyName}
        </Typography>
      </div>
      <div>
        <Typography variant="caption" className="text-gray-500 dark:text-gray-400">
          Registration Number
        </Typography>
        <Typography variant="body1" className="text-black dark:text-white">
          {data.registrationNumber}
        </Typography>
      </div>
      <div>
        <Typography variant="caption" className="text-gray-500 dark:text-gray-400">
          Tax ID
        </Typography>
        <Typography variant="body1" className="text-black dark:text-white">
          {data.taxId}
        </Typography>
      </div>
      <div>
        <Typography variant="caption" className="text-gray-500 dark:text-gray-400">
          Phone
        </Typography>
        <Typography variant="body1" className="text-black dark:text-white">
          {data.companyPhone}
        </Typography>
      </div>
    </div>

    <div>
      <Typography variant="caption" className="text-gray-500 dark:text-gray-400">
        Company Address
      </Typography>
      <Typography variant="body1" className="text-black dark:text-white">
        {data.companyAddress}
      </Typography>
    </div>

    <div>
      <Typography variant="caption" className="text-gray-500 dark:text-gray-400">
        Company Email
      </Typography>
      <Typography variant="body1" className="text-black dark:text-white">
        {data.companyEmail}
      </Typography>
    </div>

    <div className={clsx(
      'p-4 rounded-lg border',
      'bg-[#4C666326] dark:bg-[#FFFFFF14]',
      'border-[#D8D8D8] dark:border-[#363638]'
    )}>
      <Typography variant="h6" className="mb-3 text-black dark:text-white">
        Company Representative
      </Typography>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Typography variant="caption" className="text-gray-500 dark:text-gray-400">
            Name
          </Typography>
          <Typography variant="body1" className="text-black dark:text-white">
            {data.representative.name}
          </Typography>
        </div>
        <div>
          <Typography variant="caption" className="text-gray-500 dark:text-gray-400">
            Position
          </Typography>
          <Typography variant="body1" className="text-black dark:text-white">
            {data.representative.position}
          </Typography>
        </div>
        <div>
          <Typography variant="caption" className="text-gray-500 dark:text-gray-400">
            Email
          </Typography>
          <Typography variant="body1" className="text-black dark:text-white">
            {data.representative.email}
          </Typography>
        </div>
        <div>
          <Typography variant="caption" className="text-gray-500 dark:text-gray-400">
            Phone
          </Typography>
          <Typography variant="body1" className="text-black dark:text-white">
            {data.representative.phone}
          </Typography>
        </div>
      </div>
    </div>

    <div>
      <Typography variant="h6" className="mb-3 text-black dark:text-white">
        Company Documents
      </Typography>
      <DocumentList documents={data.documents} />
    </div>
  </div>
);

const UserOverviewModal = ({ isOpen, onClose }) => {
  const userData = mockUserData; // In real app, this would come from your user context or props

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="User Overview"
      className={clsx(
        'w-full max-w-4xl p-6',
        'bg-[#FDFDFB] dark:bg-[#191919]',
        'text-black dark:text-white',
        'border border-[#D8D8D8] dark:border-[#363638]'
      )}
    >
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <Typography variant="h5" className="text-black dark:text-white">
            {userData.type === 'individual' ? 'Individual Profile' : 'Enterprise Profile'}
          </Typography>
          <StatusBadge status={userData[userData.type].kycStatus} />
        </div>

        {userData.type === 'individual' ? (
          <IndividualDetails data={userData.individual} />
        ) : (
          <EnterpriseDetails data={userData.enterprise} />
        )}

        <div className="flex justify-end">
          <Button
            variant="outline"
            onClick={onClose}
            className="border-[#D8D8D8] dark:border-[#363638] text-black dark:text-white"
          >
            Close
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default UserOverviewModal; 