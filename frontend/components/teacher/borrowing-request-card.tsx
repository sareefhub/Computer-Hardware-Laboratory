"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Calendar, User, BookOpen, MessageSquare, Package, CheckCircle, XCircle, AlertTriangle } from "lucide-react"

interface BorrowingItem {
  equipmentId: number
  equipmentName: string
  quantity: number
}

interface BorrowingRequest {
  id: string
  studentId: string
  studentName: string
  studentCode: string
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

interface BorrowingRequestCardProps {
  request: BorrowingRequest
  onApprove: (requestId: string) => Promise<void>
  onReject: (requestId: string, reason: string) => Promise<void>
}

export function BorrowingRequestCard({ request, onApprove, onReject }: BorrowingRequestCardProps) {
  const [showRejectDialog, setShowRejectDialog] = useState(false)
  const [rejectionReason, setRejectionReason] = useState("")
  const [localRequest, setLocalRequest] = useState<BorrowingRequest>(request)

  useEffect(() => {
    setLocalRequest(request)
  }, [request])

  const handleApprove = async () => {
    await onApprove(localRequest.id)
  }

  const handleReject = async () => {
    if (rejectionReason.trim()) {
      await onReject(localRequest.id, rejectionReason)
      setRejectionReason("")
      setShowRejectDialog(false)
    }
  }

  const getStatusColor = () => {
    switch (localRequest.status) {
      case "รออนุมัติ":
      case "รอการอนุมัติจากอาจารย์":
        return "bg-yellow-100 text-yellow-800"
      case "อนุมัติแล้ว":
        return "bg-green-100 text-green-800"
      case "ไม่อนุมัติ":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const isPending =
    localRequest.status === "รออนุมัติ" || localRequest.status === "รอการอนุมัติจากอาจารย์"

  return (
    <>
      <Card className={`hover:shadow-md transition-shadow ${localRequest.priority === "urgent" ? "border-red-200" : ""}`}>
        <CardHeader>
          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-3">
            <div className="flex-1">
              <div className="flex items-center space-x-2 mb-2">
                <CardTitle className="text-lg">คำขอ #{localRequest.id}</CardTitle>
                {localRequest.priority === "urgent" && (
                  <Badge className="bg-red-100 text-red-800 flex items-center space-x-1">
                    <AlertTriangle className="h-3 w-3" />
                    <span>ด่วน</span>
                  </Badge>
                )}
              </div>
              <CardDescription className="space-y-1">
                <div className="flex items-center space-x-4 text-sm">
                  <span className="flex items-center space-x-1">
                    <Calendar className="h-4 w-4" />
                    <span>{new Date(localRequest.requestDate).toLocaleDateString("th-TH")}</span>
                    <span>
                      {new Date(localRequest.requestDate).toLocaleTimeString("th-TH", {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </span>
                  </span>
                </div>
              </CardDescription>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-2xl">{localRequest.statusEmoji}</span>
              <Badge className={getStatusColor()}>{localRequest.status}</Badge>
            </div>
          </div>
        </CardHeader>

        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <User className="h-4 w-4 text-gray-500" />
                <div>
                  <p className="font-medium text-sm">{localRequest.studentName}</p>
                  <p className="text-xs text-gray-500">{localRequest.studentCode}</p>
                </div>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <BookOpen className="h-4 w-4 text-gray-500" />
                <div>
                  <p className="font-medium text-sm">{localRequest.course}</p>
                  <p className="text-xs text-gray-500">{localRequest.reason}</p>
                </div>
              </div>
            </div>
          </div>

          {localRequest.notes && (
            <div className="bg-gray-50 rounded-lg p-3">
              <div className="flex items-start space-x-2">
                <MessageSquare className="h-4 w-4 text-gray-500 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-gray-700 mb-1">หมายเหตุจากนักศึกษา:</p>
                  <p className="text-sm text-gray-600">{localRequest.notes}</p>
                </div>
              </div>
            </div>
          )}

          <div>
            <div className="flex items-center space-x-2 mb-3">
              <Package className="h-4 w-4 text-gray-500" />
              <h4 className="font-medium text-sm text-gray-700">รายการอุปกรณ์ที่ขอยืม</h4>
            </div>
            <div className="space-y-2">
              {localRequest.items.map((item, index) => (
                <div key={index} className="bg-gray-50 rounded-lg p-3">
                  <div className="flex justify-between items-start">
                    <span className="font-medium text-sm">{item.equipmentName}</span>
                    <Badge variant="outline" className="text-xs">
                      จำนวน: {item.quantity}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {localRequest.approvedDate && (
            <div className="bg-green-50 border border-green-200 rounded-lg p-3">
              <p className="text-sm text-green-800 font-medium mb-1">✅ คำขอนี้ถูกอนุมัติแล้ว</p>
              <p className="text-sm text-green-800">
                <strong>อนุมัติเมื่อ:</strong>{" "}
                {new Date(localRequest.approvedDate).toLocaleDateString("th-TH")}{" "}
                {new Date(localRequest.approvedDate).toLocaleTimeString("th-TH", { hour: "2-digit", minute: "2-digit" })}
              </p>
            </div>
          )}

          {localRequest.rejectedDate && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-3">
              <p className="text-sm text-red-800 font-medium mb-1">❌ คำขอนี้ถูกปฏิเสธ</p>
              <p className="text-sm text-red-800 mb-1">
                <strong>ไม่อนุมัติเมื่อ:</strong>{" "}
                {new Date(localRequest.rejectedDate).toLocaleDateString("th-TH")}{" "}
                {new Date(localRequest.rejectedDate).toLocaleTimeString("th-TH", { hour: "2-digit", minute: "2-digit" })}
              </p>
              {localRequest.rejectionReason && (
                <p className="text-sm text-red-700">
                  <strong>เหตุผล:</strong> {localRequest.rejectionReason}
                </p>
              )}
            </div>
          )}

          {isPending && (
            <div className="flex space-x-2 pt-2">
              <Button onClick={handleApprove} className="flex-1 bg-green-600 hover:bg-green-700">
                <CheckCircle className="h-4 w-4 mr-2" />
                อนุมัติ
              </Button>
              <Button
                onClick={() => setShowRejectDialog(true)}
                variant="outline"
                className="flex-1 border-red-300 text-red-600 hover:bg-red-50"
              >
                <XCircle className="h-4 w-4 mr-2" />
                ไม่อนุมัติ
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      <Dialog open={showRejectDialog} onOpenChange={setShowRejectDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>ไม่อนุมัติคำขอยืมอุปกรณ์</DialogTitle>
            <DialogDescription>กรุณาระบุเหตุผลในการไม่อนุมัติคำขอนี้</DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            <div>
              <Label htmlFor="rejection-reason">เหตุผลในการไม่อนุมัติ *</Label>
              <Textarea
                id="rejection-reason"
                placeholder="ระบุเหตุผลที่ไม่อนุมัติคำขอนี้..."
                value={rejectionReason}
                onChange={(e) => setRejectionReason(e.target.value)}
                rows={4}
                className="mt-1"
              />
            </div>

            <div className="flex space-x-2">
              <Button onClick={handleReject} disabled={!rejectionReason.trim()} className="flex-1 bg-red-600 hover:bg-red-700">
                ยืนยันไม่อนุมัติ
              </Button>
              <Button variant="outline" onClick={() => setShowRejectDialog(false)} className="flex-1">
                ยกเลิก
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}
