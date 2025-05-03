import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Calendar } from "@/components/ui/calendar";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CalendarIcon, PlusIcon } from "lucide-react";
import { Textarea } from "../ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { STATUS_OPTIONS } from "@/lib/helper-table";
import { fetchAPI } from "@/lib/API/auth";
import { format } from "date-fns";
import { ApiResponseForJobApplications } from "@/types/API-types";
import { toast } from "sonner";

// Skema validasi menggunakan Zod
const formSchema = z.object({
  company_name: z.string().min(1, "Nama perusahaan wajib diisi"),
  job_position: z.string().min(1, "Posisi pekerjaan wajib diisi"),
  job_portal: z.string().min(1, "Portal pekerjaan wajib diisi"),
  application_date: z.date({
    required_error: "Tanggal aplikasi wajib diisi",
  }),
  status_id: z.string().min(1, "Status aplikasi wajib dipilih"),
  notes: z.string().optional(),
});

// Tipe data untuk form

const JobApplicationForm = () => {
  const queryClient = useQueryClient();
  const [open, setOpen] = useState(false);

  type FormData = z.infer<typeof formSchema>;
  // Inisialisasi react-hook-form
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      company_name: "",
      job_position: "",
      job_portal: "",
      notes: "",
    },
  });

  // Ambil nilai application_date untuk ditampilkan di datepicker
  const selectedDate = watch("application_date");

  const addNewJobApplication = async (
    data: FormData
  ): Promise<ApiResponseForJobApplications> => {
    const BASE_URL = process.env.REACT_APP_API_BASE_URL;

    return await fetchAPI<ApiResponseForJobApplications>(
      `${BASE_URL}/job-applications`,
      "POST",
      true,
      {
        body: JSON.stringify(data),
      }
    );
  };

  // Mutasi untuk mengirim data ke API
  const mutation = useMutation({
    mutationFn: addNewJobApplication,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["jobApplications"] });
      reset();
      toast(`${data.message}! 🥰`, {
        position: "top-right",
      });
      setOpen(false);
    },
    onError: (error) => {
      toast(`Create new application failed!`, {
        description: error.message,
        position: "top-right",
      });
      console.error("Gagal menyimpan lamaran", error);
    },
  });

  // Handler untuk submit form
  const onSubmit = (data: FormData) => {
    mutation.mutate(data);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button title="Add new application">
          <PlusIcon />{" "}
          <span className="hidden sm:block">Add new application</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] max-h-[90vh] overflow-y-auto my-4">
        <DialogHeader>
          <DialogTitle>Create new application</DialogTitle>
          <DialogDescription>
            Create a new job application. Click save after completion.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4 py-4">
          <div className="flex flex-col justify-around items-start gap-4">
            <Label htmlFor="company_name" className="text-right">
              Company Name
            </Label>
            <Input
              id="company_name"
              placeholder="TLX Company"
              {...register("company_name")}
              className="col-span-3"
            />
            {errors.company_name && (
              <p className="text-red-500 text-sm">
                {errors.company_name.message}
              </p>
            )}
          </div>
          <div className="flex flex-col justify-around items-start gap-4">
            <Label htmlFor="job_position" className="text-right">
              Job Position
            </Label>
            <Input
              id="job_position"
              placeholder="Junior front-end"
              {...register("job_position")}
              className="col-span-3"
            />
            {errors.job_position && (
              <p className="text-red-500 text-sm">
                {errors.job_position.message}
              </p>
            )}
          </div>
          <div className="flex flex-col justify-around items-start gap-4">
            <Label htmlFor="job_portal" className="text-right">
              Job portal
            </Label>
            <Input
              id="job_portal"
              placeholder="Glints"
              {...register("job_portal")}
              className="col-span-3"
            />
            {errors.job_portal && (
              <p className="text-red-500 text-sm">
                {errors.job_portal.message}
              </p>
            )}
          </div>
          <div className="flex flex-col justify-around items-start gap-4">
            <Label htmlFor="application_date" className="text-right">
              Application date
            </Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={"outline"}
                  className={`w-full pl-3 text-left font-normal",
                    ${!selectedDate && "text-muted-foreground"}`}
                >
                  {selectedDate ? (
                    format(selectedDate, "PPP")
                  ) : (
                    <span>Pick a date</span>
                  )}
                  <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  className="z-50 pointer-events-auto "
                  mode="single"
                  onSelect={(date) => {
                    if (date) setValue("application_date", date);
                  }}
                  disabled={(date) =>
                    date > new Date() || date < new Date("1900-01-01")
                  }
                  initialFocus
                />
              </PopoverContent>
            </Popover>
            {errors.application_date && (
              <p className="text-red-500 text-sm">
                {errors.application_date.message}
              </p>
            )}
          </div>
          <div className="flex flex-col justify-around items-start gap-4">
            <Label htmlFor="status_id" className="text-right">
              Application status
            </Label>
            <Select
              onValueChange={(value) => setValue("status_id", value)}
              {...register("status_id")}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Pilih status aplikasi" />
              </SelectTrigger>
              <SelectContent>
                {STATUS_OPTIONS.map((status, idx) => {
                  const key = Object.keys(status)[0];
                  const value = Object.values(status)[0];
                  return key !== "All" ? (
                    <SelectItem key={idx} value={value.toString()}>
                      {key}
                    </SelectItem>
                  ) : null;
                })}
              </SelectContent>
            </Select>
            {errors.status_id && (
              <p className="text-red-500 text-sm">{errors.status_id.message}</p>
            )}
          </div>
          <div className="flex flex-col justify-around items-start gap-4">
            <Label htmlFor="notes" className="text-right">
              Notes
            </Label>
            <Textarea
              id="notes"
              placeholder="Your notes..."
              {...register("notes")}
              className="col-span-3"
            />
          </div>
          <DialogFooter>
            <Button type="submit" disabled={mutation.isPending}>
              {mutation.isPending ? "Menyimpan..." : "Simpan"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default JobApplicationForm;
