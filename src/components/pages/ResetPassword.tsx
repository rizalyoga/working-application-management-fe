import ResetPasswordForm from "../forms/ResetPasswordForm";
import AuthLayout from "../layout/AuthLayout";
import { Card, CardContent } from "../ui/card";

const ResetPassword = () => {
  return (
    <AuthLayout>
      <div className="min-h-screen flex items-center justify-center flex-col py-12 sm:px-6 lg:px-8 mt-8 md:mt-0">
        <Card className="sm:mx-auto sm:w-full sm:max-w-md mx-2">
          <CardContent>
            <ResetPasswordForm />
          </CardContent>
        </Card>
      </div>
    </AuthLayout>
  );
};

export default ResetPassword;
