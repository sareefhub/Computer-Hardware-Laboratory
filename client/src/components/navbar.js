import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignInAlt, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import './navbar.css';

const Navbar = ({ isLoggedIn, handleLogout }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [user, setUser] = useState({ name: '' });

  useEffect(() => {
    const username = localStorage.getItem("username");
    if (username) {
      setUser({ name: username });
    }
  }, [isLoggedIn]);

  return (
    <div className="navbar">
      {!isLoggedIn ? (
        <button className="navbar-login-button" onClick={() => navigate(location.pathname === '/login' ? '/register' : '/login')}>
          Sign In
          <FontAwesomeIcon icon={faSignInAlt} />
        </button>
      ) : (
        <div className="navbar-profile">
          <p>{user.name}</p>
          <button className="navbar-logout-button" onClick={handleLogout}>
            Logout
            <FontAwesomeIcon icon={faSignOutAlt} />
          </button>
        </div>
      )}
    </div>
  );
};

export default Navbar;
