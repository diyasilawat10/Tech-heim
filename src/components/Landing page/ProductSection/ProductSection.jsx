import { useMemo, useState } from 'react';
import ProductCard from "../ProductCard/ProductCard";
import './ProductSection.css';
import randomShape from '../../../assets/images/randomshape.png';
import arrowLeft from '../../../assets/icons/lefthover.svg';
import arrowRight from '../../../assets/icons/righthover.svg';
import { saleProducts } from '../../../constants/mockData';

function ProductSection() {
  const CARD_WIDTH = 184;
  const CARD_GAP = 24;
  const VIEWPORT_WIDTH = 902;
  const [offset, setOffset] = useState(0);

  const maxOffset = useMemo(() => {
    const trackWidth = saleProducts.length * CARD_WIDTH + (saleProducts.length - 1) * CARD_GAP;
    return Math.max(0, trackWidth - VIEWPORT_WIDTH);
  }, []);

  const handlePrev = () => {
    setOffset((prev) => Math.max(0, prev - (CARD_WIDTH + CARD_GAP)));
  };

  const handleNext = () => {
    setOffset((prev) => Math.min(maxOffset, prev + (CARD_WIDTH + CARD_GAP)));
  };

  return (
    <section className="sales-wrapper">
      <div className="sales-section">
        <img src={randomShape} alt="" className="sales-random-shape" />

        <div className="sales-left">
          <div className="sales-text">
            <h2>Products On Sale</h2>
            <p>Shop Now!</p>
          </div>
          <button className="sales-view-all">View all &gt;</button>
        </div>

        <div className="sales-cards-viewport">
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
          <button className="arrow" aria-label="Previous products" onClick={handlePrev}>
            <img src={arrowLeft} alt="Previous" />
          </button>
          <button className="arrow" aria-label="Next products" onClick={handleNext}>
            <img src={arrowRight} alt="Next" />
          </button>
        </div>
      </div>
    </section>
  );
}

export default ProductSection;
