"use client"

import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Card, CardContent } from "@/components/ui/card"
import { Trash2, ShoppingCart } from "lucide-react"
import type { Equipment } from "@/types/equipment"

interface CartItem {
  equipmentId: number
  quantity: number
}

interface BorrowingCartProps {
  isOpen: boolean
  onClose: () => void
  cartItems: CartItem[]
  equipments: Equipment[]
  onRemoveItem: (equipmentId: number) => void
  onConfirm: () => void
}

export function BorrowingCart({
  isOpen,
  onClose,
  cartItems,
  equipments,
  onRemoveItem,
  onConfirm,
}: BorrowingCartProps) {
  const getEquipmentById = (id: number) =>
    equipments.find((eq) => eq.equipmentId === id)

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <ShoppingCart className="h-5 w-5" />
            <span>ตะกร้าการยืมอุปกรณ์</span>
          </DialogTitle>
          <DialogDescription>
            ตรวจสอบรายการที่เลือกก่อนยืนยัน
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-6">
          {cartItems.length === 0 ? (
            <p className="text-gray-500 text-center py-8">ไม่มีรายการในตะกร้า</p>
          ) : (
            <>
              <div className="space-y-3 mt-3">
                {cartItems.map((item) => {
                  const equipment = getEquipmentById(item.equipmentId)
                  if (!equipment) return null
                  return (
                    <Card key={item.equipmentId}>
                      <CardContent className="p-4 flex justify-between items-center">
                        <div>
                          <h4 className="font-medium">{equipment.name}</h4>
                          <p className="text-sm text-gray-600">
                            จำนวน: {item.quantity}
                          </p>
                        </div>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => onRemoveItem(item.equipmentId)}
                          className="text-red-500 hover:text-red-700"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </CardContent>
                    </Card>
                  )
                })}
              </div>
              <div className="flex justify-end pt-4">
                <Button onClick={onConfirm}>ไปยืนยันการยืม</Button>
              </div>
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
