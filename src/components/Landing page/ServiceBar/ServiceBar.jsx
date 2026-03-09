import React from 'react';
import './ServiceBar.css';
import { serviceItems } from '../../../constants/mockData';

const ServiceBar = () => {
    return (
        <div className="svcbar-root">
            <div className="svcbar-inner">
                {serviceItems.map((item) => (
                    <div
                        key={item.label}
                        className={`svcbar-item${item.itemClass ? ` ${item.itemClass}` : ''}`}
                    >
                        <img
                            src={item.icon}
                            alt=""
                            aria-hidden="true"
                            className={`svcbar-icon ${item.iconClass}`}
                        />
                        <span className={`svcbar-label ${item.labelClass}`}>{item.label}</span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ServiceBar;
