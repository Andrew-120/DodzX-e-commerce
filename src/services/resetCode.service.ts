"use server";

import {
  ResetCodeFormSchema,
  formStateType,
} from "@/schema/resetCode.schema";

export async function handleVerifyResetCode(
  formState: formStateType,
  formData: FormData
) {
  const formValues = {
    resetCode: formData.get("resetCode"),
  };

  const parsedData = ResetCodeFormSchema.safeParse(formValues);

  if (!parsedData.success) {
    return {
      success: false,
      error: parsedData.error?.flatten().fieldErrors,
      message: null,
    };
  }

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/auth/verifyResetCode`,
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
        message: data.message || "Invalid reset code",
      };
    }

    return {
      success: true,
      error: {},
      message: data.message || "Code verified successfully",
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
