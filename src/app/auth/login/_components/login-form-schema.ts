import { z } from "zod";

export const loginFormSchema = z.object({
  email: z
    .string({ required_error: "Email cannot be blank" })
    .email("The provided email is invalid"),
  password: z
    .string({ required_error: "Password cannot be blank" })
    .min(8, "Password should be at least 8 characters"),
});

export type LoginFormSchema = z.infer<typeof loginFormSchema>;
