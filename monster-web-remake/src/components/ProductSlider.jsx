import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import productImages from '../data/productImages.json';

const ProductSlider = () => {
  const [hoverIndex, setHoverIndex] = useState(null); 
  const navigate = useNavigate();

  const handleClick = (index) => {
    navigate(`/detail/${index}`);
  };

  return (
    <div className="product-slider-container">
      <div className="product-head">
      <h2 className="mainhead-title">
          {hoverIndex === null ? "Choose Your Monster" : productImages[hoverIndex].alt}
        </h2>
      </div>
      <div className="product-slider">
        <div className="products">
          {productImages.map((product, index) => (
            <img
              key={index}
              src={product.src}
              alt={product.alt}
              className={index === hoverIndex ? "hover" : ""} 
              onMouseEnter={() => setHoverIndex(index)} 
              onMouseLeave={() => setHoverIndex(null)} 
              onClick={() => handleClick(index)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductSlider;
