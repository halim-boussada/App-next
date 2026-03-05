import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET() {
  const cookieStore = await cookies();

  // Clear all auth-related cookies
  cookieStore.delete("accessToken");
  cookieStore.delete("refreshToken");
  cookieStore.delete("userInfo");

  // Redirect to login page
  return NextResponse.redirect(new URL("/login", process.env.NEXT_PUBLIC_URL || "http://localhost:3000"));
}

export async function POST() {
  const cookieStore = await cookies();

  // Clear all auth-related cookies
  cookieStore.delete("accessToken");
  cookieStore.delete("refreshToken");
  cookieStore.delete("userInfo");

  return NextResponse.json({ success: true });
}
