import { Link } from "react-router-dom";
import "./login.css";

const Login = () => (
  <div className="login-wrapper">
    <div className="login-container">
      <form className="login-form">
        <h2>Login</h2>
        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input type="text" id="username" placeholder="Enter your username" required />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input type="password" id="password" placeholder="Enter your password" required />
        </div>
        <button type="submit" className="btn-login">Login</button>
        <p className="switch-page">
          Don't have an account? <Link to="/register">Register</Link>
        </p>
      </form>
    </div>
  </div>
);

export default Login;
