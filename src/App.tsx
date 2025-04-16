import { Route, Routes } from "react-router";

import LandingPageView from "./views/LandingPageView";
import LoginView from "./views/LoginView";
import RegisterView from "./views/RegisterView";
import PrivateRoute from "./components/layout/PrivatePage";
import DashboardIndexView from "./components/pages/Dashboard/Index";
import { Toaster } from "@/components/ui/sonner";

function App() {
  return (
    <>
      <Toaster />
      <Routes>
        <Route path="/" element={<LandingPageView />} />
        <Route path="register" element={<RegisterView />} />
        <Route path="login" element={<LoginView />} />
        <Route path="dashboard" element={<PrivateRoute />}>
          <Route index element={<DashboardIndexView />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
