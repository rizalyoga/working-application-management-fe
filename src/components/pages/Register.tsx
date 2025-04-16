import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useMutation } from "@tanstack/react-query";
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
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "sonner";
import { Card, CardContent } from "@/components/ui/card";
import {
  FaBriefcase,
  FaEnvelope,
  FaEye,
  FaLock,
  FaPhone,
  FaRegEyeSlash,
  FaUser,
} from "react-icons/fa6";
import { fetchAPI } from "@/lib/API/auth";
import { APIResponse } from "@/types/API-types";
import { formRegisterSchema } from "@/lib/form-validator/auth-form-validator";
import AuthLayout from "../layout/AuthLayout";
import { setCookie } from "@/lib/cookies/cookies";

const RegisterComponent = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();

  // Initialize form with react-hook-form and zod
  type FormValues = z.infer<typeof formRegisterSchema>;
  const form = useForm<FormValues>({
    resolver: zodResolver(formRegisterSchema),
    defaultValues: {
      name: "",
      email: "",
      phone_number: "",
      password: "",
      confirmPassword: "",
      terms: false,
    },
  });

  const registerUser = async (data: FormValues): Promise<APIResponse> => {
    const BASE_URL = process.env.REACT_APP_API_BASE_URL;

    return await fetchAPI<APIResponse>(
      `${BASE_URL}/auth/register`,
      "POST",
      false,
      {
        body: JSON.stringify(data),
      }
    );
  };

  // TanStack Query mutation for form submission
  const mutation = useMutation<APIResponse, Error, FormValues>({
    mutationFn: registerUser,
    onSuccess: (data) => {
      form.reset();
      toast("Account was successfully created!", {
        description: data.message,
        position: "top-right",
      });

      setCookie("access_token", data.data?.tokens.access_token, 1);
      setCookie("refresh_token", data.data?.tokens.refresh_token, 7);
      navigate("/dashboard");
    },
    onError: (error) => {
      // Handle error
      console.error(error);
      form.setError("root", {
        message: error.message || "Registration failed",
      });
      toast(`Registration failed!`, {
        description: error.message,
        position: "top-right",
      });
    },
  });

  // Form submission handler
  const onSubmit = (data: FormValues) => {
    mutation.mutate(data);
  };

  return (
    <AuthLayout>
      <div className="min-h-screen flex items-center justify-center flex-col py-12 sm:px-6 lg:px-8 mt-16">
        <div className="flex flex-col justify-center items-center mb-8">
          <FaBriefcase className="text-primary text-5xl mb-4 text-center" />
          <h2 className="text-3xl font-extrabold text-gray-900">
            Create your account
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Start tracking your job applications effectively
          </p>
        </div>
        <Card className="sm:mx-auto sm:w-full sm:max-w-md">
          <CardContent>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-6"
              >
                {/* Username Field */}
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Username</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <FaUser className="text-gray-400 absolute mt-2.5 mx-3" />
                          <Input
                            placeholder="john_doe"
                            {...field}
                            className="px-9"
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Email Field */}
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email address</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <FaEnvelope className="text-gray-400 absolute mt-2.5 mx-3" />
                          <Input
                            type="email"
                            placeholder="you@example.com"
                            {...field}
                            className="px-9"
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Phone Number Field */}
                <FormField
                  control={form.control}
                  name="phone_number"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Phone Number</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <FaPhone className="absolute mt-2.5 mx-3 text-gray-400" />
                          <Input
                            type="tel"
                            placeholder="+62 8216129012"
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

                {/* Confirm Password Field */}
                <FormField
                  control={form.control}
                  name="confirmPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Confirm Password</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <FaLock className="absolute mt-2.5 mx-3 text-gray-400" />
                          <Input
                            type={showConfirmPassword ? "text" : "password"}
                            placeholder="••••••••"
                            {...field}
                            className="px-9"
                          />
                          <Button
                            type="button"
                            variant="link"
                            size="sm"
                            className="absolute right-0 top-0 h-full px-3"
                            onClick={() =>
                              setShowConfirmPassword(!showConfirmPassword)
                            }
                          >
                            {showConfirmPassword ? (
                              <FaRegEyeSlash />
                            ) : (
                              <FaEye />
                            )}
                          </Button>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Terms and Conditions */}
                <FormField
                  control={form.control}
                  name="terms"
                  render={({ field }) => (
                    <FormItem className="flex items-center space-x-2">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <FormLabel className="text-sm">
                        I agree to the Terms of Service and Privacy Policy
                      </FormLabel>
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
                  {mutation.isPending
                    ? "Creating Account..."
                    : "Create Account"}
                </Button>

                {/* Error Message */}
                {form.formState.errors.root && (
                  <p className="text-sm text-red-500 text-center">
                    {form.formState.errors.root.message}
                  </p>
                )}
              </form>
            </Form>

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
