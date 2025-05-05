import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { fetchAPI } from "@/lib/API/auth";
import { toast } from "sonner";
import { ApiResponseForJobApplicationByID } from "@/types/API-types";
import { formatDate } from "@/lib/utils";
import { getStatusVariant } from "@/lib/helper-table";

interface DetailApplicationModalProps {
  jobApplicationId: string;
  isOpen: boolean;
  onClose: () => void;
}

const DetailApplicationModal = ({
  jobApplicationId,
  isOpen,
  onClose,
}: DetailApplicationModalProps) => {
  const BASE_URL = process.env.REACT_APP_API_BASE_URL;
  const { data, error } = useQuery<ApiResponseForJobApplicationByID>({
    queryKey: ["jobApplications", jobApplicationId],
    queryFn: () =>
      fetchAPI<ApiResponseForJobApplicationByID>(
        `${BASE_URL}/job-applications/${jobApplicationId}`,
        "GET",
        true
      ),
  });

  if (error) {
    toast(`Failed to get data!`, {
      description: error.message,
      position: "top-right",
    });
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px] bg-white rounded-xl shadow-2xl p-6 transition-all duration-300 ease-in-out transform">
        <DialogHeader className="mb-4">
          <DialogTitle className="text-2xl font-bold text-gray-800">
            {data?.data.job_position || "Job Application Details"}
          </DialogTitle>
          <DialogDescription className="mt-2">
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-primary">
                <span className="font-semibold ">Date:</span>
                <span>{formatDate(data?.data.application_date as string)}</span>
              </div>
              <div className="flex items-center gap-2 text-primary">
                <span className="font-semibold ">Company:</span>
                <span>{data?.data.company_name}</span>
              </div>
              <div className="flex items-center gap-2 text-primary">
                <span className="font-semibold ">Position:</span>
                <span>{data?.data.job_position}</span>
              </div>
              <div className="flex items-center gap-2 text-primary">
                <span className="font-semibold ">Portal:</span>
                <span>{data?.data.job_portal}</span>
              </div>
              <div className="flex items-center gap-2 text-primary">
                <span className="font-semibold ">Status:</span>
                <span
                  className={`inline-block px-2 py-1 rounded-full text-sm text-white ${getStatusVariant(
                    data?.data?.status as string
                  )}`}
                >
                  {data?.data.status}
                </span>
              </div>
              {data?.data.notes && (
                <div className="mt-4 text-primary">
                  <span className="font-semibold ">Notes:</span>
                  <p className="mt-1 bg-gray-50 p-3 rounded-lg ">
                    {data.data.notes}
                  </p>
                </div>
              )}
            </div>
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="mt-6">
          <Button variant="outline" onClick={onClose}>
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DetailApplicationModal;
