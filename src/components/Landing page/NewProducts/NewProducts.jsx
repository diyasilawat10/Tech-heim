import React from 'react';
import { Link } from 'react-router-dom';
import './NewProducts.css';
import ProductCard from '../ProductCard/ProductCard';
import arrowRightIcon from '../../../assets/icons/arrow-circle-right.svg';
import { newProducts } from '../../../constants/mockData';

function NewProducts() {
    return (
        <section className="new-products-section main-container main-section">
                <div className="new-products-header">
                    <h2 className="new-products-title">New Products</h2>
                    <Link to="/products" className="view-all-button">
                        <span>View all</span>
                        <img src={arrowRightIcon} alt="" aria-hidden="true" className="view-all-icon" />
                    </Link>
                </div>

                <hr className="section-divider" />

                <div className="new-products-list product-grid">
                    {newProducts.slice(0, 4).map((product) => (
                        <ProductCard
                            key={product.id}
                            title={product.title}
                            price={product.price}
                            image={product.image}
                            colors={product.colors}
                            hasHeart={product.hasHeart}
                            showHeart={true}
                            heartOnHover={true}
                            rate={product.rate}
                        />
                    ))}
                </div>
        </section>
    );
}

export default NewProducts;
