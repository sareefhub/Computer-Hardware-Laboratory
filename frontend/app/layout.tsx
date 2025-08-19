import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { Noto_Sans_Thai } from "next/font/google"
import "./globals.css"
import { AuthProvider } from "@/contexts/auth-context"

const notoThai = Noto_Sans_Thai({
  subsets: ["thai"],
  weight: ["400", "700"],
  variable: "--font-psu",
})

export const metadata: Metadata = {
  title: "ระบบยืม-คืนอุปกรณ์",
  description: "Computer Hardware Laboratory",
}

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="th" className={`${GeistSans.variable} ${GeistMono.variable} ${notoThai.variable}`}>
      <body className="font-sans">
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  )
}
