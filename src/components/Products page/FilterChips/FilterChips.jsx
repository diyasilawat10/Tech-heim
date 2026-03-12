import React, { useState } from 'react';
import './FilterChips.css';
import closeSquareIcon from '../../../assets/icons/close-square.svg';

const initialChips = [
  { id: 1, label: 'Silver' },
  { id: 2, label: 'Intel Core i9' },
  { id: 3, label: 'Apple' },
  { id: 4, label: '12 GB' },
  { id: 5, label: 'Silver' },
];

const FilterChips = ({ filters, onRemove }) => {
  const getActiveChips = () => {
    const chips = [];
    Object.keys(filters).forEach(category => {
      const value = filters[category];
      if (category === 'Discount') {
        if (value) chips.push({ category, label: 'Discount', value: true });
      } else if (category === 'Price') {
        if (value[0] > 0 || value[1] < 5000) {
          chips.push({ category, label: `Price: $${value[0]} - $${value[1]}`, value });
        }
      } else if (Array.isArray(value)) {
        value.forEach(item => {
          chips.push({ category, label: item, value: item });
        });
      }
    });
    return chips;
  };

  const chips = getActiveChips();

  return (
    <div className="filter-chips-wrapper">
      <div className="filter-chips">
        {chips.map((chip, index) => (
          <div key={`${chip.category}-${index}`} className="filter-chip">
            <span className="chip-label">{chip.label}</span>
            <div className="chip-close-icon" onClick={() => onRemove(chip.category, chip.value)}>
              <img src={closeSquareIcon} alt="Remove" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FilterChips;
