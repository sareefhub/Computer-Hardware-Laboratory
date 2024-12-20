import React, { useState } from 'react';
import Sidebar from '../components/sidebar';
import Navbar from '../components/navbar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import './borrowing-history.css';
import hardwareData from '../mockData/hardwareData';

const BorrowingHistory = () => {
  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 5;
  const totalPages = Math.ceil(hardwareData.length / itemsPerPage);
  const paginatedData = hardwareData.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const handlePageChange = (direction) =>
    setCurrentPage(prevPage => direction === 'next' ? Math.min(prevPage + 1, totalPages) : Math.max(prevPage - 1, 1));

  return (
    <div className="page">
      <Sidebar />
      <div className="content">
        <Navbar />
        <div className="content-page">
          <div className="content-header">
            <h2 className="page-title">Borrowing History</h2>
          </div>
          <div className="content-table">
            <table>
              <thead>
                <tr>
                  <th>#</th><th>Category</th><th>Device Name</th>
                  <th>Borrowed<br />Quantity</th><th>Borrow Date</th><th>Return Date</th><th>Borrower</th><th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {paginatedData.map((item, index) => (
                  <tr key={item.id}>
                    <td>{(currentPage - 1) * itemsPerPage + index + 1}</td>
                    <td>{item.category}</td>
                    <td>{item.deviceName}</td>
                    <td>{item.borrowedQuantity}</td>
                    <td>{item.borrowDate ? new Date(item.borrowDate).toLocaleDateString() : 'N/A'}</td>
                    <td>{item.returnDate ? new Date(item.returnDate).toLocaleDateString() : 'N/A'}</td>
                    <td>{item.borrower || 'N/A'}</td>
                    <td>
                      <button className="btn btn-danger"><FontAwesomeIcon icon={faTrash} /></button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="pagination">
            <button onClick={() => handlePageChange('prev')} disabled={currentPage === 1}>Previous</button>
            <span>Page {currentPage} of {totalPages}</span>
            <button onClick={() => handlePageChange('next')} disabled={currentPage === totalPages}>Next</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BorrowingHistory;
