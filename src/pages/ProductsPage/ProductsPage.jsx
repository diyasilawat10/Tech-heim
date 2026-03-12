import React from 'react';
import './ProductsPage.css';
import Breadcrumb from '../../components/Products page/Breadcrumb/Breadcrumb';
import ProductCategories from '../../components/Products page/ProductCategories/ProductCategories';

const ProductsPage = () => {
  return (
    <div className="products-page">
      <div className="products-page-container">
        <Breadcrumb />
        <ProductCategories />
        {/* Further components will be added here */}
      </div>
    </div>
  );
};

export default ProductsPage;
