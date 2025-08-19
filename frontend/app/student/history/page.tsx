import { ProtectedRoute } from "@/components/layout/protected-route"
import { BorrowingHistory } from "@/components/student/borrowing-history"

export default function StudentHistoryPage() {
  return (
    <ProtectedRoute allowedRoles={["student"]}>
      <BorrowingHistory />
    </ProtectedRoute>
  )
}
