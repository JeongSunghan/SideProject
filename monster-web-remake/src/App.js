import React from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import ProductSlider from './components/ProductSlider';
import ProductDescription from './components/ProductDescription';
import './style/App.css';

const App = () => {
  return (
    <div className="app">
      <Header />
      <main>
        <ProductSlider />
        {/* <ProductDescription /> */}
      </main>
      <Footer />
    </div>
  );
};

export default App;
