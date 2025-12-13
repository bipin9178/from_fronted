import React from 'react';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import "../../public/css/Footer.css"; 

export default function Footer() {
  const navigate = useNavigate();

  return (
    <footer className="modern-footer">
      <div className="footer-container">
        
        <div className="footer-section logo-desc">
          <h3 className="footer-logo">DocManager</h3>
          <p>Secure, fast & organized document and form submission system.</p>
          <div className="footer-social">
            <FaFacebook size={24}  />
            <FaTwitter size={24} />
            <FaInstagram size={24} />
            <FaLinkedin size={24} />
          </div>
        </div>

        <div className="footer-section">
          <h5>Quick Link</h5>
          <p onClick={() => navigate("/")} className="footer-link">Home</p>
          <p onClick={() => navigate("/all-submissions")} className="footer-link">Form</p>
          <p onClick={() => navigate("/my-submissions")} className="footer-link">Submissions</p>
        </div>

        <div className="footer-section">
          <h5>Contact</h5>
          <p>Document Building, Botad</p>
          <p>example@example.com</p>
          <p>12345 56789</p>
        </div>
      </div>

      <div className="footer-bottom">
        © 2025 DocManager. All Rights Reserved.
      </div>
    </footer>
  );
}
