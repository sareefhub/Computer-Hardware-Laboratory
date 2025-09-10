"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { useAuth } from "@/contexts/auth-context"
import { StudentHeader } from "./student-header"
import { EquipmentCard } from "./equipment-card"
import { BorrowingCart } from "./borrowing-cart"
import { Search, ShoppingCart } from "lucide-react"
import { useEquipments } from "@/hooks/use-equipments"
import type { Equipment } from "@/types/equipment"

export function StudentDashboard() {
  const { user } = useAuth()
  const { getAllEquipments } = useEquipments()

  const [equipments, setEquipments] = useState<Equipment[]>([])
  const [cartItems, setCartItems] = useState<{ equipmentId: number; quantity: number }[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [showCart, setShowCart] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      const data = await getAllEquipments()
      setEquipments(data)
    }
    fetchData()
  }, [])

  const handleAddToCart = (equipmentId: number, quantity: number) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.equipmentId === equipmentId)
      if (existing) {
        return prev.map((item) =>
          item.equipmentId === equipmentId
            ? { ...item, quantity: item.quantity + quantity }
            : item
        )
      }
      return [...prev, { equipmentId, quantity }]
    })
  }

  const handleRemoveItem = (equipmentId: number) => {
    setCartItems((prev) => prev.filter((item) => item.equipmentId !== equipmentId))
  }

  const categories = ["all", ...Array.from(new Set(equipments.map((eq) => eq.category)))]
  const filteredEquipments = equipments.filter((equipment) => {
    const matchesSearch =
      equipment.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      equipment.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === "all" || equipment.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  return (
    <div className="min-h-screen bg-gray-50">
      <StudentHeader />
      <main className="container mx-auto px-4 py-6 max-w-7xl">
        <div className="mb-6">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
            สวัสดี, {user?.name}
          </h1>
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
              <Button
                variant="outline"
                size="icon"
                onClick={() => setShowCart(true)}
                className="relative"
              >
                <ShoppingCart className="h-4 w-4" />
                <Badge className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 text-xs">
                  {cartItems.reduce((sum, item) => sum + item.quantity, 0)}
                </Badge>
              </Button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredEquipments.map((equipment) => (
            <EquipmentCard
              key={equipment.equipmentId}
              equipment={equipment}
              onAddToCart={handleAddToCart}
            />
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
        onRemoveItem={handleRemoveItem}
      />
    </div>
  )
}
