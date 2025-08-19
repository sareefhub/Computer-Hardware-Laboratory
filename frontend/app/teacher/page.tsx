import { ProtectedRoute } from "@/components/layout/protected-route"
import { TeacherDashboard } from "@/components/teacher/teacher-dashboard"

export default function TeacherPage() {
  return (
    <ProtectedRoute allowedRoles={["teacher"]}>
      <TeacherDashboard />
    </ProtectedRoute>
  )
}
