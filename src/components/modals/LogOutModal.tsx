import { useNavigate } from "react-router";
import { removeCookie } from "@/lib/cookies/cookies";
import { Button } from "@/components/ui/button";
import { fetchAPI } from "@/lib/API/auth";
import { toast } from "sonner";
import { APIResponse } from "@/types/API-types";
import { useState, useEffect } from "react";

interface LogOutModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const LogOutModal = ({ isOpen, onClose }: LogOutModalProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const logoutFunction = async (): Promise<APIResponse> => {
    const BASE_URL = process.env.REACT_APP_API_BASE_URL;
    return await fetchAPI<APIResponse>(`${BASE_URL}/auth/logout`, "POST", true);
  };

  const handleLogout = () => {
    setIsLoading(true);
    logoutFunction()
      .then((res) => {
        toast("Good Bye! 👋", {
          description: res.message,
          position: "bottom-right",
          closeButton: true,
          className: "dark:text-white",
        });
        localStorage.removeItem("profile-storage");
        removeCookie("access_token");
        removeCookie("refresh_token");
        onClose();
        navigate("/login");
      })
      .catch((error) => {
        toast(`Logout failed!`, {
          description: error.message,
          position: "bottom-right",
          closeButton: true,
          className: "dark:text-white",
        });
      })
      .finally(() => setIsLoading(false));
  };

  // Handle Esc key
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape" && !isLoading) {
        onClose();
      }
    };
    if (isOpen) {
      document.addEventListener("keydown", handleEsc);
    }
    return () => document.removeEventListener("keydown", handleEsc);
  }, [isOpen, onClose, isLoading]);

  // Restore focus when modal closes
  useEffect(() => {
    if (!isOpen) {
      document.body.focus();
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-white dark:bg-[#0A0A0A] rounded-lg p-6 w-full max-w-[425px] mx-4 dark:border dark:border-slate-50/20">
        <div className="mb-4">
          <h2 className="text-lg font-semibold">Log Out</h2>
          <p className="text-sm text-gray-600 dark:text-gray-300 my-2">
            Are you sure you want to end this session?
          </p>
        </div>
        <div className="flex justify-end gap-2">
          <Button variant="outline" onClick={onClose} disabled={isLoading}>
            Cancel
          </Button>
          <Button
            variant="destructive"
            onClick={handleLogout}
            disabled={isLoading}
          >
            {isLoading ? "Wait..." : "Yes"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default LogOutModal;
