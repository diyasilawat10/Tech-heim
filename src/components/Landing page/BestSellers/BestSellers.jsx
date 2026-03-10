import React from 'react';
import './BestSellers.css';
import ProductCard from '../ProductCard/ProductCard';
import arrowCircleRightIcon from '../../../assets/icons/arrow-circle-right.svg';

// Importing images from assets
import headsetImg from '../../../assets/images/echox_pro.png';
import ps5Img from '../../../assets/images/ps4_pro.png';
import macbookImg from '../../../assets/images/MAC.png';
import airpodsImg from '../../../assets/images/airpods_pro_2.png';

const BestSellers = () => {
  const products = [
    {
      id: 1,
      title: 'EchoX Pro H900',
      price: '32.30',
      image: headsetImg,
      rate: '4.9',
      colors: ['#0C0C0C'],
    },
    {
      id: 2,
      title: 'Play Station 4 Pro 1Tb',
      price: '980.00',
      oldPrice: '1090.00',
      image: ps5Img,
      rate: '4.4',
    },
    {
      id: 3,
      title: 'Apple MacBook Air 15" w/ Touch ID (2023) - Space Grey (Apple...',
      price: '1883.05',
      image: macbookImg,
      rate: '4.5',
      colors: ['#FFFFFF', '#717171'],
    },
    {
      id: 4,
      title: 'Airpods pro2',
      price: '274.04',
      oldPrice: '285.08',
      discount: '-10%',
      image: airpodsImg,
      rate: '4.2',
      colors: ['#FFFFFF'],
    },
  ];

  return (
    <section className="best-sellers-container">
      <div className="best-sellers-header">
        <div className="best-sellers-header-top">
          <h2 className="best-sellers-title">Best Sellers</h2>
          <a href="#" className="view-all-link">
            View all
            <img src={arrowCircleRightIcon} alt="Arrow Circle Right" className="view-all-link-icon" />
          </a>
        </div>
        <div className="best-sellers-divider"></div>
      </div>

      <div className="best-sellers-grid">
        {products.map((product) => (
          <ProductCard key={product.id} {...product} />
        ))}
      </div>
    </section>
  );
};

export default BestSellers;
