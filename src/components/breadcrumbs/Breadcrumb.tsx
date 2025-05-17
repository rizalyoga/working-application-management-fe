import { capitalizeFirstChar } from "@/lib/utils";
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
} from "../ui/breadcrumb";
import { useLocation, Link } from "react-router";

const BreadcrumbComponent = () => {
  const location = useLocation();
  const pathnames = location.pathname.split("/").filter((x) => x);

  const pathToLabelMap: Record<string, string> = {
    dashboard: "Dashboard",
    profile: "Profile",
    resume: "Resume",
    // tambahkan label lainnya jika perlu
  };

  return (
    <div className="mt-28 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link
                to="/dashboard"
                className={
                  pathnames.length == 1 ? "font-semibold text-black" : ""
                }
              >
                🏠 {pathToLabelMap["dashboard"]}
              </Link>
            </BreadcrumbLink>
          </BreadcrumbItem>

          {pathnames.slice(1).map((value, index) => {
            const to = `/${pathnames.slice(0, index + 2).join("/")}`;
            const isLast = index === pathnames.length - 2;
            return (
              <div key={to} className="flex items-center">
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbLink asChild>
                    <Link
                      to={to}
                      className={
                        isLast
                          ? "font-semibold text-primary ml-2"
                          : "text-muted-foreground"
                      }
                    >
                      {pathToLabelMap[value] || capitalizeFirstChar(value)}
                    </Link>
                  </BreadcrumbLink>
                </BreadcrumbItem>
              </div>
            );
          })}
        </BreadcrumbList>
      </Breadcrumb>
    </div>
  );
};

export default BreadcrumbComponent;
