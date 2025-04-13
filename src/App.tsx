import { Route, Routes } from "react-router";

import LandingPageView from "./views/LandingPageView";
import LoginView from "./views/LoginView";
import RegisterView from "./views/RegisterView";

function App() {
  return (
    <Routes>
      <Route path="/" Component={LandingPageView} />
      <Route path="register" Component={RegisterView} />
      <Route path="login" Component={LoginView} />
    </Routes>
  );
}

export default App;
