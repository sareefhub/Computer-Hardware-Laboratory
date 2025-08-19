"use client"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useAuth } from "@/contexts/auth-context"
import { LogOut, Bell, Home } from "lucide-react"
import Link from "next/link"

export function TeacherHeader() {
  const { user, logout } = useAuth()

  // Mock notification count
  const pendingCount = 2

  return (
    <header className="bg-white shadow-sm border-b">
      <div className="container mx-auto px-4 py-4 max-w-7xl">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link href="/teacher" className="text-xl font-bold text-blue-600">
              ระบบยืม-คืนอุปกรณ์
            </Link>
            <Badge variant="secondary" className="hidden md:inline-flex">
              อาจารย์
            </Badge>
          </div>

          <nav className="hidden md:flex items-center space-x-6">
            <Link
              href="/teacher"
              className="text-gray-700 hover:text-blue-600 transition-colors flex items-center space-x-1"
            >
              <Home className="h-4 w-4" />
              <span>หน้าหลัก</span>
            </Link>
            <div className="relative">
              <Bell className="h-5 w-5 text-gray-700" />
              {pendingCount > 0 && (
                <Badge className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 text-xs bg-red-500">
                  {pendingCount}
                </Badge>
              )}
            </div>
          </nav>

          <div className="flex items-center space-x-2">
            <div className="hidden md:block text-right">
              <p className="text-sm font-medium text-gray-900">{user?.name}</p>
              <p className="text-xs text-gray-500">{user?.department}</p>
            </div>

            <div className="md:hidden relative">
              <Button variant="ghost" size="icon">
                <Bell className="h-4 w-4" />
                {pendingCount > 0 && (
                  <Badge className="absolute -top-1 -right-1 h-4 w-4 flex items-center justify-center p-0 text-xs bg-red-500">
                    {pendingCount}
                  </Badge>
                )}
              </Button>
            </div>

            <Button variant="ghost" size="icon" onClick={logout}>
              <LogOut className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </header>
  )
}
