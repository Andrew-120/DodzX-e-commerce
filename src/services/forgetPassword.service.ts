"use server";

import {
  ForgetPasswordFormSchema,
  formStateType,
} from "@/schema/forgetPassword.schema";

export async function handleForgetPassword(
  formState: formStateType,
  formData: FormData
) {
  const formValues = {
    email: formData.get("email"),
  };

  const parsedData = ForgetPasswordFormSchema.safeParse(formValues);

  if (!parsedData.success) {
    return {
      success: false,
      error: parsedData.error?.flatten().fieldErrors,
      message: null,
    };
  }

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/auth/forgotPasswords`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formValues),
      }
    );

    const data = await res.json();

    if (!res.ok) {
      return {
        success: false,
        error: data.errors || {},
        message: data.message || "Request failed",
      };
    }

    return {
      success: true,
      error: {},
      message: data.message || "Reset link sent successfully",
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
