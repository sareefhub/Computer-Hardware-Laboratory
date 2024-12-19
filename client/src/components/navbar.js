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
    if (isLoggedIn) {
      localStorage.removeItem("currentUser");
      setIsLoggedIn(false);
      setUser({ name: '', role: '' });
      navigate('/login');
    } else {
      navigate('/login');
    }
  };

  return (
    <div className="navbar">
      {!isLoggedIn ? (
        <button className="navbar-login-button" onClick={handleLoginClick}>
          Sign In
          <FontAwesomeIcon icon={faSignInAlt} />
        </button>
      ) : (
        <div className="navbar-profile">
          <p>{user.name}</p>
          <button className="navbar-logout-button" onClick={handleLoginClick}>
            Logout
            <FontAwesomeIcon icon={faSignOutAlt} />
          </button>
        </div>
      )}
    </div>
  );
};

export default Navbar;
