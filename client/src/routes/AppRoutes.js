import { Routes, Route } from 'react-router-dom';
import Home from '../pages/home/home';
import Login from '../pages/login/login';
import Register from '../pages/register/register';
import AdminDashboard from '../pages/admin-dashboard/admin-dashboard';
import User from '../pages/user/user';
import HardwareList from '../pages/hardware-list/hardware-list';
import BorrowEquipment from '../pages/borrow-equipment/borrow-equipment';
import BorrowingHistory from '../pages/borrowing-history/borrowing-history';
import HardwareDetail from '../pages/hardware-detail/hardware-detail';
import BorrowConfirm from '../pages/borrow-confirm/borrow-confirm';

export default function AppRoutes() {
  return (
    <Routes>
      <Route index element={<Home />} />
      <Route path="/home" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/dashboard" element={<AdminDashboard />} />
      <Route path="/user" element={<User />} />
      <Route path="/hardware-list" element={<HardwareList />} />
      <Route path="/borrow-equipment" element={<BorrowEquipment />} />
      <Route path="/borrowing-history" element={<BorrowingHistory />} />
      <Route path="/hardware-detail/:id" element={<HardwareDetail />} />
      <Route path="/borrow-confirm" element={<BorrowConfirm />} />
    </Routes>
  );
}
