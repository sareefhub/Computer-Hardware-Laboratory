"use client"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useAuth } from "@/contexts/auth-context"
import { LogOut, Settings, Home } from "lucide-react"
import Link from "next/link"

export function AdminHeader() {
  const { user, logout } = useAuth()

  return (
    <header className="relative z-50 bg-gradient-to-r from-[#153E90] via-[#1E4B9B] to-[#2E6BC6] shadow">
      <div className="container mx-auto px-4 py-4 max-w-7xl">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Link href="/admin" className="text-xl font-bold text-white tracking-tight">
              ระบบยืม-คืนอุปกรณ์
            </Link>
            <Badge className="hidden md:inline-flex bg-white/15 text-white border-white/20">
              ผู้ดูแลระบบ
            </Badge>
          </div>

          <nav className="hidden md:flex items-center space-x-4">
            <Link
              href="/admin"
              className="text-white/90 hover:text-white px-3 py-2 rounded-lg hover:bg-white/10 transition-colors flex items-center gap-2"
            >
              <Home className="h-4 w-4" />
              <span>หน้าหลัก</span>
            </Link>
            <Button variant="ghost" size="icon" className="text-white hover:bg-white/10">
              <Settings className="h-4 w-4" />
            </Button>
          </nav>

          <div className="flex items-center space-x-3">
            <div className="hidden md:block text-right">
              <p className="text-sm font-medium text-white">{user?.name}</p>
              <p className="text-xs text-white/80">{user?.department}</p>
            </div>

            <div className="md:hidden">
              <Button variant="ghost" size="icon" className="text-white hover:bg-white/10">
                <Settings className="h-4 w-4" />
              </Button>
            </div>

            <Button variant="ghost" size="icon" onClick={logout} className="text-white hover:bg-white/10">
              <LogOut className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </header>
  )
}
