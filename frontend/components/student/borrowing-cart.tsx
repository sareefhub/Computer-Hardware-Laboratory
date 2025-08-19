"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Trash2, ShoppingCart } from "lucide-react"
import { useAuth } from "@/contexts/auth-context"

interface CartItem {
  equipmentId: string
  quantity: number
}

interface Equipment {
  id: string
  name: string
  description: string
  category: string
  available: number
  total: number
  image: string
}

interface BorrowingCartProps {
  isOpen: boolean
  onClose: () => void
  cartItems: CartItem[]
  equipments: Equipment[]
  onRemoveItem: (equipmentId: string) => void
}

const courses = [
  "CPE101 - Computer Programming",
  "CPE102 - Digital Logic Design",
  "CPE201 - Data Structures",
  "CPE202 - Computer Architecture",
  "CPE301 - Database Systems",
  "CPE302 - Software Engineering"
]

const borrowReasons = [
  { value: "assignment", label: "Assignment - งานที่ได้รับมอบหมาย" },
  { value: "lab", label: "Lab - การทดลอง" },
  { value: "project", label: "Project - โครงงาน" }
]

export function BorrowingCart({ isOpen, onClose, cartItems, equipments, onRemoveItem }: BorrowingCartProps) {
  const { user } = useAuth()
  const [selectedCourse, setSelectedCourse] = useState("")
  const [borrowReason, setBorrowReason] = useState("")
  const [additionalNotes, setAdditionalNotes] = useState("")
  const [showConfirmation, setShowConfirmation] = useState(false)
  const [borrowingReceipt, setBorrowingReceipt] = useState<any>(null)

  const getEquipmentById = (id: string) => equipments.find((eq) => eq.id === id)

  const handleSubmitRequest = () => {
    if (!selectedCourse || !borrowReason) return
    const receipt = {
      id: `BR${Date.now()}`,
      studentId: user?.studentId,
      studentName: user?.name,
      course: selectedCourse,
      reason: borrowReason,
      notes: additionalNotes,
      items: cartItems.map((item) => {
        const equipment = getEquipmentById(item.equipmentId)
        return {
          equipmentName: equipment?.name,
          quantity: item.quantity
        }
      }),
      requestDate: new Date().toLocaleDateString("th-TH"),
      status: "รอการอนุมัติจากอาจารย์",
      statusEmoji: "👨‍🏫"
    }
    setBorrowingReceipt(receipt)
    setShowConfirmation(true)
  }

  const handlePrintReceipt = () => window.print()

  const resetCart = () => {
    cartItems.forEach((item) => onRemoveItem(item.equipmentId))
    setSelectedCourse("")
    setBorrowReason("")
    setAdditionalNotes("")
    setShowConfirmation(false)
    setBorrowingReceipt(null)
    onClose()
  }

  if (showConfirmation && borrowingReceipt) {
    return (
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-green-600">คำขอยืมอุปกรณ์สำเร็จ!</DialogTitle>
            <DialogDescription>ใบเสร็จการขอยืมอุปกรณ์ของคุณ</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 print:text-black" id="receipt">
            <Card>
              <CardHeader className="text-center border-b">
                <CardTitle className="text-xl">ใบเสร็จการขอยืมอุปกรณ์</CardTitle>
                <p className="text-sm text-gray-600">Equipment Borrowing Receipt</p>
              </CardHeader>
              <CardContent className="space-y-4 pt-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="font-medium">เลขที่ใบเสร็จ:</Label>
                    <p className="font-mono text-lg">{borrowingReceipt.id}</p>
                  </div>
                  <div>
                    <Label className="font-medium">วันที่ขอยืม:</Label>
                    <p>{borrowingReceipt.requestDate}</p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="font-medium">รหัสนักศึกษา:</Label>
                    <p>{borrowingReceipt.studentId}</p>
                  </div>
                  <div>
                    <Label className="font-medium">ชื่อ-นามสกุล:</Label>
                    <p>{borrowingReceipt.studentName}</p>
                  </div>
                </div>
                <div>
                  <Label className="font-medium">รายวิชา:</Label>
                  <p>{borrowingReceipt.course}</p>
                </div>
                <div>
                  <Label className="font-medium">เหตุผลในการขอยืม:</Label>
                  <p>{borrowReasons.find((r) => r.value === borrowingReceipt.reason)?.label}</p>
                </div>
                {borrowingReceipt.notes && (
                  <div>
                    <Label className="font-medium">หมายเหตุเพิ่มเติม:</Label>
                    <p>{borrowingReceipt.notes}</p>
                  </div>
                )}
                <div>
                  <Label className="font-medium">รายการอุปกรณ์:</Label>
                  <div className="space-y-2 mt-2">
                    {borrowingReceipt.items.map((item: any, index: number) => (
                      <div key={index} className="border rounded-lg p-3">
                        <div className="flex justify-between items-start mb-2">
                          <h4 className="font-medium">{item.equipmentName}</h4>
                          <Badge>จำนวน: {item.quantity}</Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="border-t pt-4">
                  <div className="flex items-center justify-between">
                    <Label className="font-medium">สถานะ:</Label>
                    <div className="flex items-center space-x-2">
                      <span className="text-2xl">{borrowingReceipt.statusEmoji}</span>
                      <Badge className="bg-yellow-100 text-yellow-800">{borrowingReceipt.status}</Badge>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          <div className="flex space-x-2 print:hidden">
            <Button onClick={handlePrintReceipt} className="flex-1">พิมพ์ใบเสร็จ</Button>
            <Button onClick={resetCart} variant="outline" className="flex-1 bg-transparent">เสร็จสิ้น</Button>
          </div>
        </DialogContent>
      </Dialog>
    )
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <ShoppingCart className="h-5 w-5" />
            <span>ตะกร้าการยืมอุปกรณ์</span>
          </DialogTitle>
          <DialogDescription>ตรวจสอบรายการและกรอกข้อมูลเพื่อส่งคำขอยืมอุปกรณ์</DialogDescription>
        </DialogHeader>
        <div className="space-y-6">
          <div>
            <Label className="text-base font-medium">รายการอุปกรณ์ที่เลือก</Label>
            {cartItems.length === 0 ? (
              <p className="text-gray-500 text-center py-8">ไม่มีรายการในตะกร้า</p>
            ) : (
              <div className="space-y-3 mt-3">
                {cartItems.map((item) => {
                  const equipment = getEquipmentById(item.equipmentId)
                  if (!equipment) return null
                  return (
                    <Card key={item.equipmentId}>
                      <CardContent className="p-4">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <h4 className="font-medium">{equipment.name}</h4>
                            <p className="text-sm text-gray-600 mb-2">จำนวน: {item.quantity}</p>
                          </div>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => onRemoveItem(item.equipmentId)}
                            className="text-red-500 hover:text-red-700"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  )
                })}
              </div>
            )}
          </div>
          {cartItems.length > 0 && (
            <>
              <div className="space-y-2">
                <Label htmlFor="course">รายวิชา *</Label>
                <Select value={selectedCourse} onValueChange={setSelectedCourse}>
                  <SelectTrigger>
                    <SelectValue placeholder="เลือกรายวิชา" />
                  </SelectTrigger>
                  <SelectContent>
                    {courses.map((course) => (
                      <SelectItem key={course} value={course}>{course}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="reason">เหตุผลในการขอยืม *</Label>
                <Select value={borrowReason} onValueChange={setBorrowReason}>
                  <SelectTrigger>
                    <SelectValue placeholder="เลือกเหตุผล" />
                  </SelectTrigger>
                  <SelectContent>
                    {borrowReasons.map((reason) => (
                      <SelectItem key={reason.value} value={reason.value}>{reason.label}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="notes">หมายเหตุเพิ่มเติม</Label>
                <Textarea
                  id="notes"
                  placeholder="ระบุรายละเอียดเพิ่มเติม (ถ้ามี)"
                  value={additionalNotes}
                  onChange={(e) => setAdditionalNotes(e.target.value)}
                  rows={3}
                />
              </div>
              <div className="flex space-x-2">
                <Button onClick={handleSubmitRequest} disabled={!selectedCourse || !borrowReason} className="flex-1">
                  ส่งคำขอยืมอุปกรณ์
                </Button>
                <Button variant="outline" onClick={onClose}>ยกเลิก</Button>
              </div>
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
