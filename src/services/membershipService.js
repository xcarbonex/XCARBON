import apiClient from "./apiClient";

// GraphQL Queries and Mutations
const GRAPHQL_QUERIES = {
  GET_CURRENT_PLAN: `
    query GetCurrentPlan {
      currentPlan {
        id
        type
        price
        discount
        description
      }
    }
  `,
  UPGRADE_PLAN: `
    mutation UpgradePlan($planId: ID!) {
      upgradePlan(planId: $planId) {
        success
        message
      }
    }
  `,
  GENERATE_OTP_KEY: `
    mutation GenerateOtpKey {
      generateOtpKey {
        success
        message
        otpKey
      }
    }
  `,
  CHANGE_EMAIL: `
    mutation ChangeEmail($newEmail: String!, $password: String!) {
      changeEmail(newEmail: $newEmail, password: $password) {
        success
        message
      }
    }
  `,
  RESET_PASSWORD: `
    mutation ResetPassword($email: String!) {
      resetPassword(email: $email) {
        success
        message
      }
    }
  `,
  UPDATE_PROFILE: `
    mutation UpdateProfile($input: UpdateProfileInput!) {
      updateProfile(input: $input) {
        success
        message
      }
    }
  `,
  DELETE_ACCOUNT: `
    mutation DeleteAccount($password: String!) {
      deleteAccount(password: $password) {
        success
        message
      }
    }
  `,
};

// REST API Endpoints
const REST_ENDPOINTS = {
  GET_CURRENT_PLAN: "/membership/current-plan",
  UPGRADE_PLAN: "/membership/upgrade-plan",
  GENERATE_OTP_KEY: "/membership/generate-otp-key",
  CHANGE_EMAIL: "/membership/change-email",
  RESET_PASSWORD: "/membership/reset-password",
  UPDATE_PROFILE: "/membership/update-profile",
  DELETE_ACCOUNT: "/membership/delete-account",
};

class MembershipService {
  constructor() {
    this.apiClient = apiClient;
  }

  async getCurrentPlan() {
    try {
      let response;
      if (this.apiClient.type === "GRAPHQL") {
        response = await this.apiClient.request({
          query: GRAPHQL_QUERIES.GET_CURRENT_PLAN,
        });
        response = response.currentPlan;
      } else {
        response = await this.apiClient.request({
          method: "GET",
          url: REST_ENDPOINTS.GET_CURRENT_PLAN,
        });
      }
      return { success: true, data: response };
    } catch (error) {
      return { success: false, message: error.message };
    }
  }

  async upgradePlan(planId) {
    try {
      let response;
      if (this.apiClient.type === "GRAPHQL") {
        response = await this.apiClient.request({
          query: GRAPHQL_QUERIES.UPGRADE_PLAN,
          variables: { planId },
        });
        response = response.upgradePlan;
      } else {
        response = await this.apiClient.request({
          method: "POST",
          url: REST_ENDPOINTS.UPGRADE_PLAN,
          data: { planId },
        });
      }
      return { success: true, data: response };
    } catch (error) {
      return { success: false, message: error.message };
    }
  }

  async generateOtpKey() {
    try {
      let response;
      if (this.apiClient.type === "GRAPHQL") {
        response = await this.apiClient.request({
          query: GRAPHQL_QUERIES.GENERATE_OTP_KEY,
        });
        response = response.generateOtpKey;
      } else {
        response = await this.apiClient.request({
          method: "POST",
          url: REST_ENDPOINTS.GENERATE_OTP_KEY,
        });
      }
      return { success: true, data: response };
    } catch (error) {
      return { success: false, message: error.message };
    }
  }

  async changeEmail(newEmail, password) {
    try {
      let response;
      if (this.apiClient.type === "GRAPHQL") {
        response = await this.apiClient.request({
          query: GRAPHQL_QUERIES.CHANGE_EMAIL,
          variables: { newEmail, password },
        });
        response = response.changeEmail;
      } else {
        response = await this.apiClient.request({
          method: "POST",
          url: REST_ENDPOINTS.CHANGE_EMAIL,
          data: { newEmail, password },
        });
      }
      return { success: true, data: response };
    } catch (error) {
      return { success: false, message: error.message };
    }
  }

  async resetPassword(email) {
    try {
      let response;
      if (this.apiClient.type === "GRAPHQL") {
        response = await this.apiClient.request({
          query: GRAPHQL_QUERIES.RESET_PASSWORD,
          variables: { email },
        });
        response = response.resetPassword;
      } else {
        response = await this.apiClient.request({
          method: "POST",
          url: REST_ENDPOINTS.RESET_PASSWORD,
          data: { email },
        });
      }
      return { success: true, data: response };
    } catch (error) {
      return { success: false, message: error.message };
    }
  }

  async updateProfile(input) {
    try {
      let response;
      if (this.apiClient.type === "GRAPHQL") {
        response = await this.apiClient.request({
          query: GRAPHQL_QUERIES.UPDATE_PROFILE,
          variables: { input },
        });
        response = response.updateProfile;
      } else {
        response = await this.apiClient.request({
          method: "PUT",
          url: REST_ENDPOINTS.UPDATE_PROFILE,
          data: input,
        });
      }
      return { success: true, data: response };
    } catch (error) {
      return { success: false, message: error.message };
    }
  }

  async deleteAccount(password) {
    try {
      let response;
      if (this.apiClient.type === "GRAPHQL") {
        response = await this.apiClient.request({
          query: GRAPHQL_QUERIES.DELETE_ACCOUNT,
          variables: { password },
        });
        response = response.deleteAccount;
      } else {
        response = await this.apiClient.request({
          method: "POST",
          url: REST_ENDPOINTS.DELETE_ACCOUNT,
          data: { password },
        });
      }
      return { success: true, data: response };
    } catch (error) {
      return { success: false, message: error.message };
    }
  }
}

export default new MembershipService(); 