import { z } from "zod";

export const eventSchema = z.object({
  title: z.string().min(1, "Judul kegiatan harus diisi").trim(),
  description: z.string().trim(),
  time: z.string().min(1, "Waktu harus diisi"),
});

export type EventFormData = z.infer<typeof eventSchema>;
