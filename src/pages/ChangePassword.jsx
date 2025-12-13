import React, { useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useNavigate, Link } from "react-router-dom";

import { FaEnvelope, FaLock } from "react-icons/fa";
import "../../public/css/Style.css";
import api from "../middleware/api";

export default function ChangePassword() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
    const { userInfo } = useSelector((state) => state.user);
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

    if (!password) {
      toast.error("Password is required!");
      return;
    }

    if (password.length < 6) {
      toast.error("Password must be at least 6 characters!");
      return;
    }

    if (password !== confirmPassword) {
      toast.error("Passwords do not match!");
      return;
    }

    try {
      setLoading(true);
      const response = await api.post(`/change-password`, { email, password });
      toast.success(response.data.message || "Password changed successfully!");
      navigate(`/profile/${userInfo.id}`);
    } catch (error) {
      toast.error(error.response?.data?.message || "Error resetting password!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2 className="auth-title">Change Password</h2>

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

          <div className="input-group">
            <span className="input-icon"><FaLock /></span>
            <input
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            
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
