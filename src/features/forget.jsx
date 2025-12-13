
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { FaEnvelope } from "react-icons/fa";
import api from "../middleware/api";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);


  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast.error("Please enter a valid email address");
      return;
    }

    setLoading(true);
 
    try {
      const response = await api.post("/forget-password", { email });
      toast.success(response.data.message); 
    } catch (err) 
    {
      toast.error(err.response?.data?.message || "An error occurred"); 
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2 className="auth-title">Forgot Password</h2>

        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <span className="input-icon">
              <FaEnvelope />
            </span>
            <input
              type="text"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
         
            />
          </div>

          <button type="submit" className="auth-btn" disabled={loading}>
            {loading ? "Sending" : "Forget Password"}
          </button>
        </form>

        <p className="auth-link">
          Remembered your password? <Link to="/login">Login</Link>
        </p>
      </div>
    </div>
  );
};

export default ForgotPassword;
