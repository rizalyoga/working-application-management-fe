import { ReactNode } from "react";
import NavbarDashboardComponent from "../navigations/NavbarDashboard";
import { ThemeProvider } from "next-themes";

const DashboardLayout = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <NavbarDashboardComponent />
        {children}
      </ThemeProvider>
    </>
  );
};

export default DashboardLayout;
