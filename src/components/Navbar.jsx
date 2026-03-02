function Navbar() {
  return (
    <header className="header">
      <div className="container header-inner">

        <div className="logo">
          <img src="/logo.png" alt="Logo" />
        </div>

        <nav className="navbar">
          <ul>
            <li>Home</li>
            <li>Products</li>
            <li>Blog</li>
            <li>FAQ</li>
            <li>Contact Us</li>
          </ul>
        </nav>

        <div className="nav-icons">
          <img src="/search-normal.png" alt="Search" />
          <img src="/cart.png" alt="Cart" />
          <img src="/user.png" alt="User" />
        </div>

      </div>
    </header>
  );
}

export default Navbar;