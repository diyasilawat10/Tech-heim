function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-grid">
        <div>
          <h3>Tech Heim</h3>
          <p>Latest and Greatest Tech</p>
        </div>

        <div>
          <h4>Company</h4>
          <p>About Us</p>
          <p>Blog</p>
          <p>Returns</p>
        </div>

        <div>
          <h4>Support</h4>
          <p>FAQ</p>
          <p>Contact</p>
        </div>

        <div>
          <h4>Subscribe</h4>
          <input type="email" placeholder="E-mail Address" />
        </div>
      </div>
    </footer>
  );
}

export default Footer;