import { NextResponse, type NextRequest } from "next/server"
import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs"

export async function middleware(req: NextRequest) {
  const res = NextResponse.next()
  const pathname = req.nextUrl.pathname

  const supabase = createMiddlewareClient({ req, res })

  const {
    data: { session },
  } = await supabase.auth.getSession()

  //redirect the user to login page instead of landing page
  if (!session && pathname === "/") {
    const url = new URL(req.url)
    url.pathname = "/login"
    return NextResponse.redirect(url)
  }

  //redirects the user to dashboard PS: comment this out if u want to redirect to landing page instead of dashboard
  if (session && pathname === "/") {
    const url = new URL(req.url)
    url.pathname = "/dashboard"
    return NextResponse.redirect(url)
  }

  return res
}

export const config = {
  matcher: ["/", "/dashboard"],
}
