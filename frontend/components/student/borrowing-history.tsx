"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { StudentHeader } from "./student-header"
import { Calendar, Package, Clock } from "lucide-react"
import { endpoints } from "@/lib/api"

interface BorrowingItem {
  equipmentId: number
  quantity: number
  equipmentName: string
}

interface BorrowingRequest {
  requestId: string
  requestDate: string
  course: string
  reason: string
  statusCode: number
  items: BorrowingItem[]
  returnDate?: string
  dueDate?: string
  studentName?: string
  studentCode?: string
}

export function BorrowingHistory() {
  const [history, setHistory] = useState<BorrowingRequest[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const token = localStorage.getItem("token")
        const res = await fetch(endpoints.student.borrowingRequests, {
          headers: token
            ? {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
              }
            : {},
        })
        if (!res.ok) throw new Error("Failed to fetch borrowing history")
        const data = await res.json()
        setHistory(data)
      } catch (err) {
        console.error(err)
      } finally {
        setLoading(false)
      }
    }
    fetchHistory()
  }, [])

  const getStatus = (statusCode: number) => {
    switch (statusCode) {
      case 1:
        return { text: "รออนุมัติ", emoji: "⏳", color: "bg-gray-100 text-gray-800" }
      case 2:
        return { text: "กำลังเตรียม", emoji: "🛠️", color: "bg-yellow-100 text-yellow-800" }
      case 3:
        return { text: "เตรียมอุปกรณ์เสร็จแล้ว", emoji: "✅", color: "bg-blue-100 text-blue-800" }
      case 4:
        return { text: "กำลังยืม", emoji: "📦", color: "bg-purple-100 text-purple-800" }
      case 5:
        return { text: "คืนอุปกรณ์เสร็จแล้ว", emoji: "🔄", color: "bg-green-100 text-green-800" }
      default:
        return { text: "ไม่ทราบสถานะ", emoji: "❓", color: "bg-gray-200 text-gray-600" }
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <StudentHeader />
      <main className="container mx-auto px-4 py-6 max-w-4xl">
        <div className="mb-6">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">ประวัติการยืมอุปกรณ์</h1>
          <p className="text-gray-600">ติดตามสถานะการยืม-คืนอุปกรณ์ของคุณ</p>
        </div>

        {loading ? (
          <p className="text-center text-gray-500">กำลังโหลดข้อมูล...</p>
        ) : history.length === 0 ? (
          <div className="text-center py-12">
            <Package className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-500 text-lg">ยังไม่มีประวัติการยืมอุปกรณ์</p>
          </div>
        ) : (
          <div className="space-y-4">
            {history.map((record) => {
              const status = getStatus(record.statusCode)
              return (
                <Card key={record.requestId} className="hover:shadow-md transition-shadow">
                  <CardHeader>
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                      <div>
                        <CardTitle className="text-lg flex items-center space-x-2">
                          <Package className="h-5 w-5" />
                          <span>คำขอ #{record.requestId}</span>
                        </CardTitle>
                        <CardDescription className="flex items-center space-x-4 mt-1">
                          <span className="flex items-center space-x-1">
                            <Calendar className="h-4 w-4" />
                            <span>{new Date(record.requestDate).toLocaleDateString("th-TH")}</span>
                          </span>
                        </CardDescription>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="text-2xl">{status.emoji}</span>
                        <Badge className={status.color}>{status.text}</Badge>
                      </div>
                    </div>
                    <div className="mt-3 bg-gray-50 rounded-lg p-3">
                      <h4 className="font-medium text-sm text-gray-700 mb-2">ข้อมูลนักศึกษา</h4>
                      <p className="text-sm">
                        <strong>ชื่อ: </strong> {record.studentName || "-"}
                      </p>
                      <p className="text-sm">
                        <strong>รหัสนักศึกษา: </strong> {record.studentCode || "-"}
                      </p>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <h4 className="font-medium text-sm text-gray-700 mb-1">รายวิชา</h4>
                        <p className="text-sm">{record.course}</p>
                      </div>
                      <div>
                        <h4 className="font-medium text-sm text-gray-700 mb-1">เหตุผล</h4>
                        <p className="text-sm">{record.reason}</p>
                      </div>
                    </div>
                    <div>
                      <h4 className="font-medium text-sm text-gray-700 mb-2">รายการอุปกรณ์</h4>
                      <div className="space-y-2">
                        {record.items.map((item, index) => (
                          <div key={index} className="bg-gray-50 rounded-lg p-3">
                            <div className="flex justify-between items-start mb-1">
                              <span className="font-medium text-sm">{item.equipmentName}</span>
                              <Badge variant="outline" className="text-xs">
                                จำนวน: {item.quantity}
                              </Badge>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                    {record.returnDate && (
                      <div className="flex items-center space-x-2 text-sm text-green-600">
                        <Clock className="h-4 w-4" />
                        <span>คืนเมื่อ: {new Date(record.returnDate).toLocaleDateString("th-TH")}</span>
                      </div>
                    )}
                    {record.dueDate && record.statusCode === 4 && (
                      <div className="flex items-center space-x-2 text-sm text-orange-600">
                        <Clock className="h-4 w-4" />
                        <span>กำหนดคืน: {new Date(record.dueDate).toLocaleDateString("th-TH")}</span>
                      </div>
                    )}
                  </CardContent>
                </Card>
              )
            })}
          </div>
        )}
      </main>
    </div>
  )
}
