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
