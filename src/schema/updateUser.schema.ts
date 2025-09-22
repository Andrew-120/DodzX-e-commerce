import * as z from "zod";

export const UpdateUserFormSchema = z.object({
  name: z.string().min(3, "Name must be at least 3 characters."),
  email: z.string().email("Invalid email address."),
  phone: z
    .string()
    .min(10, "Phone must be at least 10 digits.")
    .max(15, "Phone must be at most 15 digits."),
});

export type UpdateUserSchema = z.infer<typeof UpdateUserFormSchema>;

export const formState = {
  success: false,
  error: {},
  message: null,
};

export type formStateType = {
  success: boolean;
  error: {
    name?: string[];
    email?: string[];
    phone?: string[];
  };
  message: string | null;
};
