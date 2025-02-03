import React from 'react';
import Sidebar from '../components/sidebar';
import Navbar from '../components/navbar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash, faSearch, faUserPlus } from '@fortawesome/free-solid-svg-icons';
import users from '../mockData/userData';
import "./user.css";

const User = () => (
  <div className="page">
    <Sidebar />
    <div className="content">
      <Navbar />
      <div className="content-page">
        <div className="content-header">
          <h2 className="page-title">จัดการผู้ใช้งาน</h2>
          <div className="header-actions">
            <div className="search-box">
              <FontAwesomeIcon icon={faSearch} className="search-icon" />
              <input type="text" placeholder="ค้นหาผู้ใช้..." />
            </div>
            <button className="add-user-btn">
              <FontAwesomeIcon icon={faUserPlus} />
              <span>เพิ่มผู้ใช้</span>
            </button>
          </div>
        </div>

        <div className="table-container">
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
                    <span className="username">{user.username}</span>
                  </td>
                  <td>{user.email}</td>
                  <td>
                    <span className={`role-badge ${user.role}`}>
                      {user.role}
                    </span>
                  </td>
                  <td>
                    <span className={`status-badge ${user.status.toLowerCase()}`}>
                      {user.status}
                    </span>
                  </td>
                  <td>
                    <div className="action-buttons">
                      <button className="btn btn-warning" title="แก้ไข">
                        <FontAwesomeIcon icon={faEdit} />
                      </button>
                      <button className="btn btn-danger" title="ลบ">
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
);

export default User;
