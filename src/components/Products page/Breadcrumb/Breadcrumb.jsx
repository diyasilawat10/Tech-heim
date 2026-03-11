import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Breadcrumb.css';

const Breadcrumb = () => {
    const location = useLocation();
    
    return (
        <nav className="breadcrumb" aria-label="Breadcrumb">
            <div className="breadcrumb-item">
                <Link to="/" className="breadcrumb-link gray">Home</Link>
            </div>
            
            <div className="breadcrumb-arrow">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M10 16L14 12L10 8" stroke="#717171" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
            </div>

            <div className="breadcrumb-item active-border">
                <span className="breadcrumb-link primary">Products</span>
            </div>
        </nav>
    );
};

export default Breadcrumb;
