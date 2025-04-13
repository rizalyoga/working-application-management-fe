import { FaStar, FaStarHalf } from "react-icons/fa6";

const TestimonialSection = () => {
  return (
    <section id="testimonials" className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:text-center">
          <h2 className="text-base text-primary font-semibold tracking-wide uppercase">
            Testimonials
          </h2>
          <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-dark sm:text-4xl">
            What Our Users Say
          </p>
          <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
            Don't just take our word for it - hear from our users.
          </p>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {/* <!-- Testimonial 1 --> */}
          <div className="bg-gray-50 p-6 rounded-lg shadow-sm">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <img
                  className="h-12 w-12 rounded-full"
                  src="https://randomuser.me/api/portraits/women/32.jpg"
                  alt="Sarah Johnson"
                />
              </div>
              <div className="ml-4">
                <h4 className="text-lg font-medium text-dark">Sarah Johnson</h4>
                <p className="text-gray-500">Software Engineer</p>
              </div>
            </div>
            <div className="mt-4">
              <p className="text-gray-600">
                "JobTrack completely transformed my job search. I went from
                disorganized spreadsheets to a streamlined system that helped me
                land my dream job in just 2 months!"
              </p>
            </div>
            <div className="mt-4 flex text-yellow-400">
              <FaStar />
              <FaStar />
              <FaStar />
              <FaStar />
              <FaStar />
            </div>
          </div>

          {/* <!-- Testimonial 2 --> */}
          <div className="bg-gray-50 p-6 rounded-lg shadow-sm">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <img
                  className="h-12 w-12 rounded-full"
                  src="https://randomuser.me/api/portraits/men/43.jpg"
                  alt="Michael Chen"
                />
              </div>
              <div className="ml-4">
                <h4 className="text-lg font-medium text-dark">Michael Chen</h4>
                <p className="text-gray-500">Marketing Manager</p>
              </div>
            </div>
            <div className="mt-4">
              <p className="text-gray-600">
                "The interview tracking and follow-up reminders were game
                changers for me. I never missed a follow-up and always felt
                prepared for interviews."
              </p>
            </div>
            <div className="mt-4 flex text-yellow-400">
              <FaStar />
              <FaStar />
              <FaStar />
              <FaStarHalf />
            </div>
          </div>

          {/* <!-- Testimonial 3 --> */}
          <div className="bg-gray-50 p-6 rounded-lg shadow-sm">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <img
                  className="h-12 w-12 rounded-full"
                  src="https://randomuser.me/api/portraits/women/68.jpg"
                  alt="Jessica Williams"
                />
              </div>
              <div className="ml-4">
                <h4 className="text-lg font-medium text-dark">
                  Jessica Williams
                </h4>
                <p className="text-gray-500">Career Coach</p>
              </div>
            </div>
            <div className="mt-4">
              <p className="text-gray-600">
                "I recommend JobTrack to all my coaching clients. The ability to
                track multiple versions of resumes and cover letters is
                invaluable for A/B testing applications."
              </p>
            </div>
            <div className="mt-4 flex text-yellow-400">
              <FaStar />
              <FaStar />
              <FaStar />
              <FaStar />
              <FaStarHalf />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialSection;
