import { z } from "zod";

export const formRegisterSchema = z
  .object({
    name: z.string().min(3, "Username must be at least 3 characters"),
    email: z.string().email("Invalid email address"),
    phone_number: z
      .string()
      .min(10, "Phone number must be at least 10 digits")
      .regex(/^\+?[1-9]\d{1,14}$/, "Invalid phone number format"),
    password: z.string().min(8, "Password must be at least 8 characters"),
    confirmPassword: z.string(),
    terms: z
      .boolean()
      .refine((val) => val === true, "You must agree to the terms"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const formLoginSchema = z.object({
  identifier: z
    .string()
    .refine(
      (value) => emailRegex.test(value) || /^\+?[1-9]\d{1,14}$/.test(value),
      {
        message: "Identifier must be a valid email or phone number",
      }
    ),
  password: z.string().min(8, "Password must be at least 8 characters"),
});
