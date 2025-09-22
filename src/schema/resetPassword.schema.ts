import * as z from "zod";

export const ResetPasswordFormSchema = z
  .object({
    email: z.string().email({ message: "Please enter a valid email address." }),
    newPassword: z
      .string()
      .nonempty({ message: "Password is required." })
      .min(6, "Password must be at least 6 characters."),
    confirmPassword: z
      .string()
      .nonempty({ message: "Confirm Password is required." }),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export type ResetPasswordSchema = z.infer<typeof ResetPasswordFormSchema>;

export const formState = {
  success: false,
  error: {},
  message: null,
};

export type formStateType = {
  success: boolean;
  error: {
    email?: string[];
    newPassword?: string[];
    confirmPassword?: string[];
  };
  message: string | null;
};
