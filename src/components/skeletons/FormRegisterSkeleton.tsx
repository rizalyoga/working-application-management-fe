import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent } from "../ui/card";
import { FaBriefcase } from "react-icons/fa6";

const FormRegisterSkeleton = () => {
  return (
    <div className="min-h-screen flex items-center justify-center flex-col py-12 sm:px-6 lg:px-8 mt-16">
      <div className="flex flex-col justify-center items-center mb-8">
        <FaBriefcase className="text-primary text-5xl mb-4 text-center" />
        <h2 className="text-3xl font-extrabold text-primary">
          Create your account
        </h2>
        <p className="mt-2 text-sm text-gray-600 dark:text-primary">
          Start tracking your job applications effectively
        </p>
      </div>
      <Card className="sm:mx-auto sm:w-full sm:max-w-md">
        <CardContent>
          <div className="space-y-6">
            {/* Username Field Skeleton */}
            <div className="space-y-2">
              <Skeleton className="h-4 w-24" />
              <div className="relative">
                <Skeleton className="absolute h-4 w-4 mt-2.5 mx-3" />
                <Skeleton className="h-10 w-full px-9" />
              </div>
            </div>

            {/* Email Field Skeleton */}
            <div className="space-y-2">
              <Skeleton className="h-4 w-24" />
              <div className="relative">
                <Skeleton className="absolute h-4 w-4 mt-2.5 mx-3" />
                <Skeleton className="h-10 w-full px-9" />
              </div>
            </div>

            {/* Password Field Skeleton */}
            <div className="space-y-2">
              <Skeleton className="h-4 w-24" />
              <div className="relative">
                <Skeleton className="absolute h-4 w-4 mt-2.5 mx-3" />
                <Skeleton className="h-10 w-full px-9" />
                <Skeleton className="absolute right-0 top-0 h-10 w-10" />
              </div>
            </div>

            {/* Confirm Password Field Skeleton */}
            <div className="space-y-2">
              <Skeleton className="h-4 w-36" />
              <div className="relative">
                <Skeleton className="absolute h-4 w-4 mt-2.5 mx-3" />
                <Skeleton className="h-10 w-full px-9" />
                <Skeleton className="absolute right-0 top-0 h-10 w-10" />
              </div>
            </div>

            {/* Terms and Conditions Skeleton */}
            <div className="flex items-center space-x-2">
              <Skeleton className="h-5 w-5" />
              <Skeleton className="h-4 w-64" />
            </div>

            {/* Submit Button Skeleton */}
            <Skeleton className="h-10 w-full" />

            {/* Error Message Skeleton (optional) */}
            <Skeleton className="h-4 w-full" />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default FormRegisterSkeleton;
