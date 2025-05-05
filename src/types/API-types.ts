import { JobApplication } from "./job-application-types";

export interface APIResponse {
  status: "success" | "error";
  status_code: number;
  message?: string;
  data?: any;
}

export interface ApiResponseForJobApplications {
  status: string;
  status_code: number;
  message: string;
  data: JobApplication[];
}

export interface ApiResponseForJobApplicationByID {
  status: string;
  status_code: number;
  message: string;
  data: JobApplication;
}

// Interface untuk response refresh token
export interface RefreshTokenResponse {
  status: string;
  status_code: number;
  message: string;
  data: {
    tokens: {
      access_token: string;
      refresh_token: string;
      expires_in: number;
    };
  };
}

// Interface untuk error response dari API
export interface ApiErrorResponse {
  status?: string;
  status_code?: number;
  message?: string;
}
