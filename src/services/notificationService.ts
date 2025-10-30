import apiClient from "./apiClient";
import type { AuthServiceResponse, Notification } from "@/types/api";

// GraphQL Queries and Mutations
const GRAPHQL_QUERIES = {
  GET_NOTIFICATIONS: `
    query GetNotifications {
      notifications {
        id
        title
        description
        status
        createdDate
      }
    }
  `,
  GET_NOTIFICATION_BY_ID: `
    query GetNotificationById($id: ID!) {
      notification(id: $id) {
        id
        title
        description
        status
        createdDate
      }
    }
  `,
};

// REST API Endpoints
const REST_ENDPOINTS = {
  GET_NOTIFICATIONS: "/notifications",
  GET_NOTIFICATION_BY_ID: "/notifications",
};

class NotificationService {
  private apiClient = apiClient;

  async getNotifications(): Promise<AuthServiceResponse<Notification[]>> {
    try {
      let response: Notification[];
      if (this.apiClient.type === "GRAPHQL") {
        const result = await this.apiClient.request<{ notifications: Notification[] }>({
          query: GRAPHQL_QUERIES.GET_NOTIFICATIONS,
        });
        response = result.notifications;
      } else {
        response = await this.apiClient.request<Notification[]>({
          method: "GET",
          url: REST_ENDPOINTS.GET_NOTIFICATIONS,
        });
      }
      return { success: true, data: response };
    } catch (error) {
      return {
        success: false,
        message: error instanceof Error ? error.message : "Failed to fetch notifications",
      };
    }
  }

  async getNotificationById(id: string): Promise<AuthServiceResponse<Notification>> {
    try {
      let response: Notification;
      if (this.apiClient.type === "GRAPHQL") {
        const result = await this.apiClient.request<{ notification: Notification }>({
          query: GRAPHQL_QUERIES.GET_NOTIFICATION_BY_ID,
          variables: { id },
        });
        response = result.notification;
      } else {
        response = await this.apiClient.request<Notification>({
          method: "GET",
          url: `${REST_ENDPOINTS.GET_NOTIFICATION_BY_ID}/${id}`,
        });
      }
      return { success: true, data: response };
    } catch (error) {
      return {
        success: false,
        message: error instanceof Error ? error.message : "Failed to fetch notification",
      };
    }
  }
}

const notificationService = new NotificationService();
export default notificationService;
