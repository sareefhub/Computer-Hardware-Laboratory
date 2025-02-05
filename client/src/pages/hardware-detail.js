import { useParams } from "react-router-dom"
import { ArrowLeft, FileText, Youtube, ImageIcon } from 'lucide-react'
import hardwareData from "../mockData/hardwareData"
import Sidebar from "../components/sidebar"
import Navbar from "../components/navbar"
import "./hardware-detail.css"

const HardwareDetail = () => {
  const { id } = useParams()
  const hardware = hardwareData.find((item) => item.id === Number.parseInt(id))

  // Sample data - In real app, this would come from your database
  const sampleHardware = {
    ...hardware,
    images: ["/placeholder.svg?height=300&width=400", "/placeholder.svg?height=300&width=400"],
    tutorial: {
      videoUrl: "https://www.youtube.com/embed/example",
      description: "วิธีการใช้งานอุปกรณ์อย่างละเอียด",
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
        <h2>Item not found!</h2>
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
            {/* Back Button */}
            <button onClick={() => window.history.back()} className="back-btn">
              ← Back
            </button>

            <div className="hardware-content">
              {/* Main Content Area */}
              <div className="main-content">
                {/* Hardware Info Card */}
                <div className="hardware-info">
                  <h2>{hardware.deviceName}</h2>
                  <div className="info-grid">
                    <div className="info-item">
                      <label>Category:</label>
                      <span>{hardware.category}</span>
                    </div>
                    <div className="info-item">
                      <label>Total Quantity:</label>
                      <span>{hardware.totalQuantity}</span>
                    </div>
                    <div className="info-item">
                      <label>Borrowed Quantity:</label>
                      <span>{hardware.borrowedQuantity}</span>
                    </div>
                    <div className="info-item">
                      <label>Remaining Quantity:</label>
                      <span>{hardware.totalQuantity - hardware.borrowedQuantity}</span>
                    </div>
                    <div className="info-item">
                      <label>Price per Unit:</label>
                      <span>${hardware.pricePerUnit.toFixed(2)}</span>
                    </div>
                  </div>
                </div>

                {/* Hardware Images */}
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
                        alt={`${hardware.deviceName} view ${index + 1}`}
                        className="device-image"
                      />
                    ))}
                  </div>
                </div>
              </div>

              {/* Sidebar Content */}
              <div className="side-content">
                {/* Datasheet Section */}
                {sampleHardware.datasheet && (
                  <div className="datasheet-section">
                    <div className="section-header">
                      <FileText className="section-icon" />
                      <h3>Datasheet</h3>
                    </div>
                    <div className="datasheet-content">
                      <div className="datasheet-info">
                        <span className="datasheet-name">{sampleHardware.datasheet.name}</span>
                        <span className="datasheet-size">{sampleHardware.datasheet.size}</span>
                      </div>
                      <a href={sampleHardware.datasheet.url} className="download-btn" target="_blank" rel="noopener noreferrer">
                        Download
                      </a>
                    </div>
                  </div>
                )}

                {/* Tutorial Section */}
                {sampleHardware.tutorial && (
                  <div className="tutorial-section">
                    <div className="section-header">
                      <Youtube className="section-icon" />
                      <h3>วิธีการใช้งาน</h3>
                    </div>
                    {sampleHardware.tutorial.videoUrl && (
                      <div className="video-container">
                        <iframe
                          src={sampleHardware.tutorial.videoUrl}
                          title="Tutorial Video"
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
