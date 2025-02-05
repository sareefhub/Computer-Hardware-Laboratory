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
  const [selectedCategory, setSelectedCategory] = useState('ทั้งหมด');
  const [currentPage, setCurrentPage] = useState(1);
  const navigate = useNavigate();  

  const currentUser = getCurrentUser();  // ดึงข้อมูลผู้ใช้
  const { role } = currentUser || {};    // ดึงบทบาท (admin/user)

  const itemsPerPage = 5;
  const categories = ['ทั้งหมด', ...new Set(hardwareData.map(item => item.category))];
  const filteredData = selectedCategory === 'ทั้งหมด' ? hardwareData : hardwareData.filter(item => item.category === selectedCategory);
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const paginatedData = filteredData.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const handleCategoryChange = (e) => setSelectedCategory(e.target.value);
  const handlePageChange = (direction) => setCurrentPage(prevPage => direction === 'next' ? Math.min(prevPage + 1, totalPages) : Math.max(prevPage - 1, 1));
  const handleViewDetails = (id) => navigate(`/hardware-detail/${id}`);

  return (
    <div className="page">
      <Sidebar />
      <div className="content">
        <Navbar />
        <div className="content-page">
          <div className="content-header">
            <h2 className="page-title">รายการอุปกรณ์</h2>
            <p>จำนวนทั้งหมด: {filteredData.length} รายการ</p>
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
                    <td>{item.pricePerUnit.toFixed(2)} บาท</td>
                    <td>
                      <button className="btn btn-success view-details-btn" onClick={() => handleViewDetails(item.id)}>
                        <FontAwesomeIcon icon={faEye} /> ดูรายละเอียด
                      </button>
                    </td>
                    {role !== 'user' && (
                      <td>
                        <div className="actions-cell">
                          <button className="btn btn-warning btn-action">
                            <FontAwesomeIcon icon={faEdit} />
                          </button>
                          <button className="btn btn-danger btn-action">
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

export default HardwareList;
