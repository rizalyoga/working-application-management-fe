import { NavLink, useLocation, useNavigate } from "react-router";
import { Briefcase } from "lucide-react";

const NavbarComponent = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  return (
    <nav className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div
            className="flex items-center cursor-pointer"
            onClick={() => navigate("/")}
          >
            <div className="flex-shrink-0 flex items-center gap-2">
              <Briefcase />
              <span className="text-xl font-bold text-dark">JobTrack</span>
            </div>
          </div>

          {pathname === "/" ? (
            <div className="hidden md:ml-6 md:flex md:items-center md:space-x-8">
              <a
                href="#features"
                className="text-dark hover:text-primary px-3 py-2 text-sm font-medium"
              >
                Features
              </a>
              <a
                href="#how-it-works"
                className="text-dark hover:text-primary px-3 py-2 text-sm font-medium"
              >
                How It Works
              </a>
              <a
                href="#pricing"
                className="text-dark hover:text-primary px-3 py-2 text-sm font-medium"
              >
                Pricing
              </a>
              <a
                href="#testimonials"
                className="text-dark hover:text-primary px-3 py-2 text-sm font-medium"
              >
                Testimonials
              </a>
            </div>
          ) : (
            <></>
          )}

          <div className="flex items-center">
            {pathname === "/" ? (
              <span>
                <NavLink
                  to="/login"
                  className="text-dark hover:text-primary p-3 text-sm font-medium rounded-md hover:bg-secondary/90"
                >
                  Sign In
                </NavLink>

                <NavLink
                  to="/register"
                  className="ml-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                >
                  Get Started
                </NavLink>
              </span>
            ) : (
              <></>
            )}

            {pathname === "/register" ? (
              <div className="flex items-center">
                <span className={"text-gray-500 text-sm mr-2 hidden md:block"}>
                  Already have an account?
                </span>
                <NavLink
                  to="/login"
                  className="text-dark hover:text-primary p-3 text-sm font-medium rounded-md hover:bg-secondary/90"
                >
                  Sign In
                </NavLink>
              </div>
            ) : (
              <></>
            )}

            {pathname === "/login" ? (
              <div className="flex items-center">
                <span className={"text-gray-500 text-sm mr-2 hidden md:block"}>
                  Don't have an account?
                </span>
                <NavLink
                  to="/register"
                  className="text-dark hover:text-primary p-3 text-sm font-medium rounded-md hover:bg-secondary/90"
                >
                  Sign Up
                </NavLink>
              </div>
            ) : (
              <></>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavbarComponent;
