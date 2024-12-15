import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import "../style/ProductSlider.css";
import "../style/CanDetail.css";

const productImages2 = [
  {
    src: "/images/monster-energy.png",
    alt: "Monster Energy",
    description:
      "지구상에서 가장 쿨한 에너지 음료인 몬스터 에너지를 만나보세요.",
  },
  {
    src: "/images/monster-zero.png",
    alt: "Monster Energy Zero Sugar",
    description: "오리지널 몬스터 에너지의 맛을 그대로 제로 슈거로 담았습니다.",
  },
  {
    src: "/images/monster-ultra.png",
    alt: "Monster Energy Ultra",
    description:
      "몬스터 에너지 울트라는 가볍고 시원한 맛으로 경험을 선사합니다.",
  },
  {
    src: "/images/monster-peach.png",
    alt: "Monster Energy Peach Keen",
    description: "풍부한 복숭아 향의 몬스터 에너지 울트라 피치 킨입니다.",
  },
  {
    src: "/images/monster-sunrise.png",
    alt: "Monster Energy Ultra Sunrise",
    description: "상큼한 오렌지 맛의 몬스터 에너지 울트라 선라이즈입니다.",
  },
  {
    src: "/images/monster-citra.png",
    alt: "Monster Energy Ultra Citra",
    description: "온세상 상큼함을 가득 담은 몬스터 에너지 울트라 시트라입니다.",
  },
  {
    src: "/images/monster-mango.png",
    alt: "Monster Energy Mango Loco",
    description: "달콤하고 이국적인 망고 맛의 몬스터 에너지 망고 로코입니다.",
  },
  {
    src: "/images/monster-punch.png",
    alt: "Monster Energy Pipeline Punch",
    description: "파이프라인 펀치: 패션 프루트와 몬스터의 조화입니다.",
  },
  {
    src: "/images/monster-lemonade.png",
    alt: "Monster Energy Aussie Style Lemonade",
    description: "레모네이드의 시원함을 담은 몬스터 에너지입니다.",
  },
];

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
