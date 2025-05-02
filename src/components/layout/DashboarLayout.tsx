import { ReactNode, useEffect } from "react";
import { fetchAPI } from "@/lib/API/auth";
import useProfileUserStore from "@/stores/useProfileStore";

import NavbarDashboardComponent from "../navigations/NavbarDashboard";
import { APIResponse } from "@/types/API-types";
import { ThemeProvider } from "next-themes";

const DashboardLayout = ({ children }: { children: ReactNode }) => {
  const profileData = useProfileUserStore();
  useEffect(() => {
    const {
      updateEmail,
      updateName,
      updatePhoneNumber,
      updateProfilePictureUrl,
      updateResumeUrl,
    } = profileData;

    const getUserData = async (): Promise<APIResponse> => {
      const BASE_URL = process.env.REACT_APP_API_BASE_URL;

      return await fetchAPI<APIResponse>(
        `${BASE_URL}/user/profile-data`,
        "GET",
        true
      );
    };

    getUserData()
      .then((res) => {
        updateName(res.data[0].name);
        updateEmail(res.data[0].email);
        updatePhoneNumber(res.data[0].phone_number);
        updateProfilePictureUrl(res.data[0].profile_picture_url);
        updateResumeUrl(res.data[0].resume_url);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

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
