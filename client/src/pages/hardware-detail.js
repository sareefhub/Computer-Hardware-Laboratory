import { useParams } from "react-router-dom"
import { ArrowLeft, FileText, Youtube, ImageIcon } from 'lucide-react'
import hardwareData from "../mockData/hardwareData"
import Sidebar from "../components/sidebar"
import Navbar from "../components/navbar"
import "./hardware-detail.css"

const HardwareDetail = () => {
  const { id } = useParams()
  const hardware = hardwareData.find((item) => item.id === Number.parseInt(id))

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
  }

  if (!hardware) {
    return (
      <div className="not-found">
        <h2>ไม่พบอุปกรณ์!</h2>
      </div>
    )
  }

  return (
    <div className="page">
      <Sidebar />
      <div className="content">
        <Navbar />
        <div className="content-page">
          <div className="hardware-detail">
            {/* ปุ่มย้อนกลับ */}
            <button onClick={() => window.history.back()} className="back-btn">
              ← กลับ
            </button>

            <div className="hardware-content">
              {/* ส่วนเนื้อหาหลัก */}
              <div className="main-content">
                {/* ข้อมูลอุปกรณ์ */}
                <div className="hardware-info">
                  <h2>{hardware.deviceName}</h2>
                  <div className="info-grid">
                    <div className="info-item">
                      <label>หมวดหมู่:</label>
                      <span>{hardware.category}</span>
                    </div>
                    <div className="info-item">
                      <label>จำนวนทั้งหมด:</label>
                      <span>{hardware.totalQuantity}</span>
                    </div>
                    <div className="info-item">
                      <label>จำนวนที่ถูกยืม:</label>
                      <span>{hardware.borrowedQuantity}</span>
                    </div>
                    <div className="info-item">
                      <label>จำนวนคงเหลือ:</label>
                      <span>{hardware.totalQuantity - hardware.borrowedQuantity}</span>
                    </div>
                    <div className="info-item">
                      <label>ราคาต่อหน่วย:</label>
                      <span>{hardware.pricePerUnit.toFixed(2)} บาท</span>
                    </div>
                  </div>
                </div>

                {/* รูปภาพอุปกรณ์ */}
                <div className="hardware-images">
                  <div className="section-header">
                    <ImageIcon className="section-icon" />
                    <h3>รูปภาพอุปกรณ์</h3>
                  </div>
                  <div className="image-grid">
                    {sampleHardware.images.map((img, index) => (
                      <img
                        key={index}
                        src={img || "/placeholder.svg"}
                        alt={`${hardware.deviceName} รูปที่ ${index + 1}`}
                        className="device-image"
                      />
                    ))}
                  </div>
                </div>
              </div>

              {/* ส่วนข้อมูลด้านข้าง */}
              <div className="side-content">
                {/* ส่วน Datasheet */}
                {sampleHardware.datasheet && (
                  <div className="datasheet-section">
                    <div className="section-header">
                      <FileText className="section-icon" />
                      <h3>เอกสาร Datasheet</h3>
                    </div>
                    <div className="datasheet-content">
                      <div className="datasheet-info">
                        <span className="datasheet-name">{sampleHardware.datasheet.name}</span>
                        <span className="datasheet-size">{sampleHardware.datasheet.size}</span>
                      </div>
                      <a href={sampleHardware.datasheet.url} className="download-btn" target="_blank" rel="noopener noreferrer">
                        ดาวน์โหลด
                      </a>
                    </div>
                  </div>
                )}

                {/* ส่วนวิดีโอแนะนำการใช้งาน */}
                {sampleHardware.tutorial && (
                  <div className="tutorial-section">
                    <div className="section-header">
                      <Youtube className="section-icon" />
                      <h3>วิดีโอแนะนำการใช้งาน</h3>
                    </div>
                    {sampleHardware.tutorial.videoUrl && (
                      <div className="video-container">
                        <iframe
                          src={sampleHardware.tutorial.videoUrl}
                          title="วิดีโอแนะนำการใช้งาน"
                          frameBorder="0"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                        ></iframe>
                      </div>
                    )}
                    <p className="tutorial-description">
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
  )
}

export default HardwareDetail
