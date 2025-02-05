import { useState } from "react";
import "./borrow-dialog.css";

const BorrowDialog = ({ item, onClose, onConfirm }) => {
  const [quantity, setQuantity] = useState(1);
  const maxQuantity = item.totalQuantity - item.borrowedQuantity;

  const handleSubmit = (e) => {
    e.preventDefault();
    onConfirm({
      ...item,
      borrowQuantity: quantity,
      borrowDate: new Date().toISOString(),
    });
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
            <p className="category">หมวดหมู่: {item.category}</p>
            <p className="available">จำนวนที่สามารถยืมได้: {maxQuantity} ชิ้น</p>

            <form onSubmit={handleSubmit}>
              <div className="quantity-control">
                <label>จำนวนที่ต้องการยืม:</label>
                <div className="quantity-input">
                  <button type="button" onClick={() => setQuantity((q) => Math.max(1, q - 1))} disabled={quantity <= 1}>
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

              <div className="borrow-action-buttons">
                <button type="button" className="borrow-cancel-btn" onClick={onClose}>
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
