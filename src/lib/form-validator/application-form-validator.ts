import { z } from "zod";

export const formApplicationSchema = z.object({
  company_name: z.string().min(1, "Nama perusahaan wajib diisi"),
  job_position: z.string().min(1, "Posisi pekerjaan wajib diisi"),
  job_portal: z.string().min(1, "Portal pekerjaan wajib diisi"),
  application_date: z.date({
    required_error: "Tanggal aplikasi wajib diisi",
  }),
  status_id: z.string().min(1, "Status aplikasi wajib dipilih"),
  notes: z.string().optional(),
});
