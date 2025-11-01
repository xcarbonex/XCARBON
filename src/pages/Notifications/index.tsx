import React, { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Typography, Drawer } from "@/components";
import {
  IoNotificationsOutline,
  IoCheckmarkCircleOutline,
  IoWarningOutline,
  IoInformationCircleOutline,
} from "react-icons/io5";
import clsx from "clsx";
import { notifications } from "@/appData";

interface Tab {
  id: string;
  label: string;
}

interface Notification {
  id: number;
  type: string;
  title: string;
  message: string;
  date: string;
  read: boolean;
  actionUrl?: string;
}

type TabType = "all" | "unread" | "transaction" | "system";

const NotificationsPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [activeTab, setActiveTab] = useState<TabType>("all");

  // Get notification ID from URL
  const notificationId = searchParams.get("detail");
  const isDrawerOpen = !!notificationId;

  const tabs: Tab[] = [
    { id: "all", label: "All" },
    { id: "unread", label: "Unread" },
    { id: "transaction", label: "Transaction" },
    { id: "system", label: "System" },
  ];

  const openNotificationDetail = (id: number) => {
    setSearchParams({ detail: id.toString() });
  };

  const closeDrawer = () => {
    setSearchParams({});
  };

  const filteredNotifications = notifications.filter((notification: Notification) => {
    if (activeTab === "all") return true;
    if (activeTab === "unread") return !notification.read;
    return notification.type === activeTab;
  });

  const getIcon = (type: string) => {
    switch (type) {
      case "transaction":
        return <IoCheckmarkCircleOutline className="w-6 h-6 text-green-500" />;
      case "system":
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
          onClick={() => {
            /* Mark all as read logic */
          }}
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
            onClick={() => setActiveTab(tab.id as TabType)}
            className={clsx(
              "px-4 py-2 text-sm whitespace-nowrap transition-colors",
              activeTab === tab.id
                ? "border-b-2 border-[#4C6663] text-[#4C6663] dark:text-[#6A8A87]"
                : "text-gray-500 dark:text-gray-400 hover:text-[#4C6663] dark:hover:text-[#6A8A87]"
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
          filteredNotifications.map((notification: Notification) => (
            <div
              key={notification.id}
              onClick={() => openNotificationDetail(notification.id)}
              className={clsx(
                "bg-secondary rounded-lg shadow-sm px-3 py-4",
                "border ",
                "cursor-pointer hover:shadow-md transition-shadow",
                "relative"
              )}
            >
              <div className="flex gap-4">
                <div className="flex-shrink-0 mt-1">{getIcon(notification.type)}</div>
                <div className="flex-grow min-w-0">
                  <div className="flex items-start justify-between gap-x-4">
                    <Typography
                      variant="h6"
                      className={clsx(
                        "text-gray-900 dark:text-white mb-1",
                        !notification.read && "font-semibold"
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

      {/* Notification Detail Drawer */}
      <NotificationDetailDrawer
        isOpen={isDrawerOpen}
        onClose={closeDrawer}
        notificationId={notificationId ? parseInt(notificationId) : null}
        allNotifications={notifications}
      />
    </div>
  );
};

// NotificationDetailDrawer Component
interface NotificationDetailDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  notificationId: number | null;
  allNotifications: Notification[];
}

const NotificationDetailDrawer: React.FC<NotificationDetailDrawerProps> = ({
  isOpen,
  onClose,
  notificationId,
  allNotifications,
}) => {
  const [, setSearchParams] = useSearchParams();

  const currentNotification = allNotifications.find((n) => n.id === notificationId);
  const currentIndex = allNotifications.findIndex((n) => n.id === notificationId);

  const hasPrevious = currentIndex > 0;
  const hasNext = currentIndex < allNotifications.length - 1;

  const navigateToPrevious = () => {
    if (hasPrevious) {
      const previousNotification = allNotifications[currentIndex - 1];
      setSearchParams({ detail: previousNotification.id.toString() });
    }
  };

  const navigateToNext = () => {
    if (hasNext) {
      const nextNotification = allNotifications[currentIndex + 1];
      setSearchParams({ detail: nextNotification.id.toString() });
    }
  };

  const getIcon = (type: string) => {
    switch (type) {
      case "transaction":
        return <IoCheckmarkCircleOutline className="w-8 h-8 text-green-500" />;
      case "system":
        return <IoWarningOutline className="w-8 h-8 text-yellow-500" />;
      default:
        return <IoInformationCircleOutline className="w-8 h-8 text-blue-500" />;
    }
  };

  if (!currentNotification) {
    return (
      <Drawer
        isOpen={isOpen}
        onClose={onClose}
        title="Notification Not Found"
        size="lg"
        anchor="right"
      >
        <div className="flex flex-col items-center justify-center py-12">
          <Typography variant="h5" className="text-gray-500 dark:text-gray-400">
            Notification not found
          </Typography>
        </div>
      </Drawer>
    );
  }

  return (
    <Drawer
      isOpen={isOpen}
      onClose={onClose}
      title="Notification Details"
      description={`${currentIndex + 1} of ${allNotifications.length} notifications`}
      size="lg"
      anchor="right"
      navigation={{
        onPrevious: hasPrevious ? navigateToPrevious : undefined,
        onNext: hasNext ? navigateToNext : undefined,
        hasPrevious,
        hasNext,
      }}
    >
      <div className="space-y-6">
        <div className="bg-secondary rounded-lg shadow-lg p-6 space-y-6 border border-neutral-200 dark:border-neutral-700">
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0">{getIcon(currentNotification.type)}</div>
            <div className="flex-grow">
              <Typography variant="h5" className="mb-2 text-tbase dark:text-white">
                {currentNotification.title}
              </Typography>
              <Typography variant="caption" className="text-gray-500 dark:text-gray-400">
                {new Date(currentNotification.date).toLocaleString()}
              </Typography>
              <div className="mt-2">
                <span
                  className={clsx(
                    "inline-block px-3 py-1 rounded-full text-xs font-medium",
                    currentNotification.type === "transaction" &&
                      "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
                    currentNotification.type === "system" &&
                      "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200",
                    currentNotification.type !== "transaction" &&
                      currentNotification.type !== "system" &&
                      "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
                  )}
                >
                  {currentNotification.type.charAt(0).toUpperCase() +
                    currentNotification.type.slice(1)}
                </span>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
            <Typography
              variant="body1"
              className="text-gray-700 dark:text-gray-300 whitespace-pre-wrap"
            >
              {currentNotification.message}
            </Typography>
          </div>

          {currentNotification.actionUrl && (
            <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
              <a
                href={currentNotification.actionUrl}
                className="inline-flex items-center px-4 py-2 bg-[#4C6663] text-white rounded-lg hover:bg-opacity-90 transition-colors"
              >
                View Details
              </a>
            </div>
          )}

          {/* Read Status Indicator */}
          <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
            <div className="flex items-center gap-2">
              <div
                className={clsx(
                  "w-2 h-2 rounded-full",
                  currentNotification.read ? "bg-gray-400" : "bg-[#467570]"
                )}
              />
              <Typography variant="caption" className="text-gray-500 dark:text-gray-400">
                {currentNotification.read ? "Read" : "Unread"}
              </Typography>
            </div>
          </div>
        </div>
      </div>
    </Drawer>
  );
};

export default NotificationsPage;
