import React from 'react';
import Sidebar from '../../components/sidebar';
import Navbar from '../../components/navbar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash, faSearch, faUserPlus } from '@fortawesome/free-solid-svg-icons';
import users from '../../mockData/userData';
import "./user.css";

const User = () => (
  <div className="user-page">
    <div className="user-navbar">
      <Navbar />
    </div>
    <div className="user-body">
      <div className="user-sidebar">
        <Sidebar />
      </div>
      <div className="user-content">
        <div className="user-content-page">
          <div className="user-content-header">
            <h2 className="user-page-title">จัดการผู้ใช้งาน</h2>
            <div className="user-header-actions">
              <div className="user-search-box">
                <FontAwesomeIcon icon={faSearch} className="user-search-icon" />
                <input type="text" placeholder="ค้นหาผู้ใช้..." />
              </div>
              <button className="user-add-user-btn">
                <FontAwesomeIcon icon={faUserPlus} />
                <span>เพิ่มผู้ใช้</span>
              </button>
            </div>
          </div>

          <div className="user-table-container">
            <table className="user-table">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Username</th>
                  <th>Email</th>
                  <th>Role</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user, index) => (
                  <tr key={user.id}>
                    <td>{index + 1}</td>
                    <td className="user-info">
                      <span className="user-username">{user.username}</span>
                    </td>
                    <td>{user.email}</td>
                    <td>
                      <span>{user.role}</span>
                    </td>
                    <td>
                      <span>{user.status}</span>
                    </td>
                    <td>
                      <div className="user-action-buttons">
                        <button className="user-btn user-btn-warning" title="แก้ไข">
                          <FontAwesomeIcon icon={faEdit} />
                        </button>
                        <button className="user-btn user-btn-danger" title="ลบ">
                          <FontAwesomeIcon icon={faTrash} />
                        </button>
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
  </div>
);

export default User;