function ProductCard({ title, price, oldPrice, discount, image }) {
  return (
    <div className="sale-card">
      <div className="discount-badge">{discount}</div>

      <img src={image} alt={title} />

      <div className="card-info">
        <p className="card-title">{title}</p>

        <div className="card-prices">
          <span className="old-price">${oldPrice}</span>
          <span className="new-price">${price}</span>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;