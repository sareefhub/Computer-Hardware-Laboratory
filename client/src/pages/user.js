import React from 'react';
import Sidebar from '../components/sidebar';
import Navbar from '../components/navbar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import "./user.css";

const User = () => {
  return (
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
                  <th>Name</th>
                  <th>Email</th>
                  <th>Role</th>
                  <th>Status</th>
                  <th>Date Joined</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>1</td>
                  <td>John Doe</td>
                  <td>johndoe@example.com</td>
                  <td>User</td>
                  <td>Active</td>
                  <td>2022-01-15</td>
                  <td>
                    <div>
                      <button className="btn btn-warning">
                        <FontAwesomeIcon icon={faEdit} />
                      </button>
                      <button className="btn btn-danger">
                        <FontAwesomeIcon icon={faTrash} />
                      </button>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td>2</td>
                  <td>Jane Smith</td>
                  <td>janesmith@example.com</td>
                  <td>Admin</td>
                  <td>Inactive</td>
                  <td>2022-02-20</td>
                  <td>
                    <div>
                      <button className="btn btn-warning">
                        <FontAwesomeIcon icon={faEdit} />
                      </button>
                      <button className="btn btn-danger">
                        <FontAwesomeIcon icon={faTrash} />
                      </button>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default User;
