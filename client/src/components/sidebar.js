import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse, faUser, faMicrochip, faChartSimple } from '@fortawesome/free-solid-svg-icons';
import { useNavigate, useLocation } from 'react-router-dom';
import './sidebar.css';

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    { path: '/home', icon: faHouse, label: 'Home' },
    { path: '/dashboard', icon: faChartSimple, label: 'Dashboard' },
    { path: '/user', icon: faUser, label: 'User' },
    { path: '/hardware-list', icon: faMicrochip, label: 'Hardware List' }
  ];

  const handleNavigate = (path) => navigate(path);
  const isActive = (path) => location.pathname === path;

  return (
    <div className="sidebar">
      <h3 className="sidebar-custom-header" onClick={() => handleNavigate('/')}>
        Computer Hardware Laboratory
      </h3>
      <div className="sidebar-main">
        <p className="cg">Menu</p>
        {menuItems.map(({ path, icon, label }) => (
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
