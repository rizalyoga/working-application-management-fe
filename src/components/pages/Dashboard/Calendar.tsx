import DashboardLayout from "@/components/layout/DashboarLayout";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import DistributionApplicationChart from "@/components/charts/DistributionApplicationCharts";
// import { useQuery } from "@tanstack/react-query";
// import { fetchAPI } from "@/lib/API/auth";
// import { APIResponse } from "@/types/API-types";
// import StatsSkeleton from "@/components/skeletons/StatsSkeleton";
// import { ChartBar, FileStack } from "lucide-react";
import { CalendarScheduler } from "@/components/calendar/CalendarScheduler";

const CalendarPage = () => {
  //   const BASE_URL = process.env.REACT_APP_API_BASE_URL;

  //   const { data, isLoading } = useQuery<APIResponse>({
  //     queryKey: ["jobApplications"],
  //     queryFn: () =>
  //       fetchAPI<APIResponse>(
  //         `${BASE_URL}/job-applications/group-by-status`,
  //         "GET",
  //         true
  //       ),
  //   });

  return (
    <DashboardLayout>
      <div className="mt-8 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
        <CalendarScheduler />
      </div>
    </DashboardLayout>
  );
};

export default CalendarPage;
