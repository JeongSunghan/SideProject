import React from "react";
import "../style/Header.css";

const Header = () => {
  return (
    <header className="header">
      <div className="header-left">
        <a href="#">Promotion</a>
        <a href="#">Product</a>
      </div>
      <div className="header-logo">
        {/* 몬스터 로고 이미지 */}
        <a href="#">
          <img
            src="/images/m-mini-logo.png" 
            alt="Monster Energy"
            className="monster-logo"
          />
        </a>
      </div>
      <div className="header-right">
        <a href="#">🌐</a>
      </div>
    </header>
  );
};

export default Header;
