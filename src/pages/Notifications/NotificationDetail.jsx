import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Typography } from '@/components';
import { IoArrowBack, IoCheckmarkCircleOutline, IoWarningOutline, IoInformationCircleOutline } from 'react-icons/io5';
import { notifications } from '@/appData';

const NotificationDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  // console.log(notifications)
  const notification = notifications.find(n => n.id === parseInt(id)) || null;
  
  if (!notification) {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh]">
        <Typography variant="h5" className="text-gray-500 dark:text-gray-400">
          Notification not found
        </Typography>
        <button
          onClick={() => navigate('/notifications')}
          className="mt-4 text-[#4C6663] hover:underline flex items-center gap-2"
        >
          <IoArrowBack /> Back to notifications
        </button>
      </div>
    );
  }

  const getIcon = (type) => {
    switch (type) {
      case 'transaction':
        return <IoCheckmarkCircleOutline className="w-8 h-8 text-green-500" />;
      case 'system':
        return <IoWarningOutline className="w-8 h-8 text-yellow-500" />;
      default:
        return <IoInformationCircleOutline className="w-8 h-8 text-blue-500" />;
    }
  };

  return (
    <div className="space-y-6">
      <button
        onClick={() => navigate('/notifications')}
        className="text-[#4C6663] hover:underline flex items-center gap-2"
      >
        <IoArrowBack /> Back to notifications
      </button>
      
      <div className="bg-secondary rounded-lg shadow-lg p-6 space-y-6">
        <div className="flex items-start gap-4">
          <div className="flex-shrink-0">
            {getIcon(notification.type)}
          </div>
          <div className="flex-grow">
            <Typography variant="h5" className="mb-2 text-tbase dark:text-white">
              {notification.title}
            </Typography>
            <Typography variant="caption" className="text-gray-500 dark:text-gray-400">
              {new Date(notification.date).toLocaleString()}
            </Typography>
          </div>
        </div>

        <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
          <Typography variant="body1" className="text-gray-700 dark:text-gray-300 whitespace-pre-wrap">
            {notification.message}
          </Typography>
        </div>

        {notification.actionUrl && (
          <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
            <a
              href={notification.actionUrl}
              className="inline-flex items-center px-4 py-2 bg-[#4C6663] text-white rounded-lg hover:bg-opacity-90 transition-colors"
            >
              View Details
            </a>
          </div>
        )}
      </div>
    </div>
  );
};

export default NotificationDetail; 