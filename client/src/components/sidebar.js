import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faUser,
  faMicrochip,
  faChartSimple,
  faHandshake,
  faHistory,
  faPrint,
  faKey,
  faCircleQuestion,
  faHandHolding
} from '@fortawesome/free-solid-svg-icons';
import { useNavigate, useLocation } from 'react-router-dom';
import { getCurrentUser } from '../helpers/helper';
import './sidebar.css';

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const currentUser = getCurrentUser();
  const { role } = currentUser || {};

  const menuItems = [
    { path: '/admin/dashboard', icon: faChartSimple, label: 'แดชบอร์ด', roles: ['admin'] },
    { path: '/user', icon: faUser, label: 'ผู้ใช้', roles: ['admin'] },
    { path: '/hardware-list', icon: faMicrochip, label: 'รายการฮาร์ดแวร์', roles: ['admin', 'user'] },
    { path: '/borrow-equipment', icon: faHandHolding, label: 'ยืมอุปกรณ์', roles: ['admin', 'user'] },
    { path: '/borrow-confirm', icon: faHandshake, label: 'ยืนยันการยืม', roles: ['admin', 'user'] },
    { path: '/borrowing-history', icon: faHistory, label: 'ประวัติการยืม', roles: ['admin', 'user'] },
    { path: '/print-delivery', icon: faPrint, label: 'พิมพ์ใบนำส่งอุปกรณ์', roles: ['admin', 'user'] },
    { path: '/change-password', icon: faKey, label: 'เปลี่ยนรหัสผ่าน', roles: ['admin', 'user'] },
    { path: '/how-to-use', icon: faCircleQuestion, label: 'วิธีการใช้งาน', roles: ['admin', 'user'] }
  ];

  const handleNavigate = (path) => navigate(path);
  const isActive = (path) => location.pathname === path;

  const accessibleMenuItems = menuItems.filter(item => item.roles.includes(role));

  return (
    <aside className="sidebar-container">
      <div className="sidebar-header" onClick={() => navigate('/')}>
        <h3 className="sidebar-title">Menu</h3>
      </div>
      <div className="sidebar-main">
        {accessibleMenuItems.map(({ path, icon, label }) => (
          <div
            key={path}
            className={`sidebar-item ${isActive(path) ? 'sidebar-item-active' : ''}`}
            onClick={() => handleNavigate(path)}
          >
            <div className="sidebar-icon">
              <FontAwesomeIcon icon={icon} />
            </div>
            <p className="sidebar-label">{label}</p>
          </div>
        ))}
      </div>
    </aside>
  );
};

export default Sidebar;
