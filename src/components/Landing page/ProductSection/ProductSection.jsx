import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import ProductCard from "../ProductCard/ProductCard";
import './ProductSection.css';
import randomShape from '../../../assets/images/randomshape.png';
import arrowLeft from '../../../assets/icons/lefthover.svg';
import arrowRight from '../../../assets/icons/righthover.svg';
import arrowCircleRight from '../../../assets/icons/arrow-circle-right.svg';
import { saleProducts } from '../../../constants/mockData';

function ProductSection() {
  const CARD_WIDTH = 184;
  const CARD_GAP = 24;
  const viewportRef = useRef(null);
  const [offset, setOffset] = useState(0);
  const [viewportWidth, setViewportWidth] = useState(0);

  const trackWidth = saleProducts.length * CARD_WIDTH + (saleProducts.length - 1) * CARD_GAP;
  const maxOffset = Math.max(0, trackWidth - viewportWidth);

  useEffect(() => {
    const updateViewportWidth = () => {
      if (!viewportRef.current) {
        return;
      }

      setViewportWidth(viewportRef.current.clientWidth);
    };

    updateViewportWidth();
    window.addEventListener('resize', updateViewportWidth);

    return () => {
      window.removeEventListener('resize', updateViewportWidth);
    };
  }, []);

  useEffect(() => {
    setOffset((prev) => Math.min(prev, maxOffset));
  }, [maxOffset]);

  const handlePrev = () => {
    setOffset((prev) => Math.max(0, prev - (CARD_WIDTH + CARD_GAP)));
  };

  const handleNext = () => {
    setOffset((prev) => Math.min(maxOffset, prev + (CARD_WIDTH + CARD_GAP)));
  };

  const canGoPrev = offset > 0;
  const canGoNext = offset < maxOffset;

  return (
    <section className="sales-wrapper main-container main-section">
      <div className="sales-section">
        <img src={randomShape} alt="" className="sales-random-shape" />

        <div className="sales-left">
          <div className="sales-text">
            <h2>Products On Sale</h2>
            <p>Shop Now!</p>
          </div>
          <Link to="/products" className="sales-view-all">
            <span>View all</span>
            <img src={arrowCircleRight} alt="" aria-hidden="true" />
          </Link>
        </div>

        <div className="sales-cards-viewport" ref={viewportRef}>
          <div className="sales-cards" style={{ transform: `translateX(-${offset}px)` }}>
            {saleProducts.map((item) => (
              <ProductCard
                key={item.title}
                title={item.title}
                oldPrice={item.oldPrice}
                price={item.price}
                discount={item.discount}
                image={item.image}
                isSmall={true}
              />
            ))}
          </div>
        </div>

        <div className="sales-arrows">
          <button className="arrow" aria-label="Previous products" onClick={handlePrev} disabled={!canGoPrev}>
            <img src={arrowLeft} alt="Previous" />
          </button>
          <button className="arrow" aria-label="Next products" onClick={handleNext} disabled={!canGoNext}>
            <img src={arrowRight} alt="Next" />
          </button>
        </div>
      </div>
    </section>
  );
}

export default ProductSection;
