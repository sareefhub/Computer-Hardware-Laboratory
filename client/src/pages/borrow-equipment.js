import React, { useState } from 'react';
import Sidebar from '../components/sidebar';
import Navbar from '../components/navbar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash, faHandshake } from '@fortawesome/free-solid-svg-icons';
import './borrow-equipment.css';
import hardwareData from '../mockData/hardwareData';
import { getCurrentUser } from '../helpers/helper'; // ดึงข้อมูลผู้ใช้

const BorrowEquipment = () => {
  const [selectedCategory, setSelectedCategory] = useState('ทั้งหมด');
  const [currentPage, setCurrentPage] = useState(1);

  const currentUser = getCurrentUser();  // ดึงข้อมูลผู้ใช้
  const { role } = currentUser || {};    // ดึงบทบาท (admin/user)

  const itemsPerPage = 5;
  const categories = ['ทั้งหมด', ...new Set(hardwareData.map(item => item.category))];
  const filteredData = selectedCategory === 'ทั้งหมด' ? hardwareData : hardwareData.filter(item => item.category === selectedCategory);
  
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const paginatedData = filteredData.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
    setCurrentPage(1);
  };

  const handlePageChange = (direction) => {
    setCurrentPage(prevPage => direction === 'next' ? Math.min(prevPage + 1, totalPages) : Math.max(prevPage - 1, 1));
  };

  const handleBorrow = (id) => {
    console.log("ยืมอุปกรณ์ที่มี ID:", id);
  };

  return (
    <div className="page">
      <Sidebar />
      <div className="content">
        <Navbar />
        <div className="content-page">
          <div className="content-header">
            <h2 className="page-title">ยืมอุปกรณ์</h2>
            <p>จำนวนอุปกรณ์ทั้งหมด: {filteredData.length} รายการ</p>
            <div className="category-filter">
              <label htmlFor="category-dropdown">หมวดหมู่:</label>
              <select id="category-dropdown" value={selectedCategory} onChange={handleCategoryChange}>
                {categories.map(category => <option key={category} value={category}>{category}</option>)}
              </select>
            </div>
          </div>
          <div className="content-table">
            <table>
              <thead>
                <tr>
                  <th>#</th><th>หมวดหมู่</th><th>ชื่ออุปกรณ์</th>
                  <th>จำนวนที่เหลือ</th><th>ยืม</th>
                  {role !== 'user' && <th>การจัดการ</th>}  {/* ซ่อนการจัดการถ้าเป็น User */}
                </tr>
              </thead>
              <tbody>
                {paginatedData.map((item, index) => (
                  <tr key={item.id}>
                    <td>{(currentPage - 1) * itemsPerPage + index + 1}</td>
                    <td>{item.category}</td>
                    <td>{item.deviceName}</td>
                    <td>{item.totalQuantity - item.borrowedQuantity}</td>
                    <td>
                      <button className="btn btn-success" onClick={() => handleBorrow(item.id)}>
                        <FontAwesomeIcon icon={faHandshake} /> ยืม
                      </button>
                    </td>
                    {role !== 'user' && (  // ซ่อนการจัดการถ้าเป็น User
                      <td>
                        <div className="actions-container">
                          <button className="btn btn-warning"><FontAwesomeIcon icon={faEdit} /></button>
                          <button className="btn btn-danger"><FontAwesomeIcon icon={faTrash} /></button>
                        </div>
                      </td>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="pagination">
            <button onClick={() => handlePageChange('prev')} disabled={currentPage === 1}>ก่อนหน้า</button>
            <span>หน้า {currentPage} จาก {totalPages}</span>
            <button onClick={() => handlePageChange('next')} disabled={currentPage === totalPages}>ถัดไป</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BorrowEquipment;
