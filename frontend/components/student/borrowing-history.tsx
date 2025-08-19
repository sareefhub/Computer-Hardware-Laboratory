"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { StudentHeader } from "./student-header"
import { Calendar, Package, Clock } from "lucide-react"

// Mock borrowing history data
const mockHistory = [
  {
    id: "BR1703123456789",
    requestDate: "2024-01-15",
    course: "CPE101 - Computer Programming",
    reason: "Assignment - งานที่ได้รับมอบหมาย",
    status: "คืนอุปกรณ์เสร็จแล้ว",
    statusEmoji: "🔄",
    statusColor: "bg-green-100 text-green-800",
    items: [
      { name: "Arduino Uno R3", quantity: 2, serialNumbers: ["ARD001", "ARD002"] },
      { name: "Breadboard", quantity: 1, serialNumbers: ["BB001"] },
    ],
    returnDate: "2024-01-20",
  },
  {
    id: "BR1703123456790",
    requestDate: "2024-01-10",
    course: "CPE102 - Digital Logic Design",
    reason: "Lab - การทดลอง",
    status: "เบิกแล้วรอการคืนอุปกรณ์",
    statusEmoji: "📦",
    statusColor: "bg-blue-100 text-blue-800",
    items: [{ name: "Digital Multimeter", quantity: 1, serialNumbers: ["DMM001"] }],
    dueDate: "2024-01-25",
  },
  {
    id: "BR1703123456791",
    requestDate: "2024-01-08",
    course: "CPE201 - Data Structures",
    reason: "Project - โครงงาน",
    status: "เจ้าหน้าที่เตรียมอุปกรณ์เสร็จแล้ว",
    statusEmoji: "✅",
    statusColor: "bg-yellow-100 text-yellow-800",
    items: [{ name: "Raspberry Pi 4", quantity: 1, serialNumbers: ["RPI001"] }],
  },
]

export function BorrowingHistory() {
  return (
    <div className="min-h-screen bg-gray-50">
      <StudentHeader />

      <main className="container mx-auto px-4 py-6 max-w-4xl">
        <div className="mb-6">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">ประวัติการยืมอุปกรณ์</h1>
          <p className="text-gray-600">ติดตามสถานะการยืม-คืนอุปกรณ์ของคุณ</p>
        </div>

        <div className="space-y-4">
          {mockHistory.map((record) => (
            <Card key={record.id} className="hover:shadow-md transition-shadow">
              <CardHeader>
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                  <div>
                    <CardTitle className="text-lg flex items-center space-x-2">
                      <Package className="h-5 w-5" />
                      <span>คำขอ #{record.id}</span>
                    </CardTitle>
                    <CardDescription className="flex items-center space-x-4 mt-1">
                      <span className="flex items-center space-x-1">
                        <Calendar className="h-4 w-4" />
                        <span>{new Date(record.requestDate).toLocaleDateString("th-TH")}</span>
                      </span>
                    </CardDescription>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-2xl">{record.statusEmoji}</span>
                    <Badge className={record.statusColor}>{record.status}</Badge>
                  </div>
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
                          <span className="font-medium text-sm">{item.name}</span>
                          <Badge variant="outline" className="text-xs">
                            จำนวน: {item.quantity}
                          </Badge>
                        </div>
                        <div className="flex flex-wrap gap-1">
                          {item.serialNumbers.map((serial) => (
                            <Badge key={serial} variant="secondary" className="text-xs">
                              {serial}
                            </Badge>
                          ))}
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

                {record.dueDate && record.status.includes("รอการคืน") && (
                  <div className="flex items-center space-x-2 text-sm text-orange-600">
                    <Clock className="h-4 w-4" />
                    <span>กำหนดคืน: {new Date(record.dueDate).toLocaleDateString("th-TH")}</span>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        {mockHistory.length === 0 && (
          <div className="text-center py-12">
            <Package className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-500 text-lg">ยังไม่มีประวัติการยืมอุปกรณ์</p>
          </div>
        )}
      </main>
    </div>
  )
}
