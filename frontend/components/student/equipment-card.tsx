"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Plus, Minus, Eye } from "lucide-react"
import Image from "next/image"
import type { Equipment } from "@/types/equipment"
import API_URL from "@/lib/api"

interface EquipmentCardProps {
  equipment: Equipment
  onAddToCart: (equipmentId: number, quantity: number) => void
}

export function EquipmentCard({ equipment, onAddToCart }: EquipmentCardProps) {
  const [quantity, setQuantity] = useState(1)
  const [showDetails, setShowDetails] = useState(false)

  const handleAddToCart = () => {
    if (quantity > 0 && quantity <= equipment.availableQuantity) {
      onAddToCart(equipment.equipmentId, quantity)
      setQuantity(1)
    }
  }

  const getAvailabilityColor = () => {
    const ratio = equipment.availableQuantity / equipment.totalQuantity
    if (ratio > 0.5) return "bg-green-100 text-green-800"
    if (ratio > 0.2) return "bg-yellow-100 text-yellow-800"
    return "bg-red-100 text-red-800"
  }

  const imageSrc = equipment.imageUrl.startsWith("http")
    ? equipment.imageUrl
    : `${API_URL}${equipment.imageUrl}`

  return (
    <>
      <Card className="h-full flex flex-col hover:shadow-lg transition-shadow">
        <CardHeader className="pb-3">
          <div className="aspect-video relative mb-3 bg-gray-100 rounded-md overflow-hidden">
            <Image
              src={imageSrc || "/placeholder.svg"}
              alt={equipment.name}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              priority
            />
          </div>
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <CardTitle className="text-lg leading-tight mb-1">{equipment.name}</CardTitle>
              <Badge variant="secondary" className="text-xs mb-2">
                {equipment.category}
              </Badge>
            </div>
            <Button
              variant="outline"
              size="sm"
              className="h-8 px-2 flex items-center gap-1 text-blue-600 hover:bg-blue-50"
              onClick={() => setShowDetails(true)}
            >
              <Eye className="h-4 w-4" />
              <span className="text-xs">ดูเพิ่มเติม</span>
            </Button>
          </div>
        </CardHeader>

        <CardContent className="flex-1 flex flex-col">
          <CardDescription className="text-sm mb-4 line-clamp-2">{equipment.description}</CardDescription>
          <div className="mt-auto space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">คงเหลือ:</span>
              <Badge className={getAvailabilityColor()}>
                {equipment.availableQuantity}/{equipment.totalQuantity}
              </Badge>
            </div>
            {equipment.availableQuantity > 0 ? (
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <Label className="text-sm">จำนวน:</Label>
                  <div className="flex items-center space-x-2">
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-8 w-8 bg-transparent"
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      disabled={quantity <= 1}
                    >
                      <Minus className="h-3 w-3" />
                    </Button>
                    <Input
                      type="number"
                      value={quantity}
                      onChange={(e) =>
                        setQuantity(Math.max(1, Math.min(equipment.availableQuantity, Number.parseInt(e.target.value) || 1)))
                      }
                      className="w-16 h-8 text-center"
                      min="1"
                      max={equipment.availableQuantity}
                    />
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-8 w-8 bg-transparent"
                      onClick={() => setQuantity(Math.min(equipment.availableQuantity, quantity + 1))}
                      disabled={quantity >= equipment.availableQuantity}
                    >
                      <Plus className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
                <Button onClick={handleAddToCart} className="w-full" size="sm">
                  เพิ่มในตะกร้า
                </Button>
              </div>
            ) : (
              <Button disabled className="w-full" size="sm">
                ไม่มีในสต็อก
              </Button>
            )}
          </div>
        </CardContent>
      </Card>

      <Dialog open={showDetails} onOpenChange={setShowDetails}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{equipment.name}</DialogTitle>
            <DialogDescription>รายละเอียดอุปกรณ์</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="aspect-video relative bg-gray-100 rounded-md overflow-hidden">
              <Image
                src={imageSrc || "/placeholder.svg"}
                alt={equipment.name}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label className="text-sm font-medium">หมวดหมู่</Label>
                <p className="text-sm text-gray-600">{equipment.category}</p>
              </div>
              <div>
                <Label className="text-sm font-medium">สถานะ</Label>
                <Badge className={getAvailabilityColor()}>
                  {equipment.availableQuantity}/{equipment.totalQuantity}
                </Badge>
              </div>
            </div>
            <div>
              <Label className="text-sm font-medium">คำอธิบาย</Label>
              <p className="text-sm text-gray-600 mt-1">{equipment.description}</p>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}
