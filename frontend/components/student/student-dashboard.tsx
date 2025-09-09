"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { useAuth } from "@/contexts/auth-context"
import { StudentHeader } from "./student-header"
import { EquipmentCard } from "./equipment-card"
import { BorrowingCart } from "./borrowing-cart"
import { Search, ShoppingCart } from "lucide-react"

const mockEquipments = [
  { id: "1", name: "Arduino Uno R3", description: "บอร์ดไมโครคอนโทรลเลอร์สำหรับการเรียนรู้และพัฒนาโปรเจค", category: "Microcontroller", available: 15, total: 20, image: "/placeholder-rt7xh.png" },
  { id: "2", name: "Raspberry Pi 4", description: "คอมพิวเตอร์ขนาดเล็กสำหรับการเรียนรู้การเขียนโปรแกรม", category: "Single Board Computer", available: 8, total: 12, image: "/raspberry-pi-4-board.png" },
  { id: "3", name: "Digital Multimeter", description: "เครื่องมือวัดค่าไฟฟ้าแบบดิจิทัล", category: "Measurement Tool", available: 25, total: 30, image: "/placeholder-db6ew.png" },
  { id: "4", name: "Breadboard", description: "บอร์ดทดลองสำหรับต่อวงจรไฟฟ้า", category: "Prototyping", available: 50, total: 60, image: "/electronic-breadboard.png" },
  { id: "5", name: "Oscilloscope", description: "เครื่องมือวัดและแสดงผลสัญญาณไฟฟ้า", category: "Measurement Tool", available: 3, total: 5, image: "/placeholder-uxao8.png" },
  { id: "6", name: "Soldering Iron", description: "หัวแร้งไฟฟ้าสำหรับบัดกรี", category: "Tool", available: 20, total: 25, image: "/electric-soldering-iron.png" }
]

export function StudentDashboard() {
  const { user } = useAuth()
  const equipments = mockEquipments
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [cartItems, setCartItems] = useState<Array<{ equipmentId: string; quantity: number }>>([])
  const [showCart, setShowCart] = useState(false)

  const categories = ["all", ...Array.from(new Set(equipments.map((eq) => eq.category)))]

  const filteredEquipments = equipments.filter((equipment) => {
    const matchesSearch =
      equipment.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      equipment.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === "all" || equipment.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const addToCart = (equipmentId: string, quantity: number) => {
    setCartItems((prev) => {
      const existingItem = prev.find((item) => item.equipmentId === equipmentId)
      if (existingItem) {
        return prev.map((item) =>
          item.equipmentId === equipmentId ? { ...item, quantity: item.quantity + quantity } : item
        )
      }
      return [...prev, { equipmentId, quantity }]
    })
  }

  const removeFromCart = (equipmentId: string) => {
    setCartItems((prev) => prev.filter((item) => item.equipmentId !== equipmentId))
  }

  const getTotalCartItems = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <StudentHeader />
      <main className="container mx-auto px-4 py-6 max-w-7xl">
        <div className="mb-6">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">สวัสดี, {user?.name}</h1>
          <p className="text-gray-600">รหัสนักศึกษา: {user?.studentCode}</p>
        </div>
        <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="ค้นหาอุปกรณ์..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex gap-2">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">ทุกหมวดหมู่</option>
                {categories.slice(1).map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
              <Button variant="outline" size="icon" onClick={() => setShowCart(true)} className="relative">
                <ShoppingCart className="h-4 w-4" />
                {getTotalCartItems() > 0 && (
                  <Badge className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 text-xs">
                    {getTotalCartItems()}
                  </Badge>
                )}
              </Button>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredEquipments.map((equipment) => (
            <EquipmentCard key={equipment.id} equipment={equipment} onAddToCart={addToCart} />
          ))}
        </div>
        {filteredEquipments.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">ไม่พบอุปกรณ์ที่ค้นหา</p>
          </div>
        )}
      </main>
      <BorrowingCart
        isOpen={showCart}
        onClose={() => setShowCart(false)}
        cartItems={cartItems}
        equipments={equipments}
        onRemoveItem={removeFromCart}
      />
    </div>
  )
}
