import { Route, Routes } from "react-router";
import { lazy, Suspense } from "react";
import LandingPageView from "./views/LandingPageView";
// import LoginView from "./views/LoginView";
// import RegisterView from "./views/RegisterView";
// import ForgotPassword from "./components/pages/ForgotPassword";
// import ResetPassword from "./components/pages/ResetPassword";
import PrivateRoute from "./components/layout/PrivatePage";
import DashboardIndexView from "./components/pages/Dashboard/Index";
import { Toaster } from "@/components/ui/sonner";
import { ThemeProvider } from "./components/layout/ThemeProvider";
import ProfilePage from "./components/pages/Dashboard/ProfilePage";
import ResumePage from "./components/pages/Dashboard/ResumePage";
import StatsPage from "./components/pages/Dashboard/StatsPage";
import FormRegisterSkeleton from "./components/skeletons/FormRegisterSkeleton";
import FormLoginSkeleton from "./components/skeletons/FormLoginSkeleton";
import ForgotPasswordSkeleton from "./components/skeletons/FormForgotPaswordSkeleton";
import FormResetPasswordSkeleton from "./components/skeletons/FormResetPasswordSkeleton";

const RegisterView = lazy(() => import("./views/RegisterView"));
const LoginView = lazy(() => import("./views/LoginView"));
const ForgotPassword = lazy(() => import("./components/pages/ForgotPassword"));
const ResetPassword = lazy(() => import("./components/pages/ResetPassword"));

function App() {
  return (
    <>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <Toaster />
        <Routes>
          <Route path="/" element={<LandingPageView />} />
          <Route
            path="register"
            element={
              <Suspense fallback={<FormRegisterSkeleton />}>
                <RegisterView />
              </Suspense>
            }
          />
          <Route
            path="login"
            element={
              <Suspense fallback={<FormLoginSkeleton />}>
                <LoginView />
              </Suspense>
            }
          />
          <Route
            path="forgot-password"
            element={
              <Suspense fallback={<ForgotPasswordSkeleton />}>
                <ForgotPassword />
              </Suspense>
            }
          />
          <Route
            path="reset-password"
            element={
              <Suspense fallback={<FormResetPasswordSkeleton />}>
                <ResetPassword />
              </Suspense>
            }
          />
          <Route path="dashboard" element={<PrivateRoute />}>
            <Route index element={<DashboardIndexView />} />
            <Route path="profile" element={<ProfilePage />} />
            <Route path="resume" element={<ResumePage />} />
            <Route path="stats" element={<StatsPage />} />
          </Route>
        </Routes>
      </ThemeProvider>
    </>
  );
}

export default App;
