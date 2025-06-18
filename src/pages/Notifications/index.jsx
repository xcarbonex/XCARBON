import React, { useState } from 'react';
import { Typography, Table } from '@/components';
import { IoNotificationsOutline } from 'react-icons/io5';
import clsx from 'clsx';

const NotificationsPage = () => {
  const [activeTab, setActiveTab] = useState('all');

  // Sample notification data - replace with actual data
  const notifications = [
    {
      id: 1,
      type: 'transaction',
      title: 'Transaction Completed',
      message: 'Your purchase of 100 carbon credits has been completed successfully.',
      date: '2024-03-20T10:30:00',
      read: false,
    },
    {
      id: 2,
      type: 'system',
      title: 'System Maintenance',
      message: 'Scheduled maintenance will occur on March 25th at 02:00 UTC.',
      date: '2024-03-19T15:45:00',
      read: true,
    },
    // Add more sample notifications as needed
  ];

  const columns = [
    {
      header: '',
      accessorKey: 'read',
      cell: ({ row }) => (
        <div className={clsx(
          'w-2 h-2 rounded-full',
          row.original.read ? 'bg-gray-300' : 'bg-[#4C6663]'
        )} />
      ),
      size: 50,
    },
    {
      header: 'Title',
      accessorKey: 'title',
      cell: ({ row }) => (
        <div>
          <Typography variant="body1" className="font-medium">
            {row.original.title}
          </Typography>
          <Typography variant="body2" className="text-gray-500">
            {row.original.message}
          </Typography>
        </div>
      ),
    },
    {
      header: 'Date',
      accessorKey: 'date',
      cell: ({ row }) => (
        <Typography variant="body2" className="text-gray-500">
          {new Date(row.original.date).toLocaleString()}
        </Typography>
      ),
    },
  ];

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

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <IoNotificationsOutline className="w-8 h-8" />
          <Typography variant="h4">Notifications</Typography>
        </div>
        <button
          onClick={() => {/* Mark all as read logic */}}
          className="text-sm text-[#4C6663] hover:underline"
        >
          Mark all as read
        </button>
      </div>

      {/* Notification Filters */}
      <div className="flex gap-2 border-b border-[#363638]">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={clsx(
              'px-4 py-2 text-sm transition-colors',
              activeTab === tab.id
                ? 'border-b-2 border-[#4C6663] text-[#4C6663]'
                : 'text-gray-500 hover:text-[#4C6663]'
            )}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Notifications Table */}
      <div className="bg-secondary rounded-xl border shadow-lg">
        <Table
          columns={columns}
          data={filteredNotifications}
          showSearch={false}
          showPageSize
          defaultPageSize={10}
        />
      </div>
    </div>
  );
};

export default NotificationsPage; 