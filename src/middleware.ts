import { jwtDecode } from "jwt-decode"; // Ensure proper import for jwtDecode
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  // Get token from cookies
  const token = request.cookies.get("accessToken")?.value;
  if (!token) {
    // Redirect to home if no token is present
    return NextResponse.redirect(new URL("/", request.url));
  }

  // Decode token to get user info
  let userInfo: { role?: string; exp: number };
  try {
    userInfo = jwtDecode(token as string) as { role?: string; exp: number };
    if (userInfo.exp && userInfo.exp * 1000 < Date.now()) {
      return NextResponse.redirect(new URL("/", request.url));
    }
  } catch (error) {
    if (error) {
      return NextResponse.redirect(new URL("/", request.url));
    }
    return;
  }
  const currentPath = request.nextUrl.pathname;

  // Restrict access to admin paths if user is not an ADMIN
  if (
    currentPath.startsWith("/dashboard2") &&
    userInfo?.role !== "SUPER_ADMIN"
  ) {
    return NextResponse.redirect(new URL("/signIn", request.url));
  }

  // Allow the request to proceed
  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard2"], // Apply middleware to all routes
};
