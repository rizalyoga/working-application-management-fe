import DashboardLayout from "@/components/layout/DashboarLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import DistributionApplicationChart from "@/components/charts/DistributionApplicationCharts";
import { useQuery } from "@tanstack/react-query";
import { fetchAPI } from "@/lib/API/auth";
import { APIResponse } from "@/types/API-types";
import StatsSkeleton from "@/components/skeletons/StatsSkeleton";
import { ChartBar, FileStack } from "lucide-react";

const StatsPage = () => {
  const BASE_URL = process.env.REACT_APP_API_BASE_URL;

  const { data, isLoading } = useQuery<APIResponse>({
    queryKey: ["jobApplications"],
    queryFn: () =>
      fetchAPI<APIResponse>(
        `${BASE_URL}/job-applications/group-by-status`,
        "GET",
        true
      ),
  });

  return (
    <DashboardLayout>
      <div className="mt-8 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
        {isLoading ? (
          <StatsSkeleton />
        ) : (
          <Card>
            <CardHeader>
              <CardTitle className="font-bold">Stats</CardTitle>
            </CardHeader>
            <CardContent className="mt-6 flex justify-center items-center flex-col gap-6">
              <Card className="w-full basis-[25%]">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FileStack size={20} /> Total Application
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <h1 className="text-8xl text-center text-primary font-bold">
                    {data?.data.total_application}
                  </h1>
                  <p className="text-sm text-gray-500 text-center mt-6">
                    Total job applications tracked in the system
                  </p>
                </CardContent>
              </Card>
              <Card className="w-full basis-[75%]">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <ChartBar size={20} /> Application Status Distribution
                  </CardTitle>
                  <p className="text-sm text-gray-500 mt-2">
                    Overview of all application statuses
                  </p>
                </CardHeader>
                <span className="p-2 overflow-x-auto">
                  <DistributionApplicationChart data={data?.data} />
                </span>
              </Card>
            </CardContent>
          </Card>
        )}
      </div>
    </DashboardLayout>
  );
};

export default StatsPage;
