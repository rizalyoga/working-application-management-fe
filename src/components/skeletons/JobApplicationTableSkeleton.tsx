import DashboardLayout from "../layout/DashboarLayout";
import { Card, CardContent, CardHeader } from "../ui/card";
import { Skeleton } from "../ui/skeleton";

const JobApplicationTableSkeleton = () => {
  return (
    <DashboardLayout>
      <Card className="max-w-7xl mx-auto mt-28">
        <CardHeader>
          <Skeleton className="h-6 w-[200px]" />
        </CardHeader>
        <CardContent>
          <div className="mb-4 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <Skeleton className="h-10 w-full md:max-w-sm" />
            <div className="flex w-full gap-2 md:w-auto md:justify-end">
              <Skeleton className="h-10 w-24" />
              <Skeleton className="h-10 w-[180px]" />
            </div>
          </div>

          <div className="space-y-4">
            {/* Table Header */}
            <div className="hidden rounded-lg bg-muted md:grid md:grid-cols-5">
              {[...Array(5)].map((_, i) => (
                <Skeleton key={i} className="mx-2 my-3 h-4" />
              ))}
            </div>

            {/* Table Rows */}
            <div className="space-y-4">
              {[...Array(5)].map((_, i) => (
                <div
                  key={i}
                  className="flex flex-col gap-4 md:grid md:grid-cols-5"
                >
                  <div className="space-y-2 md:col-span-5">
                    <div className="grid grid-cols-2 gap-4 md:grid-cols-5">
                      {[...Array(5)].map((_, j) => (
                        <Skeleton key={j} className="h-4" />
                      ))}
                    </div>
                    <Skeleton className="h-px w-full" />
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination */}
            <div className="flex flex-col items-center gap-4 pt-4 md:flex-row md:justify-between">
              <Skeleton className="h-8 w-[140px]" />
              <div className="flex items-center gap-2">
                <Skeleton className="h-8 w-8" />
                <Skeleton className="h-8 w-8" />
                <Skeleton className="h-8 w-[100px]" />
                <Skeleton className="h-8 w-8" />
                <Skeleton className="h-8 w-8" />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </DashboardLayout>
  );
};

export default JobApplicationTableSkeleton;
