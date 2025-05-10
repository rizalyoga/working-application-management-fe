import {
  FaListCheck,
  FaCalendarCheck,
  FaFileArrowUp,
  FaChartLine,
  FaBell,
  FaEnvelopeOpen,
} from "react-icons/fa6";

const FeatureSectionComponent = () => {
  return (
    <section
      id="features"
      className="py-12 bg-white dark:bg-primary-foreground"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:text-center">
          <h2 className="text-base text-primary font-semibold tracking-wide uppercase">
            Features
          </h2>
          <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-dark sm:text-4xl">
            Everything You Need to Manage Your Job Search
          </p>
          <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
            Powerful tools to organize and track your job applications
            effectively.
          </p>
        </div>

        <div className="mt-10">
          <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-3">
            {/* <!-- Feature 1 --> */}
            <div className="feature-card transition-all duration-300 ease-in-out dark:bg-black dark:border dark:border-slate-500/40 rounded-lg shadow-md overflow-hidden p-6">
              <div className="flex items-center justify-center h-12 w-12 rounded-md bg-primary/10 text-primary">
                <FaListCheck />
              </div>
              <div className="mt-5">
                <h3 className="text-lg font-medium text-dark">
                  Application Tracking
                </h3>
                <p className="mt-2 text-base text-gray-500">
                  Track all your job applications in one place with status
                  updates from applied to hired.
                </p>
              </div>
            </div>

            {/* <!-- Feature 2 --> */}
            <div className="feature-card transition-all duration-300 ease-in-out dark:bg-black dark:border dark:border-slate-500/40 rounded-lg shadow-md overflow-hidden p-6">
              <div className="flex items-center justify-center h-12 w-12 rounded-md bg-primary/10 text-primary">
                <FaCalendarCheck />
              </div>
              <div className="mt-5">
                <h3 className="text-lg font-medium text-dark">
                  Interview Scheduling
                </h3>
                <p className="mt-2 text-base text-gray-500">
                  Never miss an interview with automated reminders and calendar
                  integration.
                </p>
              </div>
            </div>

            {/* <!-- Feature 3 --> */}
            <div className="feature-card transition-all duration-300 ease-in-out dark:bg-black dark:border dark:border-slate-500/40 rounded-lg shadow-md overflow-hidden p-6">
              <div className="flex items-center justify-center h-12 w-12 rounded-md bg-primary/10 text-primary">
                <FaFileArrowUp />
              </div>
              <div className="mt-5">
                <h3 className="text-lg font-medium text-dark">
                  Resume Management
                </h3>
                <p className="mt-2 text-base text-gray-500">
                  Store and version control your resumes to ensure you always
                  send the right one.
                </p>
              </div>
            </div>

            {/* <!-- Feature 4 --> */}
            <div className="feature-card transition-all duration-300 ease-in-out dark:bg-black dark:border dark:border-slate-500/40 rounded-lg shadow-md overflow-hidden p-6">
              <div className="flex items-center justify-center h-12 w-12 rounded-md bg-primary/10 text-primary">
                <FaChartLine />
              </div>
              <div className="mt-5">
                <h3 className="text-lg font-medium text-dark">
                  Progress Analytics
                </h3>
                <p className="mt-2 text-base text-gray-500">
                  Visualize your job search progress with insightful charts and
                  metrics.
                </p>
              </div>
            </div>

            {/* <!-- Feature 5 --> */}
            <div className="feature-card transition-all duration-300 ease-in-out dark:bg-black dark:border dark:border-slate-500/40 rounded-lg shadow-md overflow-hidden p-6">
              <div className="flex items-center justify-center h-12 w-12 rounded-md bg-primary/10 text-primary">
                <FaEnvelopeOpen />
              </div>
              <div className="mt-5">
                <h3 className="text-lg font-medium text-dark">
                  Cover Letter Templates
                </h3>
                <p className="mt-2 text-base text-gray-500">
                  Access professionally designed templates to craft perfect
                  cover letters.
                </p>
              </div>
            </div>

            {/* <!-- Feature 6 --> */}
            <div className="feature-card transition-all duration-300 ease-in-out dark:bg-black dark:border dark:border-slate-500/40 rounded-lg shadow-md overflow-hidden p-6">
              <div className="flex items-center justify-center h-12 w-12 rounded-md bg-primary/10 text-primary">
                <FaBell />
              </div>
              <div className="mt-5">
                <h3 className="text-lg font-medium text-dark">
                  Follow-up Reminders
                </h3>
                <p className="mt-2 text-base text-gray-500">
                  Get timely reminders to follow up on your applications and
                  interviews.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeatureSectionComponent;
