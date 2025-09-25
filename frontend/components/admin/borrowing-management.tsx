"use client"

import { useEffect, useState } from "react"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Search, User, Calendar, Package, ArrowRight } from "lucide-react"
import { endpoints } from "@/lib/api"

type BorrowItem = { name: string; quantity: number }

type BorrowingRequest = {
  requestId: string
  studentId: string
  studentName: string
  studentCode: string
  course: string
  reason: string
  notes?: string
  requestDate: string
  statusCode: number
  priority: string
  approvedDate?: string
  rejectedDate?: string
  rejectionReason?: string
  items: BorrowItem[]
}

const statusOptions = [
  { code: 1, label: "รอการอนุมัติจากอาจารย์", emoji: "👨‍🏫", color: "bg-yellow-100 text-yellow-800" },
  { code: 2, label: "เจ้าหน้าที่กำลังเตรียมอุปกรณ์", emoji: "🔧", color: "bg-blue-100 text-blue-800" },
  { code: 3, label: "เจ้าหน้าที่เตรียมอุปกรณ์เสร็จแล้ว", emoji: "✅", color: "bg-green-100 text-green-800" },
  { code: 4, label: "เบิกแล้วรอการคืนอุปกรณ์", emoji: "📦", color: "bg-orange-100 text-orange-800" },
  { code: 5, label: "คืนอุปกรณ์เสร็จแล้ว", emoji: "🔄", color: "bg-purple-100 text-purple-800" },
]

export function BorrowingManagement() {
  const [requests, setRequests] = useState<BorrowingRequest[]>([])
  const [searchTerm, setSearchTerm] = useState("")

  useEffect(() => {
    fetchRequests()
  }, [])

  const fetchRequests = async () => {
    const res = await fetch(endpoints.teacher.getAllBorrowing)
    const data = await res.json()
    setRequests(data)
  }

  const nextStatus = async (request: BorrowingRequest) => {
    try {
      if (request.statusCode === 2) {
        await fetch(endpoints.admin.borrowing.updatePrepare(request.requestId), { method: "PUT" })
      } else if (request.statusCode === 3) {
        await fetch(endpoints.admin.borrowing.updateBorrow(request.requestId), { method: "PUT" })
      } else if (request.statusCode === 4) {
        await fetch(endpoints.admin.borrowing.updateReturn(request.requestId), { method: "PUT" })
      }
      fetchRequests()
    } catch (err) {
      console.error(err)
    }
  }

  const filteredRequests = requests.filter((request) => {
    const s = searchTerm.toLowerCase()
    const matchesSearch =
      request.studentName.toLowerCase().includes(s) ||
      request.studentId.includes(searchTerm) ||
      request.course.toLowerCase().includes(s) ||
      request.requestId.includes(searchTerm)
    const isVisibleForAdmin = request.statusCode >= 2
    return matchesSearch && isVisibleForAdmin
  })

  const getStatus = (code: number) => statusOptions.find((s) => s.code === code)
  const getStatusColor = (code: number) => getStatus(code)?.color || "bg-gray-100 text-gray-800"

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
          filteredRequests.map((request) => {
            const status = getStatus(request.statusCode)
            return (
              <Card key={request.requestId} className="hover:shadow-md transition-shadow">
                <CardHeader>
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-3">
                    <div className="flex-1">
                      <CardTitle className="text-lg">คำขอ #{request.requestId}</CardTitle>
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
                      <span className="text-2xl">{status?.emoji}</span>
                      <Badge className={getStatusColor(request.statusCode)}>{status?.label}</Badge>
                    </div>
                  </div>
                </CardHeader>

                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex items-center space-x-2">
                      <User className="h-4 w-4 text-gray-500" />
                      <div>
                        <p className="font-medium text-sm">{request.studentName}</p>
                        <p className="text-xs text-gray-500">{request.studentCode}</p>
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

                  {request.statusCode < 5 && (
                    <Button onClick={() => nextStatus(request)} className="w-full flex items-center gap-2">
                      ดำเนินการขั้นถัดไป <ArrowRight className="h-4 w-4" />
                    </Button>
                  )}
                </CardContent>
              </Card>
            )
          })
        )}
      </div>
    </div>
  )
}
