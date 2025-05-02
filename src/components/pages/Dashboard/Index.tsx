import { useState, useEffect, useMemo } from "react";
import { useNavigate, useLocation } from "react-router";
import DashboardLayout from "@/components/layout/DashboarLayout";
import { useQuery } from "@tanstack/react-query";
import { fetchAPI } from "@/lib/API/auth";
import { Card, CardContent } from "@/components/ui/card";
import { ApiResponseForJobApplications } from "@/types/API-types";
import JobApplicationTable from "@/components/tables/JobApplicationTable";

const DashboardIndex = () => {
  const BASE_URL = useMemo(() => process.env.REACT_APP_API_BASE_URL, []);
  const navigate = useNavigate();
  const location = useLocation();

  // Mengambil status_id dari URL jika ada
  const queryParams = new URLSearchParams(location.search);
  const statusFromUrl = queryParams.get("status_id") || "All";

  // State untuk status filter
  const [statusFilter, setStatusFilter] = useState(statusFromUrl);

  // Fungsi untuk mengubah status filter
  const handleStatusChange = (value: string) => {
    setStatusFilter(value);
  };

  // Efek untuk memperbarui URL saat status filter berubah
  useEffect(() => {
    const params = new URLSearchParams(location.search);

    if (statusFilter === "All") {
      params.delete("status_id");
    } else {
      params.set("status_id", statusFilter);
    }

    const newSearch = params.toString();
    const newPath = newSearch
      ? `${location.pathname}?${newSearch}`
      : location.pathname;

    navigate(newPath, { replace: true });
  }, [statusFilter, location.pathname, navigate]);

  // Membangun URL API dengan parameter status_id jika bukan "All"
  const apiUrl = useMemo(() => {
    let url = `${BASE_URL}/job-applications`;
    if (statusFilter !== "All") {
      url += `?status_id=${statusFilter}`;
    }
    return url;
  }, [BASE_URL, statusFilter]);

  // Query data dengan TanStack Query
  const { data, isLoading, error } = useQuery<ApiResponseForJobApplications>({
    queryKey: ["jobApplications", statusFilter], // Tambahkan statusFilter ke queryKey untuk caching per filter
    queryFn: () => fetchAPI<ApiResponseForJobApplications>(apiUrl, "GET", true),
    retry: 2,
    staleTime: 10 * 60 * 1000, // Data dianggap fresh selama 10 menit
    enabled: !!BASE_URL,
  });

  if (isLoading) {
    return (
      <DashboardLayout>
        <Card>
          <CardContent className="p-6 min-h-dvh">
            <div className="mt-28 max-w-7xl border border-slate-400 h-64 rounded-xl mx-auto px-4 sm:px-6 lg:px-8 bg-slate-200 shadow-2xl mb-2 animate-pulse flex justify-center flex-col gap-2 py-6 dark:bg-black">
              <p className="text-black dark:text-white text-start font-bold mb-5">
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
          <CardContent className="p-6 mt-28">
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
        <JobApplicationTable
          data={data?.data}
          statusFilter={statusFilter}
          onStatusChange={handleStatusChange}
        />
      </div>
    </DashboardLayout>
  );
};

export default DashboardIndex;
