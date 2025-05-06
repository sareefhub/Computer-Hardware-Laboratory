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
              <h1>ระบบยืม-คืนอุปกรณ์ฮาร์ดแวร์</h1>
              <p>สำหรับนักศึกษาและบุคลากร</p>
            </div>

            <div className="home-hardware">
              <h2>อุปกรณ์ที่สามารถยืมได้</h2>
              <ul>
                <li>• Arduino Boards และอุปกรณ์เสริม</li>
                <li>• Sensors และ Modules ต่างๆ</li>
                <li>• Raspberry Pi และอุปกรณ์ที่เกี่ยวข้อง</li>
                <li>• เครื่องมือวัดและทดสอบ</li>
                <li>• อุปกรณ์ประกอบการเรียนการสอน</li>
              </ul>
            </div>

            <div className="home-rules">
              <h2>กฎในการยืมของ</h2>
              <div className="home-rules-grid">
                {borrowingRules.map((rule, index) => (
                  <div key={index} className="home-rule">
                    <div className="home-rule-header">
                      <div>{rule.icon}</div>
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
