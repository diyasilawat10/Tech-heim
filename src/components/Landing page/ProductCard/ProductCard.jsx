import { useState } from 'react';
import './ProductCard.css';

function ProductCard({
  title,
  price,
  oldPrice,
  discount,
  image,
  colors,
  hasHeart: initialHasHeart,
  rate = '4.5',
  isSmall = false,
}) {
  const [isFavorited, setIsFavorited] = useState(initialHasHeart || false);
  const visibleColors = Array.isArray(colors) ? colors.slice(0, 3) : [];
  const showColors = visibleColors.length > 0;
  // Matches design: "+" appears only for 3-color products (iPhone, S23).
  const showColorsPlus = Array.isArray(colors) && colors.length >= 3;

  const toggleFavorite = (e) => {
    e.stopPropagation(); // prevent parent clicks if any
    setIsFavorited(!isFavorited);
  };

  return (
    <div className={`sale-card ${isSmall ? 'small' : ''}`}>
      <div className="product-image-container">
        {!isSmall && (
          <div className="product-heart" onClick={toggleFavorite} role="button" aria-label="Toggle favorite">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M12.62 20.81C12.28 20.93 11.72 20.93 11.38 20.81C8.48 19.82 2 15.69 2 8.69001C2 5.60001 4.49 3.10001 7.56 3.10001C9.38 3.10001 10.99 3.98001 12 5.34001C13.01 3.98001 14.63 3.10001 16.44 3.10001C19.51 3.10001 22 5.60001 22 8.69001C22 15.69 15.52 19.82 12.62 20.81Z"
                stroke={isFavorited ? '#063A88' : '#8A8A8A'}
                fill={isFavorited ? '#063A88' : 'none'}
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        )}

        <div className="product-image" style={{ backgroundImage: `url(${image})` }}></div>

        {showColors && (
          <div className="product-colors">
            {visibleColors.map((color, idx) => (
              <div key={idx} className="product-color" style={{ background: color }}></div>
            ))}
            {showColorsPlus && <div className="product-color-plus">+</div>}
          </div>
        )}
      </div>

      <div className="product-line"></div>

      <div className="product-info">
        <div className="product-title">{title}</div>

        <div className="product-price-rate">
          <div className="product-price">
            {oldPrice && <div className="product-last-price">${oldPrice}</div>}
            <div className="product-new-price">${price}</div>
          </div>

          {!isSmall && (
            <div className="product-rate">
              <div className="product-rate-frame">
                <div className="product-star">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M13.73 3.51L15.49 7.03C15.72 7.49 16.37 7.96 16.89 8.05L20.09 8.58C22.13 8.92 22.61 10.43 21.14 11.93L18.66 14.47C18.25 14.89 18.02 15.65 18.15 16.22L18.86 19.32C19.41 21.72 18.12 22.67 15.98 21.43L12.98 19.68C12.46 19.38 11.6 19.38 11.08 19.68L8.08003 21.43C5.95003 22.66 4.65003 21.71 5.20003 19.32L5.91003 16.22C6.03003 15.66 5.80003 14.9 5.40003 14.47L2.92003 11.93C1.46003 10.43 1.93003 8.92 3.97003 8.58L7.17003 8.05C7.68003 7.96 8.33003 7.49 8.56003 7.03L10.32 3.51C11.27 1.65 12.8 1.65 13.73 3.51Z"
                      fill="#063A88"
                    />
                  </svg>
                </div>
                <div className="product-rate-text">{rate}</div>
              </div>
            </div>
          )}
        </div>
      </div>

      {discount && <div className="product-discount">{discount}</div>}
    </div>
  );
}

export default ProductCard;
