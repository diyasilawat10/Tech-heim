import React, { useMemo, useState, useEffect } from 'react';
import ProductCard from "../ProductCard/ProductCard";
import './ProductSection.css';
import randomShape from '../../../assets/images/randomshape.png';
import arrowLeft from '../../../assets/icons/lefthover.svg';
import arrowRight from '../../../assets/icons/righthover.svg';

function ProductSection() {
  const CARD_WIDTH = 184;
  const CARD_GAP = 24;
  const VIEWPORT_WIDTH = 904;
  const [offset, setOffset] = useState(0);

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        // We use Promise.all to fetch smartphones and laptops to guarantee these categories
        const [phoneRes, laptopRes] = await Promise.all([
          fetch('https://dummyjson.com/products/category/smartphones'),
          fetch('https://dummyjson.com/products/category/laptops')
        ]);

        if (!phoneRes.ok || !laptopRes.ok) {
          throw new Error('Failed to fetch data');
        }

        const phoneData = await phoneRes.json();
        const laptopData = await laptopRes.json();

        // Combine the categories and grab max 12
        const combinedProducts = [...phoneData.products, ...laptopData.products].slice(0, 12);

        setProducts(combinedProducts);
      } catch (err) {
        setError(err.message || 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const maxOffset = useMemo(() => {
    const trackWidth = products.length * CARD_WIDTH + Math.max(0, products.length - 1) * CARD_GAP;
    return Math.max(0, trackWidth - VIEWPORT_WIDTH);
  }, [products]);

  const handlePrev = () => {
    setOffset((prev) => Math.max(0, prev - (CARD_WIDTH + CARD_GAP)));
  };

  const handleNext = () => {
    setOffset((prev) => Math.min(maxOffset, prev + (CARD_WIDTH + CARD_GAP)));
  };

  return (
    <section className="sales-wrapper">
      <div className="sales-section">
        <img src={randomShape} alt="random background shape" className="sales-random-shape" />

        <div className="sales-left">
          <div className="sales-text">
            <h2>Products On Sale</h2>
            <p>Shop Now!</p>
          </div>
          <button className="sales-view-all">View all &gt;</button>
        </div>

        <div className="sales-cards-viewport">
          {loading && (
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', width: '100%', fontSize: '18px', color: '#0c0c0c', position: 'absolute' }}>
              Loading...
            </div>
          )}

          {error && (
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', width: '100%', fontSize: '18px', color: 'red', position: 'absolute' }}>
              {error}
            </div>
          )}

          {!loading && !error && (
            <div className="sales-cards" style={{ transform: `translateX(-${offset}px)` }}>
              {products.map((item) => {
                const originalPrice = item.price / (1 - item.discountPercentage / 100);

                return (
                  <ProductCard
                    key={item.id}
                    title={item.title}
                    oldPrice={originalPrice.toFixed(2)}
                    price={item.price.toFixed(2)}
                    discount={`-${Math.round(item.discountPercentage)}%`}
                    image={item.thumbnail}
                  />
                );
              })}
            </div>
          )}
        </div>

        <div className="sales-arrows">
          <button className="arrow" aria-label="Previous products" onClick={handlePrev} disabled={loading || !!error || offset === 0}>
            <img src={arrowLeft} alt="Previous" />
          </button>
          <button className="arrow" aria-label="Next products" onClick={handleNext} disabled={loading || !!error || offset >= maxOffset}>
            <img src={arrowRight} alt="Next" />
          </button>
        </div>
      </div>
    </section>
  );
}

export default ProductSection;
