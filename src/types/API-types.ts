export interface APIResponse {
  status: "success" | "error";
  status_code: number;
  message?: string;
  data?: any;
}
