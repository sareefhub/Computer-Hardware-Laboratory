"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { toast } from "sonner"
import { AdminHeader } from "@/components/admin/admin-header"
import { endpoints } from "@/lib/api"

type Setting = {
  id: number
  currentTerm: string
  currentYear: string
  updatedAt: string
}

export default function AdminSettingsPage() {
  const [term, setTerm] = useState("")
  const [year, setYear] = useState("")
  const [settingId, setSettingId] = useState<number | null>(null)

  useEffect(() => {
    loadSettings()
  }, [])

  const loadSettings = async () => {
    try {
      const res = await fetch(endpoints.admin.settings.read)
      if (!res.ok) throw new Error("โหลดข้อมูลไม่สำเร็จ")
      const data: Setting[] = await res.json()
      if (data.length > 0) {
        setTerm(data[0].currentTerm)
        setYear(data[0].currentYear)
        setSettingId(data[0].id)
      }
    } catch (err) {
      console.error(err)
      toast.error("ไม่สามารถโหลดการตั้งค่าได้")
    }
  }

  const handleSave = async () => {
    if (!settingId) {
      toast.error("ไม่พบ ID ของการตั้งค่า")
      return
    }
    try {
      const payload = { currentTerm: term, currentYear: year }
      const res = await fetch(endpoints.admin.settings.update(settingId.toString()), {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      })
      if (!res.ok) throw new Error("อัปเดตไม่สำเร็จ")
      toast.success("อัปเดตการตั้งค่าเรียบร้อยแล้ว")
      loadSettings()
    } catch (err) {
      console.error(err)
      toast.error("เกิดข้อผิดพลาดในการอัปเดต")
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <AdminHeader />
      <main className="container mx-auto max-w-2xl py-8">
        <Card>
          <CardHeader>
            <CardTitle>ตั้งค่าภาคการศึกษา</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="term">เทอม</Label>
              <Input
                id="term"
                value={term}
                onChange={(e) => setTerm(e.target.value)}
                placeholder="เช่น 1 หรือ 2"
              />
            </div>
            <div>
              <Label htmlFor="year">ปีการศึกษา</Label>
              <Input
                id="year"
                value={year}
                onChange={(e) => setYear(e.target.value)}
                placeholder="เช่น 2568"
              />
            </div>
            <Button onClick={handleSave} className="w-full">
              อัปเดตการตั้งค่า
            </Button>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
