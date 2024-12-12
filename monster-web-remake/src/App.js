import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import ProductSlider from './components/ProductSlider';
import CanDetail from './components/CanDetail'; // 새로 추가된 컴포넌트
import './style/App.css';

const App = () => {
  return (
    <Router>
      <div className="app">
        <Header />
        <main>
          <Routes>
            {/* 메인 페이지: 슬라이더 */}
            <Route path="/" element={<ProductSlider />} />
            {/* 캔 상세 페이지 */}
            <Route path="/detail/:id" element={<CanDetail />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
