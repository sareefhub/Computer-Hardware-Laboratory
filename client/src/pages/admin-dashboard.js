import { useState, useEffect } from "react";
import "./admin-dashboard.css";
import Navbar from "../components/navbar";
import Sidebar from "../components/sidebar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMicrochip,
  faCheckCircle,
  faClock,
  faUsers,
} from "@fortawesome/free-solid-svg-icons";

const AdminDashboard = () => {
  const [userStatus, setUserStatus] = useState({
    borrowed: 0,
    returned: 0,
    pending: 0,
    onlineUsers: 0,
  });

  useEffect(() => {
    setUserStatus({
      borrowed: 5,
      returned: 3,
      pending: 2,
      onlineUsers: 10,
    });
  }, []);

  return (
    <div className="admin-dashboard-page">
      <div className="admin-dashboard-navbar">
        <Navbar />
      </div>
      <div className="admin-dashboard-body">
        <div className="admin-dashboard-sidebar">
          <Sidebar />
        </div>
        <div className="admin-dashboard-content">
          <div className="admin-dashboard-container">
            <h1 className="admin-dashboard-title">แผงควบคุม</h1>
            <div className="admin-dashboard-stats-grid">
              <div className="admin-dashboard-stat-card admin-dashboard-borrowed">
                <div className="admin-dashboard-stat-icon">
                  <FontAwesomeIcon icon={faMicrochip} />
                </div>
                <div className="admin-dashboard-stat-info">
                  <h3>จำนวนอุปกรณ์ที่ยืม</h3>
                  <p className="admin-dashboard-stat-number">
                    {userStatus.borrowed}
                  </p>
                </div>
              </div>

              <div className="admin-dashboard-stat-card admin-dashboard-returned">
                <div className="admin-dashboard-stat-icon">
                  <FontAwesomeIcon icon={faCheckCircle} />
                </div>
                <div className="admin-dashboard-stat-info">
                  <h3>จำนวนอุปกรณ์ที่คืนแล้ว</h3>
                  <p className="admin-dashboard-stat-number">
                    {userStatus.returned}
                  </p>
                </div>
              </div>

              <div className="admin-dashboard-stat-card admin-dashboard-pending">
                <div className="admin-dashboard-stat-icon">
                  <FontAwesomeIcon icon={faClock} />
                </div>
                <div className="admin-dashboard-stat-info">
                  <h3>จำนวนอุปกรณ์ที่ยังไม่คืน</h3>
                  <p className="admin-dashboard-stat-number">
                    {userStatus.pending}
                  </p>
                </div>
              </div>

              <div className="admin-dashboard-stat-card admin-dashboard-users">
                <div className="admin-dashboard-stat-icon">
                  <FontAwesomeIcon icon={faUsers} />
                </div>
                <div className="admin-dashboard-stat-info">
                  <h3>จำนวนผู้ใช้งานออนไลน์</h3>
                  <p className="admin-dashboard-stat-number">
                    {userStatus.onlineUsers}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
