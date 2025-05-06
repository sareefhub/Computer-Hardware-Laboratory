import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignInAlt, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import './navbar.css';

const Navbar = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({ name: '', role: '' });
  const [isLoggedIn, setIsLoggedIn] = useState(false);

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

  const handleLoginClick = () => {
    localStorage.removeItem("currentUser");
    setIsLoggedIn(false);
    setUser({ name: '', role: '' });
    navigate('/login');
  };

  const handleLogoClick = () => navigate('/');

  return (
    <div className="navbar-container">
      <h3 className="navbar-logo" onClick={handleLogoClick}>
        Computer Hardware Laboratory
      </h3>

      {!isLoggedIn ? (
        <button className="navbar-login-btn" onClick={handleLoginClick}>
          Sign In <FontAwesomeIcon icon={faSignInAlt} />
        </button>
      ) : (
        <div className="navbar-user-section">
          <p className="navbar-username">{user.name}</p>
          <button className="navbar-logout-btn" onClick={handleLoginClick}>
            Logout <FontAwesomeIcon icon={faSignOutAlt} />
          </button>
        </div>
      )}
    </div>
  );
};

export default Navbar;
