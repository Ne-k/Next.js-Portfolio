import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

const hostRouteMap = new Map([
  ["cardin.nguyen.ink", "/cardin"],
  ["dylan.nguyen.ink", "/dylan"],
  ["cardin.localhost", "/cardin"],
  ["dylan.localhost", "/dylan"],
]);

function getNormalizedHost(request: NextRequest) {
  const forwardedHost = request.headers.get("x-forwarded-host");
  const host = forwardedHost ?? request.headers.get("host") ?? "";

  return host.split(":")[0].toLowerCase();
}

export function proxy(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  if (pathname !== "/") {
    return NextResponse.next();
  }

  const host = getNormalizedHost(request);
  const destination = hostRouteMap.get(host);

  if (!destination || destination === pathname) {
    return NextResponse.next();
  }

  const rewriteUrl = request.nextUrl.clone();
  rewriteUrl.pathname = destination;

  return NextResponse.rewrite(rewriteUrl);
}

export const config = {
  matcher: ["/"],
};