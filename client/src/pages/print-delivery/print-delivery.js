import { useState } from "react";
import Sidebar from "../../components/sidebar";
import Navbar from "../../components/navbar";
import "./print-delivery.css";
import "../../styles/layout.css";

const mockDeliveries = [
  {
    id: 1,
    deliveryCode: "DL-001",
    deviceName: "Arduino UNO",
    quantity: 2,
    receiver: "คุณสมชาย",
    date: "2025-07-25",
  },
  {
    id: 2,
    deliveryCode: "DL-002",
    deviceName: "Raspberry Pi 4",
    quantity: 1,
    receiver: "คุณวิภา",
    date: "2025-07-26",
  },
];

const PrintDelivery = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="page-container">
      <Navbar onToggleSidebar={() => setSidebarOpen(!isSidebarOpen)} />
      <Sidebar isOpen={isSidebarOpen} onClose={() => setSidebarOpen(false)} />
      <div className="page-content">
        <div className="print-delivery-content">
          <div className="print-delivery-content-page">
            <div className="print-delivery-header">
              <h2 className="print-delivery-title">รายการส่งมอบอุปกรณ์</h2>
              <button className="print-delivery-print-btn" onClick={() => window.print()}>
                พิมพ์หน้านี้
              </button>
            </div>
            <table className="print-delivery-table">
              <thead>
                <tr>
                  <th>#</th>
                  <th>รหัสส่งมอบ</th>
                  <th>ชื่ออุปกรณ์</th>
                  <th>จำนวน</th>
                  <th>ผู้รับ</th>
                  <th>วันที่ส่ง</th>
                </tr>
              </thead>
              <tbody>
                {mockDeliveries.map((item, index) => (
                  <tr key={item.id}>
                    <td>{index + 1}</td>
                    <td>{item.deliveryCode}</td>
                    <td>{item.deviceName}</td>
                    <td>{item.quantity}</td>
                    <td>{item.receiver}</td>
                    <td>{item.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrintDelivery;
