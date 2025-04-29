export interface APIResponse {
  status: "success" | "error";
  status_code: number;
  message?: string;
  data?: any;
}

// Interface untuk tipe data dari API
export interface JobApplication {
  id: string;
  application_date: string;
  job_position: string;
  job_portal: string;
  company_name: string;
  status: string;
  status_id: number;
  notes: string;
  created_at: string;
  updated_at: string;
}

export interface ApiResponseForJobApplications {
  status: string;
  status_code: number;
  message: string;
  data: JobApplication[];
}
