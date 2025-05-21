import { useState, useEffect, useRef } from "react";
import { addBorrowedItem } from "../hooks/borrowedItemsApi"; // Import API function
import "./borrow-dialog.css";

const getCurrentUser = () => {
  const currentUser = localStorage.getItem("currentUser");
  return currentUser ? JSON.parse(currentUser) : null;
};

const BorrowDialog = ({ item, onClose, onConfirm }) => {
  const [quantity, setQuantity] = useState(1);
  const [borrowerName, setBorrowerName] = useState("");
  const [selectedSubject, setSelectedSubject] = useState("Lab");
  const [userId, setUserId] = useState(null);
  const maxQuantity = item.totalQuantity - item.borrowedQuantity;

  const isSubmitting = useRef(false);

  useEffect(() => {
    const currentUser = getCurrentUser();
    if (currentUser) {
      setBorrowerName(currentUser.username);
      setUserId(currentUser.id);
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isSubmitting.current) return;

    isSubmitting.current = true;

    const returnDate = new Date();
    returnDate.setDate(returnDate.getDate() + 7);

    const borrowData = {
      id: item.id,
      userId,
      borrowerName,
      borrowQuantity: quantity,
      borrowDate: new Date().toLocaleDateString(),
      borrowTime: new Date().toLocaleTimeString(),
      returnDate: returnDate.toLocaleDateString(),
      subject: selectedSubject,
      deviceName: item.deviceName,
      category: item.category,
    };

    // เพิ่มข้อมูลการยืมใหม่ไปยัง json-server
    await addBorrowedItem(borrowData);

    // ส่งข้อมูลไปที่ onConfirm (ครั้งเดียว)
    onConfirm(borrowData);

    // ปิด dialog
    onClose();

    isSubmitting.current = false;
  };

  return (
    <div className="borrow-dialog-overlay">
      <div className="borrow-dialog">
        <div className="borrow-dialog-header">
          <h2>รายการอุปกรณ์ที่จะยืม</h2>
          <button className="close-btn" onClick={onClose}>
            &times;
          </button>
        </div>

        <div className="borrow-dialog-content">
          <div className="item-image">
            <img src={item.imageUrl || "/placeholder.svg"} alt={item.deviceName} />
          </div>

          <div className="item-details">
            <h3>{item.deviceName}</h3>
            <p>ชื่อผู้ยืม: {borrowerName}</p>
            <p>หมวดหมู่: {item.category}</p>
            <p>จำนวนที่สามารถยืมได้: {maxQuantity} ชิ้น</p>

            <form onSubmit={handleSubmit}>
              <div className="quantity-control">
                <label>จำนวนที่ต้องการยืม:</label>
                <div className="quantity-input">
                  <button
                    type="button"
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    disabled={quantity <= 1}
                  >
                    -
                  </button>
                  <input
                    type="number"
                    value={quantity}
                    onChange={(e) =>
                      setQuantity(Math.min(maxQuantity, Math.max(1, Number.parseInt(e.target.value) || 1)))
                    }
                    min="1"
                    max={maxQuantity}
                  />
                  <button
                    type="button"
                    onClick={() => setQuantity((q) => Math.min(maxQuantity, q + 1))}
                    disabled={quantity >= maxQuantity}
                  >
                    +
                  </button>
                </div>
              </div>

              <div className="borrower-info">
                <label>วิชา:</label>
                <select value={selectedSubject} onChange={(e) => setSelectedSubject(e.target.value)}>
                  <option value="Lab">Lab</option>
                  <option value="Assignment">Assignment</option>
                  <option value="Project">Project</option>
                </select>
              </div>

              <div className="borrow-action-buttons">
                <button type="button" onClick={onClose} className="borrow-cancel-btn">
                  ยกเลิก
                </button>
                <button type="submit" className="borrow-confirm-btn">
                  เพิ่มไปยังรายการยืม
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BorrowDialog;
