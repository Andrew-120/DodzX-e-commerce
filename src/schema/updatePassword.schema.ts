import * as z from "zod";

export const UpdatePasswordFormSchema = z
  .object({
    currentPassword: z.string().min(6, "Current password is required."),
    password: z.string().min(6, "Password must be at least 6 characters."),
    rePassword: z.string().min(6, "Confirm password is required."),
  })
  .refine((data) => data.password === data.rePassword, {
    message: "Passwords do not match",
    path: ["rePassword"],
  });

export type UpdatePasswordSchema = z.infer<typeof UpdatePasswordFormSchema>;

export const formState = {
  success: false,
  error: {},
  message: null,
};

export type formStateType = {
  success: boolean;
  error: {
    currentPassword?: string[];
    password?: string[];
    rePassword?: string[];
  };
  message: string | null;
};
