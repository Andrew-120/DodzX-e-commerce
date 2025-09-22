"use server";

import { getUserToken } from "@/lib/server-utils";
import {
  UpdateUserFormSchema,
  formStateType,
} from "@/schema/updateUser.schema";

export async function handleUpdateUser(
  formState: formStateType,
  formData: FormData
) {
  const formValues = {
    name: formData.get("name"),
    email: formData.get("email"),
    phone: formData.get("phone"),
  };

  const parsedData = UpdateUserFormSchema.safeParse(formValues);

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
        message: "You must be logged in to update your profile",
      };
    }

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/users/updateMe/`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          token: token as string,
        },
        body: JSON.stringify(formValues),
      }
    );

    const data = await res.json();

    if (!res.ok) {
      return {
        success: false,
        error: data.errors || {},
        message: data.message || "Update failed",
      };
    }

    return {
      success: true,
      error: {},
      message: data.message || "Profile updated successfully",
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
