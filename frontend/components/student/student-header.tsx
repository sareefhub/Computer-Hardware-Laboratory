"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/contexts/auth-context"
import { LogOut, History, Menu, X, CheckCircle } from "lucide-react"
import Link from "next/link"

export function StudentHeader() {
  const { user, logout } = useAuth()
  const [open, setOpen] = useState(false)

  return (
    <header className="relative z-50 bg-gradient-to-r from-[#153E90] via-[#1E4B9B] to-[#2E6BC6] shadow">
      <div className="container mx-auto px-4 py-4 max-w-7xl">
        <div className="flex items-center justify-between">
          <Link href="/student" className="text-xl font-bold text-white tracking-tight">
            ระบบยืม-คืนอุปกรณ์
          </Link>

          <nav className="hidden md:flex items-center space-x-2">
            <Link
              href="/student"
              className="text-white/90 hover:text-white px-3 py-2 rounded-lg hover:bg-white/10 transition-colors"
            >
              หน้าหลัก
            </Link>
            <Link
              href="/student/confirm"
              className="text-white/90 hover:text-white px-3 py-2 rounded-lg hover:bg-white/10 transition-colors"
            >
              ยืนยันการยืม
            </Link>
            <Link
              href="/student/history"
              className="text-white/90 hover:text-white px-3 py-2 rounded-lg hover:bg_white/10 hover:bg-white/10 transition-colors"
            >
              ประวัติการยืม
            </Link>
          </nav>

          <div className="hidden md:flex items-center space-x-3">
            <div className="text-right">
              <p className="text-sm font-medium text-white">{user?.name}</p>
              <p className="text-xs text-white/80">{user?.studentId}</p>
            </div>
            <Button variant="ghost" size="icon" onClick={logout} className="text-white hover:bg-white/10">
              <LogOut className="h-4 w-4" />
            </Button>
          </div>

          <div className="md:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setOpen((v) => !v)}
              aria-label="Toggle menu"
              className="text-white hover:bg-white/10"
            >
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>
      </div>

      <div
        className={`md:hidden absolute top-full left-0 w-full bg-white shadow-md transition-transform duration-300 ease-in-out ${
          open ? "translate-y-0 opacity-100" : "-translate-y-5 opacity-0 pointer-events-none"
        }`}
      >
        <div className="px-4 py-3 space-y-4">
          <div className="flex items-center justify-between border-b pb-3">
            <div>
              <p className="text-sm font-medium text-slate-900">{user?.name}</p>
              <p className="text-xs text-slate-500">{user?.studentId}</p>
            </div>
            <Button variant="ghost" size="icon" onClick={logout} className="text-[#1E4B9B] hover:bg-[#1E4B9B]/10">
              <LogOut className="h-4 w-4" />
            </Button>
          </div>

          <div className="flex flex-col space-y-2">
            <Link
              href="/student"
              onClick={() => setOpen(false)}
              className="px-2 py-2 rounded-md text-slate-800 hover:bg-[#1E4B9B]/10 transition"
            >
              หน้าหลัก
            </Link>
            <Link
              href="/student/confirm"
              onClick={() => setOpen(false)}
              className="px-2 py-2 rounded-md text-slate-800 hover:bg-[#1E4B9B]/10 flex items-center gap-2 transition"
            >
              <CheckCircle className="h-4 w-4 text-[#1E4B9B]" />
              ยืนยันการยืม
            </Link>
            <Link
              href="/student/history"
              onClick={() => setOpen(false)}
              className="px-2 py-2 rounded-md text-slate-800 hover:bg-[#1E4B9B]/10 flex items-center gap-2 transition"
            >
              <History className="h-4 w-4 text-[#1E4B9B]" />
              ประวัติการยืม
            </Link>
          </div>
        </div>
      </div>
    </header>
  )
}
