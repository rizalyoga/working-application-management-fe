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
import {
  Building2,
  CalendarDays,
  ExternalLink,
  HardHat,
  Info,
  NotepadText,
  Proportions,
  SquareStack,
} from "lucide-react";
import { fetchAPI } from "@/lib/API/auth";
import { toast } from "sonner";
import { ApiResponseForJobApplicationByID } from "@/types/API-types";
import {
  capitalizeFirstChar,
  formatDate,
  formatDateWithTime,
} from "@/lib/utils";
import { getStatusVariant } from "@/lib/helper-table";
import DetailModalSkeleton from "../skeletons/DetailModalSkeleton";
import { Link } from "react-router";

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
      <DialogContent className="sm:max-w-[500px] rounded-xl shadow-2xl p-6 transition-all overflow-y-auto duration-300 ease-in-out transform bg-primary-foreground max-h-[90vh] my-4">
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
                      <th className="py-2 pr-4 font-semibold text-primary w-1/3 ">
                        <span className="flex justify-start items-center gap-2">
                          <CalendarDays size={20} />
                          Date
                        </span>
                      </th>
                      <td className="py-2 text-primary">
                        {formatDate(data?.data.application_date as string)}
                      </td>
                    </tr>
                    <tr className="border-b border-gray-200">
                      <th className="py-2 pr-4 font-semibold text-primary w-1/3">
                        <span className="flex justify-start items-center gap-2">
                          <Building2 size={20} />
                          Company
                        </span>
                      </th>
                      <td className="py-2 text-primary">
                        {data?.data.company_name}
                      </td>
                    </tr>
                    <tr className="border-b border-gray-200">
                      <th className="py-2 pr-4 font-semibold text-primary w-1/3">
                        <span className="flex justify-start items-center gap-2">
                          <HardHat size={20} />
                          Position
                        </span>
                      </th>
                      <td className="py-2 text-primary">
                        {data?.data.job_position}
                      </td>
                    </tr>
                    <tr className="border-b border-gray-200">
                      <th className="py-2 pr-4 font-semibold text-primary w-1/3">
                        <span className="flex justify-start items-center gap-2">
                          <Proportions size={20} />
                          Job Portal
                        </span>
                      </th>
                      <td className="py-2 text-primary">
                        {data?.data.job_portal}
                      </td>
                    </tr>
                    <tr className="border-b border-gray-200">
                      <th className="py-2 pr-4 font-semibold text-primary w-1/3">
                        <span className="flex justify-start items-center gap-2">
                          <ExternalLink size={20} />
                          Job URL
                        </span>
                      </th>
                      <td className="py-2 overflow-hidden">
                        {data?.data.job_url ? (
                          <Link
                            to={data?.data.job_url as string}
                            target="_blank"
                            className="truncate text-blue-500 hover:text-blue-600 "
                          >
                            {data?.data.job_url ? "See job vacancies" : "-"}
                          </Link>
                        ) : (
                          "-"
                        )}
                      </td>
                    </tr>
                    <tr className="border-b border-gray-200">
                      <th className="py-2 pr-4 font-semibold text-primary w-1/3">
                        <span className="flex justify-start items-center gap-2">
                          <Info size={20} />
                          Status
                        </span>
                      </th>
                      <td className="py-2">
                        <span
                          className={`inline-block px-2 py-1 rounded-sm text-sm font-semibold text-primary-foreground ${getStatusVariant(
                            data?.data.status as string
                          )}`}
                        >
                          {capitalizeFirstChar(data?.data.status as string)}
                        </span>
                      </td>
                    </tr>
                  </tbody>
                </table>
                {data?.data.notes && (
                  <div className="mt-4">
                    <span className="font-semibold text-primary flex justify-start items-center gap-2">
                      <NotepadText size={20} /> Notes:
                    </span>
                    <div className="mt-4 text-primary bg-secondary p-3 rounded-lg border">
                      {data.data.notes}
                    </div>
                  </div>
                )}
                {data?.data.status_history.length !== 0 && (
                  <div className="mt-6">
                    <h3 className="font-semibold text-primary flex justify-start items-center gap-2 mb-5">
                      <SquareStack size={20} />
                      Status History
                    </h3>
                    <div className="space-y-4">
                      {data?.data.status_history.map((history) => (
                        <div
                          key={history.changed_at}
                          className="relative pl-6 pr-4 py-3 bg-white dark:bg-black border-l-4 border-primary/20 rounded-r-lg shadow-sm hover:shadow-md transition-all duration-300 ease-in-out transform hover:-translate-y-1"
                        >
                          {/* Timeline dot */}
                          <div className="absolute left-[-8px] top-1/2 transform -translate-y-1/2 w-4 h-4 bg-primary rounded-full border-2 border-white"></div>
                          <div className="flex flex-col sm:flex-row justify-between items-center text-sm text-gray-600">
                            <span className="font-medium text-primary">
                              {formatDateWithTime(history.changed_at)}
                            </span>

                            <span
                              className={`inline-block px-2 py-1 rounded-sm text-xs font-semibold text-primary-foreground bg-primary mt-2 md:mt-0 md:text-sm`}
                            >
                              {capitalizeFirstChar(history.status)}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
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
