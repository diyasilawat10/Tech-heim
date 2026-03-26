import smartphoneImg from '../assets/images/iphone13promax.png';
import macbookImg from '../assets/images/macbookairm2.png';
import headsetImg from '../assets/images/headset.png';
import keyboardImg from '../assets/images/keyboard.jpg';

export const demoOrders = [
  {
    id: 1001,
    status: 'Processing',
    createdAt: '2026-03-21T10:30:00.000Z',
    total: 2529.98,
    user: {
      name: 'Aarav Sharma',
      email: 'aarav.sharma@example.com',
    },
    shippingAddress: {
      line1: '221 MG Road',
      city: 'Bengaluru',
      state: 'Karnataka',
      postalCode: '560001',
      country: 'India',
    },
    paymentMethod: 'Credit Card',
    transactionId: 'TXN-1001-AB12',
    items: [
      {
        price: 1299.99,
        quantity: 1,
        product: {
          name: 'iPhone 14 Pro Max 256GB',
          image: smartphoneImg,
        },
      },
      {
        price: 1229.99,
        quantity: 1,
        product: {
          name: 'MacBook Air M2',
          image: macbookImg,
        },
      },
    ],
  },
  {
    id: 1002,
    status: 'Delivered',
    createdAt: '2026-03-19T15:45:00.000Z',
    total: 438.0,
    user: {
      name: 'Priya Nair',
      email: 'priya.nair@example.com',
    },
    shippingAddress: {
      line1: '14 Park Street',
      city: 'Kochi',
      state: 'Kerala',
      postalCode: '682011',
      country: 'India',
    },
    paymentMethod: 'UPI',
    transactionId: 'TXN-1002-CD34',
    items: [
      {
        price: 189.0,
        quantity: 1,
        product: {
          name: 'VR VisionTech X1 Headset',
          image: headsetImg,
        },
      },
      {
        price: 83.0,
        quantity: 3,
        product: {
          name: 'Mechanical Gaming Keyboard',
          image: keyboardImg,
        },
      },
    ],
  },
];

export const getDemoOrderById = (orderId) =>
  demoOrders.find((order) => String(order.id) === String(orderId)) ?? null;
