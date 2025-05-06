import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';  
import Sidebar from '../components/sidebar';
import Navbar from '../components/navbar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash, faEye } from '@fortawesome/free-solid-svg-icons';
import './hardware-list.css';
import hardwareData from '../mockData/hardwareData';
import { getCurrentUser } from '../helpers/helper'; // ดึงข้อมูลผู้ใช้

const HardwareList = () => {
  // State สำหรับการกรองหมวดหมู่และการจัดการหน้า
  const [selectedCategory, setSelectedCategory] = useState('ทั้งหมด');
  const [currentPage, setCurrentPage] = useState(1);
  const navigate = useNavigate();  

  // ดึงข้อมูลผู้ใช้
  const currentUser = getCurrentUser();  
  const { role } = currentUser || {};    // ดึงบทบาท (admin/user)

  const itemsPerPage = 5;  // จำนวนรายการที่แสดงในแต่ละหน้า
  const categories = ['ทั้งหมด', ...new Set(hardwareData.map(item => item.category))];  // การกรองหมวดหมู่จากข้อมูล
  const filteredData = selectedCategory === 'ทั้งหมด' ? hardwareData : hardwareData.filter(item => item.category === selectedCategory); // การกรองข้อมูลตามหมวดหมู่ที่เลือก
  const totalPages = Math.ceil(filteredData.length / itemsPerPage); // คำนวณจำนวนหน้า
  const paginatedData = filteredData.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage); // ข้อมูลที่แสดงในแต่ละหน้า

  // ฟังก์ชันสำหรับเปลี่ยนหมวดหมู่
  const handleCategoryChange = (e) => setSelectedCategory(e.target.value);

  // ฟังก์ชันสำหรับเปลี่ยนหน้า
  const handlePageChange = (direction) => setCurrentPage(prevPage => direction === 'next' ? Math.min(prevPage + 1, totalPages) : Math.max(prevPage - 1, 1));

  // ฟังก์ชันสำหรับการดูรายละเอียดอุปกรณ์
  const handleViewDetails = (id) => navigate(`/hardware-detail/${id}`);

  return (
    <div className="hardware-list-page">
      <div className="hardware-list-navbar">
        <Navbar />
      </div>
      <div className="hardware-list-body">
        <div className="hardware-list-sidebar">
          <Sidebar />
        </div>
        <div className="hardware-list-content">
          <div className="hardware-list-content-page">
            <div className="hardware-list-content-header">
              <h2 className="hardware-list-page-title">รายการอุปกรณ์</h2>
              <p>จำนวนอุปกรณ์ทั้งหมด: {filteredData.length} รายการ</p>
              <div className="hardware-list-category-filter">
                <label htmlFor="category-dropdown">หมวดหมู่:</label>
                <select id="category-dropdown" value={selectedCategory} onChange={handleCategoryChange}>
                  {categories.map(category => <option key={category} value={category}>{category}</option>)}
                </select>
              </div>
            </div>
            <div className="hardware-list-content-table">
              <table className="hardware-list-table">
                <thead>
                  <tr>
                    <th>#</th><th>หมวดหมู่</th><th>ชื่ออุปกรณ์</th>
                    <th>จำนวน<br />ทั้งหมด</th><th>จำนวนที่ถูกยืม</th>
                    <th>จำนวนที่เหลือ</th><th>ราคา/หน่วย</th>
                    <th>รายละเอียด</th>
                    {role !== 'user' && <th>การจัดการ</th>}
                  </tr>
                </thead>
                <tbody>
                  {paginatedData.map((item, index) => (
                    <tr key={item.id}>
                      <td>{(currentPage - 1) * itemsPerPage + index + 1}</td>
                      <td>{item.category}</td>
                      <td>{item.deviceName}</td>
                      <td>{item.totalQuantity}</td>
                      <td>{item.borrowedQuantity}</td>
                      <td>{item.totalQuantity - item.borrowedQuantity}</td>
                      <td>{item.pricePerUnit} บาท</td>
                      <td>
                        <button className="hardware-list-btn hardware-list-btn-success view-details-btn" onClick={() => handleViewDetails(item.id)}>
                          <FontAwesomeIcon icon={faEye} /> ดูรายละเอียด
                        </button>
                      </td>
                      {role !== 'user' && (
                        <td>
                          <div className="hardware-list-actions-cell">
                          <button className="hardware-list-btn hardware-list-btn-edit">
                            <FontAwesomeIcon icon={faEdit} />
                          </button>
                          <button className="hardware-list-btn hardware-list-btn-delete">
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
            <div className="hardware-list-pagination">
              <button 
                onClick={() => handlePageChange('prev')} 
                disabled={currentPage === 1} 
                className={`hardware-list-pagination-button ${currentPage === 1 ? 'disabled' : ''}`}
              >
                ก่อนหน้า
              </button>
              <span>หน้า {currentPage} จาก {totalPages}</span>
              <button 
                onClick={() => handlePageChange('next')} 
                disabled={currentPage === totalPages} 
                className={`hardware-list-pagination-button ${currentPage === totalPages ? 'disabled' : ''}`}
              >
                ถัดไป
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HardwareList;
