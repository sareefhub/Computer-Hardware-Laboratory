"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { toast } from "sonner"
import { AdminHeader } from "@/components/admin/admin-header"

export default function AdminSettingsPage() {
  const [term, setTerm] = useState("1")
  const [year, setYear] = useState("2568")

  useEffect(() => {
    const savedTerm = localStorage.getItem("currentTerm")
    const savedYear = localStorage.getItem("currentYear")
    if (savedTerm) setTerm(savedTerm)
    if (savedYear) setYear(savedYear)
  }, [])

  const handleSave = () => {
    localStorage.setItem("currentTerm", term)
    localStorage.setItem("currentYear", year)
    toast.success("บันทึกการตั้งค่าเรียบร้อยแล้ว")
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
              บันทึกการตั้งค่า
            </Button>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
