import useProfileUserStore from "@/stores/useProfileStore";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { formUpdateUserProfileSchema } from "@/lib/form-validator/auth-form-validator";
import { Button } from "../ui/button";
import { z } from "zod";
import { useEffect } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { APIResponse } from "@/types/API-types";
import { fetchAPI } from "@/lib/API/auth";

const ProfileUserForm = () => {
  const userStore = useProfileUserStore();
  const queryClient = useQueryClient();
  const BASE_URL = process.env.REACT_APP_API_BASE_URL;

  type FormValues = z.infer<typeof formUpdateUserProfileSchema>;
  const methods = useForm<FormValues>({
    resolver: zodResolver(formUpdateUserProfileSchema),
    defaultValues: {
      name: "",
      email: "",
      // phone_number: "",
    },
  });

  const { register, handleSubmit, formState, setValue, control } = methods;

  useEffect(() => {
    if (userStore.email) {
      setValue("name", userStore?.name || "");
      setValue("email", userStore?.email || "");
      // setValue("phone_number", userStore?.phone_number || "");
    }
  }, [setValue]);

  const updateUserProfileData = async (
    data: FormValues
  ): Promise<APIResponse> => {
    return await fetchAPI<APIResponse>(
      `${BASE_URL}/user/update-profile-data`,
      "PUT",
      true,
      {
        body: JSON.stringify(data),
      }
    );
  };

  // Mutasi untuk mengirim data ke API
  const mutation = useMutation({
    mutationFn: updateUserProfileData,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["userProfile"] });
      userStore.updateName(data.data.name);
      userStore.updateEmail(data.data.email);
      userStore.updatePhoneNumber(data.data.phone_number);
      toast(`${data.message}! 🥰`, {
        position: "bottom-right",
      });
    },
    onError: (error) => {
      toast(`Failed to update application! 😢`, {
        description: error.message,
        position: "bottom-right",
      });
      console.error("Failed to update application", error);
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
        {/* Username Field */}
        <FormField
          control={control}
          name="name"
          render={() => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input
                  {...register("name")}
                  placeholder={userStore.name || "John doe"}
                  className="px-4"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Email Field */}
        <FormField
          control={control}
          name="email"
          render={() => (
            <FormItem>
              <FormLabel>Email address</FormLabel>
              <FormControl>
                <Input
                  type="email"
                  {...register("email")}
                  placeholder={userStore.email || "you@example.com"}
                  className="px-4"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Phone Number Field */}
        {/* <FormField
          control={control}
          name="phone_number"
          render={() => (
            <FormItem>
              <FormLabel>Phone Number</FormLabel>
              <FormControl>
                <Input
                  type="tel"
                  {...register("phone_number")}
                  placeholder={userStore.phone_number || "+62 8216129012"}
                  className="px-4"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        /> */}

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

export default ProfileUserForm;
