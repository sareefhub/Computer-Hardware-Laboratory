"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, Plus, Edit, Trash2, Package } from "lucide-react"
import Image from "next/image"

// Mock equipment data
const mockEquipments = [
  {
    id: "1",
    name: "Arduino Uno R3",
    description: "บอร์ดไมโครคอนโทรลเลอร์สำหรับการเรียนรู้และพัฒนาโปรเจค",
    category: "Microcontroller",
    available: 15,
    total: 20,
    image: "/placeholder-rt7xh.png",
    serialNumbers: ["ARD001", "ARD002", "ARD003", "ARD004", "ARD005"],
    location: "ห้องแลป A101",
    condition: "ดี",
  },
  {
    id: "2",
    name: "Raspberry Pi 4",
    description: "คอมพิวเตอร์ขนาดเล็กสำหรับการเรียนรู้การเขียนโปรแกรม",
    category: "Single Board Computer",
    available: 8,
    total: 12,
    image: "/raspberry-pi-4-board.png",
    serialNumbers: ["RPI001", "RPI002", "RPI003", "RPI004"],
    location: "ห้องแลป A102",
    condition: "ดี",
  },
  {
    id: "3",
    name: "Digital Multimeter",
    description: "เครื่องมือวัดค่าไฟฟ้าแบบดิจิทัล",
    category: "Measurement Tool",
    available: 25,
    total: 30,
    image: "/placeholder-db6ew.png",
    serialNumbers: ["DMM001", "DMM002", "DMM003", "DMM004", "DMM005"],
    location: "ห้องแลป B201",
    condition: "ดี",
  },
]

interface Equipment {
  id: string
  name: string
  description: string
  category: string
  available: number
  total: number
  image: string
  serialNumbers: string[]
  location: string
  condition: string
}

