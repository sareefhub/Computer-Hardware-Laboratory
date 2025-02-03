import React, { useState } from 'react';
import Sidebar from '../components/sidebar';
import Navbar from '../components/navbar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash, faHandshake } from '@fortawesome/free-solid-svg-icons';
import './borrow-equipment.css';
import hardwareData from '../mockData/hardwareData';

const BorrowEquipment = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = ['All', ...new Set(hardwareData.map(item => item.category))];
  const filteredData = selectedCategory === 'All' ? hardwareData : hardwareData.filter(item => item.category === selectedCategory);

  const handleCategoryChange = (e) => setSelectedCategory(e.target.value);
  const handleBorrow = (id) => {
    console.log("Borrowing item with ID:", id);
  };

  return (
    <div className="page">
      <Sidebar />
      <div className="content">
        <Navbar />
        <div className="content-page">
          <div className="content-header">
            <h2 className="page-title">Borrow Equipment</h2>
            <p>Total Items: {filteredData.length}</p>
            <div className="category-filter">
              <label htmlFor="category-dropdown">Filter by Category:</label>
              <select id="category-dropdown" value={selectedCategory} onChange={handleCategoryChange}>
                {categories.map(category => <option key={category} value={category}>{category}</option>)}
              </select>
            </div>
          </div>
          <div className="content-table">
            <table>
              <thead>
                <tr>
                  <th>#</th><th>Category</th><th>Device Name</th>
                  <th>Remaining Quantity</th><th>Borrow</th><th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredData.map((item, index) => (
                  <tr key={item.id}>
                    <td>{index + 1}</td>
                    <td>{item.category}</td>
                    <td>{item.deviceName}</td>
                    <td>{item.totalQuantity - item.borrowedQuantity}</td>
                    <td>
                      <button className="btn btn-success" onClick={() => handleBorrow(item.id)}>
                        <FontAwesomeIcon icon={faHandshake} /> Borrow
                      </button>
                    </td>
                    <td>
                      <div className="actions-container">
                        <button className="btn btn-warning"><FontAwesomeIcon icon={faEdit} /></button>
                        <button className="btn btn-danger"><FontAwesomeIcon icon={faTrash} /></button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BorrowEquipment;
