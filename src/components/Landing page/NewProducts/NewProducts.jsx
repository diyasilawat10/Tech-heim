import React, { useState, useEffect } from 'react';
import './NewProducts.css';
import ProductCard from '../ProductCard/ProductCard';
import arrowRightIcon from '../../../assets/icons/arrow-right.svg';

function NewProducts() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                setLoading(true);
                const res = await fetch('https://dummyjson.com/products?limit=100');
                if (!res.ok) {
                    throw new Error('Failed to fetch data');
                }

                const data = await res.json();

                // Filter the data to show only 'smartphones' and 'laptops' categories
                const filteredProducts = data.products.filter(
                    (product) => product.category === 'smartphones' || product.category === 'laptops'
                ).slice(0, 4);

                setProducts(filteredProducts);
            } catch (err) {
                setError(err.message || 'An error occurred');
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    // Placeholder colors to match Figma design mock dots exactly
    // Card 3 and 4 only have one grey dot (#B4B4B4) according to Figma
    const PLACEHOLDER_COLORS = [
        ['#51504C', '#F8F8EE', '#96B9D7'],
        ['#EADEE9', '#BCD7FF', '#8B8B8B'],
        ['#B4B4B4'],
        ['#B4B4B4'],
    ];

    return (
        <section className="new-products-section section">
            <div className="container">
                <div className="new-products-header-group">
                    <div className="new-products-header">
                        <h2 className="new-products-title">New Products</h2>
                        <button className="view-all-button">
                            <span>View all</span>
                            <img src={arrowRightIcon} alt="Arrow Right" className="view-all-icon" />
                        </button>
                    </div>
                    <hr className="header-divider" />
                </div>

                <div className="new-products-list">
                    {loading && (
                        <div style={{ display: 'flex', justifyContent: 'center', width: '100%', fontSize: '18px' }}>Loading...</div>
                    )}
                    {error && (
                        <div style={{ display: 'flex', justifyContent: 'center', width: '100%', color: 'red', fontSize: '18px' }}>{error}</div>
                    )}
                    {!loading && !error && products.map((product, index) => {
                        const originalPrice = product.price / (1 - product.discountPercentage / 100);

                        return (
                            <ProductCard
                                key={product.id}
                                title={product.title}
                                oldPrice={originalPrice.toFixed(2)}
                                price={product.price.toFixed(2)}
                                image={product.thumbnail}
                                rate={product.rating.toFixed(1)}
                                colors={PLACEHOLDER_COLORS[index % PLACEHOLDER_COLORS.length]}
                                hasHeart={false}
                            />
                        );
                    })}
                </div>
            </div>
        </section>
    );
}

export default NewProducts;
