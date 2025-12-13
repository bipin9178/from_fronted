import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../redux/userSlice";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import { FaUser, FaEnvelope, FaLock } from "react-icons/fa";
import "../../public/css/Style.css";

export default function Register() {
  const [form, setForm] = useState({ username: "", email: "", password: "" });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error, message } = useSelector((state) => state.user);

  const handleSubmit = (e) => {
    e.preventDefault();

     if (!form.username || !form.email || !form.password) {
    toast.error("Please fill all required fields");
    return;
    }
     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(form.email)) {
      toast.error("Please enter a valid email address");
    return;
  }
    
    dispatch(registerUser(form));
  };

  useEffect(() => {
    if (message) {
      toast.success(message);
      navigate("/login");
    }
    if (error) toast.error(error);
  }, [message, error, navigate]);

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2 className="auth-title">Create Your Account</h2>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <span className="input-icon"><FaUser /></span>
            <input
              type="text"
              placeholder="Username"
              onChange={(e) => setForm({ ...form, username: e.target.value })}
              
            />
          </div>
          <div className="input-group">
            <span className="input-icon"><FaEnvelope /></span>
            <input
              type="text"
              placeholder="Email"
              onChange={(e) => setForm({ ...form, email: e.target.value })}
            />
          </div>
          <div className="input-group">
            <span className="input-icon"><FaLock /></span>
            <input
              type="password"
              placeholder="Password"
              onChange={(e) => setForm({ ...form, password: e.target.value })}
            
            />
          </div>
          <button type="submit" className="auth-btn" disabled={loading}>
            {loading ? "Creating Account..." : "Register"}
          </button>
        </form>
        <p className="auth-link">
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </div>
    </div>
  );
}
