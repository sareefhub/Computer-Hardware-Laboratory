import { ProtectedRoute } from "@/components/layout/protected-route"
import { StudentDashboard } from "@/components/student/student-dashboard"

export default function StudentPage() {
  return (
    <ProtectedRoute allowedRoles={["student"]}>
      <StudentDashboard />
    </ProtectedRoute>
  )
}
