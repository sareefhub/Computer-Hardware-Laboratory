import React, { useState, useEffect } from 'react';
import "./Dashboard.css";
import Navbar from '../components/navbar';
import Sidebar from '../components/sidebar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMicrochip, faCheckCircle, faClock, faUsers } from '@fortawesome/free-solid-svg-icons';

const Dashboard = () => {
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
    <div className="page">
      <Sidebar />
      <div className="content">
        <Navbar />
        <div className="content-page">
          <div className="user-status">
            <div className="status-box" style={{ backgroundColor: '#f2f2f2' }}>
              <h3><FontAwesomeIcon icon={faMicrochip} style={{ color: '#FF9800', marginRight: '10px' }} /> จำนวนอุปกรณ์ที่ยืม</h3>
              <p>{userStatus.borrowed}</p>
            </div>
            <div className="status-box" style={{ backgroundColor: '#f2f2f2' }}>
              <h3><FontAwesomeIcon icon={faCheckCircle} style={{ color: '#4CAF50', marginRight: '10px' }} /> จำนวนอุปกรณ์ที่คืนแล้ว</h3>
              <p>{userStatus.returned}</p>
            </div>
            <div className="status-box" style={{ backgroundColor: '#f2f2f2' }}>
              <h3><FontAwesomeIcon icon={faClock} style={{ color: '#F44336', marginRight: '10px' }} /> จำนวนอุปกรณ์ที่ยังไม่คืน</h3>
              <p>{userStatus.pending}</p>
            </div>
            <div className="status-box" style={{ backgroundColor: '#f2f2f2' }}>
              <h3><FontAwesomeIcon icon={faUsers} style={{ color: '#9C27B0', marginRight: '10px' }} /> จำนวนผู้ใช้งานออนไลน์</h3>
              <p>{userStatus.onlineUsers}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
