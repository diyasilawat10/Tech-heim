import ProductCard from "../ProductCard/ProductCard";
import './ProductSection.css';
import randomShape from '../../../assets/images/randomshape.png';
import arrowLeft from '../../../assets/images/arrowleft.png';
import arrowRight from '../../../assets/icons/arrowright.png';
import mouseImg from '../../../assets/images/mouse.png';
import keyboardImg from '../../../assets/images/keyboard.jpg';
import appleWatchImg from '../../../assets/images/applewatch.jpg';
import macbookImg from '../../../assets/images/macbookairm2.png';
import samsungWatchImg from '../../../assets/images/samsungwatch.png';

function ProductSection() {
  return (
    <section className="section">
      <div className="container sales-section">
        <img src={randomShape} alt="" className="sales-random-shape" />

        <div className="sales-layout">
          <div className="sales-left">
            <div className="sales-text">
              <h2>Products On Sale</h2>
              <p>Shop Now!</p>
              <button className="view-all-btn">View All</button>
            </div>
          </div>

          <div className="sales-cards">
            <ProductCard
              title="Logitech G502 Gaming Mouse"
              oldPrice="38.00"
              price="19.00"
              discount="-50%"
              image={mouseImg}
            />
            <ProductCard
              title="Keyboard"
              oldPrice="49.00"
              price="34.30"
              discount="-30%"
              image={keyboardImg}
            />
            <ProductCard
              title="Apple Watch"
              oldPrice="289.00"
              price="231.20"
              discount="-20%"
              image={appleWatchImg}
            />
            <ProductCard
              title="MacBook Air"
              oldPrice="950.22"
              price="712.66"
              discount="-25%"
              image={macbookImg}
            />
            <ProductCard
              title="Samsung Watch"
              oldPrice="120.00"
              price="79.66"
              discount="-25%"
              image={samsungWatchImg}
            />
          </div>
        </div>

        <div className="sales-arrows">
          <button className="arrow">
            <img src={arrowLeft} alt="Previous" />
          </button>
          <button className="arrow">
            <img src={arrowRight} alt="Next" />
          </button>
        </div>
      </div>
    </section>
  );
}

export default ProductSection;