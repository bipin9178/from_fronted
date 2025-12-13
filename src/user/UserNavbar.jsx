import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { FaUserCircle, FaBars, FaTimes } from "react-icons/fa";
import "../../public/css/Navbar.css";

export default function Navbar() {
  const { userInfo } = useSelector((state) => state.user);
  const location = useLocation();
  const [open, setOpen] = useState(false);

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="modern-navbar">
      <div className="nav-container">
        <Link to="/" className="nav-logo">
          Form Manager
        </Link>

        <div className="menu-toggle" onClick={() => setOpen(!open)}>
          {open ? <FaTimes size={24} /> : <FaBars size={24} />}
        </div>

        <ul className={`nav-links ${open ? "open" : ""}`}>
          <li>
            <Link className={isActive("/") ? "active" : ""} to="/">
              Home
            </Link>
          </li>
           {/* <li>
            <Link className={isActive("/abouts") ? "active" : ""} to="/abouts">
              Abouts
            </Link>
          </li> */}
          <li>
                <Link
                  className={isActive("/all-submissions") ? "active" : ""}
                  to="/all-submissions"
                >
                  Form
                </Link>
              </li>
          
          {userInfo ? (
            <>
              <li>
                <Link
                  className={isActive("/my-submissions") ? "active" : ""}
                  to="/my-submissions"
                >
                  Form List
                </Link>
              </li>
              <li className="profile-section">
                <FaUserCircle className="profile-icon"  />
                <Link to={`/profile/${userInfo.id}`} className="username">
                  {userInfo.username}
                </Link>
              </li>
             
            </>
          ) : (
            <>
              <li>
                <Link
                  className={isActive("/login") ? "active" : ""}
                  to="/login"
                >
                  Login
                </Link>
              </li>
              <li>
                <Link
                  className={isActive("/register") ? "active" : ""}
                  to="/register"
                >
                  Register
                </Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
}
