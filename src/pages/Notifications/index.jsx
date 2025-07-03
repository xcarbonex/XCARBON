import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Typography } from '@/components';
import { IoNotificationsOutline, IoCheckmarkCircleOutline, IoWarningOutline, IoInformationCircleOutline } from 'react-icons/io5';
import clsx from 'clsx';
import { notifications } from '@/appData';
const NotificationsPage = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('all');

  // Sample notification data - replace with actual data


  const tabs = [
    { id: 'all', label: 'All' },
    { id: 'unread', label: 'Unread' },
    { id: 'transaction', label: 'Transaction' },
    { id: 'system', label: 'System' },
  ];

  const filteredNotifications = notifications.filter(notification => {
    if (activeTab === 'all') return true;
    if (activeTab === 'unread') return !notification.read;
    return notification.type === activeTab;
  });

  const getIcon = (type) => {
    switch (type) {
      case 'transaction':
        return <IoCheckmarkCircleOutline className="w-6 h-6 text-green-500" />;
      case 'system':
        return <IoWarningOutline className="w-6 h-6 text-yellow-500" />;
      default:
        return <IoInformationCircleOutline className="w-6 h-6 text-blue-500" />;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <IoNotificationsOutline className="w-6 h-6 text-gray-700 dark:text-gray-300" />
          <Typography variant="h4" className="text-gray-900 dark:text-white">
            Notifications
          </Typography>
        </div>
        <button
          onClick={() => {/* Mark all as read logic */}}
          className="text-sm text-[#4C6663] hover:underline self-end sm:self-auto"
        >
          Mark all as read
        </button>
      </div>

      {/* Notification Filters */}
      <div className="flex gap-2 border-b border-gray-200 dark:border-gray-700 overflow-x-auto">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={clsx(
              'px-4 py-2 text-sm whitespace-nowrap transition-colors',
              activeTab === tab.id
                ? 'border-b-2 border-[#4C6663] text-[#4C6663] dark:text-[#6A8A87]'
                : 'text-gray-500 dark:text-gray-400 hover:text-[#4C6663] dark:hover:text-[#6A8A87]'
            )}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Notifications List */}
      <div className="space-y-4">
        {filteredNotifications.length === 0 ? (
          <div className="text-center py-12">
            <Typography variant="body1" className="text-gray-500 dark:text-gray-400">
              No notifications found
            </Typography>
          </div>
        ) : (
          filteredNotifications.map((notification) => (
            <div
              key={notification.id}
              onClick={() => navigate(`/notifications/${notification.id}`)}
              className={clsx(
                'bg-secondary rounded-lg shadow-sm px-3 py-4',
                'border ',
                'cursor-pointer hover:shadow-md transition-shadow',
                'relative'
              )}
            >
              <div className="flex gap-4">
                <div className="flex-shrink-0 mt-1">
                  {getIcon(notification.type)}
                </div>
                <div className="flex-grow min-w-0">
                  <div className="flex items-start justify-between gap-x-4">
                    <Typography
                      variant="h6"
                      className={clsx(
                        'text-gray-900 dark:text-white mb-1',
                        !notification.read && 'font-semibold'
                      )}
                    >
                      {notification.title}
                    </Typography>
                    <Typography
                      variant="body2"
                      className="text-gray-500 dark:text-gray-400 whitespace-nowrap flex-shrink-0"
                    >
                      {new Date(notification.date).toLocaleString()}
                    </Typography>
                  </div>
                  <Typography
                    variant="body2"
                    className="text-gray-600 dark:text-gray-300 line-clamp-2"
                  >
                    {notification.message}
                  </Typography>
                </div>
              </div>
              {!notification.read && (
                <div className="absolute top-2 right-3 w-2 h-2 rounded-full bg-[#467570]" />
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default NotificationsPage; 