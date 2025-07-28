import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faUser, faMicrochip, faChartSimple, faHandshake,
  faHistory, faPrint, faKey, faCircleQuestion, faHandHolding, faSignOutAlt
} from '@fortawesome/free-solid-svg-icons';
import { useNavigate, useLocation } from 'react-router-dom';
import './sidebar.css';

const Sidebar = ({ isOpen }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const [user, setUser] = useState({ name: '', role: '' });
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    if (currentUser) {
      setUser({ name: currentUser.username, role: currentUser.role });
      setIsLoggedIn(true);
    }
  }, []);

  const handleNavigate = (path) => navigate(path);
  const handleLogout = () => {
    localStorage.removeItem("currentUser");
    setIsLoggedIn(false);
    setUser({ name: '', role: '' });
    navigate('/');
  };

  const isActive = (path) => location.pathname === path;

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

  const accessibleMenuItems = menuItems.filter(item => item.roles.includes(user.role));

  return (
    <aside className={`sidebar-container ${isOpen ? 'sidebar-open' : ''}`}>
      <div className="sidebar-header">
        <h3 className="sidebar-title" onClick={() => navigate('/')}>Menu</h3>
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

      <div className="sidebar-profile">
        {isLoggedIn && (
          <>
            <p className="sidebar-username">👤 {user.name}</p>
            <button className="sidebar-logout-btn" onClick={handleLogout}>
              Logout <FontAwesomeIcon icon={faSignOutAlt} />
            </button>
          </>
        )}
      </div>
    </aside>
  );
};

export default Sidebar;
