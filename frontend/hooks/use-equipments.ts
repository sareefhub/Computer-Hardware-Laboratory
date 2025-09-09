import { useState } from "react"
import api from "@/lib/axios"
import { endpoints } from "@/lib/api"
import type { Equipment } from "@/types/equipment"

export function useEquipments() {
  const [loading, setLoading] = useState(false)

  const getAllEquipments = async (): Promise<Equipment[]> => {
    setLoading(true)
    try {
      const res = await api.get(endpoints.student.equipments)
      return res.data
    } finally {
      setLoading(false)
    }
  }

  return { getAllEquipments, loading }
}
