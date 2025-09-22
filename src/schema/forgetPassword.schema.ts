import * as z from "zod";

export const ForgetPasswordFormSchema = z.object({
  email: z
    .string()
    .nonempty({ message: "Email is required." })
    .email({ message: "Please enter a valid email address." }),
});

export type ForgetPasswordSchema = z.infer<typeof ForgetPasswordFormSchema>;

export const formState = {
  success: false,
  error: {},
  message: null,
};

export type formStateType = {
  success: boolean;
  error: {
    email?: string[];
  };
  message: string | null;
};
