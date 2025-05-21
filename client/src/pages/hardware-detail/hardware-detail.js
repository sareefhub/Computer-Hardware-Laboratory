import { useParams } from "react-router-dom";
import { FileText, Youtube, ImageIcon } from 'lucide-react';
import hardwareData from "../../mockData/hardwareData";
import Sidebar from "../../components/sidebar";
import Navbar from "../../components/navbar";
import "./hardware-detail.css";

const HardwareDetail = () => {
  const { id } = useParams();
  const hardware = hardwareData.find((item) => item.id === Number.parseInt(id));

  // ข้อมูลตัวอย่าง - ในระบบจริง ควรดึงข้อมูลจากฐานข้อมูล
  const sampleHardware = {
    ...hardware,
    images: ["/placeholder.svg?height=300&width=400", "/placeholder.svg?height=300&width=400"],
    tutorial: {
      videoUrl: "https://www.youtube.com/embed/example",
      description: "คำแนะนำการใช้งานอุปกรณ์โดยละเอียด",
    },
    datasheet: {
      url: "example.pdf",
      name: "Arduino_UNO_Datasheet.pdf",
      size: "2.4 MB"
    }
  };

  if (!hardware) {
    return (
      <div className="hardware-detail-not-found">
        <h2>ไม่พบอุปกรณ์!</h2>
      </div>
    );
  }

  return (
    <div className="hardware-detail-page">
      <div className="hardware-detail-navbar">
        <Navbar />
      </div>
      <div className="hardware-detail-body">
        <div className="hardware-detail-sidebar">
          <Sidebar />
        </div>
        <div className="hardware-detail-content">
          <div className="hardware-detail-content-page">
            <div className="hardware-detail-header">
              <h2 className="hardware-detail-title">รายละเอียดอุปกรณ์</h2>
              <button className="hardware-detail-back-btn" onClick={() => window.history.back()}>
                ← กลับ
              </button>
            </div>
            <div className="hardware-detail-wrapper">
              <div className="hardware-detail-content-main">
                {/* ข้อมูลอุปกรณ์ */}
                <div className="hardware-detail-info">
                  <h2>{hardware.deviceName}</h2>
                  <div className="hardware-info-grid">
                    <div className="hardware-info-item">
                      <label>หมวดหมู่:</label>
                      <span>{hardware.category}</span>
                    </div>
                    <div className="hardware-info-item">
                      <label>จำนวนทั้งหมด:</label>
                      <span>{hardware.totalQuantity}</span>
                    </div>
                    <div className="hardware-info-item">
                      <label>จำนวนที่ถูกยืม:</label>
                      <span>{hardware.borrowedQuantity}</span>
                    </div>
                    <div className="hardware-info-item">
                      <label>จำนวนคงเหลือ:</label>
                      <span>{hardware.totalQuantity - hardware.borrowedQuantity}</span>
                    </div>
                    <div className="hardware-info-item">
                      <label>ราคาต่อหน่วย:</label>
                      <span>{hardware.pricePerUnit.toFixed(2)} บาท</span>
                    </div>
                  </div>
                </div>

                {/* รูปภาพอุปกรณ์ */}
                <div className="hardware-detail-images">
                  <div className="hardware-section-header">
                    <ImageIcon className="hardware-section-icon" />
                    <h3>รูปภาพอุปกรณ์</h3>
                  </div>
                  <div className="hardware-image-grid">
                    {sampleHardware.images.map((img, index) => (
                      <img
                        key={index}
                        src={img || "/placeholder.svg"}
                        alt={`${hardware.deviceName} รูปที่ ${index + 1}`}
                        className="hardware-device-image"
                      />
                    ))}
                  </div>
                </div>
              </div>

              {/* ส่วนข้อมูลด้านข้าง */}
              <div className="hardware-detail-side-content">
                {/* Datasheet */}
                {sampleHardware.datasheet && (
                  <div className="hardware-datasheet-section">
                    <div className="hardware-section-header">
                      <FileText className="hardware-section-icon" />
                      <h3>เอกสาร Datasheet</h3>
                    </div>
                    <div className="hardware-datasheet-content">
                      <div className="hardware-datasheet-info">
                        <span className="hardware-datasheet-name">{sampleHardware.datasheet.name}</span>
                        <span className="hardware-datasheet-size">{sampleHardware.datasheet.size}</span>
                      </div>
                      <a href={sampleHardware.datasheet.url} className="hardware-download-btn" target="_blank" rel="noopener noreferrer">
                        ดาวน์โหลด
                      </a>
                    </div>
                  </div>
                )}

                {/* Tutorial Section */}
                {sampleHardware.tutorial && (
                  <div className="hardware-tutorial-section">
                    <div className="hardware-section-header">
                      <Youtube className="hardware-section-icon" />
                      <h3>วิดีโอแนะนำการใช้งาน</h3>
                    </div>
                    {sampleHardware.tutorial.videoUrl && (
                      <div className="hardware-video-container">
                        <iframe
                          src={sampleHardware.tutorial.videoUrl}
                          title="วิดีโอแนะนำการใช้งาน"
                          frameBorder="0"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                        ></iframe>
                      </div>
                    )}
                    <p className="hardware-tutorial-description">
                      {sampleHardware.tutorial.description}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HardwareDetail;
