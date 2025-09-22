"use server";

import { getUserToken } from "@/lib/server-utils";
import {
  UpdatePasswordFormSchema,
  formStateType,
} from "@/schema/updatePassword.schema";

export async function handleUpdatePassword(
  formState: formStateType,
  formData: FormData
) {
  const formValues = {
    currentPassword: formData.get("currentPassword"),
    password: formData.get("password"),
    rePassword: formData.get("rePassword"),
  };

  const parsedData = UpdatePasswordFormSchema.safeParse(formValues);

  if (!parsedData.success) {
    return {
      success: false,
      error: parsedData.error?.flatten().fieldErrors,
      message: null,
    };
  }

  try {
    const token = await getUserToken();
    if (!token) {
      return {
        success: false,
        error: {},
        message: "You must be logged in to update your password",
      };
    }

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/users/changeMyPassword`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          token: token as string,
        },
        body: JSON.stringify({
          currentPassword: formValues.currentPassword,
          password: formValues.password,
          rePassword: formValues.rePassword,
        }),
      }
    );

    const data = await res.json();

    if (!res.ok) {
      return {
        success: false,
        error: data.errors || {},
        message: data.message || "Password update failed",
      };
    }

    return {
      success: true,
      error: {},
      message: data.message || "Password updated successfully",
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
