import { useState } from "react";
import Sidebar from "../../components/sidebar";
import Navbar from "../../components/navbar";
import "./change-password.css";
import "../../styles/layout.css";

const ChangePassword = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      alert("รหัสผ่านใหม่และยืนยันรหัสไม่ตรงกัน");
      return;
    }
    alert("เปลี่ยนรหัสผ่านสำเร็จ");
    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
  };

  return (
    <div className="page-container">
      <Navbar onToggleSidebar={() => setSidebarOpen(!isSidebarOpen)} />
      <Sidebar isOpen={isSidebarOpen} onClose={() => setSidebarOpen(false)} />
      <div className="page-content">
        <div className="change-password-container">
          <h2 className="change-password-title">เปลี่ยนรหัสผ่าน</h2>
          <form onSubmit={handleSubmit} className="change-password-form">
            <div className="form-group">
              <label>รหัสผ่านปัจจุบัน</label>
              <input
                type="password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label>รหัสผ่านใหม่</label>
              <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label>ยืนยันรหัสผ่านใหม่</label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>
            <button type="submit" className="change-password-button">
              บันทึกการเปลี่ยนแปลง
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ChangePassword;
