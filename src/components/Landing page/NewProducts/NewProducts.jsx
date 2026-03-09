import React from 'react';
import './NewProducts.css';
import ProductCard from '../ProductCard/ProductCard';
import arrowRightIcon from '../../../assets/icons/arrow-right.svg';
import { newProducts } from '../../../constants/mockData';

function NewProducts() {
    return (
        <section className="new-products-section section">
            <div className="container">
                <div className="new-products-header">
                    <h2 className="new-products-title">New Products</h2>
                    <button className="view-all-button">
                        <span>View all</span>
                        <img src={arrowRightIcon} alt="Arrow Right" className="view-all-icon" />
                    </button>
                </div>

                <hr className="header-divider" />

                <div className="new-products-list">
                    {newProducts.slice(0, 4).map((product) => (
                        <ProductCard
                            key={product.id}
                            title={product.title}
                            price={product.price}
                            image={product.image}
                            colors={product.colors}
                            hasHeart={product.hasHeart}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}

export default NewProducts;
