import React, { useState, useRef, useEffect } from 'react';
import './Sort.css';
import arrowDownIcon from '../../../assets/icons/arrow-down.svg';

const Sort = ({ onSortChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedSort, setSelectedSort] = useState('popularity');
  const dropdownRef = useRef(null);

  const sortOptions = [
    { id: 'popularity', label: 'Popularity' },
    { id: 'price-asc', label: 'Price: ascending' },
    { id: 'price-desc', label: 'Price: descending' },
    { id: 'new-arrivals', label: 'New Arrivals' }
  ];

  const handleToggle = () => setIsOpen(!isOpen);

  const handleSelect = (option) => {
    setSelectedSort(option.id);
    setIsOpen(false);
    if (onSortChange) {
      onSortChange(option.id);
    }
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const currentLabel = selectedSort === 'popularity' ? 'featured' : (sortOptions.find(opt => opt.id === selectedSort)?.label || 'featured');

  return (
    <div className="sort-container" ref={dropdownRef}>
      <div 
        className={`sort-box ${isOpen ? 'expanded' : 'closed'}`} 
        onClick={handleToggle}
        onMouseDown={(e) => e.currentTarget.classList.add('clicking')}
        onMouseUp={(e) => e.currentTarget.classList.remove('clicking')}
        onMouseLeave={(e) => e.currentTarget.classList.remove('clicking')}
      >
        <span className="sort-by-text">Sort by:</span>
        <div className="sort-selected-wrapper">
          <span className="current-selection">{currentLabel}</span>
          <img 
            src={arrowDownIcon} 
            alt="toggle sort" 
            className={`sort-arrow ${isOpen ? 'rotate' : ''}`} 
          />
        </div>
      </div>

      <div className={`sort-dropdown ${isOpen ? 'show' : ''}`}>
        {sortOptions.map((option) => (
          <div 
            key={option.id} 
            className={`sort-option ${selectedSort === option.id ? 'selected' : ''}`} 
            onClick={() => handleSelect(option)}
          >
            <span className="option-text">{option.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Sort;
