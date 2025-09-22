import * as z from "zod";

export const ResetCodeFormSchema = z.object({
  resetCode: z
    .string()
    .nonempty({ message: "Reset code is required." })
    .length(6, "Reset code must be 6 digits."),
});

export type ResetCodeSchema = z.infer<typeof ResetCodeFormSchema>;

export const formState = {
  success: false,
  error: {},
  message: null,
};

export type formStateType = {
  success: boolean;
  error: {
    resetCode?: string[];
  };
  message: string | null;
};
