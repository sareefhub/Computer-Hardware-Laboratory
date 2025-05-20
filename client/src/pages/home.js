import React from 'react';
import { Clock, Calendar, AlertCircle, Timer, Ban, PenToolIcon as Tool } from 'lucide-react';
import Sidebar from "../components/sidebar";
import Navbar from "../components/navbar";
import "./home.css";

const Home = () => {
  const isLoggedIn = false;

  const borrowingRules = [
    { icon: <Clock className="home-rule-icon-size" />, title: "เวลาการยืม", description: "การรับอุปกรณ์ให้รับอุปกรณ์ตั้งแต่เวลา 10.00-11.00 น." },
    { icon: <Tool className="home-rule-icon-size" />, title: "วิชา Project", description: "สามารถยืมอุปกรณ์แต่ละไม่เกิน 2500 บาท/คน/เทอม" },
    { icon: <Calendar className="home-rule-icon-size" />, title: "ระยะเวลาการยืม", description: "การรับอุปกรณ์ให้รับภายใน 4 วัน นับตั้งแต่เริ่มยืม" },
    { icon: <Timer className="home-rule-icon-size" />, title: "เวลาคืนอุปกรณ์", description: "การคืนอุปกรณ์ ให้คืนตั้งแต่ 10.00 - 11.30 น." },
    { icon: <AlertCircle className="home-rule-icon-size" />, title: "ค่าปรับ", description: "คืนอุปกรณ์ช้าปรับ 10% จากราคาอุปกรณ์ต่อวัน" },
    { icon: <Ban className="home-rule-icon-size" />, title: "ความเสียหาย", description: "อุปกรณ์เสียจากความประมาท นักศึกษาต้องจ่ายค่าซ่อมเอง" },
  ];

  return (
    <div className="home-page">
      {isLoggedIn && <Sidebar />}
      <div className={`home-box ${!isLoggedIn ? "home-box-full-width" : ""}`}>
        <Navbar />
        <div className="home-main">
          <div className="home-grid">
            <div className="home-welcome">
              <div className="home-welcome-title">ระบบยืม-คืนอุปกรณ์ฮาร์ดแวร์</div>
              <div className="home-welcome-subtitle">สำหรับนักศึกษาและบุคลากร</div>
            </div>

            <div className="home-hardware">
              <div className="home-hardware-title">อุปกรณ์ที่สามารถยืมได้</div>
              <ul className="home-hardware-list">
                <li className="home-hardware-list-item">• Arduino Boards และอุปกรณ์เสริม</li>
                <li className="home-hardware-list-item">• Sensors และ Modules ต่างๆ</li>
                <li className="home-hardware-list-item">• Raspberry Pi และอุปกรณ์ที่เกี่ยวข้อง</li>
                <li className="home-hardware-list-item">• เครื่องมือวัดและทดสอบ</li>
                <li className="home-hardware-list-item">• อุปกรณ์ประกอบการเรียนการสอน</li>
              </ul>
            </div>

            <div className="home-rules">
              <div className="home-rules-title">กฎในการยืมของ</div>
              <div className="home-rules-grid">
                {borrowingRules.map((rule, index) => (
                  <div key={index} className="home-rule">
                    <div className="home-rule-header">
                      <div>{rule.icon}</div>
                      <div className="home-rule-title">{rule.title}</div>
                    </div>
                    <div className="home-rule-description">{rule.description}</div>
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
