import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignInAlt, faSignOutAlt, faBars } from '@fortawesome/free-solid-svg-icons';
import Sidebar from './sidebar';
import './navbar.css';

const Navbar = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({ name: '', role: '' });
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    if (currentUser) {
      setUser({ name: currentUser.username, role: currentUser.role });
      setIsLoggedIn(true);
    } else {
      setUser({ name: '', role: '' });
      setIsLoggedIn(false);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("currentUser");
    setIsLoggedIn(false);
    setUser({ name: '', role: '' });
    navigate('/');
  };

  const handleLoginClick = () => navigate('/login');
  const handleLogoClick = () => navigate('/');

  return (
    <>
      <div className="navbar-container">
        <div className="navbar-left">
          <h3 className="navbar-logo" onClick={handleLogoClick}>
            Computer Hardware Laboratory
          </h3>
        </div>

        {!isLoggedIn ? (
          <button className="navbar-login-btn" onClick={handleLoginClick}>
            Sign In <FontAwesomeIcon icon={faSignInAlt} />
          </button>
        ) : (
          <div className="navbar-user-section">
            <p className="navbar-username">{user.name}</p>
            <button className="navbar-logout-btn" onClick={handleLogout}>
              Logout <FontAwesomeIcon icon={faSignOutAlt} />
            </button>
          </div>
        )}
        <div className="navbar-toggle" onClick={() => setMenuOpen(true)}>
          <FontAwesomeIcon icon={faBars} />
        </div>
      </div>

      <Sidebar isOpen={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  );
};

export default Navbar;
