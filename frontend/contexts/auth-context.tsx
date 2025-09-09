"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import { useRouter } from "next/navigation"
import type { User, UserRole, AuthContextType } from "@/types/auth"

export const AuthContext = createContext<AuthContextType | undefined>(undefined)

// Mock user data for demonstration
const mockUsers: Record<string, { password: string; user: User }> = {
  student123: {
    password: "password",
    user: {
      id: "1",
      username: "student123",
      role: "student",
      name: "นายสมชาย ใจดี",
      email: "student@university.ac.th",
      studentId: "6510110001",
      department: "วิศวกรรมคอมพิวเตอร์",
    },
  },
  teacher123: {
    password: "password",
    user: {
      id: "2",
      username: "teacher123",
      role: "teacher",
      name: "ผศ.ดร.สมหญิง ใจดี",
      email: "teacher@university.ac.th",
      department: "วิศวกรรมคอมพิวเตอร์",
    },
  },
  admin123: {
    password: "password",
    user: {
      id: "3",
      username: "admin123",
      role: "admin",
      name: "นางสาวสมใจ ใจดี",
      email: "admin@university.ac.th",
      department: "ศูนย์เทคโนโลยีสารสนเทศ",
    },
  },
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    // Check for stored user session
    const storedUser = localStorage.getItem("user")
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }
    setIsLoading(false)
  }, [])

  const login = async (username: string, password: string, role: UserRole) => {
    setIsLoading(true)

    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 1000))

    const userData = mockUsers[username]

    if (!userData || userData.password !== password || userData.user.role !== role) {
      setIsLoading(false)
      throw new Error("Invalid credentials")
    }

    setUser(userData.user)
    localStorage.setItem("user", JSON.stringify(userData.user))

    // Redirect based on role
    switch (role) {
      case "student":
        router.push("/student")
        break
      case "teacher":
        router.push("/teacher")
        break
      case "admin":
        router.push("/admin")
        break
    }

    setIsLoading(false)
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem("user")
    router.push("/")
  }

  return <AuthContext.Provider value={{ user, login, logout, isLoading }}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
