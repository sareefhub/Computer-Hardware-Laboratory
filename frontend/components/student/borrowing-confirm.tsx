"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Trash2, Package } from "lucide-react"
import { StudentHeader } from "./student-header"

interface Equipment {
  id: string
  name: string
  available: number
}

export function BorrowingConfirm() {
  const router = useRouter()
  const [cartItems, setCartItems] = useState<Array<{ equipment: Equipment; quantity: number }>>([
    { equipment: { id: "1", name: "Arduino Uno R3", available: 15 }, quantity: 2 },
    { equipment: { id: "2", name: "Raspberry Pi 4", available: 8 }, quantity: 1 }
  ])

  const updateQuantity = (id: string, quantity: number) => {
    setCartItems(prev =>
      prev.map(item =>
        item.equipment.id === id
          ? { ...item, quantity: Math.max(1, Math.min(item.equipment.available, quantity)) }
          : item
      )
    )
  }

  const removeItem = (id: string) => {
    setCartItems(prev => prev.filter(item => item.equipment.id !== id))
  }

  const confirmBorrow = () => {
    router.push("/student/history")
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <StudentHeader />
      <main className="container mx-auto px-4 py-6 max-w-4xl">
        <div className="mb-6">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">ยืนยันการยืมอุปกรณ์</h1>
          <p className="text-gray-600">ตรวจสอบรายการอุปกรณ์ที่ต้องการยืม</p>
        </div>

        {cartItems.length === 0 ? (
          <div className="text-center py-12">
            <Package className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-500 text-lg">ไม่มีอุปกรณ์ในตะกร้า</p>
          </div>
        ) : (
          <div className="space-y-4">
            {cartItems.map(item => (
              <Card key={item.equipment.id} className="hover:shadow-md transition-shadow">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">{item.equipment.name}</CardTitle>
                </CardHeader>
                <CardContent className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                  <Label className="text-sm text-gray-500">
                    คงเหลือ {item.equipment.available} ชิ้น
                  </Label>
                  <div className="flex items-center gap-2">
                    <Input
                      type="number"
                      value={item.quantity}
                      min={1}
                      max={item.equipment.available}
                      onChange={e => updateQuantity(item.equipment.id, parseInt(e.target.value) || 1)}
                      className="w-20 text-center"
                    />
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-red-500 hover:text-red-700"
                      onClick={() => removeItem(item.equipment.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}

            <div className="flex justify-end gap-2 pt-4">
              <Button variant="outline" onClick={() => router.push("/student")}>
                กลับไปเลือกเพิ่ม
              </Button>
              <Button onClick={confirmBorrow}>ยืนยันการยืม</Button>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}
