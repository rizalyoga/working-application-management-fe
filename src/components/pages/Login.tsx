import { FaBriefcase } from "react-icons/fa6";
import AuthLayout from "../layout/AuthLayout";
import { Link } from "react-router";
import { Card, CardContent } from "../ui/card";
import LoginForm from "../forms/LoginForm";

const LoginComponent = () => {
  return (
    <AuthLayout>
      <div className="min-h-screen flex items-center justify-center flex-col py-12 sm:px-6 lg:px-8 mt-8">
        <div className="flex flex-col justify-center items-center mb-8">
          <FaBriefcase className="text-primary text-5xl mb-4 text-center" />
          <h2 className="text-3xl font-extrabold text-primary">Welcome Back</h2>
          <p className="mt-2 text-sm text-gray-600 dark:text-primary">
            Sign in to continue tracking your job applications
          </p>
        </div>

        <Card className="sm:mx-auto sm:w-full sm:max-w-md">
          <CardContent>
            <LoginForm />
            <div className="mt-4 text-center">
              <span className={"text-gray-500 text-sm mr-2"}>
                Don't have an account?
              </span>
              <Link
                to="/register"
                className="text-dark hover:text-primary/80 text-sm font-medium"
              >
                Sign Up
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
      {/* <!-- Social Login --> */}
      {/* <div className="mt-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-gray-500">
                    Or sign up with
                  </span>
                </div>
              </div>

              <div className="mt-6 grid grid-cols-3 gap-3">
                <div>
                  <a
                    href="#"
                    className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                  >
                    <FaGoogle className=" text-red-500" />
                  </a>
                </div>
                <div>
                  <a
                    href="#"
                    className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                  >
                    <FaLinkedin className="text-blue-600" />
                  </a>
                </div>
                <div>
                  <a
                    href="#"
                    className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                  >
                    <FaGithub className="text-gray-800" />
                  </a>
                </div>
              </div>
            </div> */}
    </AuthLayout>
  );
};

export default LoginComponent;
