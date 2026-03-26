import './Hero.css';
import { Link } from 'react-router-dom';
import laptopImg from '../../../assets/images/laptop.png';

function Hero() {
  return (
    <section className="hero main-section">
      <div className="hero-frame">
        <div className="hero-copy">
          <h1 className="hero-title">Tech Heim</h1>
          <h2 className="hero-subtitle">
            "Join the <span className="hero-subtitle-highlight">digital revolution</span>"
          </h2>
          <Link to="/products" className="hero-btn">
            Explore More
          </Link>
        </div>

        <img src={laptopImg} alt="Laptop showcase" className="hero-laptop" />
      </div>
    </section>
  );
}

export default Hero;
