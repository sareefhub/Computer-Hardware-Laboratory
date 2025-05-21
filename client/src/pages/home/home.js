import React from 'react';
import { Clock, Calendar, AlertCircle, Timer, Ban, PenToolIcon as Tool } from 'lucide-react';
import Sidebar from "../../components/sidebar";
import Navbar from "../../components/navbar";
import "./home.css";

const Home = () => {
  const isLoggedIn = false;

  const borrowingRules = [
    { icon: <Clock className="home-page-icon-size" />, title: "เวลาการยืม", description: "การรับอุปกรณ์ให้รับอุปกรณ์ตั้งแต่เวลา 10.00-11.00 น." },
    { icon: <Tool className="home-page-icon-size" />, title: "วิชา Project", description: "สามารถยืมอุปกรณ์แต่ละไม่เกิน 2500 บาท/คน/เทอม" },
    { icon: <Calendar className="home-page-icon-size" />, title: "ระยะเวลาการยืม", description: "การรับอุปกรณ์ให้รับภายใน 4 วัน นับตั้งแต่เริ่มยืม" },
    { icon: <Timer className="home-page-icon-size" />, title: "เวลาคืนอุปกรณ์", description: "การคืนอุปกรณ์ ให้คืนตั้งแต่ 10.00 - 11.30 น." },
    { icon: <AlertCircle className="home-page-icon-size" />, title: "ค่าปรับ", description: "คืนอุปกรณ์ช้าปรับ 10% จากราคาอุปกรณ์ต่อวัน" },
    { icon: <Ban className="home-page-icon-size" />, title: "ความเสียหาย", description: "อุปกรณ์เสียจากความประมาท นักศึกษาต้องจ่ายค่าซ่อมเอง" },
  ];

  return (
    <div className="home-page">
      {isLoggedIn && <Sidebar />}
      <div className={`home-page-box ${!isLoggedIn ? "home-page-box-full-width" : ""}`}>
        <Navbar />
        <div className="home-page-main">
          <div className="home-page-grid">
            <div className="home-page-welcome">
              <div className="home-page-welcome-title">ระบบยืม-คืนอุปกรณ์ฮาร์ดแวร์</div>
              <div className="home-page-welcome-subtitle">สำหรับนักศึกษาและบุคลากร</div>
            </div>

            <div className="home-page-hardware">
              <div className="home-page-hardware-title">อุปกรณ์ที่สามารถยืมได้</div>
              <ul className="home-page-hardware-list">
                <li className="home-page-hardware-list-item">• Arduino Boards และอุปกรณ์เสริม</li>
                <li className="home-page-hardware-list-item">• Sensors และ Modules ต่างๆ</li>
                <li className="home-page-hardware-list-item">• Raspberry Pi และอุปกรณ์ที่เกี่ยวข้อง</li>
                <li className="home-page-hardware-list-item">• เครื่องมือวัดและทดสอบ</li>
                <li className="home-page-hardware-list-item">• อุปกรณ์ประกอบการเรียนการสอน</li>
              </ul>
            </div>

            <div className="home-page-rules">
              <div className="home-page-rules-title">กฎในการยืมของ</div>
              <div className="home-page-rules-grid">
                {borrowingRules.map((rule, index) => (
                  <div key={index} className="home-page-rule">
                    <div className="home-page-rule-header">
                      <div>{rule.icon}</div>
                      <div className="home-page-rule-title">{rule.title}</div>
                    </div>
                    <div className="home-page-rule-description">{rule.description}</div>
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
