import { Link } from "react-router";

const HeroSectionComponent = () => {
  return (
    <div className="relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="relative z-10 pb-8 bg-white dark:bg-[#0A0A0A] sm:pb-16 md:pb-20 lg:max-w-2xl lg:w-full lg:pb-28 xl:pb-32">
          <main className="mt-24 mx-auto max-w-7xl px-4 sm:mt-28 sm:px-6 md:mt-32 lg:mt-44 lg:px-8 xl:mt-48">
            <div className="sm:text-center lg:text-left">
              <h1 className="text-4xl tracking-tight font-extrabold text-dark sm:text-5xl md:text-6xl">
                <span className="block">Take Control of Your</span>
                <span className="block text-primary">Job Applications</span>
              </h1>
              <p className="mt-3 text-base text-gray-500 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
                Never lose track of your job applications again. JobTrack helps
                you organize, monitor, and optimize your job search process from
                application to offer.
              </p>
              <div className="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start">
                <div className="rounded-md shadow">
                  <Link
                    to="/register"
                    className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-primary dark:bg-primary-foreground hover:bg-primary/90 md:py-4 md:text-lg md:px-10"
                  >
                    Start Tracking Now
                  </Link>
                </div>
                <div className="mt-3 sm:mt-0 sm:ml-3">
                  <a
                    href="#demo"
                    className="w-full flex items-center justify-center px-8 py-3 border text-base font-medium rounded-md text-primary dark:text-black bg-white transition duration-200 hover:border-primary md:py-4 md:text-lg md:px-10"
                  >
                    Watch Demo
                  </a>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
      <div className="lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2">
        <img
          className="h-56 w-full object-cover sm:h-72 md:h-96 lg:w-full lg:h-full"
          src="https://images.unsplash.com/photo-1521791055366-0d553872125f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1769&q=80"
          alt="Job application process"
        />
      </div>
    </div>
  );
};

export default HeroSectionComponent;
