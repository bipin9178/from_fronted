import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import api from '../middleware/api';
import { FaLock } from 'react-icons/fa';
import { toast } from 'react-toastify';

const ResetPassword = () => {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(true);

  const { token } = useParams();
  const navigate = useNavigate();

  // 🔍 CHECK TOKEN ON PAGE LOAD
  useEffect(() => {
    const verifyToken = async () => {
      try {
        await api.get(`/verify-reset-token/${token}`);
        setLoading(false);
      } catch (err) {
        toast.error("Reset link expired. Please login or request a new link.");
        navigate("/login");
      }
    };

    verifyToken();
  }, [token, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (newPassword.length < 6) {
      toast.error("Password must be at least 6 characters!");
      return;
    }

    if (newPassword !== confirmPassword) {
      toast.error("Passwords do not match!");
      return;
    }

    try {
      setLoading(true);
      const response = await api.post(`/reset-password/${token}`, {
        newPassword,
      });

      toast.success(response.data.message);
      navigate("/login");

    } catch (err) {
      toast.error("Reset link expired. Please login.");
      navigate("/login");
    } finally {
      setLoading(false);
    }
  };

  if (loading) return null; // prevent page flash

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2 className="auth-title">Reset Password</h2>

        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <span className="input-icon"><FaLock /></span>
            <input
              type="password"
              placeholder="New Password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
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

          <button type="submit" className="auth-btn">
            Reset Password
          </button>
        </form>

        <p className="auth-link">
          Remembered your password? <Link to="/login">Login</Link>
        </p>
      </div>
    </div>
  );
};

export default ResetPassword;
