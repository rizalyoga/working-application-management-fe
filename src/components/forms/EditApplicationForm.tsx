import { useEffect } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Calendar } from "@/components/ui/calendar";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CalendarIcon } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
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
import {
  ApiResponseForJobApplicationByID,
  ApiResponseForJobApplications,
} from "@/types/API-types";
import { toast } from "sonner";
import { formApplicationSchema } from "@/lib/form-validator/application-form-validator";

interface EditApplicationModalProps {
  jobApplicationId: string;
  isOpen: boolean;
  onClose: () => void;
}

const EditJobApplicationForm = ({
  jobApplicationId,
  isOpen,
  onClose,
}: EditApplicationModalProps) => {
  type FormData = z.infer<typeof formApplicationSchema>;
  const queryClient = useQueryClient();
  const BASE_URL = process.env.REACT_APP_API_BASE_URL;

  const { data, isLoading, error } = useQuery<ApiResponseForJobApplicationByID>(
    {
      queryKey: ["jobApplications", jobApplicationId],
      queryFn: () =>
        fetchAPI<ApiResponseForJobApplicationByID>(
          `${BASE_URL}/job-applications/${jobApplicationId}`,
          "GET",
          true
        ),
    }
  );

  // Inisialisasi react-hook-form
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(formApplicationSchema),
    defaultValues: {
      company_name: "",
      job_position: "",
      job_portal: "",
      job_url: "",
      notes: "",
      status_id: "",
      application_date: undefined,
    },
  });

  // Isi form dengan data dari API saat data tersedia
  useEffect(() => {
    if (data?.data) {
      setValue("company_name", data.data.company_name || "");
      setValue("job_position", data.data.job_position || "");
      setValue("job_portal", data.data.job_portal || "");
      setValue("job_url", data.data.job_url || "");
      setValue("notes", data.data.notes || "");
      setValue("status_id", data.data.status_id?.toString() || "");
      if (data.data.application_date) {
        setValue("application_date", new Date(data.data.application_date));
      }
    }
  }, [data, setValue]);

  // Reset form saat modal ditutup
  useEffect(() => {
    if (!isOpen) {
      reset();
    }
  }, [isOpen, reset]);

  // Tampilkan error jika gagal mengambil data
  useEffect(() => {
    if (error) {
      toast(`Failed to load application data!`, {
        description: error.message,
        position: "bottom-right",
      });
    }
  }, [error]);

  // Ambil nilai application_date untuk ditampilkan di datepicker
  const selectedDate = watch("application_date");

  const updateJobApplication = async (
    data: FormData
  ): Promise<ApiResponseForJobApplications> => {
    return await fetchAPI<ApiResponseForJobApplications>(
      `${BASE_URL}/job-applications/${jobApplicationId}`,
      "PUT",
      true,
      {
        body: JSON.stringify(data),
      }
    );
  };

  // Mutasi untuk mengirim data ke API
  const mutation = useMutation({
    mutationFn: updateJobApplication,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["jobApplications"] });
      reset();
      toast(`${data.message}! 🥰`, {
        position: "bottom-right",
      });
      onClose();
    },
    onError: (error) => {
      toast(`Failed to update application!  😢`, {
        description: error.message,
        position: "bottom-right",
      });
      console.error("Failed to update application", error);
    },
  });

  // Handler untuk submit form
  const onSubmit = (data: FormData) => {
    mutation.mutate(data);
  };

  // Komponen skeleton untuk loading state
  const SkeletonLoader = () => (
    <div className="animate-pulse">
      <div className="space-y-4">
        {[...Array(6)].map((_, index) => (
          <div
            key={index}
            className="flex flex-col justify-around items-start gap-4"
          >
            <div className="h-4 bg-gray-200 rounded w-1/4"></div>
            <div className="h-10 bg-gray-200 rounded w-full"></div>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent
        onInteractOutside={(e) => e.preventDefault()}
        className="sm:max-w-[500px] bg-primary-foreground rounded-xl shadow-2xl p-6 max-h-[90vh] overflow-y-auto my-4"
      >
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-primary">
            Edit Application
          </DialogTitle>
          <DialogDescription className="text-primary">
            Update the job application details below and save when complete.
          </DialogDescription>
        </DialogHeader>
        {isLoading ? (
          <SkeletonLoader />
        ) : (
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 py-4">
            <div className="flex flex-col justify-around items-start gap-4">
              <Label htmlFor="company_name" className="text-right">
                Company Name*
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
                Job Position*
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
                Job Portal*
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
              <Label htmlFor="job_url" className="text-right">
                Job URL
              </Label>
              <Input
                id="job_url"
                placeholder="https://job_vacancies.com"
                {...register("job_url")}
                className="col-span-3"
              />
              {errors.job_url && (
                <p className="text-red-500 text-sm">{errors.job_url.message}</p>
              )}
            </div>
            <div className="flex flex-col justify-around items-start gap-4">
              <Label htmlFor="application_date" className="text-right">
                Application Date*
              </Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={`w-full pl-3 text-left font-normal ${
                      !selectedDate && "text-muted-foreground"
                    }`}
                  >
                    {selectedDate ? (
                      format(selectedDate, "PPP")
                    ) : (
                      <span>Select a date</span>
                    )}
                    <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    className="pointer-events-auto "
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
                Application Status*
              </Label>
              <Select
                onValueChange={(value) => setValue("status_id", value)}
                value={watch("status_id")}
              >
                <SelectTrigger className="col-span-3 w-full">
                  <SelectValue
                    className="placeholder:text-primary"
                    placeholder={data?.data.status}
                  />
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
                <p className="text-red-500 text-sm">
                  {errors.status_id.message}
                </p>
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
              <DialogClose asChild>
                <Button type="button" variant="secondary">
                  Cancel
                </Button>
              </DialogClose>
              <Button
                type="submit"
                disabled={mutation.isPending}
                className="px-6 py-2 bg-primary text-primary-foreground hover:bg-primary/30 transition-colors duration-200 rounded-lg"
              >
                {mutation.isPending ? "Saving..." : "Save"}
              </Button>
            </DialogFooter>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default EditJobApplicationForm;
