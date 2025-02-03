import { useState, useEffect } from "react"
import "./Dashboard.css"
import Navbar from "../components/navbar"
import Sidebar from "../components/sidebar"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faMicrochip, faCheckCircle, faClock, faUsers } from "@fortawesome/free-solid-svg-icons"

const Dashboard = () => {
  const [userStatus, setUserStatus] = useState({
    borrowed: 0,
    returned: 0,
    pending: 0,
    onlineUsers: 0,
  })

  useEffect(() => {
    setUserStatus({
      borrowed: 5,
      returned: 3,
      pending: 2,
      onlineUsers: 10,
    })
  }, [])

  return (
    <div className="page">
      <Sidebar />
      <div className="content">
        <Navbar />
        <div className="dashboard-container">
          <h1 className="dashboard-title">แผงควบคุม</h1>

          <div className="stats-grid">
            <div className="stat-card borrowed">
              <div className="stat-icon">
                <FontAwesomeIcon icon={faMicrochip} />
              </div>
              <div className="stat-info">
                <h3>จำนวนอุปกรณ์ที่ยืม</h3>
                <p className="stat-number">{userStatus.borrowed}</p>
              </div>
            </div>

            <div className="stat-card returned">
              <div className="stat-icon">
                <FontAwesomeIcon icon={faCheckCircle} />
              </div>
              <div className="stat-info">
                <h3>จำนวนอุปกรณ์ที่คืนแล้ว</h3>
                <p className="stat-number">{userStatus.returned}</p>
              </div>
            </div>

            <div className="stat-card pending">
              <div className="stat-icon">
                <FontAwesomeIcon icon={faClock} />
              </div>
              <div className="stat-info">
                <h3>จำนวนอุปกรณ์ที่ยังไม่คืน</h3>
                <p className="stat-number">{userStatus.pending}</p>
              </div>
            </div>

            <div className="stat-card users">
              <div className="stat-icon">
                <FontAwesomeIcon icon={faUsers} />
              </div>
              <div className="stat-info">
                <h3>จำนวนผู้ใช้งานออนไลน์</h3>
                <p className="stat-number">{userStatus.onlineUsers}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard

