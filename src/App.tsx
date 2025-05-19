import { Route, Routes } from "react-router";
import LandingPageView from "./views/LandingPageView";
import LoginView from "./views/LoginView";
import RegisterView from "./views/RegisterView";
import PrivateRoute from "./components/layout/PrivatePage";
import DashboardIndexView from "./components/pages/Dashboard/Index";
import { Toaster } from "@/components/ui/sonner";
import { ThemeProvider } from "./components/layout/ThemeProvider";
import ProfilePage from "./components/pages/Dashboard/ProfilePage";
import ResumePage from "./components/pages/Dashboard/ResumePage";
import ForgotPassword from "./components/pages/ForgotPassword";
import ResetPassword from "./components/pages/ResetPassword";

function App() {
  return (
    <>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <Toaster />
        <Routes>
          <Route path="/" element={<LandingPageView />} />
          <Route path="register" element={<RegisterView />} />
          <Route path="login" element={<LoginView />} />
          <Route path="forgot-password" element={<ForgotPassword />} />
          <Route path="reset-password" element={<ResetPassword />} />
          <Route path="dashboard" element={<PrivateRoute />}>
            <Route index element={<DashboardIndexView />} />
            <Route path="profile" element={<ProfilePage />} />
            <Route path="resume" element={<ResumePage />} />
          </Route>
        </Routes>
      </ThemeProvider>
    </>
  );
}

export default App;
