import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse, faUser, faMicrochip, faChartSimple } from '@fortawesome/free-solid-svg-icons';
import { useNavigate, useLocation } from 'react-router-dom';
import './sidebar.css';
import { getCurrentUser } from '../helpers/helper';

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const currentUser = getCurrentUser();
  const { role } = currentUser || {};

  const menuItems = [
    { path: '/home', icon: faHouse, label: 'Home', roles: ['admin', 'user'] },
    { path: '/dashboard', icon: faChartSimple, label: 'Dashboard', roles: ['admin'] },
    { path: '/user', icon: faUser, label: 'User', roles: ['admin'] },
    { path: '/hardware-list', icon: faMicrochip, label: 'Hardware List', roles: ['admin', 'user'] }
  ];

  const handleNavigate = (path) => navigate(path);
  const isActive = (path) => location.pathname === path;

  const accessibleMenuItems = menuItems.filter(item => item.roles.includes(role));

  return (
    <div className="sidebar">
      <h3 className="sidebar-custom-header" onClick={() => handleNavigate('/')}>
        Computer Hardware Laboratory
      </h3>
      <div className="sidebar-main">
        <p className="cg">Menu</p>
        {accessibleMenuItems.map(({ path, icon, label }) => (
          <div
            key={path}
            className={`sidebar-items ${isActive(path) ? 'sidebar-items-active' : ''}`}
            onClick={() => handleNavigate(path)}
          >
            <div className="sidebar-icon">
              <FontAwesomeIcon icon={icon} />
            </div>
            <p>{label}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
