import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import Sidebar from "../components/sidebar";
import Navbar from "../components/navbar";
import { getCurrentUser } from "../helpers/helper";
import { getBorrowedItems, deleteBorrowedItem } from "../services/borrowedItemsApi";
import { getBorrowHistory } from "../services/borrowHistoryApi";
import { addBorrowHistory } from "../services/borrowHistoryApi";
import "./borrow-confirm.css";

const BorrowConfirm = ({ onRemoveItem = () => {}, onConfirmBorrow = () => {} }) => {
  const [borrowedItems, setBorrowedItems] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const currentUser = getCurrentUser();
      if (currentUser) {
        const items = await getBorrowedItems();
        const filteredItems = items.filter(item => item.borrowerName === currentUser.username);
        setBorrowedItems(filteredItems);
      }
    };
    fetchData();
  }, []);

  const handleSelectItem = (id) => {
    setSelectedItems((prevSelectedItems) => 
      prevSelectedItems.includes(id)
        ? prevSelectedItems.filter((itemId) => itemId !== id)
        : [...prevSelectedItems, id]
    );
  };

  const handleRemoveItem = async (id) => {
    const success = await deleteBorrowedItem(id);
    if (success) {
      setBorrowedItems((prevItems) => prevItems.filter(item => item.id !== id));
      onRemoveItem(id);
    }
  };

  const handleConfirmBorrow = async () => {
    if (selectedItems.length === 0) {
      alert("⚠️ กรุณาเลือกอุปกรณ์ที่ต้องการยืนยัน!");
      return;
    }

    const currentUser = getCurrentUser();
    const confirmedItems = borrowedItems.filter(item => selectedItems.includes(item.id));

    try {
      const borrowHistory = await getBorrowHistory();
      const userHistory = borrowHistory.filter(item => item.username === currentUser.username);
      const serialNumber = userHistory.length + 1;

      for (const item of confirmedItems) {
        const historyEntry = {
          ...item,
          serialNumber: `${currentUser.username}-${serialNumber}`,
          borrowDate: new Date().toISOString(),
          username: currentUser.username,
        };

        await addBorrowHistory(historyEntry); 
        await deleteBorrowedItem(item.id);
      }

      setBorrowedItems((prevItems) => prevItems.filter(item => !selectedItems.includes(item.id)));
      setSelectedItems([]);
      onConfirmBorrow(confirmedItems);
      alert("✅ ยืนยันการยืมเรียบร้อยแล้ว!");
    } catch (error) {
      console.error("❌ Error confirming borrow:", error);
    }
  };

  return (
    <div className="borrow-confirm-page">
      <div className="borrow-confirm-navbar">
        <Navbar />
      </div>
      <div className="borrow-confirm-body">
        <div className="borrow-confirm-sidebar">
          <Sidebar />
        </div>
        <div className="borrow-confirm-content">
          <div className="borrow-confirm-content-page">
            <div className="borrow-confirm-content-header">
              <h2 className="borrow-confirm-page-title">ยืนยันการยืม</h2>
            </div>
            <div className="borrow-confirm-content-table">
              <table className="borrow-confirm-table">
                <thead>
                  <tr>
                    <th>เลือก</th>
                    <th>วิชา</th>
                    <th>หมวดหมู่</th>
                    <th>ชื่ออุปกรณ์</th>
                    <th>จำนวนที่ยืม</th>
                    <th>วันที่ยืม</th>
                    <th>เวลา</th>
                    <th>วันที่คืน</th>
                    <th>การกระทำ</th>
                  </tr>
                </thead>
                <tbody>
                  {borrowedItems.length > 0 ? (
                    borrowedItems.map((item) => (
                      <tr key={item.id}>
                        <td>
                          <input
                            type="checkbox"
                            checked={selectedItems.includes(item.id)}
                            onChange={() => handleSelectItem(item.id)}
                          />
                        </td>
                        <td>{item.subject}</td>
                        <td>{item.category}</td>
                        <td>{item.deviceName}</td>
                        <td>{item.borrowQuantity}</td>
                        <td>{item.borrowDate}</td>
                        <td>{item.borrowTime}</td>
                        <td>{item.returnDate}</td>
                        <td>
                          <button
                            onClick={() => handleRemoveItem(item.id)}
                            className="borrow-confirm-btn-danger"
                          >
                            <FontAwesomeIcon icon={faTrash} />
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="9" className="empty-message">
                        ไม่มีรายการยืมอุปกรณ์
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
              {borrowedItems.length > 0 && (
                <div className="action-buttons">
                  <button onClick={handleConfirmBorrow} className="borrow-confirm-btn-success">
                    ยืนยันการยืม
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BorrowConfirm;
