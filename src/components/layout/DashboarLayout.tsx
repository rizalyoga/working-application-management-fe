import { ReactNode, useEffect } from "react";
import { fetchAPI } from "@/lib/API/auth";
import useProfileUserStore from "@/stores/useProfileStore";

import NavbarDashboardComponent from "../navigations/NavbarDashboard";
import { APIResponse } from "@/types/API-types";
import { ThemeProvider } from "next-themes";
import { useQuery } from "@tanstack/react-query";

const DashboardLayout = ({ children }: { children: ReactNode }) => {
  const profileDataStore = useProfileUserStore();
  const BASE_URL = process.env.REACT_APP_API_BASE_URL;

  const { data } = useQuery<APIResponse>({
    queryKey: ["userProfile"],
    queryFn: () =>
      fetchAPI<APIResponse>(`${BASE_URL}/user/profile-data`, "GET", true),
  });

  useEffect(() => {
    const {
      updateName,
      updateEmail,
      updatePhoneNumber,
      updateProfilePictureUrl,
      updateResumeUrl,
    } = profileDataStore;

    updateName(data?.data[0]?.name);
    updateEmail(data?.data[0]?.email);
    updatePhoneNumber(data?.data[0]?.phone_number);
    updateProfilePictureUrl(data?.data[0]?.profile_picture_url);
    updateResumeUrl(data?.data[0]?.resume_url);
  }, [data]);

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
