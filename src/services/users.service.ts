"use server";

import { getUserToken } from "@/lib/server-utils";

export async function getUsers(keyword?: string) {
  try {
    const token = await getUserToken();
    if (!token) {
      return {
        success: false,
        data: [],
        message: "Unauthorized: Admin login required",
      };
    }

    const endpoint = keyword
      ? `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/users?keyword=${keyword}`
      : `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/users`;

    const res = await fetch(endpoint, {
      headers: {
        token: token as string,
      },
      cache: "no-store",
    });

    const data = await res.json();

    if (!res.ok) {
      return {
        success: false,
        data: [],
        message: data.message || "Failed to fetch users",
      };
    }

    return {
      success: true,
      data: data.data || [],
      message: "Users fetched successfully",
    };
  } catch (error) {
    console.error(error);
    return {
      success: false,
      data: [],
      message: "Something went wrong. Please try again.",
    };
  }
}
