import { useState } from "react";
import { Trash2 } from "lucide-react";
import Sidebar from "../components/sidebar";
import Navbar from "../components/navbar";
import "./borrow-form.css";

const BorrowForm = () => {
  const [borrowedItems, setBorrowedItems] = useState([
    { id: 1, name: "Arduino Uno", quantity: 2 },
    { id: 2, name: "Raspberry Pi 4", quantity: 1 },
    { id: 3, name: "Breadboard", quantity: 3 },
  ]);

  const handleQuantityChange = (id, newQuantity) => {
    setBorrowedItems((items) =>
      items.map((item) => (item.id === id ? { ...item, quantity: Math.max(1, newQuantity) } : item))
    );
  };

  const handleRemoveItem = (id) => {
    setBorrowedItems((items) => items.filter((item) => item.id !== id));
  };

  const handleConfirmBorrow = () => {
    console.log("Confirming borrow:", borrowedItems);
  };

  return (
    <div className="page">
      <Sidebar />
      <div className="content">
        <Navbar />
        <div className="content-page">
          <div className="borrow-form">
            <h1>รายการยืมอุปกรณ์</h1>
            <div className="borrow-list">
              {borrowedItems.map((item) => (
                <div key={item.id} className="borrow-item">
                  <span className="item-name">{item.name}</span>
                  <div className="item-controls">
                    <button onClick={() => handleQuantityChange(item.id, item.quantity - 1)} className="quantity-btn">
                      -
                    </button>
                    <span className="item-quantity">{item.quantity}</span>
                    <button onClick={() => handleQuantityChange(item.id, item.quantity + 1)} className="quantity-btn">
                      +
                    </button>
                    <button onClick={() => handleRemoveItem(item.id)} className="remove-btn">
                      <Trash2 className="icon" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
            {borrowedItems.length > 0 ? (
              <div className="action-buttons">
                <button onClick={handleConfirmBorrow} className="confirm-btn">
                  ยืนยันการยืม
                </button>
              </div>
            ) : (
              <p className="empty-message">ไม่มีรายการยืมอุปกรณ์</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BorrowForm;
