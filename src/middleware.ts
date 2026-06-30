import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    const token = req.nextauth.token;
    const path = req.nextUrl.pathname;

    // Enforce admin permission for admin dashboard paths
    if (path.startsWith("/admin") && token?.role !== "ADMIN") {
      return NextResponse.redirect(new URL("/account/login?callbackUrl=" + encodeURIComponent(req.url), req.url));
    }
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token,
    },
  }
);

export const config = {
  matcher: [
    "/admin/:path*",
    "/account",
    "/account/orders",
    "/account/addresses",
    "/account/wishlist",
    "/account/profile",
  ],
};
