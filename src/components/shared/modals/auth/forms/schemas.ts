import { z } from "zod";

export const passwordSchema = z
  .string()
  .min(4, { message: "Password must be at least 4 characters" });

export const loginSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: passwordSchema,
});

export const registerSchema = loginSchema
  .merge(
    z.object({
      fullName: z
        .string()
        .min(2, { message: "Name must be at least 2 characters" }),
      passwordConfirmation: passwordSchema,
    }),
  )
  .refine((data) => data.password === data.passwordConfirmation, {
    message: "Passwords do not match",
    path: ["passwordConfirmation"],
  });

export type LoginSchema = z.infer<typeof loginSchema>;
export type RegisterSchema = z.infer<typeof registerSchema>;
