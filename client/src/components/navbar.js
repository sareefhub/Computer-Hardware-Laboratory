import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignInAlt, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import './navbar.css';

const Navbar = ({ isLoggedIn, handleLogout }) => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div className="navbar">
      {!isLoggedIn ? (
        <button className="navbar-login-button" onClick={() => navigate(location.pathname === '/login' ? '/register' : '/login')}>
          Sign In
          <FontAwesomeIcon icon={faSignInAlt} />
        </button>
      ) : (
        <div className="navbar-profile">
          <div className="navbar-profile-img">
            <img
              src="https://static.vecteezy.com/system/resources/previews/005/544/718/non_2x/profile-icon-design-free-vector.jpg"
              alt="Profile"
            />
          </div>
          <p>Sareef</p>
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
