import { ProtectedRoute } from "@/components/layout/protected-route"
import { BorrowingConfirm } from "@/components/student/borrowing-confirm"

export default function StudentConfirmPage() {
  return (
    <ProtectedRoute allowedRoles={["student"]}>
      <BorrowingConfirm />
    </ProtectedRoute>
  )
}
