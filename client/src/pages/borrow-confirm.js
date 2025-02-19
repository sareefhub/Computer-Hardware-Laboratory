import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import Sidebar from "../components/sidebar";
import Navbar from "../components/navbar";
import { getCurrentUser } from "../helpers/helper";
import { getBorrowedItems, deleteBorrowedItem } from "../api/borrowedItemsApi";
import { getBorrowHistory } from "../api/borrowHistoryApi";
import { addBorrowHistory } from "../api/borrowHistoryApi";
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

    console.log("Selected Items: ", selectedItems);  // ดีบั๊กเพื่อดูค่า selectedItems

    const currentUser = getCurrentUser();
    const confirmedItems = borrowedItems.filter(item => selectedItems.includes(item.id));

    try {
      // ดึงประวัติการยืมทั้งหมดของผู้ใช้
      const borrowHistory = await getBorrowHistory();
      console.log("Borrow History: ", borrowHistory);  // ดีบั๊กเพื่อดูข้อมูลจาก API

      const userHistory = borrowHistory.filter(item => item.username === currentUser.username);
      const serialNumber = userHistory.length + 1;  // เพิ่ม 1 สำหรับการยืมครั้งถัดไป

      for (const item of confirmedItems) {
        const historyEntry = {
          ...item,
          serialNumber: `${currentUser.username}-${serialNumber}`,
          borrowDate: new Date().toISOString(),
          username: currentUser.username,
        };

        await addBorrowHistory(historyEntry);  // 📌 บันทึกประวัติการยืม
        await deleteBorrowedItem(item.id); // 📌 ลบออกจาก borrowedItems
      }

      // อัปเดต UI
      setBorrowedItems((prevItems) => prevItems.filter(item => !selectedItems.includes(item.id)));
      setSelectedItems([]);
      onConfirmBorrow(confirmedItems);

      alert("✅ ยืนยันการยืมเรียบร้อยแล้ว!");
    } catch (error) {
      console.error("❌ Error confirming borrow:", error);
    }
  };

  return (
    <div className="page">
      <Sidebar />
      <div className="content">
        <Navbar />
        <div className="content-page">
          <div className="borrow-form">
            <h1>ยืนยันการยืม</h1>
            <table className="borrow-table">
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
                          className="btn btn-danger btn-action"
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
                <button onClick={handleConfirmBorrow} className="confirm-btn">
                  ยืนยันการยืม
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BorrowConfirm;
