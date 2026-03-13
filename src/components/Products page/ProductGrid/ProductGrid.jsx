import React, { useState, useEffect } from 'react';
import './ProductGrid.css';
import ProductCard from '../ProductCard/ProductCard';
import PromoBanners from '../PromoBanners/PromoBanners';

const ProductGrid = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const categories = ['smartphones', 'laptops', 'tablets', 'mobile-accessories'];
        
        // Fetch from multiple tech-related categories
        const categoryRequests = categories.map(cat => 
          fetch(`https://dummyjson.com/products/category/${cat}`).then(res => res.json())
        );
        
        const categoryData = await Promise.all(categoryRequests);
        
        // Combine all products
        let allProducts = categoryData.flatMap(data => data.products);
        
        // Shuffle the products to mix categories
        allProducts = allProducts.sort(() => Math.random() - 0.5);

        // Map the combined data
        const mappedProducts = allProducts.map(p => ({
          id: p.id,
          title: p.title,
          price: p.price,
          oldPrice: Math.round(p.price / (1 - p.discountPercentage / 100)),
          discount: `-${Math.round(p.discountPercentage)}%`,
          rating: p.rating,
          image: p.thumbnail,
          colors: ['#000000', '#FFFFFF', '#8B8B8B']
        }));
        
        setProducts(mappedProducts);
      } catch (error) {
        console.error("Failed to fetch products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return <div className="loading-grid">Loading products...</div>;
  }

  // Chunk products into rows of 3
  const chunkedProducts = [];
  for (let i = 0; i < products.length; i += 3) {
    chunkedProducts.push(products.slice(i, i + 3));
  }

  return (
    <div className="product-grid-container">
      {chunkedProducts.map((row, rowIndex) => (
        <React.Fragment key={rowIndex}>
          <div className="product-row">
            {row.map((p, i) => (
              <ProductCard 
                key={p.id} 
                {...p} 
                isMiddle={i === 1} 
              />
            ))}
          </div>
          {/* Insert PromoBanners after the 3rd row (9 products) */}
          {rowIndex === 2 && <PromoBanners />}
        </React.Fragment>
      ))}
    </div>
  );
};

export default ProductGrid;
