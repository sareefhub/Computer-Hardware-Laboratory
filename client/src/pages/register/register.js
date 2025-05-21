import { Link } from "react-router-dom";
import "./register.css";

const Register = () => (
  <div className="register-wrapper">
    <div className="register-container">
      <form className="register-form">
        <h2>Register</h2>
        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input type="text" id="username" placeholder="Enter your username" required />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input type="email" id="email" placeholder="Enter your email" required />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input type="password" id="password" placeholder="Enter your password" required />
        </div>
        <div className="form-group">
          <label htmlFor="confirm-password">Confirm Password</label>
          <input type="password" id="confirm-password" placeholder="Confirm your password" required />
        </div>
        <button type="submit" className="btn-register">Register</button>
        <p className="switch-page">
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </form>
    </div>
  </div>
);

export default Register;
