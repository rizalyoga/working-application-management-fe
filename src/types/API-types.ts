export interface APIResponse {
  success: boolean;
  message?: string;
  data?: {
    status: "success" | "error";
    status_code: number;
    message: string;
    data?: any;
    errors?: any;
  };
}
