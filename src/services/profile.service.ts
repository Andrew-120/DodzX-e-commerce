const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL;

interface IUser {
  _id: string;
  name: string;
  email: string;
  phone?: string;
}


// Get logged user data
export async function fetchMe() {
  try {
    const res = await fetch(`${API_BASE}/api/v1/users`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    const data = await res.json();

    if (!res.ok) {
      return { success: false, message: data.message || "Failed to fetch users" };
    }

    const userId = localStorage.getItem("userId");
    const loggedUser = (data.data as IUser[]).find((u) => u._id === userId);

    if (!loggedUser) {
      return { success: false, message: "Logged in user not found" };
    }

    return { success: true, data: loggedUser };
  } catch {
    return { success: false, message: "Something went wrong fetching profile" };
  }
}

// Update logged user data
export async function updateUserData(payload: {
  name: string;
  email: string;
  phone?: string;
}) {
  try {
    const res = await fetch(`${API_BASE}/api/v1/users/updateMe`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify(payload),
    });

    const data = await res.json();

    if (!res.ok) {
      return { success: false, message: data.message || "Failed to update profile" };
    }

    return {
      success: true,
      message: "Profile updated successfully",
      data: data.data as IUser,
    };
  } catch {
    return { success: false, message: "Something went wrong updating profile" };
  }
}

// Change logged user password
export async function updateUserPassword(payload: {
  currentPassword: string;
  password: string;
  rePassword: string;
}) {
  try {
    const res = await fetch(`${API_BASE}/api/v1/users/changeMyPassword`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify(payload),
    });

    const data = await res.json();

    if (!res.ok) {
      return { success: false, message: data.message || "Failed to update password" };
    }

    return { success: true, message: "Password updated successfully" };
  } catch {
    return { success: false, message: "Something went wrong updating password" };
  }
}

// Reset password
export async function resetPassword(payload: {
  email: string;
  newPassword: string;
}) {
  try {
    const res = await fetch(`${API_BASE}/api/v1/auth/resetPassword`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const data = await res.json();

    if (!res.ok) {
      return { success: false, message: data.message || "Failed to reset password" };
    }

    return { success: true, message: "Password reset successfully", data: data.token };
  } catch {
    return { success: false, message: "Something went wrong resetting password" };
  }
}

// Verify reset code
export async function verifyResetCode(code: string) {
  try {
    const res = await fetch(`${API_BASE}/api/v1/auth/verifyResetCode`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ resetCode: code }),
    });

    const data = await res.json();

    if (!res.ok) {
      return { success: false, message: data.message || "Invalid reset code" };
    }

    return { success: true, message: "Reset code verified" };
  } catch {
    return { success: false, message: "Something went wrong verifying reset code" };
  }
}
