// hooks/use-borrowing.ts
import { useState } from "react"
import api from "@/lib/axios"
import { endpoints } from "@/lib/api"
import type { CartItem } from "./use-cart"

interface BorrowingRequest {
  studentId: string
  course: string
  reason: string
  notes?: string
  items: { equipmentId: number; quantity: number }[]
}

export function useBorrowing() {
  const [loading, setLoading] = useState(false)

  const submitBorrowingRequest = async (data: BorrowingRequest) => {
    setLoading(true)
    try {
      const res = await api.post(endpoints.student.borrowingRequests, data)
      return res.data
    } finally {
      setLoading(false)
    }
  }

  return { submitBorrowingRequest, loading }
}
