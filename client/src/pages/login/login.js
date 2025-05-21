import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import users from "../../mockData/userData";
import { setCurrentUser } from "../../helpers/helper";
import "./login.css";

const Login = () => {
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const savedUser = JSON.parse(localStorage.getItem("currentUser"));
    if (savedUser) {
      setIdentifier(savedUser.username);
    }
  }, []);

  const handleLogin = (e) => {
    e.preventDefault();
    const user = users.find(
      (user) =>
        (user.username === identifier || 
         user.email === identifier || 
         user.studentId === identifier) &&
        user.password === password
    );

    if (user) {
      setError("");
      setCurrentUser(user.username, user.role, user.studentId);
      if (user.role === "admin") {
        navigate("/admin/dashboard");
      } else {
        navigate("/hardware-list");
      }
    } else {
      setError("Invalid username, email, student ID, or password");
    }
  };

  return (
    <div className="login-wrapper">
      <div className="login-container">
        <form className="login-form" onSubmit={handleLogin}>
          <h2>Login</h2>
          {error && <p className="error-message">{error}</p>}
          <div className="form-group">
            <label htmlFor="identifier">Username / Email / Student ID</label>
            <input
              type="text"
              id="identifier"
              placeholder="Enter your username, email, or student ID"
              value={identifier}
              onChange={(e) => setIdentifier(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn-login">Login</button>
          <p className="switch-page">
            Don't have an account? <a href="/register">Register</a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
