import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useMutation } from "@tanstack/react-query";

import {
  FaBriefcase,
  FaEye,
  FaLock,
  FaRegEyeSlash,
  FaUser,
} from "react-icons/fa6";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Card, CardContent } from "@/components/ui/card";
import { Link, useNavigate } from "react-router";
import AuthLayout from "../layout/AuthLayout";

import { fetchAPI } from "@/lib/API/auth";
import { APIResponse } from "@/types/API-types";
import { formLoginSchema } from "@/lib/form-validator/auth-form-validator";
import { removeCookie, setCookie } from "@/lib/cookies/cookies";
import useProfileUserStore from "@/stores/useProfileStore";

const LoginComponent = () => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const {
    updateName,
    updateEmail,
    updatePhoneNumber,
    updateProfilePictureUrl,
    updateResumeUrl,
  } = useProfileUserStore();

  type FormValues = z.infer<typeof formLoginSchema>;
  const form = useForm<FormValues>({
    resolver: zodResolver(formLoginSchema),
    defaultValues: {
      identifier: "",
      password: "",
    },
  });

  const loginUser = async (data: FormValues): Promise<APIResponse> => {
    const BASE_URL = process.env.REACT_APP_API_BASE_URL;

    return await fetchAPI<APIResponse>(
      `${BASE_URL}/auth/login`,
      "POST",
      false,
      {
        body: JSON.stringify(data),
      }
    );
  };

  // TanStack Query mutation for form submission
  const mutation = useMutation<APIResponse, Error, FormValues>({
    mutationFn: loginUser,
    onSuccess: (data) => {
      form.reset();
      toast(`Login Successfull! 🥰`, {
        description: `Welcome Back ${data.data.user.name}`,
        position: "bottom-right",
        closeButton: true,
        className: "dark:text-white",
      });
      // Save response data to localstorage
      localStorage.setItem("profile-storage", JSON.stringify(data));
      // Save response data to global state
      updateName(data.data?.user.name);
      updateEmail(data.data?.user.email);
      updatePhoneNumber(data.data?.user.phone_number);
      updateProfilePictureUrl(
        data.data?.user.profile_picture_url
          ? data.data?.user.profile_picture_url
          : ""
      );
      updateResumeUrl(
        data.data?.user.resume_url ? data.data?.user.resume_url : ""
      );

      removeCookie("access_token");
      removeCookie("refresh_token");
      setCookie("access_token", data.data?.tokens.access_token, 1);
      setCookie("refresh_token", data.data?.tokens.refresh_token, 7);
      navigate("/dashboard");
    },
    onError: (error) => {
      // Handle error
      console.error(error);
      form.setError("root", {
        message: error.message || "Login failed",
      });
      toast(`Login failed!`, {
        description: error.message,
        position: "bottom-right",
        closeButton: true,
        className: "dark:text-white",
      });
    },
  });

  // Form submission handler
  const onSubmit = (data: FormValues) => {
    mutation.mutate(data);
  };

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
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-6"
              >
                {/* Identifier Field */}
                <FormField
                  control={form.control}
                  name="identifier"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email / Phone number</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <FaUser className="text-gray-400 absolute mt-2.5 mx-3" />
                          <Input
                            placeholder="john@mail.com / +62 82321986727"
                            {...field}
                            className="px-9"
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Password Field */}
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <FaLock className="absolute mt-2.5 mx-3 text-gray-400" />
                          <Input
                            type={showPassword ? "text" : "password"}
                            placeholder="••••••••"
                            {...field}
                            className="px-9"
                          />
                          <Button
                            type="button"
                            variant="link"
                            size="sm"
                            className="absolute right-0 top-0 h-full px-3"
                            onClick={() => setShowPassword(!showPassword)}
                          >
                            {showPassword ? <FaRegEyeSlash /> : <FaEye />}
                          </Button>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Submit Button */}
                <Button
                  type="submit"
                  className="w-full"
                  disabled={mutation.isPending}
                >
                  {mutation.isPending ? "Sign In..." : "Sign In"}
                </Button>

                {/* Error Message */}
                {form.formState.errors.root && (
                  <p className="text-sm text-red-500 text-center">
                    {form.formState.errors.root.message}
                  </p>
                )}
              </form>
            </Form>
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
