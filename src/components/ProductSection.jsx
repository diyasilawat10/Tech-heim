import ProductCard from "./ProductCard";

function ProductSection() {
  return (
    <section className="section">
      <div className="container sales-section">

        <div className="sales-layout">

          {/* LEFT SIDE */}
          <div className="sales-left">
            <img
              src="/blue-shape.png"
              alt=""
              className="sales-shape"
            />

            <div className="sales-text">
              <h2>Products On Sale</h2>
              <p>Shop Now!</p>
            </div>
          </div>

          {/* RIGHT SIDE CARDS */}
          <div className="sales-cards">
            <ProductCard
              title="Logitech G502 Gaming Mouse"
              oldPrice="38.00"
              price="19.00"
              discount="-50%"
              image="/mouse.png"
            />
            <ProductCard
              title="Keyboard"
              oldPrice="49.00"
              price="34.30"
              discount="-30%"
              image="/keyboard.jpg"
            />
            <ProductCard
              title="Apple Watch"
              oldPrice="289.00"
              price="231.20"
              discount="-20%"
              image="/applewatch.jpg"
            />
            <ProductCard
              title="MacBook Air"
              oldPrice="950.22"
              price="712.66"
              discount="-25%"
              image="/macbookairm2.png"
            />
            <ProductCard
              title="sansung Watch"
              oldPrice="120.00"
              price="79.66"
              discount="-25%"
              image="/samsungwatch.png"
            />
          </div>

        </div>

        <div className="sales-arrows">
          <button className="arrow">&#8592;</button>
          <button className="arrow">&#8594;</button>
        </div>

      </div>
    </section>
  );
}

export default ProductSection;