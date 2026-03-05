import './Hero.css';
import laptopImg from '../../../assets/images/laptop.png';

function Hero() {
  return (
    <section className="section hero">
      <div className="container hero-content">
        <div>
          <h1>Join the digital revolution</h1>
          <p>Explore innovation like never before.</p>
          <button className="primary-btn">Explore More</button>
        </div>

        <div>
          <img src={laptopImg} alt="hero" />
        </div>
      </div>
    </section>
  );
}

export default Hero;