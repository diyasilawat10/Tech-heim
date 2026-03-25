export const ADMIN_MENU_ITEMS = [
  {
    name: 'Personal Data',
    path: '/admin',
    icon: 'personal-data',
    description: 'Review and update your account information.'
  },
  {
    name: 'Dashboard',
    path: '/admin/dashboard',
    icon: 'dashboard',
    description: 'Track the overall status of your store.'
  },
  {
    name: 'Products',
    path: '/admin/products',
    icon: 'products',
    description: 'Manage your store products.'
  },
  {
    name: 'Categories',
    path: '/admin/categories',
    icon: 'categories',
    description: 'Organize products into categories.'
  },
  {
    name: 'Orders',
    path: '/admin/orders',
    icon: 'orders',
    description: 'Review and manage customer orders.'
  },
  {
    name: 'Customers / Users',
    path: '/admin/users',
    icon: 'users',
    description: 'View customer and user account activity.'
  },
  {
    name: 'Discounts / Coupons',
    path: '/admin/discounts',
    icon: 'discounts',
    description: 'Create and manage discount offers.'
  },
  {
    name: 'Inventory',
    path: '/admin/inventory',
    icon: 'inventory',
    description: 'Monitor product stock and availability.'
  },
  {
    name: 'Reviews',
    path: '/admin/reviews',
    icon: 'reviews',
    description: 'Moderate and review customer feedback.'
  },
  {
    name: 'Reports / Analytics',
    path: '/admin/analytics',
    icon: 'analytics',
    description: 'Inspect performance metrics and reports.'
  },
  {
    name: 'Settings',
    path: '/admin/settings',
    icon: 'settings',
    description: 'Configure store and account settings.'
  },
  {
    name: 'Logout',
    path: '/logout',
    icon: 'logout',
    isError: true,
    description: 'Exit the admin area.'
  }
];

export const getAdminMenuItem = (pathname) =>
  ADMIN_MENU_ITEMS.find((item) => item.path === pathname);
