import { Link } from "react-router";

const PricingSection = () => {
  return (
    <section
      id="pricing"
      className="py-12 bg-gray-50 dark:bg-primary-foreground"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:text-center">
          <h2 className="text-base text-primary font-semibold tracking-wide uppercase">
            Pricing
          </h2>
          <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-dark sm:text-4xl">
            Simple, Transparent Pricing
          </p>
          <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
            Choose the plan that works best for your job search needs.
          </p>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-8 md:grid-cols-3">
          {/* <!-- Free Plan --> */}
          <div className="bg-white dark:bg-black dark:border dark:border-slate-500/50 rounded-lg shadow-md overflow-hidden">
            <div className="px-6 py-8">
              <h3 className="text-lg font-medium text-dark">Free</h3>
              <div className="mt-4 flex items-baseline">
                <span className="text-4xl font-extrabold text-dark">$0</span>
                <span className="ml-1 text-lg font-medium text-gray-500">
                  /month
                </span>
              </div>
              <p className="mt-4 text-gray-500">
                Perfect for casual job seekers
              </p>
            </div>
            <div className="px-6 pt-6 pb-8 bg-gray-50 dark:bg-black">
              <ul className="space-y-4">
                <li className="flex items-start">
                  <i className="fas fa-check text-green-500 mt-1 mr-2"></i>
                  <span className="text-gray-700">
                    Track up to 10 applications
                  </span>
                </li>
                <li className="flex items-start">
                  <i className="fas fa-check text-green-500 mt-1 mr-2"></i>
                  <span className="text-gray-700">
                    Basic application status
                  </span>
                </li>
                <li className="flex items-start">
                  <i className="fas fa-check text-green-500 mt-1 mr-2"></i>
                  <span className="text-gray-700">1 resume upload</span>
                </li>
              </ul>
              <div className="mt-8">
                <Link
                  to="/register"
                  className="w-full flex items-center justify-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-gray-600 hover:bg-gray-700"
                >
                  Get Started
                </Link>
              </div>
            </div>
          </div>

          {/* <!-- Pro Plan --> */}
          <div className="bg-white dark:bg-black rounded-lg shadow-lg overflow-hidden transform scale-105 border-2 border-primary dark:border-slate-500/50">
            <div className="px-6 py-8 bg-primary/5">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-medium text-dark">Pro</h3>
                <span className="inline-flex items-center px-3 py-0.5 rounded-full text-sm font-medium bg-primary text-white dark:text-black">
                  Most Popular
                </span>
              </div>
              <div className="mt-4 flex items-baseline">
                <span className="text-4xl font-extrabold text-dark">$9</span>
                <span className="ml-1 text-lg font-medium text-gray-500">
                  /month
                </span>
              </div>
              <p className="mt-4 text-gray-500">For serious job seekers</p>
            </div>
            <div className="px-6 pt-6 pb-8 bg-gray-50 dark:bg-black">
              <ul className="space-y-4">
                <li className="flex items-start">
                  <i className="fas fa-check text-green-500 mt-1 mr-2"></i>
                  <span className="text-gray-700">Unlimited applications</span>
                </li>
                <li className="flex items-start">
                  <i className="fas fa-check text-green-500 mt-1 mr-2"></i>
                  <span className="text-gray-700">
                    Advanced tracking & analytics
                  </span>
                </li>
                <li className="flex items-start">
                  <i className="fas fa-check text-green-500 mt-1 mr-2"></i>
                  <span className="text-gray-700">
                    Multiple resume versions
                  </span>
                </li>
                <li className="flex items-start">
                  <i className="fas fa-check text-green-500 mt-1 mr-2"></i>
                  <span className="text-gray-700">Cover letter templates</span>
                </li>
                <li className="flex items-start">
                  <i className="fas fa-check text-green-500 mt-1 mr-2"></i>
                  <span className="text-gray-700">
                    Interview preparation tools
                  </span>
                </li>
              </ul>
              <div className="mt-8">
                <Link
                  to="/register"
                  className="w-full flex items-center justify-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white dark:text-black bg-primary hover:bg-primary/90"
                >
                  Get Started
                </Link>
              </div>
            </div>
          </div>

          {/* <!-- Team Plan --> */}
          <div className="bg-white dark:bg-black dark:border dark:border-slate-500/50 rounded-lg shadow-md overflow-hidden">
            <div className="px-6 py-8">
              <h3 className="text-lg font-medium text-dark">Team</h3>
              <div className="mt-4 flex items-baseline">
                <span className="text-4xl font-extrabold text-dark">$25</span>
                <span className="ml-1 text-lg font-medium text-gray-500">
                  /month
                </span>
              </div>
              <p className="mt-4 text-gray-500">For career coaches and teams</p>
            </div>
            <div className="px-6 pt-6 pb-8 bg-gray-50 dark:bg-black">
              <ul className="space-y-4">
                <li className="flex items-start">
                  <i className="fas fa-check text-green-500 mt-1 mr-2"></i>
                  <span className="text-gray-700">Everything in Pro</span>
                </li>
                <li className="flex items-start">
                  <i className="fas fa-check text-green-500 mt-1 mr-2"></i>
                  <span className="text-gray-700">
                    Manage up to 5 team members
                  </span>
                </li>
                <li className="flex items-start">
                  <i className="fas fa-check text-green-500 mt-1 mr-2"></i>
                  <span className="text-gray-700">
                    Shared templates & resources
                  </span>
                </li>
                <li className="flex items-start">
                  <i className="fas fa-check text-green-500 mt-1 mr-2"></i>
                  <span className="text-gray-700">
                    Team analytics dashboard
                  </span>
                </li>
              </ul>
              <div className="mt-8">
                <Link
                  to="/register"
                  className="w-full flex items-center justify-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-gray-600 hover:bg-gray-700"
                >
                  Get Started
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
