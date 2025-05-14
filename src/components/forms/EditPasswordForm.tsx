import { useState } from "react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { FaEye, FaRegEyeSlash } from "react-icons/fa6";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { formUpdatePasswordSchema } from "@/lib/form-validator/auth-form-validator";
import { APIResponse } from "@/types/API-types";
import { fetchAPI } from "@/lib/API/auth";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

const EditPasswordForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmNewPassword, setShowConfirmNewPassword] = useState(false);

  type FormValues = z.infer<typeof formUpdatePasswordSchema>;
  const methods = useForm<FormValues>({
    resolver: zodResolver(formUpdatePasswordSchema),
    defaultValues: {
      current_password: "",
      new_password: "",
      confirm_new_password: "",
    },
  });

  const { handleSubmit, control, formState } = methods;

  const updatePassword = async (data: FormValues): Promise<APIResponse> => {
    const BASE_URL = process.env.REACT_APP_API_BASE_URL;
    const newData = {
      current_password: data.current_password,
      new_password: data.new_password,
    };

    return await fetchAPI<APIResponse>(
      `${BASE_URL}/user/update-password`,
      "PUT",
      true,
      {
        body: JSON.stringify(newData),
      }
    );
  };

  const mutation = useMutation<APIResponse, Error, FormValues>({
    mutationFn: updatePassword,
    onSuccess: (data) => {
      methods.reset();
      toast(`${data.message}! 🥰`, {
        position: "bottom-right",
      });
    },
    onError: (error) => {
      // Handle error
      console.error(error);
      methods.setError("root", {
        message: error.message || "Update password failed",
      });
      toast(`Update password failed 😢`, {
        description: error.message,
        position: "bottom-right",
      });
    },
  });

  const submit = (data: FormValues) => {
    mutation.mutate(data);
  };
  return (
    <Form {...methods}>
      <form
        onSubmit={handleSubmit(submit)}
        className="space-y-6 max-w-2xl mx-auto mb-6"
      >
        {/* Current Password Field */}
        <FormField
          control={control}
          name="current_password"
          render={({ field }) => (
            <FormItem>
              <span className="flex justify-between">
                <FormLabel>Current Password</FormLabel>
                <p className="text-xs text-slate-500 dark:text-slate-200">
                  Min 8 characters
                </p>
              </span>
              <FormControl>
                <div className="relative">
                  <Input
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    {...field}
                    className="px-4"
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

        {/* New Password Field */}
        <FormField
          control={control}
          name="new_password"
          render={({ field }) => (
            <FormItem>
              <span className="flex justify-between">
                <FormLabel>New Password</FormLabel>
                <p className="text-xs text-slate-500 dark:text-slate-200">
                  Min 8 characters
                </p>
              </span>
              <FormControl>
                <div className="relative">
                  <Input
                    type={showNewPassword ? "text" : "password"}
                    placeholder="••••••••"
                    {...field}
                    className="px-4"
                  />
                  <Button
                    type="button"
                    variant="link"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3"
                    onClick={() => setShowNewPassword(!showNewPassword)}
                  >
                    {showNewPassword ? <FaRegEyeSlash /> : <FaEye />}
                  </Button>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Confirm New Password Field */}
        <FormField
          control={control}
          name="confirm_new_password"
          render={({ field }) => (
            <FormItem>
              <span className="flex justify-between">
                <FormLabel>Confirm New Password</FormLabel>
                <p className="text-xs text-slate-500 dark:text-slate-200">
                  Min 8 characters
                </p>
              </span>
              <FormControl>
                <div className="relative">
                  <Input
                    type={showConfirmNewPassword ? "text" : "password"}
                    placeholder="••••••••"
                    {...field}
                    className="px-4"
                  />
                  <Button
                    type="button"
                    variant="link"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3"
                    onClick={() =>
                      setShowConfirmNewPassword(!showConfirmNewPassword)
                    }
                  >
                    {showConfirmNewPassword ? <FaRegEyeSlash /> : <FaEye />}
                  </Button>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          type="submit"
          className="w-full cursor-pointer"
          disabled={mutation.isPending}
        >
          {mutation.isPending ? "Saving..." : "Save"}
        </Button>

        {/* Error Message */}
        {formState?.errors?.root && (
          <p className="text-sm text-red-500 text-center">
            {formState?.errors?.root.message}
          </p>
        )}
      </form>
    </Form>
  );
};

export default EditPasswordForm;
