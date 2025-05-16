import { useState, useEffect } from "react";
import { NavLink, useLocation, useNavigate } from "react-router";
import { Briefcase } from "lucide-react";
import { FaAlignJustify } from "react-icons/fa6";
import Sidebar from "./SidebarNavigation";
import { ModeToggle } from "../toggles/ModeToggle";

const NavbarComponent = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > lastScrollY && currentScrollY > 50) {
        // Scroll ke bawah dan sudah melewati 50px
        setIsVisible(false);
      } else {
        // Scroll ke atas atau di posisi atas
        setIsVisible(true);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <>
      <nav
        className={`
        bg-primary-foreground shadow-sm fixed w-full top-0 transition-transform duration-300 z-50
        ${isVisible ? "translate-y-0" : "-translate-y-full"}
      `}
      >
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
              <div className="hidden md:ml-6 lg:flex md:items-center md:space-x-8">
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
                  href="#technology"
                  className="text-dark hover:text-primary px-3 py-2 text-sm font-medium"
                >
                  Technology
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
                <>
                  <ModeToggle />
                  <FaAlignJustify
                    onClick={toggleSidebar}
                    className="p-2 text-4xl rounded-md cursor-pointer hover:bg-secondary/90 lg:hidden"
                  />

                  <span className="hidden lg:flex">
                    <NavLink
                      to="/login"
                      className="text-dark hover:text-primary p-3 text-sm font-medium rounded-md hover:bg-secondary/90"
                    >
                      Sign In
                    </NavLink>

                    <NavLink
                      to="/register"
                      className="ml-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-primary-foreground bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                    >
                      Get Started
                    </NavLink>
                  </span>
                </>
              ) : (
                <></>
              )}

              {pathname === "/register" ? (
                <div className="flex items-center">
                  <span
                    className={"text-gray-500 text-sm mr-2 hidden md:block"}
                  >
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
                  <span
                    className={"text-gray-500 text-sm mr-2 hidden md:block"}
                  >
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
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
    </>
  );
};

export default NavbarComponent;
