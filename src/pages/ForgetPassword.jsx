import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate, Link } from "react-router-dom";

import { FaEnvelope, FaLock } from "react-icons/fa";
import "../../public/css/Style.css";
import api from "../middleware/api";

export default function ForgetPassword() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email) {
      toast.error("Email is required!");
      return;
    } 
     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
      toast.error("Please enter a valid email address");
      return;
  }
    try {
      setLoading(true);
      const response = await api.post(`/forget-password`, { email, password });
      toast.success(response.data.message || "Password changed successfully!");
      navigate("/login");
    } catch (error) {
      toast.error(error.response?.data?.message || "Error resetting password!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2 className="auth-title">Forget Password</h2>

        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <span className="input-icon"><FaEnvelope /></span>
            <input
              type="text"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
          
            />
          </div>

          <div className="input-group">
            <span className="input-icon"><FaLock /></span>
            <input
              type="password"
              placeholder="New Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
           
            />
          </div>

      

          <button type="submit" className="auth-btn" disabled={loading}>
            {loading ? "Saving..." : "Save Password"}
          </button>
        </form>

        <p className="auth-link">
          Remembered your password? <Link to="/login">Login</Link>
        </p>
      </div>
    </div>
  );
}
