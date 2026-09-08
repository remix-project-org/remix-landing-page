import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { REMIX_MOBILE_DOMAIN } from "@/lib/urls";

// mobile.remix.live is a separate domain pointed at this same deployment
// (configured in Vercel's Domains settings, not here). Requests for that
// host don't map to any route by themselves — Next.js routes by path, not
// hostname — so this rewrites them to the dedicated /mobile page while
// keeping the mobile.remix.live URL in the browser's address bar.
export function middleware(request: NextRequest) {
  const host = request.headers.get("host");
  if (host === REMIX_MOBILE_DOMAIN && request.nextUrl.pathname === "/") {
    const url = request.nextUrl.clone();
    url.pathname = "/mobile";
    return NextResponse.rewrite(url);
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|api|favicon.ico|assets|.*\\.\\w+$).*)"],
};
