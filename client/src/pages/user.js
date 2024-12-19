import React from 'react';
import Sidebar from '../components/sidebar';
import Navbar from '../components/navbar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import users from '../mockData/userData';
import "./user.css";

const User = () => (
  <div className="page">
    <Sidebar />
    <div className="content">
      <Navbar />
      <div className="content-page">
        <div className="content-table">
          <h2 className="page-title">User</h2>
          <table>
            <thead>
              <tr>
                <th>#</th>
                <th>Username</th>
                <th>Email</th>
                <th>Role</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, index) => (
                <tr key={user.id}>
                  <td>{index + 1}</td>
                  <td>{user.username}</td>
                  <td>{user.email}</td>
                  <td>{user.role}</td>
                  <td>
                    <button className="btn btn-warning"><FontAwesomeIcon icon={faEdit} /></button>
                    <button className="btn btn-danger"><FontAwesomeIcon icon={faTrash} /></button>
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
