import React from "react";
import "../style/Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-logo">
        <img
          src="/images/monster-logo.png" // 로고 이미지 경로
          alt="Monster Energy Logo"
        />
         <p>© Monster Energy Company<br />All Rights Reserved</p>
      </div>
      
    </footer>
  );
};

export default Footer;
