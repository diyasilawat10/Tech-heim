import { useState, useEffect } from 'react';
import ProductCard from "../ProductCard/ProductCard";
import './ProductSection.css';
import randomShape from '../../../assets/images/randomshape.png';

function ProductSection() {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        // Set loading state to true initially
        setIsLoading(true);

        // Fetch specifically from the smartphones and laptops endpoints
        const [smartphonesRes, laptopsRes] = await Promise.all([
          fetch('https://dummyjson.com/products/category/smartphones?limit=6'),
          fetch('https://dummyjson.com/products/category/laptops?limit=6')
        ]);

        if (!smartphonesRes.ok || !laptopsRes.ok) {
          throw new Error('Failed to fetch product data.');
        }

        const smartphonesData = await smartphonesRes.json();
        const laptopsData = await laptopsRes.json();

        // Combine the products
        const combinedProducts = [...smartphonesData.products, ...laptopsData.products];

        setProducts(combinedProducts);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <section className="sales-wrapper">
      <div className="sales-section">
        <img src={randomShape} alt="" className="sales-random-shape" />

        <div className="sales-header">
          <div className="sales-text">
            <h2>Featured Products</h2>
            <p>Top smartphones and laptops</p>
          </div>
        </div>

        <div className="sales-content">
          {isLoading && (
            <div className="status-container">
              <div className="spinner"></div>
              <p>Loading API data...</p>
            </div>
          )}

          {error && (
            <div className="status-container error">
              <p>Error: {error}</p>
            </div>
          )}

          {!isLoading && !error && products.length === 0 && (
            <div className="status-container">
              <p>No products match the selected categories.</p>
            </div>
          )}

          {!isLoading && !error && products.length > 0 && (
            <div className="product-grid">
              {products.map((item) => {
                // Calculate the original price before the exact discount
                const oldPriceCalculated = Math.round(item.price / (1 - item.discountPercentage / 100));

                return (
                  <ProductCard
                    key={item.id}
                    title={item.title}
                    oldPrice={oldPriceCalculated.toString()}
                    price={item.price.toString()}
                    discount={`-${Math.round(item.discountPercentage)}%`}
                    image={item.thumbnail}
                  />
                );
              })}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

export default ProductSection;
