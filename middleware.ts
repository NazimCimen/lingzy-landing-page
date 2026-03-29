import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { getSession } from "./lib/auth"
import { APP_ROUTES } from "./lib/constants"

export async function middleware(request: NextRequest) {
  // Sadece /dashboard ile başlayan rotalarda çalışsın
  if (!request.nextUrl.pathname.startsWith(APP_ROUTES.DASHBOARD.OVERVIEW)) {
    return NextResponse.next()
  }

  // Login sayfası korumadan muaf tutulmalı
  if (request.nextUrl.pathname === APP_ROUTES.DASHBOARD.LOGIN) {
    return NextResponse.next()
  }

  // Session durumu (Sunucu taraflı decode ve doğrulama lib/auth.ts içinde)
  const session = await getSession()

  if (!session || session.user !== "admin") {
    // Session yoksa veya geçersizse login sayfasına at
    const url = request.nextUrl.clone()
    url.pathname = APP_ROUTES.DASHBOARD.LOGIN
    return NextResponse.redirect(url)
  }

  // Doğrulama başarılıysa devam et
  return NextResponse.next()
}

// Sadece dashboard rotalarında bu middleware'i tetikleriz
export const config = {
  matcher: ["/dashboard/:path*"],
}
