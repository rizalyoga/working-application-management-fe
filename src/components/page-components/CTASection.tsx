import { Link } from "react-router";

const CTASection = () => {
  return (
    <>
      <section className="gradient-bg py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
              Ready to take control of your job search?
            </h2>
            <p className="mt-4 max-w-2xl text-xl text-white/90 mx-auto">
              Join thousands of job seekers who found their dream jobs with
              JobTrack.
            </p>
            <div className="mt-8 flex justify-center items-center">
              <div className="inline-flex rounded-md shadow">
                <Link
                  to="/register"
                  className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-sm sm:text-base font-medium rounded-md text-primary bg-white hover:bg-gray-50"
                >
                  Get Started for Free
                </Link>
              </div>
              <div className="ml-3 inline-flex">
                <a
                  href="#demo"
                  className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-sm sm:text-base font-medium rounded-md text-white bg-primary/20 hover:bg-primary/30"
                >
                  Watch Demo
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default CTASection;
