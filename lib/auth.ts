"use server";

import { cookies } from "next/headers";

interface RefreshResponse {
  accessToken: string;
  refreshToken: string;
}

export async function refreshAccessToken() {
  try {
    const cookieStore = await cookies();
    const refreshToken = cookieStore.get("refreshToken")?.value;

    if (!refreshToken) {
      return {
        success: false,
        error: "No refresh token found",
      };
    }

    const response = await fetch("https://dummyjson.com/auth/refresh", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        refreshToken,
        expiresInMins: 30,
      }),
    });

    if (!response.ok) {
      // Clear cookies if refresh fails
      cookieStore.delete("accessToken");
      cookieStore.delete("refreshToken");
      cookieStore.delete("userInfo");

      return {
        success: false,
        error: "Failed to refresh token",
      };
    }

    const data: RefreshResponse = await response.json();

    // Update access token
    cookieStore.set("accessToken", data.accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 30 * 60,
      path: "/",
    });

    // Update refresh token
    cookieStore.set("refreshToken", data.refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60,
      path: "/",
    });

    return {
      success: true,
    };
  } catch (error) {
    console.error("Token refresh error:", error);
    return {
      success: false,
      error: "An error occurred during token refresh",
    };
  }
}

export async function getCurrentUser() {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value;

  if (!accessToken) {
    return null;
  }

  try {
    // Fetch user data from /auth/me endpoint
    const response = await fetch("https://dummyjson.com/auth/me", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (!response.ok) {
      return null;
    }

    const userData = await response.json();
    return userData;
  } catch (error) {
    console.error("Error fetching user:", error);
    return null;
  }
}
