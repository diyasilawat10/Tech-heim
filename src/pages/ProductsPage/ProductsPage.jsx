import React, { useState } from 'react';
import Navbar from '../../components/Landing page/Navbar/Navbar';
import Breadcrumb from '../../components/Products page/Breadcrumb/Breadcrumb';
import ProductCategories from '../../components/Products page/ProductCategories/ProductCategories';
import FilterChips from '../../components/Products page/FilterChips/FilterChips';
import Filters from '../../components/Products page/Filters/Filters';
import ProductGrid from '../../components/Products page/ProductGrid/ProductGrid';
import './ProductsPage.css';

const ProductsPage = () => {
  const [filters, setFilters] = useState({
    Brand: ['Apple'],
    Color: [],
    Discount: true,
    Price: [0, 5000],
    RAM: ['12 GB'],
    'Screen Size': ['15" - 15.9"'],
    Processor: ['AMD Ryzen 9'],
    'GPU Brand': ['NVIDA', 'Intel'],
    'Drive Size': ['128GB']
  });

  const toggleFilter = (category, value) => {
    setFilters(prev => {
      const current = prev[category];
      if (category === 'Discount') {
        return { ...prev, Discount: !prev.Discount };
      }
      if (category === 'Price') {
        return { ...prev, Price: value };
      }
      
      if (current.includes(value)) {
        return { ...prev, [category]: current.filter(item => item !== value) };
      } else {
        return { ...prev, [category]: [...current, value] };
      }
    });
  };

  const removeFilterChip = (category, value) => {
    if (category === 'Price') {
      setFilters(prev => ({ ...prev, Price: [0, 5000] }));
      return;
    }
    toggleFilter(category, value);
  };

  const clearAllFilters = () => {
    setFilters({
      Brand: [],
      Color: [],
      Discount: false,
      Price: [0, 5000],
      RAM: [],
      'Screen Size': [],
      Processor: [],
      'GPU Brand': [],
      'Drive Size': []
    });
  };

  return (
    <div className="products-page">
      <Navbar />
      <div className="products-page-content">
        <Breadcrumb />
        <ProductCategories />
        <FilterChips 
          filters={filters} 
          onRemove={removeFilterChip} 
          onClearAll={clearAllFilters} 
        />
        <div className="horizontal-layout">
          <Filters 
            filters={filters} 
            onToggle={toggleFilter} 
            onClearAll={clearAllFilters}
          />
          <div className="main-products-area">
            <ProductGrid />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductsPage;
