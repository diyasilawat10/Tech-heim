import './Footer.css';
import locationIcon from '../../../assets/icons/location.svg';
import callIcon from '../../../assets/icons/call-calling.svg';
import smsIcon from '../../../assets/icons/sms-edit.svg';
import fbIcon from '../../../assets/icons/Facebook.svg';
import twitterIcon from '../../../assets/icons/twitter.svg';
import instaIcon from '../../../assets/icons/Instagram.svg';
import youtubeIcon from '../../../assets/icons/Youtube.svg';
import userIcon from '../../../assets/icons/user.svg';
import paypalIcon from '../../../assets/icons/paypal.svg';
import amexIcon from '../../../assets/icons/american express.svg';
import visaIcon from '../../../assets/icons/visa.svg';
import masterIcon from '../../../assets/icons/master card.svg';
import arrowUpIcon from '../../../assets/icons/back to up bottun.svg';
import chatIcon from '../../../assets/icons/online chat.svg';

function Footer() {
  const handleBackToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="footer">
      <div className="footer-main container">
        <div className="footer-mobile-top-row">
          <button className="chat-bubble">
            <img src={chatIcon} alt="Chat" />
          </button>

          <button className="back-to-top" onClick={handleBackToTop} aria-label="Back to top">
            <img src={arrowUpIcon} alt="Back to top" />
          </button>
        </div>

        <div className="footer-column footer-company">
          <h4>Company</h4>
          <p>about us</p>
          <p>blog</p>
          <p>returns</p>
          <p>order status</p>
        </div>

        <div className="footer-column footer-info">
          <h4>Info</h4>
          <p>How it works?</p>
          <p>our promises</p>
          <p>FAQ</p>
        </div>

        <div className="footer-column footer-contact">
          <h4>Contact us</h4>

          <div className="contact-item">
            <img src={locationIcon} alt="Location" />
            <p>123 Main Street, Anytown,USA</p>
          </div>
          
          <div className="contact-item">
            <img src={callIcon} alt="Call" />
            <p>+1 (555) 123-4567</p>
          </div>

          <div className="contact-item">
            <img src={smsIcon} alt="Email" />
            <p>TechHeimSupport@gmail.com</p>
          </div>
        </div>

        <div className="footer-column footer-newsletter newsletter">
          <h4>Sign up for News and updates</h4>
          <div className="newsletter-input">
            <span className="newsletter-user-icon">
              <img src={userIcon} alt="User" />
            </span>
            <span className="newsletter-label">E-mail Address</span>
            <button aria-label="Submit newsletter" />
          </div>
          <div className="social-icons social-icons-desktop">
            <img src={fbIcon} alt="Facebook" />
            <img src={twitterIcon} alt="Twitter" />
            <img src={instaIcon} alt="Instagram" />
            <img src={youtubeIcon} alt="Youtube" />
          </div>
        </div>

      </div>

      <button className="chat-bubble footer-desktop-float" aria-label="Open chat">
        <img src={chatIcon} alt="Chat" />
      </button>

      <button className="back-to-top footer-desktop-float" onClick={handleBackToTop} aria-label="Back to top">
        <img src={arrowUpIcon} alt="Back to top" />
      </button>

      <div className="payment-row container">
        <img src={paypalIcon} alt="PayPal" />
        <img src={amexIcon} alt="American Express" />
        <img src={visaIcon} alt="Visa" />
        <img src={masterIcon} alt="Mastercard" />
      </div>

      <div className="footer-mobile-bottom-row">
        <div className="payment-row-mobile">
          <img src={paypalIcon} alt="PayPal" />
          <img src={amexIcon} alt="American Express" />
          <img src={visaIcon} alt="Visa" />
          <img src={masterIcon} alt="Mastercard" />
        </div>

        <div className="social-icons social-icons-mobile">
          <img src={fbIcon} alt="Facebook" />
          <img src={twitterIcon} alt="Twitter" />
          <img src={instaIcon} alt="Instagram" />
          <img src={youtubeIcon} alt="Youtube" />
        </div>
      </div>

      <div className="footer-mobile-panels">
        <button type="button" className="footer-mobile-panel">
          <span>Company</span>
          <span className="footer-mobile-chevron" aria-hidden="true" />
        </button>
        <button type="button" className="footer-mobile-panel">
          <span>Info</span>
          <span className="footer-mobile-chevron" aria-hidden="true" />
        </button>
        <button type="button" className="footer-mobile-panel">
          <span>Contact us</span>
          <span className="footer-mobile-chevron" aria-hidden="true" />
        </button>
      </div>

      <div className="footer-bottom">
        <div className="container footer-bottom-inner">
          <p className="footer-copyright">&copy; 2023 Tech Heim.</p>

          <div className="footer-links">
            <span>cookie settings</span>
            <span>Privacy Policy</span>
            <span>Terms and Conditions</span>
            <span>Imprint</span>
          </div>
        </div>
      </div>

    </footer>
  );
}

export default Footer;
