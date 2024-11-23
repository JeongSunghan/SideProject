import React, { useState } from "react";
import "../style/ProductSlider.css";

const productImages = [
  { src: "/images/monster-energy.png", alt: "Monster Energy", description: "지구상에서 가장 쿨한 에너지 음료인 몬스터 에너지를 만나보세요." },
  { src: "/images/monster-zero.png", alt: "Monster Energy Zero Sugar", description: "오리지널 몬스터 에너지의 맛을 그대로 제로 슈거로 담았습니다." },
  { src: "/images/monster-ultra.png", alt: "Monster Energy Ultra", description: "몬스터 에너지 울트라는 가볍고 시원한 맛으로 경험을 선사합니다." },
  { src: "/images/monster-peach.png", alt: "Monster Energy Peach Keen", description: "풍부한 복숭아 향의 몬스터 에너지 울트라 피치 킨입니다." },
  { src: "/images/monster-sunrise.png", alt: "Monster Energy Ultra Sunrise", description: "상큼한 오렌지 맛의 몬스터 에너지 울트라 선라이즈입니다." },
  { src: "/images/monster-citra.png", alt: "Monster Energy Ultra Citra", description: "온세상 상큼함을 가득 담은 몬스터 에너지 울트라 시트라입니다." },
  { src: "/images/monster-mango.png", alt: "Monster Energy Mango Loco", description: "달콤하고 이국적인 망고 맛의 몬스터 에너지 망고 로코입니다." },
  { src: "/images/monster-punch.png", alt: "Monster Energy Pipeline Punch", description: "파이프라인 펀치: 패션 프루트와 몬스터의 조화입니다." },
  { src: "/images/monster-lemonade.png", alt: "Monster Energy Aussie Style Lemonade", description: "레모네이드의 시원함을 담은 몬스터 에너지입니다." },
];

const ProductSlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const totalImages = productImages.length;

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % totalImages);
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + totalImages) % totalImages);
  };

  const getClassName = (index) => {
    if (index === currentIndex) {
      return "active"; // 현재 중앙 캔
    } else if (
      index === (currentIndex - 1 + totalImages) % totalImages ||
      index === (currentIndex + 1) % totalImages
    ) {
      return "inactive"; // 양옆 캔
    } else {
      return "hidden"; // 나머지 캔 숨김
    }
  };

  return (
    <div className="product-slider-container">
      <div className="product-slider">
        <button className="arrow-left" onClick={handlePrev}>
          &#8249;
        </button>
        <div className="products">
          {productImages.map((product, index) => (
            <img
              key={index}
              src={product.src}
              alt={product.alt}
              className={getClassName(index)}
            />
          ))}
        </div>
        <button className="arrow-right" onClick={handleNext}>
          &#8250;
        </button>
      </div>
      <div className="product-info">
        <h2>{productImages[currentIndex]?.alt}</h2>
        <p>{productImages[currentIndex]?.description}</p>
      </div>
    </div>
  );
};

export default ProductSlider;
