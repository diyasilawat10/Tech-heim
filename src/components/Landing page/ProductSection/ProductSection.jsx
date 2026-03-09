import { useMemo, useState } from 'react';
import ProductCard from "../ProductCard/ProductCard";
import './ProductSection.css';
import randomShape from '../../../assets/images/randomshape.png';
import arrowLeft from '../../../assets/icons/lefthover.svg';
import arrowRight from '../../../assets/icons/righthover.svg';
import mouseImg from '../../../assets/images/mouse.png';
import keyboardImg from '../../../assets/images/keyboard.jpg';
import appleWatchImg from '../../../assets/images/applewatch.jpg';
import macbookImg from '../../../assets/images/macbookairm2.png';
import samsungWatchImg from '../../../assets/images/samsungwatch.png';

function ProductSection() {
  const saleItems = [
    {
      title: 'Logitech G502 Gaming Mouse',
      oldPrice: '38.00',
      price: '19.00',
      discount: '-50%',
      image: mouseImg
    },
    {
      title: 'NPET K10 Wired Gaming Keyboard, LED Backlit, Spill-Proof',
      oldPrice: '49.00',
      price: '34.30',
      discount: '-30%',
      image: keyboardImg
    },
    {
      title: 'Apple Watch Series 7 (GPS, 41MM)',
      oldPrice: '289.00',
      price: '231.20',
      discount: '-20%',
      image: appleWatchImg
    },
    {
      title: 'Apple 2022 MacBook Air M2 Chip (8GB RAM, 256GB SSD)',
      oldPrice: '950.22',
      price: '712.66',
      discount: '-25%',
      image: macbookImg
    },
    {
      title: 'Samsung Titan Smart Watch',
      oldPrice: '120.00',
      price: '79.66',
      discount: '-17%',
      image: samsungWatchImg
    }
  ];

  const CARD_WIDTH = 184;
  const CARD_GAP = 24;
  const VIEWPORT_WIDTH = 902;
  const [offset, setOffset] = useState(0);

  const maxOffset = useMemo(() => {
    const trackWidth = saleItems.length * CARD_WIDTH + (saleItems.length - 1) * CARD_GAP;
    return Math.max(0, trackWidth - VIEWPORT_WIDTH);
  }, [saleItems.length]);

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
            {saleItems.map((item) => (
              <ProductCard
                key={item.title}
                title={item.title}
                oldPrice={item.oldPrice}
                price={item.price}
                discount={item.discount}
                image={item.image}
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
