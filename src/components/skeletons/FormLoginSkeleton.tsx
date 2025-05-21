import { FaBriefcase } from "react-icons/fa6";
import { Card, CardContent } from "../ui/card";
import { Skeleton } from "../ui/skeleton";

const FormLoginSkeleton = () => {
  return (
    <div className="min-h-screen flex items-center justify-center flex-col py-12 sm:px-6 lg:px-8 mt-8 md:mt-0">
      <div className="flex flex-col justify-center items-center mb-8">
        <FaBriefcase className="text-primary text-5xl mb-4 text-center" />
        <h2 className="text-3xl font-extrabold text-primary">Welcome Back</h2>
        <p className="mt-2 text-sm text-gray-600 dark:text-primary">
          Sign in to continue tracking your job applications
        </p>
      </div>

      <Card className="sm:mx-auto sm:w-full sm:max-w-md">
        <CardContent>
          <div className="space-y-6">
            {/* Email Field Skeleton */}
            <div className="space-y-2">
              <Skeleton className="h-4 w-16" />
              <div className="relative">
                <Skeleton className="absolute h-4 w-4 mt-2.5 mx-3 rounded-full" />
                <Skeleton className="h-10 w-full px-9" />
              </div>
            </div>

            {/* Password Field Skeleton */}
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <Skeleton className="h-4 w-16" />
                <Skeleton className="h-4 w-24" />
              </div>
              <div className="relative">
                <Skeleton className="absolute h-4 w-4 mt-2.5 mx-3 rounded-full" />
                <Skeleton className="h-10 w-full px-9" />
                <Skeleton className="absolute right-0 top-0 h-10 w-10 rounded-md" />
              </div>
            </div>

            {/* Submit Button Skeleton */}
            <Skeleton className="h-10 w-full rounded-md" />

            {/* Error Message Skeleton (optional) */}
            <Skeleton className="h-4 w-full" />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default FormLoginSkeleton;
