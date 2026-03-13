import React from 'react';
import './PromoBanners.css';

const PromoBanners = () => {
  return (
    <div className="promo-banners-row">
      {/* iPhone Banner */}
      <div className="iphone-promo-banner">
        <div className="iphone-image-overlay"></div>
        <div className="banner-content-v1">
          <div className="banner-text-group">
            <h4 className="banner-subtitle">iPhone '13 Pro Max Sale!</h4>
            <p className="banner-desc">Get Yours Now and Enjoy. Limited Time Offer: Save 40% on the Ultimate Tech Upgrade!</p>
          </div>
          <button className="shop-now-btn">Shop Now</button>
        </div>
        <div className="banner-footer-url">
          <span>www.techheim.com</span>
        </div>
      </div>

      {/* AirPods Banner */}
      <div className="airpods-promo-banner">
        <div className="airpods-discount-side">
          <div className="discount-badge-white">
            <span className="upto-text">UPTO</span>
            <span className="percent-text">40%</span>
            <span className="discount-label">Discount</span>
          </div>
          <div className="airpods-product-img"></div>
        </div>
        
        <div className="airpods-offer-side">
          <div className="offer-content">
            <h4 className="offer-title">Limited Time Offer</h4>
            <p className="offer-desc">Elevate Your Audio Experience with AirPods Pro.</p>
            <button className="secondary-shop-btn">Add to cart</button>
          </div>
          <div className="banner-footer-url-orange">
            <span>www.techheim.com</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PromoBanners;
