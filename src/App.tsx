import { Route, Routes } from "react-router";

import LandingPageView from "./views/LandingPageView";
import LoginView from "./views/LoginView";
import RegisterView from "./views/RegisterView";
import PrivateRoute from "./components/layout/PrivatePage";
import DashboardIndexView from "./components/pages/Dashboard/Index";
import { Toaster } from "@/components/ui/sonner";
import { ThemeProvider } from "./components/layout/ThemeProvider";

function App() {
  return (
    <>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <Toaster />
        <Routes>
          <Route path="/" element={<LandingPageView />} />
          <Route path="register" element={<RegisterView />} />
          <Route path="login" element={<LoginView />} />
          <Route path="dashboard" element={<PrivateRoute />}>
            <Route index element={<DashboardIndexView />} />
          </Route>
        </Routes>
      </ThemeProvider>
    </>
  );
}

export default App;
