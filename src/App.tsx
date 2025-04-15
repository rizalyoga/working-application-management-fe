import { Route, Routes } from "react-router";

import LandingPageView from "./views/LandingPageView";
import LoginView from "./views/LoginView";
import RegisterView from "./views/RegisterView";
import { Toaster } from "@/components/ui/sonner";

function App() {
  return (
    <>
      <Toaster />
      <Routes>
        <Route path="/" Component={LandingPageView} />
        <Route path="register" Component={RegisterView} />
        <Route path="login" Component={LoginView} />
      </Routes>
    </>
  );
}

export default App;
