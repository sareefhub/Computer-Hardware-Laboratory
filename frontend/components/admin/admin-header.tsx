"use client"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useAuth } from "@/contexts/auth-context"
import { LogOut, Settings, Home } from "lucide-react"
import Link from "next/link"

export function AdminHeader() {
  const { user, logout } = useAuth()

  return (
    <header className="bg-white shadow-sm border-b">
      <div className="container mx-auto px-4 py-4 max-w-7xl">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link href="/admin" className="text-xl font-bold text-blue-600">
              ระบบยืม-คืนอุปกรณ์
            </Link>
            <Badge variant="secondary" className="hidden md:inline-flex bg-purple-100 text-purple-800">
              ผู้ดูแลระบบ
            </Badge>
          </div>

          <nav className="hidden md:flex items-center space-x-6">
            <Link
              href="/admin"
              className="text-gray-700 hover:text-blue-600 transition-colors flex items-center space-x-1"
            >
              <Home className="h-4 w-4" />
              <span>หน้าหลัก</span>
            </Link>
            <Button variant="ghost" size="icon">
              <Settings className="h-4 w-4" />
            </Button>
          </nav>

          <div className="flex items-center space-x-2">
            <div className="hidden md:block text-right">
              <p className="text-sm font-medium text-gray-900">{user?.name}</p>
              <p className="text-xs text-gray-500">{user?.department}</p>
            </div>

            <div className="md:hidden">
              <Button variant="ghost" size="icon">
                <Settings className="h-4 w-4" />
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
