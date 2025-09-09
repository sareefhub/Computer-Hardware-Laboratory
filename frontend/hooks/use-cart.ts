// hooks/use-cart.ts
import { useState } from "react"

export interface CartItem {
  equipmentId: number
  quantity: number
}

export function useCart() {
  const [cartItems, setCartItems] = useState<CartItem[]>([])

  const addToCart = (equipmentId: number, quantity: number) => {
    setCartItems((prev) => {
      const existing = prev.find((i) => i.equipmentId === equipmentId)
      if (existing) {
        return prev.map((i) =>
          i.equipmentId === equipmentId ? { ...i, quantity: i.quantity + quantity } : i
        )
      }
      return [...prev, { equipmentId, quantity }]
    })
  }

  const removeFromCart = (equipmentId: number) => {
    setCartItems((prev) => prev.filter((i) => i.equipmentId !== equipmentId))
  }

  const clearCart = () => setCartItems([])

  const getTotalItems = () => cartItems.reduce((total, item) => total + item.quantity, 0)

  return { cartItems, addToCart, removeFromCart, clearCart, getTotalItems }
}
