import { fetchAPI } from "@/lib/API/auth";
import { formResetPasswordSchema } from "@/lib/form-validator/auth-form-validator";
import { APIResponse } from "@/types/API-types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { useLocation, useNavigate } from "react-router";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { FaEye, FaLock, FaRegEyeSlash } from "react-icons/fa6";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { SendHorizontal } from "lucide-react";
import { useState } from "react";

const ResetPasswordForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const token = queryParams.get("token");
  const navigate = useNavigate();

  type FormValues = z.infer<typeof formResetPasswordSchema>;
  const form = useForm<FormValues>({
    resolver: zodResolver(formResetPasswordSchema),
    defaultValues: {
      token: token as string,
      new_password: "",
    },
  });

  const sendRequestForgotPassword = async (
    data: FormValues
  ): Promise<APIResponse> => {
    const BASE_URL = process.env.REACT_APP_API_BASE_URL;

    return await fetchAPI<APIResponse>(
      `${BASE_URL}/auth/reset-password`,
      "POST",
      false,
      {
        body: JSON.stringify(data),
      }
    );
  };

  const mutation = useMutation<APIResponse, Error, FormValues>({
    mutationFn: sendRequestForgotPassword,
    onSuccess: (data) => {
      toast(`Reset password success! 🥰`, {
        description: `${data.message}`,
        position: "bottom-right",
        closeButton: true,
        className: "dark:text-white",
      });
      navigate("/login");
    },
    onError: (error) => {
      // Handle error
      console.error(error);
      form.setError("root", {
        message: error.message || "Reset password failed",
      });
      toast(`Reset password failed!`, {
        description: error.message,
        position: "bottom-right",
        closeButton: true,
        className: "dark:text-white",
      });
    },
  });

  const sendResetPasswordHandler = (data: FormValues) => {
    mutation.mutate(data);
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(sendResetPasswordHandler)}>
        <FormField
          control={form.control}
          name="new_password"
          render={({ field }) => (
            <FormItem className="mb-4">
              <FormLabel>New Password</FormLabel>
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
          name="confirm_new_password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Confirm New Password</FormLabel>
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
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? <FaRegEyeSlash /> : <FaEye />}
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
          className="w-full mt-4"
          disabled={mutation.isPending}
        >
          <SendHorizontal className="h-3.5 w-3.5 mr-0" />
          {mutation.isPending ? "Please wait..." : "Reset"}
        </Button>

        {/* Error Message */}
        {form.formState.errors.root && (
          <p className="text-sm text-red-500 text-center mt-4">
            {form.formState.errors.root.message}
          </p>
        )}
      </form>
    </Form>
  );
};

export default ResetPasswordForm;
