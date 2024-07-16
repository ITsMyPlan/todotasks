import { NextResponse } from 'next/server'
import { createClient } from '@/_utils/supabase/server'

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url)
  const code = searchParams.get('code')
  const next = searchParams.get('next') ?? '/'

  if (code) {
    const supabase = createClient()
    const { error } = await supabase.auth.exchangeCodeForSession(code)

    if (error) {
      return NextResponse.redirect(`${origin}/error`)
    } else {
      // `${origin}${next}`로 리다이렉션을 시도했으나 oAuth 로그인 직후 '/signin'에 머물러있는 문제 발견
      //  `${origin}/`나 미들웨어 건드려도 문제해결이 안되서 하드코딩으로 일단 해결
      // return NextResponse.redirect('http://localhost:3000')
      // return NextResponse.redirect('https://main.d2kkit0z8d505j.amplifyapp.com/')
      return NextResponse.redirect(`${origin}${next}`)
    }
  }
  return NextResponse.redirect(`${origin}/error`)
}
