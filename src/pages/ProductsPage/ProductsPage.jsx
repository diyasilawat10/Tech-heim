import React from 'react';
import './ProductsPage.css';
import Breadcrumb from '../../components/Products page/Breadcrumb/Breadcrumb';

const ProductsPage = () => {
  return (
    <div className="products-page">
      <div className="products-page-container">
        <Breadcrumb />
        {/* Further components will be added here */}
      </div>
    </div>
  );
};

export default ProductsPage;
