import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faBell, faSignInAlt } from '@fortawesome/free-solid-svg-icons';
import './navbar.css';

const Navbar = ({ onToggleSidebar }) => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    setIsLoggedIn(!!currentUser); // แปลงเป็น true/false
  }, []);

  const handleLogoClick = () => navigate('/');
  const handleNotificationClick = () => {
    alert('ยังไม่มีการแจ้งเตือน');
  };
  const handleLoginClick = () => navigate('/login');

  return (
    <div className="navbar-container">
      <div className="navbar-left" onClick={handleLogoClick}>
        <h3 className="navbar-logo">💻 Computer Hardware Laboratory</h3>
      </div>

      <div className="navbar-right">
        {!isLoggedIn ? (
          <button className="navbar-login-btn" onClick={handleLoginClick}>
            Sign In <FontAwesomeIcon icon={faSignInAlt} />
          </button>
        ) : (
          <>
            <div className="navbar-notification" onClick={handleNotificationClick}>
              <FontAwesomeIcon icon={faBell} />
            </div>
            <div className="navbar-toggle" onClick={onToggleSidebar}>
              <FontAwesomeIcon icon={faBars} />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;
