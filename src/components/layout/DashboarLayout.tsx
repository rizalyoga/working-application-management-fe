import { ReactNode, useEffect } from "react";
import { getCookie } from "@/lib/cookies/cookies";
import { useNavigate } from "react-router";

const DashboardLayout = ({ children }: { children: ReactNode }) => {
  const navigate = useNavigate();

  useEffect(() => {
    const cookies = getCookie("access_token");
    if (!cookies) {
      navigate("/login");
    }
  }, [navigate]);

  return <>{children}</>;
};

export default DashboardLayout;
