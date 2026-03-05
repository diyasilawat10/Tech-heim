import React from 'react';
import './NewProducts.css';
import ProductCard from '../ProductCard/ProductCard';

import smartphoneImg from '../../../assets/images/iphone13promax.png';
import laptopImg from '../../../assets/images/MAC.png';
import headsetImg from '../../../assets/images/headset.png'
import s23Img from '../../../assets/images/galaxys23.png';
import arrowRightIcon from '../../../assets/icons/arrow-right.svg';

const newProductsData = [
    {
        id: 1,
        title: 'iPhone 14 promax 256 gig',
        price: '930.90',
        image: smartphoneImg,
        colors: ['#51504C', '#F8F8EE', '#96B9D7'],
        hasHeart: false
    },
    {
        id: 2,
        title: 'Blackmagic Pocket Cinema',
        price: '2535.00',
        image: laptopImg,
        colors: [],
        hasHeart: false
    },
    {
        id: 3,
        title: 'SAMSUNG Galaxy S23 Ultra',
        image: s23Img,
        price: '1018.00',
        colors: ['#EADEE9', '#BCD7FF', '#8B8B8B'],
        hasHeart: false
    },
    {
        id: 4,
        title: 'VR VisionTech X1 ',
        price: '2499.00',
        image: headsetImg,
        colors: ['#B4B4B4'],
        hasHeart: false
    },
    {
        id: 5,
        title: 'Galaxy S23 Ultra',
        price: '1100.00',
        image: smartphoneImg,
        colors: [],
        hasHeart: false
    }
];

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
                    {newProductsData.slice(0, 4).map((product) => (
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
