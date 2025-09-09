"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Search, User, Calendar, Package, ArrowRight } from "lucide-react"

type BorrowItem = { name: string; quantity: number }

type BorrowingRequest = {
  id: string
  studentId: string
  studentName: string
  course: string
  reason: string
  requestDate: string
  status: string
  statusEmoji: string
  statusCode: number
  items: BorrowItem[]
  borrowedDate?: string
  dueDate?: string
  returnedDate?: string
}

const statusOptions = [
  { code: 1, label: "รอการอนุมัติจากอาจารย์", emoji: "👨‍🏫", color: "bg-yellow-100 text-yellow-800" },
  { code: 2, label: "เจ้าหน้าที่กำลังเตรียมอุปกรณ์", emoji: "🔧", color: "bg-blue-100 text-blue-800" },
  { code: 3, label: "เจ้าหน้าที่เตรียมอุปกรณ์เสร็จแล้ว", emoji: "✅", color: "bg-green-100 text-green-800" },
  { code: 4, label: "เบิกแล้วรอการคืนอุปกรณ์", emoji: "📦", color: "bg-orange-100 text-orange-800" },
  { code: 5, label: "คืนอุปกรณ์เสร็จแล้ว", emoji: "🔄", color: "bg-purple-100 text-purple-800" },
]

const mockBorrowingRequests: BorrowingRequest[] = [
  {
    id: "1/2568-65010001-001",
    studentId: "65010001",
    studentName: "นายสมชาย ใจดี",
    course: "CPE101 - Computer Programming",
    reason: "Assignment - งานที่ได้รับมอบหมาย",
    requestDate: "2024-01-15T10:30:00",
    status: "รอการอนุมัติจากอาจารย์",
    statusEmoji: "👨‍🏫",
    statusCode: 1,
    items: [
      { name: "Arduino Uno R3", quantity: 2 },
      { name: "Breadboard", quantity: 1 },
    ],
  },
  {
    id: "1/2568-65010002-002",
    studentId: "65010002",
    studentName: "นางสาวสมหญิง ใจงาม",
    course: "CPE102 - Digital Logic Design",
    reason: "Lab - การทดลอง",
    requestDate: "2024-01-14T14:15:00",
    status: "เจ้าหน้าที่กำลังเตรียมอุปกรณ์",
    statusEmoji: "🔧",
    statusCode: 2,
    items: [{ name: "Digital Multimeter", quantity: 1 }],
  },
  {
    id: "1/2568-65010003-003",
    studentId: "65010003",
    studentName: "นายสมศักดิ์ ใจดี",
    course: "CPE201 - Data Structures",
    reason: "Project - โครงงาน",
    requestDate: "2024-01-13T09:45:00",
    status: "เจ้าหน้าที่เตรียมอุปกรณ์เสร็จแล้ว",
    statusEmoji: "✅",
    statusCode: 3,
    items: [{ name: "Raspberry Pi 4", quantity: 1 }],
  },
  {
    id: "1/2568-65010004-004",
    studentId: "65010004",
    studentName: "นางสาวสมใจ รักเรียน",
    course: "CPE301 - Database Systems",
    reason: "Assignment - งานที่ได้รับมอบหมาย",
    requestDate: "2024-01-12T16:20:00",
    status: "เบิกแล้วรอการคืนอุปกรณ์",
    statusEmoji: "📦",
    statusCode: 4,
    items: [{ name: "Oscilloscope", quantity: 1 }],
    borrowedDate: "2024-01-13T10:00:00",
    dueDate: "2024-01-20T17:00:00",
  },
  {
    id: "1/2568-65010005-005",
    studentId: "65010005",
    studentName: "นายสมปอง ใจดี",
    course: "CPE102 - Digital Logic Design",
    reason: "Lab - การทดลอง",
    requestDate: "2024-01-10T11:30:00",
    status: "คืนอุปกรณ์เสร็จแล้ว",
    statusEmoji: "🔄",
    statusCode: 5,
    items: [{ name: "Soldering Iron", quantity: 2 }],
    borrowedDate: "2024-01-11T09:00:00",
    returnedDate: "2024-01-14T15:30:00",
  },
]

