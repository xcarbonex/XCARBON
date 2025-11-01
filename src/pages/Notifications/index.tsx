import React, { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Typography, Drawer } from "@/components";
import {
  IoNotificationsOutline,
  IoCheckmarkCircleOutline,
  IoWarningOutline,
  IoInformationCircleOutline,
  IoSparkles,
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
    <div className="min-h-screen bg-gradient-to-br from-neutral-50 via-white to-accent-50/30 dark:from-neutral-950 dark:via-neutral-900 dark:to-accent-950/20">
      <div className="space-y-8">
        {/* Premium Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 rounded-2xl bg-white dark:bg-neutral-900 border-2 border-info-200 dark:border-info-800 shadow-lg">
          <div className="flex items-center gap-4">
            <div className="p-3 rounded-2xl bg-gradient-to-br from-info-500 to-info-600 shadow-lg shadow-info-500/30">
              <IoNotificationsOutline className="w-7 h-7 text-white" />
            </div>
            <div>
              <Typography variant="h4" className="text-gray-900 dark:text-white font-bold">
                Notifications
              </Typography>
              <span className="text-sm text-neutral-600 dark:text-neutral-400 font-medium">
                {filteredNotifications.filter((n: Notification) => !n.read).length} unread
              </span>
            </div>
          </div>
          <button
            onClick={() => {
              /* Mark all as read logic */
            }}
            className="px-4 py-2 rounded-xl bg-gradient-to-r from-success-100 to-success-200 dark:from-success-900/30 dark:to-success-800/30 text-success-700 dark:text-success-400 font-semibold hover:shadow-lg transition-all border-2 border-success-300 dark:border-success-700"
          >
            ✓ Mark all as read
          </button>
        </div>

        {/* Premium Notification Filters */}
        <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as TabType)}
              className={clsx(
                "px-5 py-2.5 rounded-xl text-sm font-bold whitespace-nowrap transition-all duration-200",
                activeTab === tab.id
                  ? "bg-gradient-to-r from-brand-600 to-brand-700 text-white shadow-lg shadow-brand-600/40"
                  : "bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-200 dark:hover:bg-neutral-700 border-2 border-neutral-200 dark:border-neutral-700"
              )}
            >
              {tab.label}
              {tab.id === "unread" && (
                <span className="ml-2 px-2 py-0.5 rounded-full bg-error-500 text-white text-xs">
                  {filteredNotifications.filter((n: Notification) => !n.read).length}
                </span>
              )}
            </button>
          ))}
        </div>

        {/* Premium Notifications List */}
        <div className="space-y-4">
          {filteredNotifications.length === 0 ? (
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-neutral-500/10 to-neutral-600/10 rounded-2xl blur-xl opacity-50" />
              <div className="relative text-center py-16 bg-white dark:bg-neutral-900 rounded-2xl border-2 border-neutral-200 dark:border-neutral-700 shadow-lg">
                <div className="inline-flex p-4 rounded-2xl bg-gradient-to-br from-neutral-100 to-neutral-200 dark:from-neutral-800 dark:to-neutral-700 shadow-lg mb-4">
                  <IoNotificationsOutline className="w-12 h-12 text-neutral-600 dark:text-neutral-400" />
                </div>
                <Typography variant="h6" className="text-gray-600 dark:text-gray-400 font-bold">
                  No notifications found
                </Typography>
              </div>
            </div>
          ) : (
            filteredNotifications.map((notification: Notification) => (
              <div
                key={notification.id}
                onClick={() => openNotificationDetail(notification.id)}
                className="relative group/notif"
              >
                {/* Outer glow on hover */}
                <div className={clsx(
                  "absolute inset-0 rounded-2xl blur-xl opacity-0 group-hover/notif:opacity-100 transition-opacity",
                  notification.type === "transaction" && "bg-gradient-to-r from-success-500/20 to-success-600/20",
                  notification.type === "system" && "bg-gradient-to-r from-warning-500/20 to-warning-600/20",
                  notification.type !== "transaction" && notification.type !== "system" && "bg-gradient-to-r from-info-500/20 to-info-600/20"
                )} />
                
                <div
                  className={clsx(
                    "relative bg-white dark:bg-neutral-900 rounded-2xl shadow-lg px-5 py-5",
                    "border-2 transition-all cursor-pointer",
                    notification.type === "transaction" && "border-success-200 dark:border-success-800 hover:border-success-300 dark:hover:border-success-700",
                    notification.type === "system" && "border-warning-200 dark:border-warning-800 hover:border-warning-300 dark:hover:border-warning-700",
                    notification.type !== "transaction" && notification.type !== "system" && "border-info-200 dark:border-info-800 hover:border-info-300 dark:hover:border-info-700",
                    !notification.read && "shadow-xl"
                  )}
                >
                  <div className="flex gap-4">
                    <div className="flex-shrink-0 mt-1">
                      <div className={clsx(
                        "p-3 rounded-xl shadow-lg",
                        notification.type === "transaction" && "bg-gradient-to-br from-success-100 to-success-200 dark:from-success-900/30 dark:to-success-800/30",
                        notification.type === "system" && "bg-gradient-to-br from-warning-100 to-warning-200 dark:from-warning-900/30 dark:to-warning-800/30",
                        notification.type !== "transaction" && notification.type !== "system" && "bg-gradient-to-br from-info-100 to-info-200 dark:from-info-900/30 dark:to-info-800/30"
                      )}>
                        {getIcon(notification.type)}
                      </div>
                    </div>
                    <div className="flex-grow min-w-0">
                      <div className="flex items-start justify-between gap-x-4 mb-2">
                        <Typography
                          variant="h6"
                          className={clsx(
                            "text-gray-900 dark:text-white",
                            !notification.read && "font-bold"
                          )}
                        >
                          {notification.title}
                        </Typography>
                        <Typography
                          variant="caption"
                          className="text-gray-600 dark:text-gray-400 whitespace-nowrap flex-shrink-0 font-medium"
                        >
                          {new Date(notification.date).toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'})}
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
                    <div className="absolute top-3 right-3 flex items-center gap-2 px-3 py-1 rounded-full bg-gradient-to-r from-brand-500 to-brand-600 shadow-lg">
                      <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
                      <span className="text-xs font-bold text-white">New</span>
                    </div>
                  )}
                </div>
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
