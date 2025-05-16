import { ReactNode } from "react";
import NavbarDashboardComponent from "../navigations/NavbarDashboard";
import { ThemeProvider } from "next-themes";
import BreadcrumbComponent from "../breadcrumbs/Breadcrumb";

const DashboardLayout = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <NavbarDashboardComponent />
        <BreadcrumbComponent />
        {children}
      </ThemeProvider>
    </>
  );
};

export default DashboardLayout;
