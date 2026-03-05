import './PromoSection.css';

function PromoSection() {
  return (
    <section className="section">
      <div className="container banner-grid">
        <div className="banner blue">
          <h3>iPhone 15 Series</h3>
          <p>It feels good to be the first</p>
          <button className="primary-btn">Register Now</button>
        </div>

        <div className="banner orange">
          <h3>PlayStation 5</h3>
          <p>Digital Edition + 2TB</p>
          <button className="primary-btn">Buy Now</button>
        </div>
      </div>
    </section>
  );
}

export default PromoSection;