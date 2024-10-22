import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import '@/styles/globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'todotasks',
  description: 'write down your todolist',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="container relative z-0 h-screen px-[21px] py-[22px] sm:space-x-4">{children}</div>
      </body>
    </html>
  )
}
