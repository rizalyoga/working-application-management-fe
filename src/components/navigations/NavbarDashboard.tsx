import { fetchAPI } from "@/lib/API/auth";
import { APIResponse } from "@/types/API-types";
import { toast } from "sonner";
import { useNavigate } from "react-router";
import { removeCookie } from "@/lib/cookies/cookies";

import { Briefcase } from "lucide-react";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { AvatarImage } from "@radix-ui/react-avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import useProfileUserStore from "@/stores/useProfileStore";

const NavbarDashboard = () => {
  const navigate = useNavigate();

  const { name, profile_picture_url } = useProfileUserStore();

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
    <nav
      className={
        "bg-white shadow-sm fixed w-full top-0 transition-transform duration-300 z-50"
      }
    >
      <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <div className="flex-shrink-0 flex items-center gap-2 cursor-pointer">
            <Briefcase />
            <span className="text-xl font-bold text-dark">JobTrack</span>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Avatar>
                <AvatarImage
                  src={
                    profile_picture_url
                      ? profile_picture_url
                      : "https://github.com/shadcn.png"
                  }
                  alt="user-avatar"
                />
                <AvatarFallback>AV</AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-36">
              <DropdownMenuLabel>{name}</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <DropdownMenuItem>Profile</DropdownMenuItem>
                <DropdownMenuItem>Chart</DropdownMenuItem>
              </DropdownMenuGroup>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                className="focus:bg-destructive/60 focus:text-white"
                onClick={handleLogout}
              >
                Log out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </nav>
  );
};

export default NavbarDashboard;
