// middleware.js
import { NextResponse } from "next/server";

export function middleware(request) {
  const { pathname } = request.nextUrl;

  // Get all cookies as a string
  const cookies = request.headers.get("cookie") || "";

  // Check if jwt cookie exists
  const hasJwtCookie = cookies.includes("jwt=");

  // Private paths that require authentication
  const privatePaths = ["/admin"];

  // Login and Register paths
  const authPaths = ["/login", "/register"];

  // Check if path is authentication path
  const isAuthPath = authPaths.includes(pathname);

  // Check if the path is private
  const isPrivatePath = privatePaths.includes(pathname);

  // If there's no token and the path is private, redirect to login
  if (!hasJwtCookie && isPrivatePath) {
    const url = new URL("/login", request.url);
    url.searchParams.set("returnUrl", pathname);
    return NextResponse.redirect(url);
  }

  // If there's a token and trying to access login/register, redirect to home
  if (hasJwtCookie && isAuthPath) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

// Configure which paths the middleware should run on
export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    "/((?!api|_next/static|_next/image|favicon.ico|public).*)",
  ],
};
