import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignInAlt, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import './navbar.css';

const Navbar = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({ name: '' });
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const username = localStorage.getItem("username");
    if (username) {
      setUser({ name: username });
      setIsLoggedIn(true);
    } else {
      setUser({ name: '' });
      setIsLoggedIn(false);
    }
  }, []);

  const handleLoginClick = () => {
    if (isLoggedIn) {
      localStorage.removeItem("username");
      setIsLoggedIn(false);
      setUser({ name: '' });
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
