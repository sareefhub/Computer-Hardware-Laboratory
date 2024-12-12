import Sidebar from '../components/sidebar';
import Navbar from '../components/navbar';
import "./register.css";

const Register = () => {

  return (
    <div className="page">
      <Sidebar/>
      <div className="content">
        <Navbar />
        <div className="content-page">
            Register Page
        </div>
      </div>
    </div>
  );
};

export default Register;
