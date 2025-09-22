"use server";

import { formStateType, RegisterFormSchema } from "@/schema/register.schema";

export async function handleRegister(formState: formStateType, formData: FormData) {
  const formValues = {
    name: formData.get("name"),
    email: formData.get("email"),
    password: formData.get("password"),
    rePassword: formData.get("rePassword"),
    phone: formData.get("phone"),
  };

  const parsedData = RegisterFormSchema.safeParse(formValues);

  if (!parsedData.success) {
    return {
      success: false,
      error: parsedData.error?.flatten().fieldErrors,
      message: null,
    };
  }

  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/auth/signup`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formValues),
    });

    const data = await res.json();

    if (!res.ok) {
      return {
        success: false,
        error: data.errors || {},
        message: data.message || "Registration failed",
      };
    }

    return {
      success: true,
      error: {},
      message: data.message || "Registered successfully",
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
