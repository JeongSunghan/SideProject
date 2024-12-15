import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import "../style/ProductSlider.css";
import "../style/CanDetail.css";
import productImages2 from '../data/productImages.json';

const CanDetail = () => {
  const { id } = useParams();
  const product = productImages2[id];
  const navigate = useNavigate();

  const GoHome = () => {
    navigate(`/`);
  };

  return (
    <div className="product-detail-container">
      <button className="go-home-btn" onClick={GoHome}>That's not mine</button>
      <img src={product.src} alt={product.alt} className="center" />
      <div className="product-detail">
        <h2>{product.alt}</h2>
        <p>{product.description}</p>
      </div>
    </div>
  );
};

export default CanDetail;
