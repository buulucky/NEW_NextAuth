import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    const token = req.nextauth.token;
    const pathname = req.nextUrl.pathname;

    // Redirect ผู้ใช้ที่ล็อกอินแล้วออกจากหน้า /auth/login
    if ((pathname.startsWith("/auth/login") || pathname.startsWith("/auth/register")) && token) {
      return NextResponse.redirect(new URL("/", req.url));
    }

    // ตรวจสอบเส้นทางที่ต้องการ admin role
    if (pathname.startsWith("/admin")) {
      if (!token || token.role !== "ADMIN") {
        return NextResponse.redirect(
          new URL("/auth/login?error=access-denied", req.url)
        );
      }
    }

    // ตรวจสอบเส้นทางที่ต้องการการ login
    if (pathname.startsWith("/dashboard") || pathname.startsWith("/profile")) {
      if (!token) {
        return NextResponse.redirect(new URL("/auth/login", req.url));
      }
    }

    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        const { pathname } = req.nextUrl;

        // อนุญาตเส้นทางสาธารณะ
        if (
          pathname === "/" ||
          pathname.startsWith("/auth") ||
          pathname.startsWith("/api/auth") ||
          pathname.startsWith("/_next") ||
          pathname.startsWith("/favicon.ico")
        ) {
          return true;
        }

        // ต้องมี token สำหรับเส้นทางที่ปกป้อง
        return !!token;
      },
    },
  }
);

// กำหนดเส้นทางที่ middleware จะทำงาน
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
