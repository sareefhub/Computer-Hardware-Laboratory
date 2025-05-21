import { useState } from "react";
import Sidebar from "../../components/sidebar";
import Navbar from "../../components/navbar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import "./borrowing-history.css";
import hardwareData from "../../mockData/hardwareData";

const BorrowingHistory = () => {
  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 5;
  const totalPages = Math.ceil(hardwareData.length / itemsPerPage);
  const paginatedData = hardwareData.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const handlePageChange = (direction) =>
    setCurrentPage(prevPage => direction === 'next' ? Math.min(prevPage + 1, totalPages) : Math.max(prevPage - 1, 1));

  return (
    <div className="borrow-history-page">
      <div className="borrow-history-navbar">
        <Navbar />
      </div>
      <div className="borrow-history-body">
        <div className="borrow-history-sidebar">
          <Sidebar />
        </div>
        <div className="borrow-history-content">
          <div className="borrow-history-content-page">
            <div className="borrow-history-content-header">
              <h2 className="borrow-history-title">Borrowing History</h2>
            </div>
            <div className="borrow-history-content-table">
              <table className="borrow-history-table">
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
                        <button className="borrow-history-btn borrow-history-btn-danger">
                          <FontAwesomeIcon icon={faTrash} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="borrow-history-pagination">
              <button 
                  className="borrow-history-pagination-button" 
                  onClick={() => handlePageChange("prev")} 
                  disabled={currentPage === 1}
                >
                  ก่อนหน้า
                </button>
                <span>
                  หน้า {currentPage} จาก {totalPages}
                </span>
                <button 
                  className="borrow-history-pagination-button" 
                  onClick={() => handlePageChange("next")} 
                  disabled={currentPage === totalPages}
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

export default BorrowingHistory;
