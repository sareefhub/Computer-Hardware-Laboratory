"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useAuth } from "@/contexts/auth-context"

export function LoginForm() {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const { login } = useAuth()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!username || !password) return
    setIsLoading(true)
    try {
      await login(username, password)
    } catch (err) {
      alert("เข้าสู่ระบบไม่สำเร็จ")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex min-h-[70vh] items-center justify-center p-4">
      <Card className="w-full max-w-md border-slate-200/60 shadow-lg">
        <div className="flex flex-col items-center gap-2 pt-8">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#1E4B9B] text-white text-lg font-bold shadow-sm">
            PSU
          </div>
          <h2 className="text-xl font-semibold text-slate-900">เข้าสู่ระบบ</h2>
          <p className="text-sm text-slate-500">
            กรอกชื่อผู้ใช้และรหัสผ่านเพื่อใช้งานระบบ
          </p>
        </div>
        <CardContent className="space-y-5 pt-6 pb-8">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="username">ชื่อผู้ใช้</Label>
              <Input
                id="username"
                type="text"
                placeholder="เช่น student"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                className="h-11 rounded-xl border-slate-300 ring-offset-background focus-visible:border-[#1E4B9B] focus-visible:ring-2 focus-visible:ring-[#1E4B9B]/30"
                autoComplete="username"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">รหัสผ่าน</Label>
              <Input
                id="password"
                type="password"
                placeholder="กรอกรหัสผ่าน"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="h-11 rounded-xl border-slate-300 ring-offset-background focus-visible:border-[#1E4B9B] focus-visible:ring-2 focus-visible:ring-[#1E4B9B]/30"
                autoComplete="current-password"
              />
            </div>
            <Button
              type="submit"
              className="w-full h-11 rounded-xl bg-[#1E4B9B] hover:bg-[#153E90] text-white"
              disabled={isLoading || !username || !password}
            >
              {isLoading ? "กำลังเข้าสู่ระบบ..." : "เข้าสู่ระบบ"}
            </Button>
          </form>
          <div className="pt-2 text-center text-sm text-slate-500 space-y-1">
            <div className="font-medium text-slate-600">ข้อมูลทดสอบ</div>
            <div>นักศึกษา: student / password</div>
            <div>อาจารย์: teacher / password</div>
            <div>ผู้ดูแลระบบ: admin / password</div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
