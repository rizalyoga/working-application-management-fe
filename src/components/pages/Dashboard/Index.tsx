import DashboardLayout from "@/components/layout/DashboarLayout";
import { useQuery } from "@tanstack/react-query";
import { fetchAPI } from "@/lib/API/auth";
import { Card, CardContent } from "@/components/ui/card";
import { ApiResponseForJobApplications } from "@/types/API-types";
import JobApplicationTable from "@/components/tables/JobApplicationTable";

const DashboardIndex = () => {
  const BASE_URL = process.env.REACT_APP_API_BASE_URL;
  const { data, isLoading, error } = useQuery<ApiResponseForJobApplications>({
    queryKey: ["jobApplications"],
    queryFn: () =>
      fetchAPI<ApiResponseForJobApplications>(
        `${BASE_URL}/job-applications`,
        "GET",
        true
      ),
    retry: 2,
    staleTime: 10 * 60 * 1000, // Data dianggap fresh selama 10 menit
  });

  if (isLoading) {
    return (
      <DashboardLayout>
        <Card>
          <CardContent className="p-6 min-h-dvh">
            <div className="mt-28 max-w-7xl border border-slate-400 h-64 rounded-xl mx-auto px-4 sm:px-6 lg:px-8 bg-slate-200 shadow-2xl mb-2 animate-pulse flex justify-center flex-col gap-2 py-6">
              <p className="text-black text-start font-bold mb-5">
                Job Applications
              </p>
              <div className="w-full bg-slate-400 border rounded-md h-10"></div>
              <div className="w-full bg-slate-400 border rounded-md h-10"></div>
              <div className="w-full bg-slate-400 border rounded-md h-10"></div>
              <div className="w-full bg-slate-400 border rounded-md h-10"></div>
              <div className="w-full bg-slate-400 border rounded-md h-10"></div>
            </div>
          </CardContent>
        </Card>
      </DashboardLayout>
    );
  }

  if (error) {
    return (
      <DashboardLayout>
        <Card>
          <CardContent className="p-6">
            <div className="text-center text-red-500">
              Error: {(error as Error).message}
            </div>
          </CardContent>
        </Card>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="mt-28 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <JobApplicationTable data={data?.data} />
      </div>
    </DashboardLayout>
  );
};

export default DashboardIndex;
