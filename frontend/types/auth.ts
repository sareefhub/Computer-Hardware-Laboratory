export type UserRole = "student" | "teacher" | "admin"

export interface User {
  id: string
  username: string
  role: UserRole
  name: string
  email?: string
  studentId?: string
  department?: string
}

export interface AuthContextType {
  user: User | null
  login: (username: string, password: string, role: UserRole) => Promise<void>
  logout: () => void
  isLoading: boolean
}
