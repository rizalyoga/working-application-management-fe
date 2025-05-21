import { Skeleton } from "@/components/ui/skeleton";

const ForgotPasswordSkeleton = () => {
  return (
    <div className="space-y-4">
      {/* Email Field Skeleton */}
      <div className="space-y-2">
        <Skeleton className="h-4 w-20" />
        <div className="relative mt-2">
          <Skeleton className="absolute h-4 w-4 mt-2.5 mx-3 rounded-full" />
          <Skeleton className="h-10 w-full px-9 rounded-md" />
        </div>
      </div>

      {/* Submit Button Skeleton */}
      <div className="relative">
        <Skeleton className="absolute left-4 top-1/2 -translate-y-1/2 h-3.5 w-3.5 rounded-full" />
        <Skeleton className="h-10 w-full mt-4 rounded-md" />
      </div>

      {/* Error Message Skeleton (optional) */}
      <Skeleton className="h-4 w-full mt-4 rounded-md" />

      {/* Back to Login Link Skeleton */}
      <div className="flex justify-center mt-2">
        <Skeleton className="h-4 w-32 rounded-md" />
      </div>
    </div>
  );
};

export default ForgotPasswordSkeleton;
