export type UserRole = "student" | "teacher" | "admin"

export interface User {
  userId: string
  username: string
  password: string
  name: string
  email: string
  department: string
  role: UserRole
  studentCode?: string | null
  createdAt: string
}

export interface AuthContextType {
  user: User | null
  login: (username: string, password: string) => Promise<void>
  logout: () => void
  isLoading: boolean
}
