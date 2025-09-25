"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Trash2, Package } from "lucide-react"
import { StudentHeader } from "./student-header"
import api from "@/lib/axios"
import { useAuth } from "@/contexts/auth-context"

interface CartItem {
  equipmentId: number
  name: string
  available: number
  quantity: number
}

const COURSES = [
  "CPE211 - Embedded Systems",
  "CPE321 - Internet of Things (IoT)",
  "CPE331 - Microcontroller Applications",
]

const REASONS = [
  "Assignment - งานที่ได้รับมอบหมาย",
  "Lab - ห้องปฏิบัติการ",
  "Project - โปรเจกต์",
]

export function BorrowingConfirm() {
  const router = useRouter()
  const { user } = useAuth()
  const [cartItems, setCartItems] = useState<CartItem[]>([])
  const [loading, setLoading] = useState(false)
  const [course, setCourse] = useState(COURSES[0])
  const [reason, setReason] = useState(REASONS[0])
  const [notes, setNotes] = useState("")

  useEffect(() => {
    const stored = localStorage.getItem("cartItems")
    if (stored) setCartItems(JSON.parse(stored))
  }, [])

  const updateQuantity = (id: number, quantity: number) => {
    setCartItems(prev =>
      prev.map(item =>
        item.equipmentId === id
          ? { ...item, quantity: Math.max(1, Math.min(item.available, quantity)) }
          : item
      )
    )
  }

  const removeItem = (id: number) => {
    const updated = cartItems.filter(item => item.equipmentId !== id)
    setCartItems(updated)
    localStorage.setItem("cartItems", JSON.stringify(updated))
  }

  const confirmBorrow = async () => {
    if (cartItems.length === 0) return
    if (!user) {
      alert("ไม่พบข้อมูลผู้ใช้ กรุณาเข้าสู่ระบบใหม่")
      return
    }

    const payload = {
      studentId: user.userId,
      teacherId: "2",
      course,
      reason,
      notes,
      priority: "normal",
      items: cartItems.map(item => ({
        equipmentId: item.equipmentId,
        quantity: item.quantity,
      })),
    }

    try {
      setLoading(true)
      const res = await api.post("/borrowing-requests", payload)
      console.log("Submit success:", res.data)
      localStorage.removeItem("cartItems")
      router.push("/student/history")
    } catch (err: any) {
      console.error("Submit error:", err.response?.data || err.message)
      alert("เกิดข้อผิดพลาดในการส่งคำขอ")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <StudentHeader />
      <main className="container mx-auto px-4 py-6 max-w-4xl">
        <div className="mb-6">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
            ยืนยันการยืมอุปกรณ์
          </h1>
          <p className="text-gray-600">ตรวจสอบรายการอุปกรณ์ที่ต้องการยืม</p>
        </div>

        {cartItems.length === 0 ? (
          <div className="text-center py-12">
            <Package className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-500 text-lg">ไม่มีอุปกรณ์ในตะกร้า</p>
          </div>
        ) : (
          <div className="space-y-6">
            {cartItems.map(item => (
              <Card key={item.equipmentId} className="hover:shadow-md transition-shadow">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">{item.name}</CardTitle>
                </CardHeader>
                <CardContent className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                  <Label className="text-sm text-gray-500">คงเหลือ {item.available} ชิ้น</Label>
                  <div className="flex items-center gap-2">
                    <Input
                      type="number"
                      value={item.quantity}
                      min={1}
                      max={item.available}
                      onChange={e =>
                        updateQuantity(item.equipmentId, parseInt(e.target.value) || 1)
                      }
                      className="w-20 text-center"
                    />
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-red-500 hover:text-red-700"
                      onClick={() => removeItem(item.equipmentId)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}

            <div className="space-y-4">
              <div>
                <Label className="block mb-1">รายวิชา</Label>
                <select
                  value={course}
                  onChange={e => setCourse(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                >
                  {COURSES.map(c => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <Label className="block mb-1">เหตุผล</Label>
                <select
                  value={reason}
                  onChange={e => setReason(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                >
                  {REASONS.map(r => (
                    <option key={r} value={r}>
                      {r}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <Label className="block mb-1">หมายเหตุ</Label>
                <Input value={notes} onChange={e => setNotes(e.target.value)} />
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-4">
              <Button variant="outline" onClick={() => router.push("/student")}>
                กลับไปเลือกเพิ่ม
              </Button>
              <Button onClick={confirmBorrow} disabled={loading}>
                {loading ? "กำลังส่ง..." : "ยืนยันการยืม"}
              </Button>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}
