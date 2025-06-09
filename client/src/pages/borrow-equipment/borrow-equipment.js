import { useState } from "react";
import Sidebar from "../../components/sidebar";
import Navbar from "../../components/navbar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHandHolding, faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import "./borrow-equipment.css";
import "../../styles/layout.css";
import hardwareData from "../../mockData/hardwareData";
import { getCurrentUser } from "../../helpers/helper";
import BorrowDialog from "../../components/borrow-dialog";

const BorrowEquipment = () => {
  const [selectedCategory, setSelectedCategory] = useState("ทั้งหมด");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedItem, setSelectedItem] = useState(null);

  const currentUser = getCurrentUser();
  const { role } = currentUser || {};

  const itemsPerPage = 10;
  const categories = ["ทั้งหมด", ...new Set(hardwareData.map((item) => item.category))];
  const filteredData =
    selectedCategory === "ทั้งหมด" ? hardwareData : hardwareData.filter((item) => item.category === selectedCategory);

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const paginatedData = filteredData.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
    setCurrentPage(1);
  };

  const handlePageChange = (direction) => {
    setCurrentPage((prevPage) =>
      direction === "next" ? Math.min(prevPage + 1, totalPages) : Math.max(prevPage - 1, 1),
    );
  };

  const handleBorrow = (item) => {
    setSelectedItem(item);
  };

  const [isSidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="page-container">
      <Navbar onToggleSidebar={() => setSidebarOpen(!isSidebarOpen)} />
      <Sidebar isOpen={isSidebarOpen} onClose={() => setSidebarOpen(false)} />
      <div className="page-content">
        <div className="borrow-equipment-content">
          <div className="borrow-equipment-content-page">
            <div className="borrow-equipment-content-header">
              <h2 className="borrow-equipment-title">ยืมอุปกรณ์</h2>
              <p>จำนวนอุปกรณ์ทั้งหมด: {filteredData.length} รายการ</p>
              <div className="borrow-equipment-category-filter">
                <label htmlFor="category-dropdown">หมวดหมู่:</label>
                <select id="category-dropdown" value={selectedCategory} onChange={handleCategoryChange}>
                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="borrow-equipment-content-table">
              <table className="borrow-equipment-table">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>หมวดหมู่</th>
                    <th>ชื่ออุปกรณ์</th>
                    <th>จำนวนทั้งหมด</th>
                    <th>จำนวนที่เหลือ</th>
                    <th>ราคา/หน่วย</th>
                    <th>ยืม</th>
                    {role !== "user" && <th>การจัดการ</th>}
                  </tr>
                </thead>
                <tbody>
                  {paginatedData.map((item, index) => (
                    <tr key={item.id}>
                      <td>{(currentPage - 1) * itemsPerPage + index + 1}</td>
                      <td>{item.category}</td>
                      <td>{item.deviceName}</td>
                      <td>{item.totalQuantity}</td>
                      <td>{item.totalQuantity - item.borrowedQuantity}</td>
                      <td>{item.pricePerUnit} บาท</td>
                      <td>
                        <button className="borrow-equipment-btn borrow-equipment-btn-success" onClick={() => handleBorrow(item)}>
                          <FontAwesomeIcon icon={faHandHolding} /> ยืม
                        </button>
                      </td>
                      {role !== "user" && (
                        <td>
                          <div className="borrow-equipment-actions-cell">
                            <button className="borrow-equipment-btn borrow-equipment-btn-edit">
                              <FontAwesomeIcon icon={faEdit} />
                            </button>
                            <button className="borrow-equipment-btn borrow-equipment-btn-delete">
                              <FontAwesomeIcon icon={faTrash} />
                            </button>
                          </div>
                        </td>
                      )}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="borrow-equipment-pagination">
              <button 
                className="borrow-equipment-pagination-button" 
                onClick={() => handlePageChange("prev")} 
                disabled={currentPage === 1}
              >
                ก่อนหน้า
              </button>
              <span>
                หน้า {currentPage} จาก {totalPages}
              </span>
              <button 
                className="borrow-equipment-pagination-button" 
                onClick={() => handlePageChange("next")} 
                disabled={currentPage === totalPages}
              >
                ถัดไป
              </button>
            </div>
          </div>
        </div>
      </div>
      {selectedItem && <BorrowDialog item={selectedItem} onClose={() => setSelectedItem(null)} onConfirm={() => {}} />}
    </div>
  );
};

export default BorrowEquipment;
