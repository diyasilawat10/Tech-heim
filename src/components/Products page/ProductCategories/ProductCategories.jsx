import React, { useState } from 'react';
import './ProductCategories.css';

// Import icons
import mobileIcon from '../../../assets/icons/mobile.svg';
import laptopIcon from '../../../assets/icons/monitor.svg';
import tabletIcon from '../../../assets/icons/mobile1.svg';
import audioIcon from '../../../assets/icons/headphones.svg';
import wearableIcon from '../../../assets/icons/watch-status.svg';
import cameraIcon from '../../../assets/icons/camera.svg';
import gamingIcon from '../../../assets/icons/game.svg';
import networkIcon from '../../../assets/icons/data.svg';
import accessoriesIcon from '../../../assets/icons/devices.svg';

const categories = [
  { id: 'mobile', label: 'Mobile', icon: mobileIcon },
  { id: 'laptop', label: 'Laptop', icon: laptopIcon },
  { id: 'tablet', label: 'Tablet', icon: tabletIcon },
  { id: 'audio', label: 'Audio', icon: audioIcon },
  { id: 'wearable', label: 'Wearable', icon: wearableIcon },
  { id: 'camera', label: 'Camera', icon: cameraIcon },
  { id: 'gaming', label: 'Gaming', icon: gamingIcon },
  { id: 'network', label: 'Network', icon: networkIcon },
  { id: 'accessories', label: 'Accessories', icon: accessoriesIcon },
];

const ProductCategories = () => {
  const [activeCategory, setActiveCategory] = useState('laptop'); // Laptop is active in the image

  return (
    <div className="product-categories-wrapper">
      <div className="product-categories">
        {categories.map((category) => (
          <div
            key={category.id}
            className={`product-category-item ${activeCategory === category.id ? 'active' : ''}`}
            onClick={() => setActiveCategory(category.id)}
          >
            <div className="category-icon-wrapper">
              <img src={category.icon} alt={category.label} className="category-icon" />
            </div>
            <span className="category-label">{category.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductCategories;
