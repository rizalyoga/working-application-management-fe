import NavbarComponent from "../navigations/Navbar";
import FooterAuth from "../navigations/FooterAuth";
import { ReactNode } from "react";
import { getCookie } from "@/lib/cookies/cookies";
import { Navigate } from "react-router";

const AuthLayout = ({ children }: { children: ReactNode }) => {
  const isAuthenticated = () => {
    const cookies = getCookie("access_token");
    return cookies;
  };

  return isAuthenticated() ? (
    <Navigate to="/dashboard" />
  ) : (
    <>
      <NavbarComponent />
      {children}
      <FooterAuth />
    </>
  );
};

export default AuthLayout;