export function EquipmentManagement() {
  const [equipments, setEquipments] = useState<Equipment[]>(mockEquipments)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [showAddDialog, setShowAddDialog] = useState(false)
  const [showEditDialog, setShowEditDialog] = useState(false)
  const [editingEquipment, setEditingEquipment] = useState<Equipment | null>(null)
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    category: "",
    total: 0,
    location: "",
    condition: "ดี",
    serialNumbers: "",
  })

  const categories = ["all", ...Array.from(new Set(equipments.map((eq) => eq.category)))]

  const filteredEquipments = equipments.filter((equipment) => {
    const matchesSearch =
      equipment.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      equipment.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === "all" || equipment.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const handleAdd = () => {
    if (!formData.name || !formData.category || formData.total <= 0) return

    const newEquipment: Equipment = {
      id: Date.now().toString(),
      name: formData.name,
      description: formData.description,
      category: formData.category,
      available: formData.total,
      total: formData.total,
      image: "/placeholder.svg",
      serialNumbers: formData.serialNumbers.split(",").map((s) => s.trim()),
      location: formData.location,
      condition: formData.condition,
    }

    setEquipments([...equipments, newEquipment])
    resetForm()
    setShowAddDialog(false)
  }

  const handleEdit = () => {
    if (!editingEquipment || !formData.name || !formData.category || formData.total <= 0) return

    setEquipments(
      equipments.map((eq) =>
        eq.id === editingEquipment.id
          ? {
              ...eq,
              name: formData.name,
              description: formData.description,
              category: formData.category,
              total: formData.total,
              available: Math.min(eq.available, formData.total),
              location: formData.location,
              condition: formData.condition,
              serialNumbers: formData.serialNumbers.split(",").map((s) => s.trim()),
            }
          : eq,
      ),
    )

    resetForm()
    setShowEditDialog(false)
    setEditingEquipment(null)
  }

  const handleDelete = (id: string) => {
    if (confirm("คุณแน่ใจหรือไม่ที่จะลบอุปกรณ์นี้?")) {
      setEquipments(equipments.filter((eq) => eq.id !== id))
    }
  }

  const openEditDialog = (equipment: Equipment) => {
    setEditingEquipment(equipment)
    setFormData({
      name: equipment.name,
      description: equipment.description,
      category: equipment.category,
      total: equipment.total,
      location: equipment.location,
      condition: equipment.condition,
      serialNumbers: equipment.serialNumbers.join(", "),
    })
    setShowEditDialog(true)
  }

  const resetForm = () => {
    setFormData({
      name: "",
      description: "",
      category: "",
      total: 0,
      location: "",
      condition: "ดี",
      serialNumbers: "",
    })
  }

  const getAvailabilityColor = (available: number, total: number) => {
    const ratio = available / total
    if (ratio > 0.5) return "bg-green-100 text-green-800"
    if (ratio > 0.2) return "bg-yellow-100 text-yellow-800"
    return "bg-red-100 text-red-800"
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">จัดการอุปกรณ์</h2>
          <p className="text-gray-600">เพิ่ม แก้ไข และลบอุปกรณ์ในระบบ</p>
        </div>
        <Button onClick={() => setShowAddDialog(true)} className="bg-green-600 hover:bg-green-700">
          <Plus className="h-4 w-4 mr-2" />
          เพิ่มอุปกรณ์ใหม่
        </Button>
      </div>

      {/* Search and Filter */}
      <div className="bg-white rounded-lg shadow-sm p-4">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="ค้นหาอุปกรณ์..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">ทุกหมวดหมู่</option>
            {categories.slice(1).map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Equipment Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredEquipments.map((equipment) => (
          <Card key={equipment.id} className="hover:shadow-lg transition-shadow">
            <CardHeader className="pb-3">
              <div className="aspect-video relative mb-3 bg-gray-100 rounded-md overflow-hidden">
                <Image src={equipment.image || "/placeholder.svg"} alt={equipment.name} fill className="object-cover" />
              </div>
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <CardTitle className="text-lg leading-tight mb-1">{equipment.name}</CardTitle>
                  <Badge variant="secondary" className="text-xs mb-2">
                    {equipment.category}
                  </Badge>
                </div>
                <div className="flex space-x-1">
                  <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => openEditDialog(equipment)}>
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 text-red-500 hover:text-red-700"
                    onClick={() => handleDelete(equipment.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>

            <CardContent className="space-y-3">
              <CardDescription className="text-sm line-clamp-2">{equipment.description}</CardDescription>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">คงเหลือ:</span>
                  <Badge className={getAvailabilityColor(equipment.available, equipment.total)}>
                    {equipment.available}/{equipment.total}
                  </Badge>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">สถานที่:</span>
                  <span className="text-sm font-medium">{equipment.location}</span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">สภาพ:</span>
                  <Badge variant="outline" className="text-xs">
                    {equipment.condition}
                  </Badge>
                </div>
              </div>

              <div>
                <Label className="text-xs font-medium text-gray-600">Serial Numbers:</Label>
                <div className="flex flex-wrap gap-1 mt-1">
                  {equipment.serialNumbers.slice(0, 3).map((serial) => (
                    <Badge key={serial} variant="secondary" className="text-xs">
                      {serial}
                    </Badge>
                  ))}
                  {equipment.serialNumbers.length > 3 && (
                    <Badge variant="secondary" className="text-xs">
                      +{equipment.serialNumbers.length - 3}
                    </Badge>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredEquipments.length === 0 && (
        <div className="text-center py-12">
          <Package className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-500 text-lg">ไม่พบอุปกรณ์ที่ค้นหา</p>
        </div>
      )}

      {/* Add Equipment Dialog */}
      <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>เพิ่มอุปกรณ์ใหม่</DialogTitle>
            <DialogDescription>กรอกข้อมูลอุปกรณ์ที่ต้องการเพิ่มในระบบ</DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="name">ชื่ออุปกรณ์ *</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="ชื่ออุปกรณ์"
                />
              </div>
              <div>
                <Label htmlFor="category">หมวดหมู่ *</Label>
                <Input
                  id="category"
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  placeholder="หมวดหมู่อุปกรณ์"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="description">คำอธิบาย</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="คำอธิบายอุปกรณ์"
                rows={3}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="total">จำนวนทั้งหมด *</Label>
                <Input
                  id="total"
                  type="number"
                  value={formData.total}
                  onChange={(e) => setFormData({ ...formData, total: Number.parseInt(e.target.value) || 0 })}
                  placeholder="จำนวน"
                  min="1"
                />
              </div>
              <div>
                <Label htmlFor="location">สถานที่เก็บ</Label>
                <Input
                  id="location"
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  placeholder="สถานที่เก็บอุปกรณ์"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="condition">สภาพ</Label>
                <Select
                  value={formData.condition}
                  onValueChange={(value) => setFormData({ ...formData, condition: value })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ดี">ดี</SelectItem>
                    <SelectItem value="ปานกลาง">ปานกลาง</SelectItem>
                    <SelectItem value="ต้องซ่อม">ต้องซ่อม</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="serialNumbers">Serial Numbers</Label>
                <Input
                  id="serialNumbers"
                  value={formData.serialNumbers}
                  onChange={(e) => setFormData({ ...formData, serialNumbers: e.target.value })}
                  placeholder="คั่นด้วยเครื่องหมายจุลภาค"
                />
              </div>
            </div>

            <div className="flex space-x-2">
              <Button onClick={handleAdd} disabled={!formData.name || !formData.category || formData.total <= 0}>
                เพิ่มอุปกรณ์
              </Button>
              <Button variant="outline" onClick={() => setShowAddDialog(false)}>
                ยกเลิก
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Edit Equipment Dialog */}
      <Dialog open={showEditDialog} onOpenChange={setShowEditDialog}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>แก้ไขอุปกรณ์</DialogTitle>
            <DialogDescription>แก้ไขข้อมูลอุปกรณ์</DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="edit-name">ชื่ออุปกรณ์ *</Label>
                <Input
                  id="edit-name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="ชื่ออุปกรณ์"
                />
              </div>
              <div>
                <Label htmlFor="edit-category">หมวดหมู่ *</Label>
                <Input
                  id="edit-category"
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  placeholder="หมวดหมู่อุปกรณ์"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="edit-description">คำอธิบาย</Label>
              <Textarea
                id="edit-description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="คำอธิบายอุปกรณ์"
                rows={3}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="edit-total">จำนวนทั้งหมด *</Label>
                <Input
                  id="edit-total"
                  type="number"
                  value={formData.total}
                  onChange={(e) => setFormData({ ...formData, total: Number.parseInt(e.target.value) || 0 })}
                  placeholder="จำนวน"
                  min="1"
                />
              </div>
              <div>
                <Label htmlFor="edit-location">สถานที่เก็บ</Label>
                <Input
                  id="edit-location"
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  placeholder="สถานที่เก็บอุปกรณ์"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="edit-condition">สภาพ</Label>
                <Select
                  value={formData.condition}
                  onValueChange={(value) => setFormData({ ...formData, condition: value })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ดี">ดี</SelectItem>
                    <SelectItem value="ปานกลาง">ปานกลาง</SelectItem>
                    <SelectItem value="ต้องซ่อม">ต้องซ่อม</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="edit-serialNumbers">Serial Numbers</Label>
                <Input
                  id="edit-serialNumbers"
                  value={formData.serialNumbers}
                  onChange={(e) => setFormData({ ...formData, serialNumbers: e.target.value })}
                  placeholder="คั่นด้วยเครื่องหมายจุลภาค"
                />
              </div>
            </div>

            <div className="flex space-x-2">
              <Button onClick={handleEdit} disabled={!formData.name || !formData.category || formData.total <= 0}>
                บันทึกการแก้ไข
              </Button>
              <Button variant="outline" onClick={() => setShowEditDialog(false)}>
                ยกเลิก
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
