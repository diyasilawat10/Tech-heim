import React from 'react';
import './AdminProductCard.css';
import { getAdminIcon } from '../../../constants/adminIcons';

const AdminProductCard = ({
  product,
  onEdit,
  onDelete,
  isOrderMode,
  onAddToOrder,
  onAdjustOrderQuantity,
  isAdded,
  orderQuantity = 0,
}) => {
  const productImage = Array.isArray(product.image)
    ? product.image[0]
    : product.image || product.thumbnail || product.images?.[0]?.url || product.images?.[0] || '';
  const productTitle = product.title ?? product.name ?? 'Product image unavailable';

  return (
    <div className={`admin-product-card ${isOrderMode ? 'order-mode' : ''}`}>
      <div className="product-image-container">
        {productImage ? (
          <img className="product-image" src={productImage} alt={productTitle} />
        ) : (
          <span className="product-image-fallback">{productTitle}</span>
        )}
      </div>

      <div className="product-divider"></div>

      <div className="product-info">
        <h3 className="product-title">{productTitle}</h3>

        {isOrderMode ? (
          isAdded ? (
            <div className="order-card-quantity">
              <div className="order-card-quantity__header">
                <span>Quantity</span>
                <button className="order-card-quantity__remove" type="button" onClick={() => onAddToOrder(product)}>
                  Remove
                </button>
              </div>
              <div className="order-card-quantity__controls">
                <button type="button" onClick={() => onAdjustOrderQuantity(product, -1)} aria-label={`Decrease ${productTitle} quantity`}>
                  -
                </button>
                <strong>{orderQuantity}</strong>
                <button type="button" onClick={() => onAdjustOrderQuantity(product, 1)} aria-label={`Increase ${productTitle} quantity`}>
                  +
                </button>
              </div>
            </div>
          ) : (
            <button className="add-to-order-btn" onClick={() => onAddToOrder(product)}>
              + Add to Order
            </button>
          )
        ) : (
          <div className="product-actions-row">
            <button className="edit-action-btn" onClick={() => onEdit(product)}>
              {getAdminIcon('shopping-cart')}
              <span>Edit</span>
            </button>

            <button className="delete-action-btn" onClick={() => onDelete(product)} aria-label="Delete product">
              {getAdminIcon('trash')}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminProductCard;
