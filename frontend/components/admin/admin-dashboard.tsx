"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useAuth } from "@/contexts/auth-context"
import { AdminHeader } from "./admin-header"
import { EquipmentManagement } from "./equipment-management"
import { BorrowingManagement } from "./borrowing-management"
import { Package, Users, Clock, CheckCircle, XCircle, TrendingUp } from "lucide-react"

// Mock statistics data
const mockStats = {
  totalEquipment: 152,
  availableEquipment: 98,
  borrowedEquipment: 54,
  totalRequests: 45,
  pendingApproval: 8,
  inPreparation: 12,
  readyForPickup: 5,
  borrowed: 15,
  returned: 5,
  approved: 35,
  rejected: 5,
  totalStudents: 1250,
  activeUsers: 89,
}

export function AdminDashboard() {
  const { user } = useAuth()
  const [activeTab, setActiveTab] = useState("overview")

  return (
    <div className="min-h-screen bg-gray-50">
      <AdminHeader />

      <main className="container mx-auto px-4 py-6 max-w-7xl">
        {/* Welcome Section */}
        <div className="mb-6">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">สวัสดี, {user?.name}</h1>
          <p className="text-gray-600">จัดการระบบยืม-คืนอุปกรณ์</p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="overview">ภาพรวม</TabsTrigger>
            <TabsTrigger value="equipment">จัดการอุปกรณ์</TabsTrigger>
            <TabsTrigger value="borrowing">จัดการการยืม</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            {/* Equipment Statistics */}
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">สถิติอุปกรณ์</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-blue-100 rounded-lg">
                        <Package className="h-5 w-5 text-blue-600" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">อุปกรณ์ทั้งหมด</p>
                        <p className="text-2xl font-bold text-blue-600">{mockStats.totalEquipment}</p>
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
                        <p className="text-sm text-gray-600">พร้อมใช้งาน</p>
                        <p className="text-2xl font-bold text-green-600">{mockStats.availableEquipment}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-orange-100 rounded-lg">
                        <Clock className="h-5 w-5 text-orange-600" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">ถูกยืม</p>
                        <p className="text-2xl font-bold text-orange-600">{mockStats.borrowedEquipment}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-purple-100 rounded-lg">
                        <TrendingUp className="h-5 w-5 text-purple-600" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">อัตราการใช้งาน</p>
                        <p className="text-2xl font-bold text-purple-600">
                          {Math.round((mockStats.borrowedEquipment / mockStats.totalEquipment) * 100)}%
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Borrowing Statistics */}
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">สถิติการยืม</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-yellow-100 rounded-lg">
                        <span className="text-lg">👨‍🏫</span>
                      </div>
                      <div>
                        <p className="text-xs text-gray-600">รอการอนุมัติ</p>
                        <p className="text-xl font-bold text-yellow-600">{mockStats.pendingApproval}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-blue-100 rounded-lg">
                        <span className="text-lg">🔧</span>
                      </div>
                      <div>
                        <p className="text-xs text-gray-600">กำลังเตรียม</p>
                        <p className="text-xl font-bold text-blue-600">{mockStats.inPreparation}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-green-100 rounded-lg">
                        <span className="text-lg">✅</span>
                      </div>
                      <div>
                        <p className="text-xs text-gray-600">พร้อมรับ</p>
                        <p className="text-xl font-bold text-green-600">{mockStats.readyForPickup}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-orange-100 rounded-lg">
                        <span className="text-lg">📦</span>
                      </div>
                      <div>
                        <p className="text-xs text-gray-600">รอคืน</p>
                        <p className="text-xl font-bold text-orange-600">{mockStats.borrowed}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-purple-100 rounded-lg">
                        <span className="text-lg">🔄</span>
                      </div>
                      <div>
                        <p className="text-xs text-gray-600">คืนแล้ว</p>
                        <p className="text-xl font-bold text-purple-600">{mockStats.returned}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* User Statistics */}
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">สถิติผู้ใช้งาน</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-indigo-100 rounded-lg">
                        <Users className="h-5 w-5 text-indigo-600" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">นักศึกษาทั้งหมด</p>
                        <p className="text-2xl font-bold text-indigo-600">{mockStats.totalStudents}</p>
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
                        <p className="text-sm text-gray-600">ผู้ใช้งานเดือนนี้</p>
                        <p className="text-2xl font-bold text-green-600">{mockStats.activeUsers}</p>
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
                        <p className="text-sm text-gray-600">คำขอถูกปฏิเสธ</p>
                        <p className="text-2xl font-bold text-red-600">{mockStats.rejected}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="equipment">
            <EquipmentManagement />
          </TabsContent>

          <TabsContent value="borrowing">
            <BorrowingManagement />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}
