import React from 'react';
import { Clock, Calendar, AlertCircle, Timer, Ban, PenToolIcon as Tool } from 'lucide-react';
import Sidebar from "../components/sidebar";
import Navbar from "../components/navbar";
import "./home.css";

const Home = () => {
  const isLoggedIn = false;

  const borrowingRules = [
    {
      icon: <Clock className="w-5 h-5" />,
      title: "เวลาการยืม",
      description: "การรับอุปกรณ์ให้รับอุปกรณ์ตั้งแต่เวลา 10.00-11.00 น.",
    },
    {
      icon: <Tool className="w-5 h-5" />,
      title: "วิชา Project",
      description: "สามารถยืมอุปกรณ์แต่ละไม่เกิน 2500 บาท/คน/เทอม",
    },
    {
      icon: <Calendar className="w-5 h-5" />,
      title: "ระยะเวลาการยืม",
      description: "การรับอุปกรณ์ให้รับภายใน 4 วัน นับตั้งแต่เริ่มยืม",
    },
    {
      icon: <Timer className="w-5 h-5" />,
      title: "เวลาคืนอุปกรณ์",
      description: "การคืนอุปกรณ์ ให้คืนตั้งแต่ 10.00 - 11.30 น.",
    },
    {
      icon: <AlertCircle className="w-5 h-5" />,
      title: "ค่าปรับ",
      description: "คืนอุปกรณ์ช้าปรับ 10% จากราคาอุปกรณ์ต่อวัน",
    },
    {
      icon: <Ban className="w-5 h-5" />,
      title: "ความเสียหาย",
      description: "อุปกรณ์เสียจากความประมาท นักศึกษาต้องจ่ายค่าซ่อมเอง",
    },
  ];

  return (
    <div className="home-page">
      {isLoggedIn && <Sidebar />}
      <div className={`home-content ${!isLoggedIn ? "home-content-full-width" : ""}`}>
        <Navbar />
        <div className="home-main-container">
          <div className="home-content-grid">
            <div className="home-left-section">
              <div className="home-welcome-section">
                <h1>ระบบยืม-คืนอุปกรณ์ฮาร์ดแวร์</h1>
                <p>สำหรับนักศึกษาและบุคลากร</p>
              </div>

              <div className="home-hardware-section">
                <h2>อุปกรณ์ที่สามารถยืมได้</h2>
                <ul className="home-hardware-list">
                  <li>• Arduino Boards และอุปกรณ์เสริม</li>
                  <li>• Sensors และ Modules ต่างๆ</li>
                  <li>• Raspberry Pi และอุปกรณ์ที่เกี่ยวข้อง</li>
                  <li>• เครื่องมือวัดและทดสอบ</li>
                  <li>• อุปกรณ์ประกอบการเรียนการสอน</li>
                </ul>
              </div>
            </div>

            <div className="home-right-section">
              <h2>กฎในการยืมของ</h2>
              <div className="home-rules-grid">
                {borrowingRules.map((rule, index) => (
                  <div key={index} className="home-rule-card">
                    <div className="home-rule-header">
                      <div className="home-rule-icon">{rule.icon}</div>
                      <h3>{rule.title}</h3>
                    </div>
                    <p>{rule.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
