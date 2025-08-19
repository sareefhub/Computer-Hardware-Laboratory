"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { useAuth } from "@/contexts/auth-context"
import { TeacherHeader } from "./teacher-header"
import { BorrowingRequestCard } from "./borrowing-request-card"
import { Search, Bell, CheckCircle, XCircle, Clock } from "lucide-react"

type BorrowingItem = {
  name: string
  quantity: number
  serialNumbers: string[]
}

type BorrowingRequest = {
  id: string
  studentId: string
  studentName: string
  studentEmail: string
  course: string
  reason: string
  notes: string
  requestDate: string
  status: string
  statusEmoji: string
  items: BorrowingItem[]
  priority: "normal" | "urgent"
  approvedDate?: string
  rejectedDate?: string
  rejectionReason?: string
}

const mockRequests: BorrowingRequest[] = [
  {
    id: "BR1703123456789",
    studentId: "65010001",
    studentName: "นายสมชาย ใจดี",
    studentEmail: "student@university.ac.th",
    course: "CPE101 - Computer Programming",
    reason: "Assignment - งานที่ได้รับมอบหมาย",
    notes: "ต้องการใช้สำหรับทำงานที่ได้รับมอบหมายในสัปดาห์นี้",
    requestDate: "2024-01-15T10:30:00",
    status: "รอการอนุมัติจากอาจารย์",
    statusEmoji: "👨‍🏫",
    items: [
      { name: "Arduino Uno R3", quantity: 2, serialNumbers: ["ARD001", "ARD002"] },
      { name: "Breadboard", quantity: 1, serialNumbers: ["BB001"] }
    ],
    priority: "normal"
  },
  {
    id: "BR1703123456790",
    studentId: "65010002",
    studentName: "นางสาวสมหญิง ใจงาม",
    studentEmail: "student2@university.ac.th",
    course: "CPE102 - Digital Logic Design",
    reason: "Lab - การทดลอง",
    notes: "สำหรับการทดลองในห้องแลป วันพุธที่ 17 มกราคม",
    requestDate: "2024-01-14T14:15:00",
    status: "รอการอนุมัติจากอาจารย์",
    statusEmoji: "👨‍🏫",
    items: [
      { name: "Digital Multimeter", quantity: 1, serialNumbers: ["DMM001"] },
      { name: "Oscilloscope", quantity: 1, serialNumbers: ["OSC001"] }
    ],
    priority: "urgent"
  },
  {
    id: "BR1703123456791",
    studentId: "65010003",
    studentName: "นายสมศักดิ์ ใจดี",
    studentEmail: "student3@university.ac.th",
    course: "CPE201 - Data Structures",
    reason: "Project - โครงงาน",
    notes: "โครงงานกลุ่ม 4 คน ต้องการใช้เป็นเวลา 2 สัปดาห์",
    requestDate: "2024-01-13T09:45:00",
    status: "อนุมัติแล้ว",
    statusEmoji: "✅",
    items: [{ name: "Raspberry Pi 4", quantity: 2, serialNumbers: ["RPI001", "RPI002"] }],
    priority: "normal",
    approvedDate: "2024-01-13T11:00:00"
  },
  {
    id: "BR1703123456792",
    studentId: "65010004",
    studentName: "นางสาวสมใจ รักเรียน",
    studentEmail: "student4@university.ac.th",
    course: "CPE101 - Computer Programming",
    reason: "Assignment - งานที่ได้รับมอบหมาย",
    notes: "งานเดี่ยว ต้องการใช้ 3 วัน",
    requestDate: "2024-01-12T16:20:00",
    status: "ไม่อนุมัติ",
    statusEmoji: "❌",
    items: [{ name: "Arduino Uno R3", quantity: 5, serialNumbers: ["ARD003", "ARD004", "ARD005", "ARD006", "ARD007"] }],
    priority: "normal",
    rejectedDate: "2024-01-12T17:00:00",
    rejectionReason: "จำนวนมากเกินไปสำหรับงานเดี่ยว"
  }
]

export function TeacherDashboard() {
  const { user } = useAuth()
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [requests, setRequests] = useState<BorrowingRequest[]>(mockRequests)

  const filteredRequests = requests.filter((request) => {
    const q = searchTerm.toLowerCase()
    const matchesSearch =
      request.studentName.toLowerCase().includes(q) ||
      request.studentId.includes(searchTerm) ||
      request.course.toLowerCase().includes(q)
    const matchesStatus = statusFilter === "all" || request.status.includes(statusFilter)
    return matchesSearch && matchesStatus
  })

  const pendingCount = requests.filter((req) => req.status === "รอการอนุมัติจากอาจารย์").length
  const approvedCount = requests.filter((req) => req.status === "อนุมัติแล้ว").length
  const rejectedCount = requests.filter((req) => req.status === "ไม่อนุมัติ").length

  const handleApprove = (requestId: string) => {
    setRequests((prev: BorrowingRequest[]) =>
      prev.map((req) =>
        req.id === requestId
          ? {
              ...req,
              status: "อนุมัติแล้ว",
              statusEmoji: "✅",
              approvedDate: new Date().toISOString(),
              rejectedDate: req.rejectedDate && undefined,
              rejectionReason: req.rejectionReason && undefined
            }
          : req
      )
    )
  }

  const handleReject = (requestId: string, reason: string) => {
    setRequests((prev: BorrowingRequest[]) =>
      prev.map((req) =>
        req.id === requestId
          ? {
              ...req,
              status: "ไม่อนุมัติ",
              statusEmoji: "❌",
              rejectedDate: new Date().toISOString(),
              rejectionReason: reason,
              approvedDate: req.approvedDate && undefined
            }
          : req
      )
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <TeacherHeader />
      <main className="container mx-auto px-4 py-6 max-w-7xl">
        <div className="mb-6">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">สวัสดี, {user?.name}</h1>
          <p className="text-gray-600">จัดการคำขอยืมอุปกรณ์จากนักศึกษา</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-yellow-100 rounded-lg">
                  <Clock className="h-5 w-5 text-yellow-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">รอการอนุมัติ</p>
                  <p className="text-2xl font-bold text-yellow-600">{pendingCount}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-green-100 rounded-lg">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">อนุมัติแล้ว</p>
                  <p className="text-2xl font-bold text-green-600">{approvedCount}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-red-100 rounded-lg">
                  <XCircle className="h-5 w-5 text-red-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">ไม่อนุมัติ</p>
                  <p className="text-2xl font-bold text-red-600">{rejectedCount}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <Bell className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">ทั้งหมด</p>
                  <p className="text-2xl font-bold text-blue-600">{requests.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="ค้นหาด้วยชื่อนักศึกษา รหัสนักศึกษา หรือรายวิชา..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">ทุกสถานะ</option>
              <option value="รอการอนุมัติ">รอการอนุมัติ</option>
              <option value="อนุมัติ">อนุมัติแล้ว</option>
              <option value="ไม่อนุมัติ">ไม่อนุมัติ</option>
            </select>
          </div>
        </div>

        <div className="space-y-4">
          {filteredRequests.length === 0 ? (
            <div className="text-center py-12">
              <Bell className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500 text-lg">ไม่พบคำขอที่ค้นหา</p>
            </div>
          ) : (
            filteredRequests.map((request) => (
              <BorrowingRequestCard
                key={request.id}
                request={request}
                onApprove={handleApprove}
                onReject={handleReject}
              />
            ))
          )}
        </div>
      </main>
    </div>
  )
}
