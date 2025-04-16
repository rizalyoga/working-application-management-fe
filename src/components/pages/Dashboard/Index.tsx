import DashboardLayout from "@/components/layout/DashboarLayout";
import { Button } from "@/components/ui/button";
import { fetchAPI } from "@/lib/API/auth";
import { APIResponse } from "@/types/API-types";
import { toast } from "sonner";
import { useNavigate } from "react-router";
import { removeCookie } from "@/lib/cookies/cookies";
import useProfileUserStore from "@/stores/useProfileStore";

const DashboardIndex = () => {
  const navigate = useNavigate();
  const { name, email, phone_number } = useProfileUserStore();

  const logoutFunction = async (): Promise<APIResponse> => {
    const BASE_URL = process.env.REACT_APP_API_BASE_URL;
    return await fetchAPI<APIResponse>(`${BASE_URL}/auth/logout`, "POST", true);
  };

  const handleLogout = () => {
    logoutFunction()
      .then((res) => {
        toast("Good Bye! 👋", {
          description: res.message,
          position: "top-right",
        });
        removeCookie("access_token");
        removeCookie("refresh_token");
        navigate("/login");
      })
      .catch((error) => {
        toast(`Logout failed!`, {
          description: error.message,
          position: "top-right",
        });
      });
  };

  return (
    <DashboardLayout>
      <h1>Dashboard Page</h1>
      <Button variant={"destructive"} className="ml-2" onClick={handleLogout}>
        Log out
      </Button>

      <p>{name}</p>
      <p>{email}</p>
      <p>{phone_number}</p>
    </DashboardLayout>
  );
};

export default DashboardIndex;
