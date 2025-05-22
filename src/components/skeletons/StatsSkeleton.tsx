import { Card, CardContent } from "../ui/card";
import { Skeleton } from "../ui/skeleton";

const StatsSkeleton = () => {
  return (
    <>
      <Card>
        <CardContent className="w-full">
          <Skeleton className="h-[200px] mt-2.5 mx-3 rounded-lg" />
          <Skeleton className="h-[400px] mx-3 rounded-lg mt-6" />
        </CardContent>
      </Card>
    </>
  );
};

export default StatsSkeleton;
