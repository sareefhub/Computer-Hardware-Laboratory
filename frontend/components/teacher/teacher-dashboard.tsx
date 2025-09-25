"use client"

import { useState, useEffect } from "react"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { useAuth } from "@/contexts/auth-context"
import { TeacherHeader } from "./teacher-header"
import { BorrowingRequestCard } from "./borrowing-request-card"
import { Search, Bell, CheckCircle, XCircle, Clock } from "lucide-react"
import { endpoints } from "@/lib/api"

type BorrowingItem = {
  equipmentId: number
  equipmentName: string
  quantity: number
}

type BorrowingRequest = {
  requestId: string
  studentId: string
  studentName: string
  studentCode: string
  course: string
  reason: string
  notes: string
  requestDate: string
  statusCode: number
  items: BorrowingItem[]
  priority: "normal" | "urgent"
  approvedDate?: string
  rejectedDate?: string
  rejectionReason?: string
}

export function TeacherDashboard() {
  const { user } = useAuth()
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [requests, setRequests] = useState<BorrowingRequest[]>([])

  useEffect(() => {
    loadRequests()
  }, [])

  const loadRequests = async () => {
    const res = await fetch(endpoints.teacher.getAllBorrowing)
    const data = await res.json()
    const mapped = data.map((r: any) => ({
      ...r,
      approvedDate: r.approvedDate || r.approved_date,
      rejectedDate: r.rejectedDate || r.rejected_date,
      rejectionReason: r.rejectionReason || r.rejection_reason,
    }))
    setRequests(mapped)
  }

  const statusMap: Record<number, string> = {
    1: "รออนุมัติ",
    0: "ไม่อนุมัติ",
    2: "อนุมัติแล้ว",
    3: "อนุมัติแล้ว",
    4: "อนุมัติแล้ว",
    5: "อนุมัติแล้ว",
  }

  const filteredRequests = requests.filter((request) => {
    const q = searchTerm.toLowerCase()
    const matchesSearch =
      request.studentName?.toLowerCase().includes(q) ||
      request.studentCode?.includes(searchTerm) ||
      request.course.toLowerCase().includes(q)
    const statusText = statusMap[request.statusCode] || "อื่นๆ"
    const matchesStatus = statusFilter === "all" || statusText.includes(statusFilter)
    return matchesSearch && matchesStatus
  })

  const pendingCount = requests.filter((req) => req.statusCode === 1).length
  const approvedCount = requests.filter((req) => [2, 3, 4, 5].includes(req.statusCode)).length
  const rejectedCount = requests.filter((req) => req.statusCode === 0).length

  const handleApprove = async (requestId: string) => {
    await fetch(endpoints.teacher.approveRequest(requestId), { method: "PUT" })
    await loadRequests()
  }

  const handleReject = async (requestId: string, reason: string) => {
    await fetch(endpoints.teacher.rejectRequest(requestId), {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ reason }),
    })
    await loadRequests()
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
              <option value="รออนุมัติ">รออนุมัติ</option>
              <option value="อนุมัติแล้ว">อนุมัติแล้ว</option>
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
                key={request.requestId}
                request={{
                  id: request.requestId,
                  studentId: request.studentId,
                  studentCode: request.studentCode,
                  studentName: request.studentName,
                  course: request.course,
                  reason: request.reason,
                  notes: request.notes,
                  requestDate: request.requestDate,
                  status: statusMap[request.statusCode] || "อื่นๆ",
                  statusEmoji:
                    request.statusCode === 1
                      ? "⏳"
                      : [2, 3, 4, 5].includes(request.statusCode)
                      ? "📦"
                      : request.statusCode === 0
                      ? "❌"
                      : "❔",
                  items: request.items,
                  priority: request.priority,
                  approvedDate: request.approvedDate,
                  rejectedDate: request.rejectedDate,
                  rejectionReason: request.rejectionReason,
                }}
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
