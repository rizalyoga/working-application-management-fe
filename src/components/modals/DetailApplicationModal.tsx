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
import DetailModalSkeleton from "../skeletons/DetailModalSkeleton";

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
  const { data, error, isLoading } = useQuery<ApiResponseForJobApplicationByID>(
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

  if (error) {
    toast(`Failed to get data!`, {
      description: error.message,
      position: "top-right",
    });
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px] rounded-xl shadow-2xl p-6 transition-all duration-300 ease-in-out transform">
        <DialogHeader className="mb-4">
          <DialogTitle className="text-xl font-bold text-primary">
            {data?.data.job_position || "Job Application Details"}
          </DialogTitle>
          <DialogDescription className="mt-2">
            {isLoading ? (
              <DetailModalSkeleton />
            ) : (
              <>
                <table className="w-full text-left text-gray-600">
                  <tbody>
                    <tr className="border-b border-gray-200">
                      <th className="py-2 pr-4 font-semibold text-primary w-1/3">
                        Date
                      </th>
                      <td className="py-2 text-primary">
                        {formatDate(data?.data.application_date as string)}
                      </td>
                    </tr>
                    <tr className="border-b border-gray-200">
                      <th className="py-2 pr-4 font-semibold text-primary w-1/3">
                        Company
                      </th>
                      <td className="py-2 text-primary">
                        {data?.data.company_name}
                      </td>
                    </tr>
                    <tr className="border-b border-gray-200">
                      <th className="py-2 pr-4 font-semibold text-primary w-1/3">
                        Position
                      </th>
                      <td className="py-2 text-primary">
                        {data?.data.job_position}
                      </td>
                    </tr>
                    <tr className="border-b border-gray-200">
                      <th className="py-2 pr-4 font-semibold text-primary w-1/3">
                        Portal
                      </th>
                      <td className="py-2 text-primary">
                        {data?.data.job_portal}
                      </td>
                    </tr>
                    <tr className="border-b border-gray-200">
                      <th className="py-2 pr-4 font-semibold text-primary w-1/3">
                        Status
                      </th>
                      <td className="py-2">
                        <span
                          className={`inline-block px-2 py-1 rounded-full text-sm text-white ${getStatusVariant(
                            data?.data.status as string
                          )}`}
                        >
                          {data?.data.status}
                        </span>
                      </td>
                    </tr>
                  </tbody>
                </table>
                {data?.data.notes && (
                  <div className="mt-4">
                    <span className="font-semibold text-primary">Notes:</span>
                    <p className="mt-2 text-primary bg-secondary p-3 rounded-lg">
                      {data.data.notes}
                    </p>
                  </div>
                )}
              </>
            )}
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
