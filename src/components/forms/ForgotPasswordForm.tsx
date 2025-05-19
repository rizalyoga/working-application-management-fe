import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { FaEnvelope } from "react-icons/fa6";
import { Input } from "../ui/input";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { formForgotPasswordSchema } from "@/lib/form-validator/auth-form-validator";
import { APIResponse } from "@/types/API-types";
import { fetchAPI } from "@/lib/API/auth";
import { toast } from "sonner";
import { useMutation } from "@tanstack/react-query";
import { Button } from "../ui/button";
import { SendHorizontal } from "lucide-react";
import { Link } from "react-router";

const ForgotPasswordForm = ({
  setSuccessSendingRequest,
}: {
  setSuccessSendingRequest: () => void;
}) => {
  type FormValues = z.infer<typeof formForgotPasswordSchema>;
  const form = useForm<FormValues>({
    resolver: zodResolver(formForgotPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  const sendRequestForgotPassword = async (
    data: FormValues
  ): Promise<APIResponse> => {
    const BASE_URL = process.env.REACT_APP_API_BASE_URL;

    return await fetchAPI<APIResponse>(
      `${BASE_URL}/auth/request-reset-password`,
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
      setSuccessSendingRequest();
      toast(`Request already send! 🥰`, {
        description: `${data.message}`,
        position: "bottom-right",
        closeButton: true,
        className: "dark:text-white",
      });
    },
    onError: (error) => {
      // Handle error
      console.error(error);
      form.setError("root", {
        message: error.message || "Request failed",
      });
      toast(`Request failed!`, {
        description: error.message,
        position: "bottom-right",
        closeButton: true,
        className: "dark:text-white",
      });
    },
  });

  const sendRequestHandler = (data: FormValues) => {
    mutation.mutate(data);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(sendRequestHandler)}>
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Your Email</FormLabel>
              <FormControl>
                <div className="relative mt-2">
                  <FaEnvelope className="text-gray-400 absolute mt-2.5 mx-3" />
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

        {/* Submit Button */}
        <Button
          type="submit"
          className="w-full mt-4"
          disabled={mutation.isPending}
        >
          <SendHorizontal className="h-3.5 w-3.5 mr-0" />
          {mutation.isPending ? "Sending request..." : "Send request"}
        </Button>

        {/* Error Message */}
        {form.formState.errors.root && (
          <p className="text-sm text-red-500 text-center mt-4">
            {form.formState.errors.root.message}
          </p>
        )}
        <span
          className={`${
            mutation.isPending ? "hidden" : "flex justify-center mt-2"
          }`}
        >
          <Link to={"/login"} className="text-center hover:underline">
            Back to login page
          </Link>
        </span>
      </form>
    </Form>
  );
};

export default ForgotPasswordForm;
