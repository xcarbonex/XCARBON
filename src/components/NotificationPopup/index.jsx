import React, { useState, useRef, useEffect } from 'react';
import { Typography } from '@/components';
import { Link } from 'react-router-dom';
import { IoNotificationsOutline } from 'react-icons/io5';
import clsx from 'clsx';
import { ScrollBarWrapper } from '@/components';

const NotificationPopup = () => {
  const [isOpen, setIsOpen] = useState(false);
  const popupRef = useRef(null);

  const notifications = [
    {
      id: 1,
      title: 'Transaction Completed',
      message: 'Your purchase of 100 carbon credits has been completed successfully.',
      date: '2024-03-20T10:30:00',
      read: false,
    },
    {
      id: 2,
      title: 'System Maintenance',
      message: 'Scheduled maintenance will occur on March 25th at 02:00 UTC.',
      date: '2024-03-19T15:45:00',
      read: true,
    },
    {
      id: 2,
      title: 'System Maintenance',
      message: 'Scheduled maintenance will occur on March 25th at 02:00 UTC.',
      date: '2024-03-19T15:45:00',
      read: true,
    },
    {
      id: 2,
      title: 'System Maintenance',
      message: 'Scheduled maintenance will occur on March 25th at 02:00 UTC.',
      date: '2024-03-19T15:45:00',
      read: true,
    },
    {
      id: 2,
      title: 'System Maintenance',
      message: 'Scheduled maintenance will occur on March 25th at 02:00 UTC.',
      date: '2024-03-19T15:45:00',
      read: true,
    },
    {
      id: 2,
      title: 'System Maintenance',
      message: 'Scheduled maintenance will occur on March 25th at 02:00 UTC.',
      date: '2024-03-19T15:45:00',
      read: true,
    },
  ];

  const unreadCount = notifications.filter(n => !n.read).length;

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (popupRef.current && !popupRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor((now - date) / (1000 * 60 * 60));
    
    if (diffInHours < 24) {
      return diffInHours === 0 ? 'Just now' : `${diffInHours}h ago`;
    }
    return date.toLocaleDateString();
  };

  return (
    <div className="relative" ref={popupRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2 hover:bg-black/10 rounded-full transition-colors duration-300"
        title="Notifications"
      >
        <IoNotificationsOutline className="w-6 h-6" />
        {unreadCount > 0 && (
          <span className="absolute top-1 right-1 w-4 h-4 bg-[#4C6663] text-white text-xs rounded-full flex items-center justify-center">
            {unreadCount}
          </span>
        )}
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-96 h-128 rounded-lg flex flex-col border bg-secondary drop-shadow z-50">
          <div className="p-4 border-b border">
            <div className="flex items-center justify-between">
              <Typography variant="h6">Notifications</Typography>
              <Link
                to="notifications"
                className="text-sm text-[#4C6663] hover:underline"
                onClick={() => setIsOpen(false)}
              >
                View All
              </Link>
            </div>
          </div>

          <ScrollBarWrapper className={'flex-1'}>
            {notifications.length > 0 ? (
              notifications.slice(0, 5).map((notification) => (
                <div
                  key={notification.id}
                  className={clsx(
                    'p-4 border-b hover:bg-black/10 cursor-pointer',
                    !notification.read && 'bg-black/5'
                  )}
                >
                  <div className="flex items-start gap-3">
                    <div className={clsx(
                      'w-2 h-2 mt-2 rounded-full flex-shrink-0',
                      notification.read ? 'bg-gray-300' : 'bg-[#4C6663]'
                    )} />
                    <div className="flex-1">
                      <Typography variant="body2" className="font-medium">
                        {notification.title}
                      </Typography>
                      <Typography variant="caption" className=" mt-1">
                        {notification.message}
                      </Typography>
                      <Typography variant="caption" className=" mt-2">
                        {formatDate(notification.date)}
                      </Typography>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="p-4 text-center text-gray-500">
                <Typography variant="body2">No notifications</Typography>
              </div>
            )}
            </ScrollBarWrapper>
        </div>
      )}
    </div>
  );
};

export default NotificationPopup; 