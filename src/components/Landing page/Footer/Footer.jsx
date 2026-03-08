import './Footer.css';
import locationIcon from '../../../assets/icons/location.png';
import callIcon from '../../../assets/icons/call-calling.png';
import smsIcon from '../../../assets/icons/sms-edit.png';
import fbIcon from '../../../assets/icons/Facebook.png';
import twitterIcon from '../../../assets/icons/twitter.png';
import instaIcon from '../../../assets/icons/Instagram.png';
import youtubeIcon from '../../../assets/icons/Youtube.png';
import arrowIcon from '../../../assets/icons/arrow.png';
import paypalIcon from '../../../assets/icons/paypal.png';
import amexIcon from '../../../assets/icons/american express.png';
import visaIcon from '../../../assets/icons/visa.png';
import masterIcon from '../../../assets/icons/master card.png';
import arrowUpIcon from '../../../assets/icons/arrowup.png';
import chatIcon from '../../../assets/icons/chatbubble.png';

function Footer() {
  return (
    <footer className="footer">

      <div className="footer-main container">

        <div className="footer-column">
          <h4>Company</h4>
          <p>About us</p>
          <p>Blog</p>
          <p>Returns</p>
          <p>Order status</p>
        </div>

        <div className="footer-column">
          <h4>Info</h4>
          <p>How it works?</p>
          <p>Our promises</p>
          <p>FAQ</p>
        </div>

        <div className="footer-column">
          <h4>Contact us</h4>

          <div className="contact-item">
            <img src={locationIcon}/>
            <p>123 Main Street, Anytown, USA</p>
          </div>
          
          <div className="contact-item">
            <img src={callIcon}/>
            <p>+1 (555) 123-4567</p>
          </div>

          <div className="contact-item">
            <img src={smsIcon}/>
            <p>TechHeimSupport@gmail.com</p>
          </div>

          <div className="social-icons">
            <img src={fbIcon} alt="Facebook" />
            <img src={twitterIcon} alt="Twitter" />
            <img src={instaIcon} alt="Instagram" />
            <img src={youtubeIcon} alt="Youtube" />
          </div>
        </div>

        <div className="footer-column newsletter">
          <h4>Sign up for News and updates</h4>
          <div className="newsletter-input">
            <input type="email" placeholder="Enter your email" />
            <button>
              <img src={arrowIcon} alt="Arrow" />
            </button>
          </div>
        </div>

      </div>

      <div className="payment-row container">
        <img src={paypalIcon} alt="PayPal" />
        <img src={amexIcon} alt="American Express" />
        <img src={visaIcon} alt="Visa" />
        <img src={masterIcon} alt="Mastercard" />
      </div>

      <div className="footer-bottom">
        <div className="container footer-bottom-inner">
          <p>&copy; 2023 Tech Heim.</p>

          <div className="footer-links">
            <span>Cookie settings</span>
            <span>Privacy Policy</span>
            <span>Terms and Conditions</span>
            <span>Imprint</span>
          </div>
        </div>
      </div>

      <button className="back-to-top">
        <img src={arrowUpIcon} alt="Back to top" />
      </button>

      <button className="chat-bubble">
        <img src={chatIcon} alt="Chat" />
      </button>

    </footer>
  );
}

export default Footer;
