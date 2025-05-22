interface StatusHistory {
  changed_at: string;
  status_id: number;
  status: string;
}

// Interface untuk tipe data dari API
export interface JobApplication {
  id: string;
  application_date: string;
  job_position: string;
  job_portal: string;
  job_url: string;
  company_name: string;
  status: string;
  status_id: number;
  notes: string;
  status_history: StatusHistory[];
  created_at: string;
  updated_at: string;
}

export interface JobApplicationTableProps {
  data: JobApplication[] | undefined;
  statusFilter: string;
  onStatusChange: (value: string) => void;
}

export interface TotalApplicationDataBasedOnStatus {
  total_application: number;
  apply: number;
  screening: number;
  interview_hr: number;
  interview_hr_ii: number;
  hr_test: number;
  psychological_test: number;
  interview_user: number;
  interview_user_ii: number;
  technical_test: number;
  interview_C_level: number;
  interview_C_level_ii: number;
  interview_CEO: number;
  ignored_by_company: number;
  reject_cv: number;
  reject_interview_hr: number;
  reject_interview_user: number;
  reject_hr_test: number;
  reject_technical_test: number;
  reject: number;
  success: number;
  closed_vacancy: number;
}
