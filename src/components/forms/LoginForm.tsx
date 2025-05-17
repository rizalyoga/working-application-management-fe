import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useMutation } from "@tanstack/react-query";

import { FaEye, FaLock, FaRegEyeSlash, FaUser } from "react-icons/fa6";
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

import { useNavigate } from "react-router";

import { fetchAPI } from "@/lib/API/auth";
import { APIResponse } from "@/types/API-types";
import { formLoginSchema } from "@/lib/form-validator/auth-form-validator";
import { removeCookie, setCookie } from "@/lib/cookies/cookies";
import useProfileUserStore from "@/stores/useProfileStore";

const LoginForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const {
    updateID,
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
      updateID(data.data?.user.id);
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
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        {/* Identifier Field */}
        <FormField
          control={form.control}
          name="identifier"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email </FormLabel>
              <FormControl>
                <div className="relative">
                  <FaUser className="text-gray-400 absolute mt-2.5 mx-3" />
                  <Input
                    placeholder="john@mail.com"
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
        <Button type="submit" className="w-full" disabled={mutation.isPending}>
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
  );
};

export default LoginForm;
