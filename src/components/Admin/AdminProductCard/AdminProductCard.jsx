import React from 'react';
import './AdminProductCard.css';
import { getAdminIcon } from '../../../constants/adminIcons';

const AdminProductCard = ({ product, onEdit, onDelete }) => {
  return (
    <div className="admin-product-card">
      <div className="product-image-container">
        <div 
          className="product-image" 
          style={{ backgroundImage: `url(${product.image})` }}
          aria-label={product.name}
        ></div>
      </div>
      
      <div className="product-divider"></div>
      
      <div className="product-info">
        <h3 className="product-title">{product.name}</h3>
        
        <div className="product-actions-row">
          <button className="edit-action-btn" onClick={() => onEdit(product)}>
            {getAdminIcon('shopping-cart')} {/* Reusing shopping cart icon from Figma dump if needed, but user said Edit/Delete */}
            <span>Edit</span>
          </button>
          
          <button className="delete-action-btn" onClick={() => onDelete(product)} aria-label="Delete product">
            {getAdminIcon('trash')}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminProductCard;
