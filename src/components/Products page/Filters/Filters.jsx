import React, { useState } from 'react';
import './Filters.css';
import arrowDownIcon from '../../../assets/icons/arrow-down.svg';

const FilterSection = ({ title, children, defaultExpanded = true, isSummary = false }) => {
  const [expanded, setExpanded] = useState(defaultExpanded);

  return (
    <div className={`filters-general ${expanded ? 'expanded' : 'collapsed'}`}>
      <div className="section-header" onClick={() => setExpanded(!expanded)}>
        <span className="section-title">{title}</span>
        {!isSummary && (
          <img 
            src={arrowDownIcon} 
            alt="toggle" 
            className={`arrow-icon ${expanded ? 'rotate-180' : ''}`} 
          />
        )}
      </div>
      {expanded && <div className="section-content">{children}</div>}
    </div>
  );
};

const Filters = ({ filters, onToggle, onClearAll }) => {
  const priceRangeMax = 5000;
  const minPrice = filters.Price[0];
  const maxPrice = filters.Price[1];

  const handleMinPriceChange = (e) => {
    const value = Math.min(Number(e.target.value), maxPrice - 100);
    onToggle('Price', [value, maxPrice]);
  };

  const handleMaxPriceChange = (e) => {
    const value = Math.max(Number(e.target.value), minPrice + 100);
    onToggle('Price', [minPrice, value]);
  };

  return (
    <div className="filters-container">
      {/* Header */}
      <div className="filters-header">
        <span className="header-title">Filters</span>
        <button className="clear-all-btn" onClick={onClearAll}>Clear all</button>
      </div>

      {/* Brand */}
      <FilterSection title="Brand">
        <div className="filter-options">
          {[
            { name: 'Asus', count: 183 },
            { name: 'Acer', count: 78 },
            { name: 'Apple', count: 223 },
            { name: 'Dell', count: 53 },
          ].map((brand) => (
            <div key={brand.name} className="filter-option">
              <label className="checkbox-container">
                <input 
                  type="checkbox" 
                  checked={filters.Brand.includes(brand.name)} 
                  onChange={() => onToggle('Brand', brand.name)}
                />
                <span className="checkmark"></span>
                <span className="option-label">{brand.name}</span>
                <span className="option-count">({brand.count})</span>
              </label>
            </div>
          ))}
        </div>
      </FilterSection>

      {/* Color */}
      <FilterSection title="Color" defaultExpanded={false}>
        <div className="filter-options">
          {[
            { name: 'Black', color: '#000000' },
            { name: 'Silver', color: '#C0C0C0' },
            { name: 'White', color: '#FFFFFF' },
            { name: 'Gray', color: '#808080' },
          ].map((color) => (
            <div key={color.name} className="filter-option">
              <label className="checkbox-container">
                <input 
                  type="checkbox" 
                  checked={filters.Color.includes(color.name)}
                  onChange={() => onToggle('Color', color.name)}
                />
                <span className="checkmark"></span>
                <span className="color-dot" style={{ backgroundColor: color.color, border: color.name === 'White' ? '1px solid #ddd' : 'none' }}></span>
                <span className="option-label">{color.name}</span>
              </label>
            </div>
          ))}
        </div>
      </FilterSection>

      {/* Discount */}
      <div className="filters-general discount-section">
        <div className="section-header no-arrow">
          <span className="section-title">Discount</span>
          <label className="switch">
            <input 
              type="checkbox" 
              checked={filters.Discount} 
              onChange={() => onToggle('Discount', !filters.Discount)} 
            />
            <span className="slider round"></span>
          </label>
        </div>
      </div>

      {/* Price */}
      <FilterSection title="Price">
        <div className="price-inputs">
          <div className="price-input-box">
            <input 
              type="number" 
              className="price-input" 
              value={minPrice} 
              onChange={(e) => onToggle('Price', [Number(e.target.value), maxPrice])}
              placeholder="min."
            />
          </div>
          <div className="price-input-box">
            <input 
              type="number" 
              className="price-input" 
              value={maxPrice} 
              onChange={(e) => onToggle('Price', [minPrice, Number(e.target.value)])}
              placeholder="max."
            />
          </div>
        </div>
        <div className="price-range-slider">
          <div className="range-slider-wrapper">
            <input
              type="range"
              min="0"
              max={priceRangeMax}
              value={minPrice}
              onChange={handleMinPriceChange}
              className="thumb thumb-left"
            />
            <input
              type="range"
              min="0"
              max={priceRangeMax}
              value={maxPrice}
              onChange={handleMaxPriceChange}
              className="thumb thumb-right"
            />
            <div className="slider-track"></div>
            <div 
              className="slider-range" 
              style={{
                left: `${(minPrice / priceRangeMax) * 100}%`,
                width: `${((maxPrice - minPrice) / priceRangeMax) * 100}%`
              }}
            ></div>
          </div>
        </div>
      </FilterSection>

      {/* RAM */}
      <FilterSection title="RAM">
        <div className="filter-options">
          {[
            { name: '32 GB', count: 45 },
            { name: '16 GB', count: 120 },
            { name: '12 GB', count: 85 },
            { name: '8 GB', count: 210 },
          ].map((ram) => (
            <div key={ram.name} className="filter-option">
              <label className="checkbox-container">
                <input 
                  type="checkbox" 
                  checked={filters.RAM.includes(ram.name)} 
                  onChange={() => onToggle('RAM', ram.name)}
                />
                <span className="checkmark"></span>
                <span className="option-label">{ram.name}</span>
                <span className="option-count">({ram.count})</span>
              </label>
            </div>
          ))}
        </div>
      </FilterSection>

      {/* Screen Size */}
      <FilterSection title="Screen Size">
         <div className="filter-options">
          {[
            { name: '13" - 13.9"', count: 32 },
            { name: '14" - 14.9"', count: 88 },
            { name: '15" - 15.9"', count: 154 },
            { name: '16" - 16.9"', count: 53 },
          ].map((size) => (
            <div key={size.name} className="filter-option">
              <label className="checkbox-container">
                <input 
                  type="checkbox" 
                  checked={filters['Screen Size'].includes(size.name)} 
                  onChange={() => onToggle('Screen Size', size.name)}
                />
                <span className="checkmark"></span>
                <span className="option-label">{size.name}</span>
                <span className="option-count">({size.count})</span>
              </label>
            </div>
          ))}
        </div>
      </FilterSection>

      {/* Processor */}
      <FilterSection title="Processor">
         <div className="filter-options">
          {[
            { name: 'Intel Core i5', count: 95 },
            { name: 'Intel Core i7', count: 142 },
            { name: 'Intel Core i9', count: 64 },
            { name: 'AMD Ryzen 9', count: 58 },
          ].map((proc) => (
            <div key={proc.name} className="filter-option">
              <label className="checkbox-container">
                <input 
                  type="checkbox" 
                  checked={filters.Processor.includes(proc.name)} 
                  onChange={() => onToggle('Processor', proc.name)}
                />
                <span className="checkmark"></span>
                <span className="option-label">{proc.name}</span>
                <span className="option-count">({proc.count})</span>
              </label>
            </div>
          ))}
        </div>
      </FilterSection>

      {/* GPU Brand */}
      <FilterSection title="GPU Brand">
         <div className="filter-options">
          {[
            { name: 'NVIDA', count: 185 },
            { name: 'Intel', count: 42 },
            { name: 'AMD', count: 31 },
            { name: 'Apple', count: 12 },
          ].map((gpu) => (
            <div key={gpu.name} className="filter-option">
              <label className="checkbox-container">
                <input 
                  type="checkbox" 
                  checked={filters['GPU Brand'].includes(gpu.name)}
                  onChange={() => onToggle('GPU Brand', gpu.name)}
                />
                <span className="checkmark"></span>
                <span className="option-label">{gpu.name}</span>
                <span className="option-count">({gpu.count})</span>
              </label>
            </div>
          ))}
        </div>
      </FilterSection>

       {/* Drive Size */}
       <FilterSection title="Drive Size">
         <div className="filter-options">
          {[
            { name: '512GB', count: 185 },
            { name: '256GB', count: 42 },
            { name: '64GB', count: 10 },
            { name: '128GB', count: 24 },
          ].map((drive) => (
            <div key={drive.name} className="filter-option">
              <label className="checkbox-container">
                <input 
                  type="checkbox" 
                  checked={filters['Drive Size'].includes(drive.name)}
                  onChange={() => onToggle('Drive Size', drive.name)}
                />
                <span className="checkmark"></span>
                <span className="option-label">{drive.name}</span>
                <span className="option-count">({drive.count})</span>
              </label>
            </div>
          ))}
        </div>
      </FilterSection>
    </div>
  );
};

export default Filters;

