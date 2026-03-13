import React, { useState } from 'react';
import './ProductCard.css';
import shoppingCartIcon from '../../../assets/icons/basket.svg';
import heartNormalIcon from '../../../assets/icons/heartnormal.svg';
import heartBoldIcon from '../../../assets/icons/heart.svg';
import starIcon from '../../../assets/icons/Star.svg';

const ProductCard = ({ 
  title, 
  price = 0, 
  oldPrice, 
  discount, 
  rating, 
  image, 
  colors, 
  isFavorite = false,
  shadowVariant = 1,
  hasHover = true,
  isMiddle = false
}) => {
  const [isLiked, setIsLiked] = useState(isFavorite);

  const toggleLike = (e) => {
    e.stopPropagation();
    setIsLiked(prev => !prev);
  };

  return (
    <div className={`products-card shadow-variant-${shadowVariant} ${hasHover ? 'has-hover-effect' : ''} ${isMiddle ? 'is-middle' : ''}`}>
      {discount && (
        <div className="product-discount-tag">
          <span className="discount-value">{discount}</span>
        </div>
      )}

      <div className="product-image-area">
        <div 
          className="product-img" 
          style={{ backgroundImage: `url(${image})` }}
        ></div>
        
        {isMiddle && colors && (
          <div className="product-colors">
            {colors.slice(0, 3).map((color, idx) => (
              <span 
                key={idx} 
                className="color-dot" 
                style={{ backgroundColor: color }}
              ></span>
            ))}
            {colors.length > 3 && <span className="color-plus">+</span>}
          </div>
        )}

        {/* Line 3 - Divider */}
        <div className="card-divider"></div>
      </div>

      <div className="product-info">
        <h3 className="product-title">{title}</h3>
        
        <div className="card-content-stack">
          {/* Normal State: Price and Rating */}
          <div className="normal-row">
            <div className="price-area">
              {oldPrice && <span className="old-price">${Number(oldPrice).toFixed(2)}</span>}
              <span className="current-price">${Number(price).toFixed(2)}</span>
            </div>
            {rating && (
              <div className="rating-area">
                <img src={starIcon} alt="Rating" className="star-icon" />
                <span className="rating-value">{rating}</span>
              </div>
            )}
          </div>

          {/* Hover State: Add to Cart and Heart */}
          <div className="hover-row">
            <button className="add-to-cart-btn">
              <img src={shoppingCartIcon} alt="Cart" />
              <span>Add to cart</span>
            </button>
            <div className="heart-icon-wrapper" onClick={toggleLike}>
              <img 
                src={isLiked ? heartBoldIcon : heartNormalIcon} 
                alt="Favorite" 
                className={isLiked ? 'favorited' : ''} 
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
