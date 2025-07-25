import apiClient from "./apiClient";

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
  constructor() {
    this.apiClient = apiClient;
  }

  async getNotifications() {
    try {
      let response;
      if (this.apiClient.type === "GRAPHQL") {
        response = await this.apiClient.request({
          query: GRAPHQL_QUERIES.GET_NOTIFICATIONS,
        });
        response = response.notifications;
      } else {
        response = await this.apiClient.request({
          method: "GET",
          url: REST_ENDPOINTS.GET_NOTIFICATIONS,
        });
      }
      return { success: true, data: response };
    } catch (error) {
      return { success: false, message: error.message };
    }
  }

  async getNotificationById(id) {
    try {
      let response;
      if (this.apiClient.type === "GRAPHQL") {
        response = await this.apiClient.request({
          query: GRAPHQL_QUERIES.GET_NOTIFICATION_BY_ID,
          variables: { id },
        });
        response = response.notification;
      } else {
        response = await this.apiClient.request({
          method: "GET",
          url: `${REST_ENDPOINTS.GET_NOTIFICATION_BY_ID}/${id}`,
        });
      }
      return { success: true, data: response };
    } catch (error) {
      return { success: false, message: error.message };
    }
  }
}

export default new NotificationService(); 