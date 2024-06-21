import { type NextRequest, NextResponse } from 'next/server'
import { updateSession } from '@/_utils/supabase/middleware'
import { createServerClient, type CookieOptions } from '@supabase/ssr'

// 로그인해야 접근할 수 있는 루트[]
const protectedRoutes = ['/', '/calendar']

export async function middleware(request: NextRequest) {
  const response = await updateSession(request)

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return request.cookies.get(name)?.value
        },
        set(name: string, value: string, options: CookieOptions) {
          request.cookies.set({
            name,
            value,
            ...options,
          })
          response.cookies.set({
            name,
            value,
            ...options,
          })
        },
        remove(name: string, options: CookieOptions) {
          request.cookies.set({
            name,
            value: '',
            ...options,
          })
          response.cookies.set({
            name,
            value: '',
            ...options,
          })
        },
      },
    },
  )

  const {
    data: { session },
    error,
  } = await supabase.auth.getSession()

  if (request.nextUrl.pathname === '/signin' && session) {
    const url = request.nextUrl.clone()
    url.pathname = '/'
    return NextResponse.redirect(url)
  }

  // /, /calendar에 로그인 아닌 상태로 접근하면 /signin으로 사전에 차단
  if (protectedRoutes.includes(request.nextUrl.pathname)) {
    if (!session) {
      const url = request.nextUrl.clone()
      url.pathname = '/signin'
      return NextResponse.redirect(url)
    }
  }
  if (error) {
    console.error('root middleware error: ', error)
  }
  return response
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)'],
}
