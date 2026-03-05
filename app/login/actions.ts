"use server";

import { cookies } from "next/headers";

interface LoginResponse {
  id: number;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  gender: string;
  image: string;
  accessToken: string;
  refreshToken: string;
}

export async function loginAction(username: string, password: string) {
  try {
    const response = await fetch("https://dummyjson.com/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username,
        password,
        expiresInMins: 30,
      }),
    });

    if (!response.ok) {
      return {
        success: false,
        error: "Invalid credentials",
      };
    }

    const data: LoginResponse = await response.json();

    // Save tokens in HTTP-only cookies
    const cookieStore = await cookies();

    cookieStore.set("accessToken", data.accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 30 * 60, // 30 minutes
      path: "/",
    });

    cookieStore.set("refreshToken", data.refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60, // 7 days
      path: "/",
    });

    // Store user info (non-sensitive) in a separate cookie
    cookieStore.set("userInfo", JSON.stringify({
      id: data.id,
      username: data.username,
      email: data.email,
      firstName: data.firstName,
      lastName: data.lastName,
    }), {
      httpOnly: false,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 30 * 60,
      path: "/",
    });

    return {
      success: true,
    };
  } catch (error) {
    console.error("Login error:", error);
    return {
      success: false,
      error: "An error occurred during login",
    };
  }
}
