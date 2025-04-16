import React from "react";
import { Navigate, Outlet } from "react-router";
import { getCookie } from "@/lib/cookies/cookies";

const isAuthenticated = () => {
  const cookies = getCookie("access_token");
  return cookies;
};

const PrivateRoute: React.FC = () => {
  return isAuthenticated() ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;
