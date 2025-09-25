"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useAuth } from "@/contexts/auth-context"
import { LogOut, Bell, Home } from "lucide-react"
import Link from "next/link"
import { endpoints } from "@/lib/api"

export function TeacherHeader() {
  const { user, logout } = useAuth()
  const [pendingCount, setPendingCount] = useState(0)

  useEffect(() => {
    const loadPending = async () => {
      try {
        const res = await fetch(endpoints.teacher.getAllBorrowing)
        if (res.ok) {
          const data = await res.json()
          const pending = data.filter((req: any) => req.statusCode === 1).length
          setPendingCount(pending)
        }
      } catch (err) {
        console.error("Failed to fetch pending requests:", err)
      }
    }
    loadPending()
  }, [])

  return (
    <header className="relative z-50 bg-gradient-to-r from-[#153E90] via-[#1E4B9B] to-[#2E6BC6] shadow">
      <div className="container mx-auto px-4 py-4 max-w-7xl">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Link href="/teacher" className="text-xl font-bold text-white tracking-tight">
              ระบบยืม-คืนอุปกรณ์
            </Link>
            <Badge variant="secondary" className="hidden md:inline-flex bg-white/15 text-white border-white/20">
              อาจารย์
            </Badge>
          </div>

          <nav className="hidden md:flex items-center space-x-4">
            <Link
              href="/teacher"
              className="text-white/90 hover:text-white px-3 py-2 rounded-lg hover:bg-white/10 transition-colors flex items-center gap-2"
            >
              <Home className="h-4 w-4" />
              <span>หน้าหลัก</span>
            </Link>
            <div className="relative px-3 py-2 rounded-lg hover:bg-white/10">
              <Bell className="h-5 w-5 text-white/90" />
              {pendingCount > 0 && (
                <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs bg-red-500 text-white">
                  {pendingCount}
                </Badge>
              )}
            </div>
          </nav>

          <div className="hidden md:flex items-center space-x-3">
            <div className="text-right">
              <p className="text-sm font-medium text-white">{user?.name}</p>
              <p className="text-xs text-white/80">{user?.department}</p>
            </div>
            <Button variant="ghost" size="icon" onClick={logout} className="text-white hover:bg-white/10">
              <LogOut className="h-4 w-4" />
            </Button>
          </div>

          <div className="md:hidden flex items-center gap-2">
            <div className="relative">
              <Button variant="ghost" size="icon" className="text-white hover:bg-white/10">
                <Bell className="h-4 w-4" />
                {pendingCount > 0 && (
                  <Badge className="absolute -top-1 -right-1 h-4 w-4 flex items-center justify-center p-0 text-[10px] bg-red-500 text-white">
                    {pendingCount}
                  </Badge>
                )}
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
