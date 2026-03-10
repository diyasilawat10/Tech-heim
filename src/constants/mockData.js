import mouseImg from '../assets/images/mouse.png';
import keyboardImg from '../assets/images/keyboard.jpg';
import appleWatchImg from '../assets/images/applewatch.jpg';
import macbookImg from '../assets/images/macbookairm2.png';
import samsungWatchImg from '../assets/images/samsungwatch.png';

import smartphoneImg from '../assets/images/iphone13promax.png';
import laptopImg from '../assets/images/MAC.png';
import headsetImg from '../assets/images/headset.png';
import s23Img from '../assets/images/galaxys23.png';

import techIcon from '../assets/icons/tech.svg';
import guaranteeIcon from '../assets/icons/guarentee.svg';
import shippingIcon from '../assets/icons/shipping.svg';
import supportIcon from '../assets/icons/24hrs.svg';

export const navLinks = ['Home', 'Products', 'Blog', 'FAQ', 'Contact Us'];

export const timerUnits = [
    { value: '08', label: 'Days' },
    { value: '08', label: 'Hours' },
    { value: '08', label: 'Minutes' },
    { value: '08', label: 'Seconds' },
];

export const saleProducts = [
    {
        title: 'Logitech G502 Gaming Mouse',
        oldPrice: '38.00',
        price: '19.00',
        discount: '-50%',
        image: mouseImg,
    },
    {
        title: 'NPET K10 Wired Gaming Keyboard, LED Backlit, Spill-Proof',
        oldPrice: '49.00',
        price: '34.30',
        discount: '-30%',
        image: keyboardImg,
    },
    {
        title: 'Apple Watch Series 7 (GPS, 41MM)',
        oldPrice: '289.00',
        price: '231.20',
        discount: '-20%',
        image: appleWatchImg,
    },
    {
        title: 'Apple 2022 MacBook Air M2 Chip (8GB RAM, 256GB SSD)',
        oldPrice: '950.22',
        price: '712.66',
        discount: '-25%',
        image: macbookImg,
    },
    {
        title: 'Samsung Titan Smart Watch',
        oldPrice: '120.00',
        price: '79.66',
        discount: '-17%',
        image: samsungWatchImg,
    },
];

export const newProducts = [
    {
        id: 1,
        title: 'iPhone 14 promax 256 gig',
        price: '930.90',
        image: smartphoneImg,
        colors: ['#51504C', '#F8F8EE', '#96B9D7'],
        hasHeart: false,
    },
    {
        id: 2,
        title: 'Blackmagic Pocket Cinema',
        price: '2535.00',
        image: laptopImg,
        colors: [],
        hasHeart: false,
    },
    {
        id: 3,
        title: 'SAMSUNG Galaxy S23 Ultra',
        price: '1018.00',
        image: s23Img,
        colors: ['#EADEE9', '#BCD7FF', '#8B8B8B'],
        hasHeart: false,
    },
    {
        id: 4,
        title: 'VR VisionTech X1',
        price: '1,399.00',
        image: headsetImg,
        colors: ['#B4B4B4'],
        hasHeart: false,
        rate: '3.9',
    },
    {
        id: 5,
        title: 'Galaxy S23 Ultra',
        price: '1100.00',
        image: smartphoneImg,
        colors: [],
        hasHeart: false,
    },
];

export const serviceItems = [
    {
        icon: techIcon,
        label: 'Latest and Greatest Tech',
        iconClass: 'svcbar-icon-tech',
        labelClass: 'svcbar-label-tech',
    },
    {
        icon: guaranteeIcon,
        label: 'Guarantee',
        iconClass: 'svcbar-icon-guarantee',
        labelClass: 'svcbar-label-guarantee',
    },
    {
        icon: shippingIcon,
        label: 'Free Shipping over 1000$',
        iconClass: 'svcbar-icon-shipping',
        labelClass: 'svcbar-label-shipping',
    },
    {
        icon: supportIcon,
        label: '24/7 Support',
        iconClass: 'svcbar-icon-support',
        labelClass: 'svcbar-label-support',
        itemClass: 'svcbar-item-support',
    },
];
