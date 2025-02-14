import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import Sidebar from "../components/sidebar";
import Navbar from "../components/navbar";
import { getCurrentUser } from "../helpers/helper";
import "./borrow-confirm.css";

const getBorrowedItems = () => {
  return JSON.parse(localStorage.getItem("borrowedItems")) || [];
};

const BorrowConfirm = ({ onRemoveItem = () => {}, onConfirmBorrow = () => {} }) => {
  const [borrowedItems, setBorrowedItems] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);

  useEffect(() => {
    const currentUser = getCurrentUser();
    if (currentUser) {
      const items = getBorrowedItems();
      const filteredItems = items.filter(item => item.borrowerName === currentUser.username);
      setBorrowedItems(filteredItems);
    }
  }, []);

  const handleSelectItem = (id) => {
    setSelectedItems((prevSelectedItems) => {
      return prevSelectedItems.includes(id)
        ? prevSelectedItems.filter((itemId) => itemId !== id)
        : [...prevSelectedItems, id];
    });
  };

  const handleRemoveItem = (id) => {
    console.log("onRemoveItem:", onRemoveItem);
    const updatedItems = borrowedItems.filter(item => item.id !== id);
    setBorrowedItems(updatedItems);
    localStorage.setItem("borrowedItems", JSON.stringify(updatedItems));
    onRemoveItem(id);
  };

  const handleConfirmBorrow = () => {
    const confirmedItems = borrowedItems.filter((item) => selectedItems.includes(item.id));
    onConfirmBorrow(confirmedItems);
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
