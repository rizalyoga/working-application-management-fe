import { Card, CardContent } from "@/components/ui/card";
import AuthLayout from "../layout/AuthLayout";
import { FaBriefcase } from "react-icons/fa6";
import { Link } from "react-router";
import RegisterForm from "../forms/RegisterForm";

const RegisterComponent = () => {
  return (
    <AuthLayout>
      <div className="min-h-screen flex items-center justify-center flex-col py-12 sm:px-6 lg:px-8 mt-16">
        <div className="flex flex-col justify-center items-center mb-8">
          <FaBriefcase className="text-primary text-5xl mb-4 text-center" />
          <h2 className="text-3xl font-extrabold text-primary">
            Create your account
          </h2>
          <p className="mt-2 text-sm text-gray-600 dark:text-primary">
            Start tracking your job applications effectively
          </p>
        </div>
        <Card className="sm:mx-auto sm:w-full sm:max-w-md">
          <CardContent>
            <RegisterForm />

            <div className="mt-6 text-center">
              <span className="text-gray-500 text-sm mr-2">
                Already have an account?
              </span>
              <Link
                to="/login"
                className="text-dark hover:text-primary/80 text-sm font-medium"
              >
                Sign In
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </AuthLayout>
  );
};

export default RegisterComponent;
