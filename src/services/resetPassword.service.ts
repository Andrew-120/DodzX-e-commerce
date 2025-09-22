"use server";

import {
  ResetPasswordFormSchema,
  formStateType,
} from "@/schema/resetPassword.schema";

export async function handleResetPassword(
  formState: formStateType,
  formData: FormData
) {
  const formValues = {
    email: formData.get("email"),
    newPassword: formData.get("newPassword"),
    confirmPassword: formData.get("confirmPassword"),
  };

  const parsedData = ResetPasswordFormSchema.safeParse(formValues);

  if (!parsedData.success) {
    return {
      success: false,
      error: parsedData.error?.flatten().fieldErrors,
      message: null,
    };
  }

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/auth/resetPassword`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: formValues.email,
          newPassword: formValues.newPassword,
        }),
      }
    );

    const data = await res.json();

    if (!res.ok) {
      return {
        success: false,
        error: data.errors || {},
        message: data.message || "Password reset failed",
      };
    }

    return {
      success: true,
      error: {},
      message: data.message || "Password reset successfully",
    };
  } catch (error) {
    console.error(error);
    return {
      success: false,
      error: {},
      message: "Something went wrong. Please try again.",
    };
  }
}
