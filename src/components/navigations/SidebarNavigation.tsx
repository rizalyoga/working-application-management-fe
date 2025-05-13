import { NavLink, useLocation } from "react-router";
import { X } from "lucide-react";
import { useEffect } from "react";

interface SidebarProps {
  isOpen: boolean;
  toggleSidebar: () => void;
}

const Sidebar = ({ isOpen, toggleSidebar }: SidebarProps) => {
  const { pathname } = useLocation();

  // Disable body scroll when sidebar is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/70 bg-opacity-50 z-40 lg:hidden"
          onClick={toggleSidebar}
        />
      )}

      {/* Sidebar */}
      <div
        className={`
          fixed top-0 left-0 w-full bg-primary-foreground z-50 transform transition-transform duration-300 ease-in-out
          ${isOpen ? "translate-y-0" : "-translate-y-full"}
          lg:hidden
        `}
      >
        <div className="flex justify-between items-center p-4 border-b">
          <span className="text-xl font-bold text-dark">JobTrack</span>
          <button onClick={toggleSidebar}>
            <X className="h-10 w-10 text-dark -ml-8 hover:bg-secondary/90 rounded-md p-2" />
          </button>
        </div>

        <div className="flex flex-col p-4 space-y-4">
          {pathname === "/" && (
            <>
              <a
                href="#features"
                className="text-dark hover:text-primary text-base font-medium"
                onClick={toggleSidebar}
              >
                Features
              </a>
              <a
                href="#how-it-works"
                className="text-dark hover:text-primary text-base font-medium"
                onClick={toggleSidebar}
              >
                How It Works
              </a>
              <a
                href="#pricing"
                className="text-dark hover:text-primary text-base font-medium"
                onClick={toggleSidebar}
              >
                Pricing
              </a>
              <a
                href="#testimonials"
                className="text-dark hover:text-primary text-base font-medium"
                onClick={toggleSidebar}
              >
                Testimonials
              </a>
            </>
          )}

          <div className="flex flex-col space-y-2 pt-4 border-t">
            <NavLink
              to="/register"
              className="text-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-primary-foreground bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
              onClick={toggleSidebar}
            >
              Get Started
            </NavLink>
            <NavLink
              to="/login"
              className="text-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-dark hover:border hover:border-secondary  focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
              onClick={toggleSidebar}
            >
              Sign In
            </NavLink>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
