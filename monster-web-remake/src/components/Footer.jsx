import React from "react";
import "../style/Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-logo">
        <img
          src="/images/monster-logo.png"
          alt="Monster Energy Logo"
        />
         <p>© Monster Energy Company<br />All Rights Reserved</p>
      </div>
      
    </footer>
  );
};

export default Footer;
