"use server";

import { getUserToken } from "@/lib/server-utils";



export async function getUserCart() {
  try {
    const token = await getUserToken();
    const res = await fetch(
      `${process.env.API_BASE_URL}/api/v1/cart`,
      {
        headers: {
          token: token as string,
        },
      }
    );

    const data = await res.json();
    if (!res.ok) {
      return {
        data: null,
        success: false,
        message: data.message || "Error in fetching cart",
      };
    }
    return {
      data: data,
      success: true,
      message: data.message || "Cart fetched successfully",
    };
  } catch (error) {
    return {
      data: null,
      success: false,
      message: (error as string) || "Something went wrong",
    }
  }
}


export async function removeUserCart() {
  try {
    const token = await getUserToken();
    const res = await fetch(
      `${process.env.API_BASE_URL}/api/v1/cart`,
      {
        method: "DELETE",
        headers: {
          token: token as string,
        },
      }
    );

    const data = await res.json();
    if (!res.ok) {
      return {
        data: null,
        success: false,
        message: data.message || "Error in removing cart",
      };
    }
    return {
      data: data,
      success: true,
      message: data.message || "Cart removed successfully",
    };
  } catch (error) {
    return {
      data: null,
      success: false,
      message: (error as string) || "Something went wrong",
    }
  }
}


export async function addToCart(productId: string) {
  try {
    const token = await getUserToken();
    if(!token) {
      return {
        data: null,
        success: false,
        message: "Please login to add to cart",
      }
    }
    const res = await fetch(
      `${process.env.API_BASE_URL}/api/v1/cart`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          token: token as string,
        },
        body: JSON.stringify({ productId }),
      }
    );

    const data = await res.json();
    if (!res.ok) {
      return {
        data: null,
        success: false,
        message: data.message || "Adding to cart failed",
      };
    }
    return {
      data: data,
      success: true,
      message: data.message || "Product added to cart successfully",
    };
  } catch (error) {

    return {
      data: null,
      success: false,
      message: (error as string) || "Something went wrong",
    };
  }
}


export async function removeFromCart(productId: string) {
  try {
    const token = await getUserToken();
    const res = await fetch(
      `${process.env.API_BASE_URL}/api/v1/cart/${productId}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          token: token as string,
        },
      }
    );

    const data = await res.json();
    if (!res.ok) {
      return {
        data: null,
        success: false,
        message: data.message || "Removing from cart failed",
      };
    }
    return {
      data: data,
      success: true,
      message: data.message || "Removed from cart successfully",
    };
  } catch (error) {

    return {
      data: null,
      success: false,
      message: (error as string) || "Something went wrong",
    };
  }
}


export async function updateQtyProductCart(productId: string, count: number) {
  try {
    const token = await getUserToken();
    const res = await fetch(
      `${process.env.API_BASE_URL}/api/v1/cart/${productId}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          token: token as string,
        },
        body: JSON.stringify({ count }),
      }
    );

    const data = await res.json();
    if (!res.ok) {
      return {
        data: null,
        success: false,
        message: data.message || "Updated quantity in cart failed",
      };
    }
    return {
      data: data,
      success: true,
      message: data.message || "Updated quantity in cart successfully",
    };
  } catch (error) {

    return {
      data: null,
      success: false,
      message: (error as string) || "Something went wrong",
    };
  }
}