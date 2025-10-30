import apiClient from "./apiClient";
import type { AuthServiceResponse } from "@/types/api";

interface CurrentPlan {
  id: string;
  type: string;
  price: number;
  discount: number;
  description: string;
}

interface MutationResponse {
  success: boolean;
  message: string;
}

interface GenerateOtpResponse extends MutationResponse {
  otpKey?: string;
}

interface UpdateProfileInput {
  [key: string]: unknown;
}

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
  private apiClient = apiClient;

  async getCurrentPlan(): Promise<AuthServiceResponse<CurrentPlan>> {
    try {
      let response: CurrentPlan;
      if (this.apiClient.type === "GRAPHQL") {
        const result = await this.apiClient.request<{ currentPlan: CurrentPlan }>({
          query: GRAPHQL_QUERIES.GET_CURRENT_PLAN,
        });
        response = result.currentPlan;
      } else {
        response = await this.apiClient.request<CurrentPlan>({
          method: "GET",
          url: REST_ENDPOINTS.GET_CURRENT_PLAN,
        });
      }
      return { success: true, data: response };
    } catch (error) {
      return {
        success: false,
        message: error instanceof Error ? error.message : "Failed to fetch current plan",
      };
    }
  }

  async upgradePlan(planId: string): Promise<AuthServiceResponse<MutationResponse>> {
    try {
      let response: MutationResponse;
      if (this.apiClient.type === "GRAPHQL") {
        const result = await this.apiClient.request<{ upgradePlan: MutationResponse }>({
          query: GRAPHQL_QUERIES.UPGRADE_PLAN,
          variables: { planId },
        });
        response = result.upgradePlan;
      } else {
        response = await this.apiClient.request<MutationResponse>({
          method: "POST",
          url: REST_ENDPOINTS.UPGRADE_PLAN,
          data: { planId },
        });
      }
      return { success: true, data: response };
    } catch (error) {
      return {
        success: false,
        message: error instanceof Error ? error.message : "Failed to upgrade plan",
      };
    }
  }

  async generateOtpKey(): Promise<AuthServiceResponse<GenerateOtpResponse>> {
    try {
      let response: GenerateOtpResponse;
      if (this.apiClient.type === "GRAPHQL") {
        const result = await this.apiClient.request<{ generateOtpKey: GenerateOtpResponse }>({
          query: GRAPHQL_QUERIES.GENERATE_OTP_KEY,
        });
        response = result.generateOtpKey;
      } else {
        response = await this.apiClient.request<GenerateOtpResponse>({
          method: "POST",
          url: REST_ENDPOINTS.GENERATE_OTP_KEY,
        });
      }
      return { success: true, data: response };
    } catch (error) {
      return {
        success: false,
        message: error instanceof Error ? error.message : "Failed to generate OTP key",
      };
    }
  }

  async changeEmail(
    newEmail: string,
    password: string
  ): Promise<AuthServiceResponse<MutationResponse>> {
    try {
      let response: MutationResponse;
      if (this.apiClient.type === "GRAPHQL") {
        const result = await this.apiClient.request<{ changeEmail: MutationResponse }>({
          query: GRAPHQL_QUERIES.CHANGE_EMAIL,
          variables: { newEmail, password },
        });
        response = result.changeEmail;
      } else {
        response = await this.apiClient.request<MutationResponse>({
          method: "POST",
          url: REST_ENDPOINTS.CHANGE_EMAIL,
          data: { newEmail, password },
        });
      }
      return { success: true, data: response };
    } catch (error) {
      return {
        success: false,
        message: error instanceof Error ? error.message : "Failed to change email",
      };
    }
  }

  async resetPassword(email: string): Promise<AuthServiceResponse<MutationResponse>> {
    try {
      let response: MutationResponse;
      if (this.apiClient.type === "GRAPHQL") {
        const result = await this.apiClient.request<{ resetPassword: MutationResponse }>({
          query: GRAPHQL_QUERIES.RESET_PASSWORD,
          variables: { email },
        });
        response = result.resetPassword;
      } else {
        response = await this.apiClient.request<MutationResponse>({
          method: "POST",
          url: REST_ENDPOINTS.RESET_PASSWORD,
          data: { email },
        });
      }
      return { success: true, data: response };
    } catch (error) {
      return {
        success: false,
        message: error instanceof Error ? error.message : "Failed to reset password",
      };
    }
  }

  async updateProfile(input: UpdateProfileInput): Promise<AuthServiceResponse<MutationResponse>> {
    try {
      let response: MutationResponse;
      if (this.apiClient.type === "GRAPHQL") {
        const result = await this.apiClient.request<{ updateProfile: MutationResponse }>({
          query: GRAPHQL_QUERIES.UPDATE_PROFILE,
          variables: { input },
        });
        response = result.updateProfile;
      } else {
        response = await this.apiClient.request<MutationResponse>({
          method: "PUT",
          url: REST_ENDPOINTS.UPDATE_PROFILE,
          data: input,
        });
      }
      return { success: true, data: response };
    } catch (error) {
      return {
        success: false,
        message: error instanceof Error ? error.message : "Failed to update profile",
      };
    }
  }

  async deleteAccount(password: string): Promise<AuthServiceResponse<MutationResponse>> {
    try {
      let response: MutationResponse;
      if (this.apiClient.type === "GRAPHQL") {
        const result = await this.apiClient.request<{ deleteAccount: MutationResponse }>({
          query: GRAPHQL_QUERIES.DELETE_ACCOUNT,
          variables: { password },
        });
        response = result.deleteAccount;
      } else {
        response = await this.apiClient.request<MutationResponse>({
          method: "POST",
          url: REST_ENDPOINTS.DELETE_ACCOUNT,
          data: { password },
        });
      }
      return { success: true, data: response };
    } catch (error) {
      return {
        success: false,
        message: error instanceof Error ? error.message : "Failed to delete account",
      };
    }
  }
}

const membershipService = new MembershipService();
export default membershipService;
