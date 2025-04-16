import NavbarComponent from "../navigations/Navbar";
import FooterAuth from "../navigations/FooterAuth";
import { ReactNode } from "react";

const AuthLayout = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <NavbarComponent />
      {children}
      <FooterAuth />
    </>
  );
};

export default AuthLayout;
