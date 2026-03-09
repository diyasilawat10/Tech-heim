import React from 'react';
import './ServiceBar.css';
import techIcon from '../../../assets/icons/tech.svg';
import guaranteeIcon from '../../../assets/icons/guarentee.svg';
import shippingIcon from '../../../assets/icons/shipping.svg';
import supportIcon from '../../../assets/icons/24hrs.svg';

const ServiceBar = () => {
    return (
        <div className="svcbar-root">
            <div className="svcbar-inner">

                <div className="svcbar-item">
                    <img src={techIcon} alt="" aria-hidden="true" className="svcbar-icon svcbar-icon-tech" />
                    <span className="svcbar-label svcbar-label-tech">Latest and Greatest Tech</span>
                </div>

                <div className="svcbar-item">
                    <img src={guaranteeIcon} alt="" aria-hidden="true" className="svcbar-icon svcbar-icon-guarantee" />
                    <span className="svcbar-label svcbar-label-guarantee">Guarantee</span>
                </div>

                <div className="svcbar-item">
                    <img src={shippingIcon} alt="" aria-hidden="true" className="svcbar-icon svcbar-icon-shipping" />
                    <span className="svcbar-label svcbar-label-shipping">Free Shipping over 1000$</span>
                </div>

                <div className="svcbar-item svcbar-item-support">
                    <img src={supportIcon} alt="" aria-hidden="true" className="svcbar-icon svcbar-icon-support" />
                    <span className="svcbar-label svcbar-label-support">24/7 Support</span>
                </div>

            </div>
        </div>
    );
};

export default ServiceBar;
