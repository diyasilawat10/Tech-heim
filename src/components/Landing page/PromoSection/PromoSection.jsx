import React from 'react';
import './PromoSection.css';
import iphoneImg from '../../../assets/images/iphones.png';
import ps5Img from '../../../assets/images/ps53.png';

const PromoSection = () => {
  const timerUnits = [
    { value: '8', label: 'Days' },
    { value: '8', label: 'Days' },
    { value: '8', label: 'Days' },
    { value: '8', label: 'Days' }
  ];

  return (
    <section className="promo-container">
      {/* IPHONE 15 BOX */}
      <div className="banner-iphone">
        <div className="iphone-ellipse-left" aria-hidden="true" />
        <div className="iphone-dot-grid-left" aria-hidden="true" />
        <div className="iphone-dot-grid-right" aria-hidden="true" />

        <h2 className="title-black">
          <span className="title-iphone-dark">Iphone </span>
          <span className="title-iphone-light">15 Series</span>
        </h2>

        <div className="timer-container">
          {timerUnits.map((item, index) => (
            <div key={index} className="timer-box">
              <span className="time-num">{item.value}</span>
              <span className="time-text">{item.label}</span>
            </div>
          ))}
        </div>

        <div className="iphone-content">
          <h3 className="sub-title-black">It feels good to be the first</h3>
          <p className="desc-text">
            Get ready for the future of smartphones. Experience innovation like never before.
            Stay tuned for the big iPhone 15 pre-sale.
          </p>
          <button className="btn-primary register-btn">Register Now</button>
        </div>

        <img src={iphoneImg} alt="iPhone 15" className="img-iphone" />
      </div>

      {/* PS5 BOX */}
      <div className="banner-ps5">
        <div className="ps5-wave" aria-hidden="true" />
        <div className="ps5-dot-grid-left" aria-hidden="true" />
        <div className="ps5-dot-grid-right" aria-hidden="true" />

        <h2 className="title-yellow">Play Station 5</h2>
        <img src={ps5Img} alt="PS5" className="img-ps5" />

        <div className="ps5-badge">Digital Edition + 2TB</div>
        <button className="btn-primary buy-btn">Buy Now</button>
      </div>
    </section>
  );
};

export default PromoSection;
