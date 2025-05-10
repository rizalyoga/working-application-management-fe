const HowItWorkSection = () => {
  return (
    <section
      id="how-it-works"
      className="py-12 bg-gray-50 dark:bg-primary-foreground"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:text-center">
          <h2 className="text-base text-primary font-semibold tracking-wide uppercase">
            Process
          </h2>
          <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-dark sm:text-4xl">
            How JobTrack Works
          </p>
          <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
            Simple steps to organize your job search effectively.
          </p>
        </div>

        <div className="mt-10">
          <div className="relative">
            {/* <!-- Timeline --> */}
            <div className="space-y-8">
              {/* <!-- Step 1 --> */}
              <div className="timeline-item relative pl-16">
                <div className="absolute left-0 top-0 flex h-8 w-8 items-center justify-center rounded-full bg-primary  dark:bg-black text-white">
                  <span>1</span>
                </div>
                <div className="bg-white dark:bg-black p-6 rounded-lg shadow-sm">
                  <h3 className="text-lg font-medium text-dark">
                    Add Your Application
                  </h3>
                  <p className="mt-2 text-gray-500">
                    Enter details about the job you applied for including
                    company, position, and application date.
                  </p>
                </div>
              </div>

              {/* <!-- Step 2 --> */}
              <div className="timeline-item relative pl-16">
                <div className="absolute left-0 top-0 flex h-8 w-8 items-center justify-center rounded-full bg-primary  dark:bg-black text-white">
                  <span>2</span>
                </div>
                <div className="bg-white dark:bg-black p-6 rounded-lg shadow-sm">
                  <h3 className="text-lg font-medium text-dark">
                    Upload Documents
                  </h3>
                  <p className="mt-2 text-gray-500">
                    Attach your resume, cover letter, and any other relevant
                    documents to keep everything organized.
                  </p>
                </div>
              </div>

              {/* <!-- Step 3 --> */}
              <div className="timeline-item relative pl-16">
                <div className="absolute left-0 top-0 flex h-8 w-8 items-center justify-center rounded-full bg-primary  dark:bg-black text-white">
                  <span>3</span>
                </div>
                <div className="bg-white dark:bg-black p-6 rounded-lg shadow-sm">
                  <h3 className="text-lg font-medium text-dark">
                    Track Progress
                  </h3>
                  <p className="mt-2 text-gray-500">
                    Update the status as you move through the hiring process
                    from application to offer.
                  </p>
                </div>
              </div>

              {/* <!-- Step 4 --> */}
              <div className="timeline-item relative pl-16">
                <div className="absolute left-0 top-0 flex h-8 w-8 items-center justify-center rounded-full bg-primary  dark:bg-black text-white">
                  <span>4</span>
                </div>
                <div className="bg-white dark:bg-black p-6 rounded-lg shadow-sm">
                  <h3 className="text-lg font-medium text-dark">Get Hired!</h3>
                  <p className="mt-2 text-gray-500">
                    Celebrate your success and use our tools to prepare for your
                    new role.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorkSection;
