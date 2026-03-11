import React from 'react';
import './WatchBanner.css';
import watchImage from '../../../assets/images/watchbanner.png';
import ellipseImage from '../../../assets/icons/Ellipse 525.svg';

const WatchBanner = () => {
  return (
    <section className="watch-banner main-container main-section">
      <img src={ellipseImage} alt="" aria-hidden="true" className="watch-banner__ellipse" />

      <div className="watch-banner__content">
        <h2 className="watch-banner__title">SMART WATCH</h2>
        <p className="watch-banner__subtitle">Various designs and brands</p>
        <button className="watch-banner__button">
          <span className="watch-banner__button-label">Shop Now</span>
        </button>
      </div>

      <div className="watch-banner__visual">
        <img src={watchImage} alt="Smart watches" className="watch-banner__image" />
      </div>
    </section>
  );
};

export default WatchBanner;