export function BorrowingManagement() {
  const [requests, setRequests] = useState<BorrowingRequest[]>(mockBorrowingRequests)
  const [searchTerm, setSearchTerm] = useState("")

  const filteredRequests = requests.filter((request) => {
    const s = searchTerm.toLowerCase()
    const matchesSearch =
      request.studentName.toLowerCase().includes(s) ||
      request.studentId.includes(searchTerm) ||
      request.course.toLowerCase().includes(s) ||
      request.id.includes(searchTerm)
    const isVisibleForAdmin = request.statusCode >= 2
    return matchesSearch && isVisibleForAdmin
  })

  const nextStatus = (requestId: string) => {
    setRequests((prev) =>
      prev.map((req) => {
        if (req.id === requestId && req.statusCode < 5) {
          const newCode = req.statusCode + 1
          const s = statusOptions.find((x) => x.code === newCode)!
          return {
            ...req,
            status: s.label,
            statusEmoji: s.emoji,
            statusCode: newCode,
            borrowedDate: newCode === 4 ? new Date().toISOString() : req.borrowedDate,
            returnedDate: newCode === 5 ? new Date().toISOString() : req.returnedDate,
          }
        }
        return req
      })
    )
  }

  const getStatusColor = (code: number) => statusOptions.find((s) => s.code === code)?.color || "bg-gray-100 text-gray-800"

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">จัดการการยืมอุปกรณ์</h2>
        <p className="text-gray-600">ติดตามและอัปเดตสถานะการยืม-คืนอุปกรณ์</p>
      </div>

      <div className="bg-white rounded-lg shadow-sm p-4">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="ค้นหาด้วยรหัสนักศึกษา ชื่อ รายวิชา หรือเลขที่คำขอ..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm p-4">
        <h3 className="font-medium text-gray-900 mb-3">สถานะการยืมอุปกรณ์</h3>
        <div className="grid grid-cols-1 md:grid-cols-5 gap-2">
          {statusOptions.map((status) => (
            <div key={status.code} className="flex items-center space-x-2">
              <span className="text-lg">{status.emoji}</span>
              <span className="text-xs text-gray-600">
                {status.code}. {status.label}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-4">
        {filteredRequests.length === 0 ? (
          <div className="text-center py-12">
            <Package className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-500 text-lg">ไม่พบคำขอที่ค้นหา</p>
          </div>
        ) : (
          filteredRequests.map((request) => (
            <Card key={request.id} className="hover:shadow-md transition-shadow">
              <CardHeader>
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-3">
                  <div className="flex-1">
                    <CardTitle className="text-lg">คำขอ #{request.id}</CardTitle>
                    <CardDescription className="space-y-1">
                      <div className="flex items-center space-x-4 text-sm">
                        <span className="flex items-center space-x-1">
                          <Calendar className="h-4 w-4" />
                          <span>{new Date(request.requestDate).toLocaleDateString("th-TH")}</span>
                        </span>
                      </div>
                    </CardDescription>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">{request.statusEmoji}</span>
                    <Badge className={getStatusColor(request.statusCode)}>{request.status}</Badge>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center space-x-2">
                    <User className="h-4 w-4 text-gray-500" />
                    <div>
                      <p className="font-medium text-sm">{request.studentName}</p>
                      <p className="text-xs text-gray-500">{request.studentId}</p>
                    </div>
                  </div>
                  <div>
                    <p className="font-medium text-sm">{request.course}</p>
                    <p className="text-xs text-gray-500">{request.reason}</p>
                  </div>
                </div>

                <div>
                  <div className="flex items-center space-x-2 mb-2">
                    <Package className="h-4 w-4 text-gray-500" />
                    <Label className="text-sm font-medium">รายการอุปกรณ์</Label>
                  </div>
                  <div className="space-y-2">
                    {request.items.map((item, index) => (
                      <div key={index} className="bg-gray-50 rounded-lg p-3">
                        <div className="flex justify-between items-start mb-1">
                          <span className="font-medium text-sm">{item.name}</span>
                          <Badge variant="outline" className="text-xs">
                            จำนวน: {item.quantity}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {request.borrowedDate && (
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                    <p className="text-sm text-blue-800">
                      <strong>วันที่เบิก:</strong> {new Date(request.borrowedDate).toLocaleDateString("th-TH")}
                    </p>
                    {request.dueDate && (
                      <p className="text-sm text-blue-800">
                        <strong>กำหนดคืน:</strong> {new Date(request.dueDate).toLocaleDateString("th-TH")}
                      </p>
                    )}
                  </div>
                )}

                {request.returnedDate && (
                  <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                    <p className="text-sm text-green-800">
                      <strong>วันที่คืน:</strong> {new Date(request.returnedDate).toLocaleDateString("th-TH")}
                    </p>
                  </div>
                )}

                {request.statusCode < 5 && (
                  <Button onClick={() => nextStatus(request.id)} className="w-full flex items-center gap-2">
                    ดำเนินการขั้นถัดไป <ArrowRight className="h-4 w-4" />
                  </Button>
                )}
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  )
}
