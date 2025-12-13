import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchUserProfile, logout } from "../redux/userSlice";
import { FaUserCircle, FaUser, FaEnvelope, FaKey } from "react-icons/fa";
import "../../public/css/Profile.css"; 
import { toast } from "react-toastify";

const Profile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { userInfo, profile, loading } = useSelector((state) => state.user);
  const [checkingAuth, setCheckingAuth] = useState(true);

  // Logout handler
  const handleLogout = () => {
    dispatch(logout());
    toast.info("Logout successfully!");
    navigate("/login");
  };

  // Fetch user profile
  useEffect(() => {
    if (!userInfo) {
      navigate("/login");
      return;
    }

    const loadProfile = async () => {
      try {
        await dispatch(fetchUserProfile(userInfo.id));
      } catch (err) {
        console.error("Failed to load profile:", err);
      } finally {
        setCheckingAuth(false);
      }
    };

    loadProfile();
  }, [dispatch, navigate, userInfo]);

  // Loading state
  if (checkingAuth || loading) {
    return (
      <div className="spinner-wrapper">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  // No profile found
  if (!profile) {
    return (
      <div className="profile-container">
        <h4>No profile data found</h4>
      </div>
    );
  }

  return (
    <div className="profile-container">
      <div className="profile-card">
        <h2 className="profile-title">Profile</h2>

        {/* Avatar */}
        <div className="profile-avatar-container">
          <FaUserCircle size={80} color="#49f56bff" />
        </div>

        {/* User Info */}
        <div className="profile-info-container">
          <div className="profile-info-row">
            <FaUser className="profile-info-icon" />
            <span className="profile-info-text">{profile.username}</span>
          </div>
          <div className="profile-info-row">
            <FaEnvelope className="profile-info-icon" />
            <span className="profile-info-text">{profile.email}</span>
          </div>
        </div>

        {/* Buttons */}
        <div className="profile-buttons">
          <button
            className="profile-btn"
            onClick={() => navigate("/change-password")}
          >
            <FaKey />
            Change Password
          </button>
          <button className="profile-btn" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
