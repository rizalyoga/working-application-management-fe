import { Card, CardContent } from "../ui/card";
import ForgotPasswordForm from "../forms/ForgotPasswordForm";
import AuthLayout from "../layout/AuthLayout";
import { useState } from "react";

import { Button } from "../ui/button";
import { useNavigate } from "react-router";

const ForgotPassword = () => {
  const [isSuccess, setIsSuccess] = useState(false);
  const navigate = useNavigate();

  const setSuccessSendingRequest = () => {
    setIsSuccess(true);
  };

  return (
    <AuthLayout>
      <div className="min-h-screen flex items-center justify-center flex-col py-12 sm:px-6 lg:px-8 mt-8 md:mt-0">
        <Card className="sm:mx-auto sm:w-full sm:max-w-md mx-2">
          <CardContent>
            {!isSuccess ? (
              <ForgotPasswordForm
                setSuccessSendingRequest={setSuccessSendingRequest}
              />
            ) : (
              <>
                <h3 className="font-bold text-center text-primary">
                  The reset link has been sent to your email. Please check your
                  email inbox.
                </h3>
                <Button
                  onClick={() => navigate("/login")}
                  className="w-full p-4 mt-2"
                >
                  Back To Login Page
                </Button>
              </>
            )}
          </CardContent>
        </Card>
      </div>
    </AuthLayout>
  );
};

export default ForgotPassword;
