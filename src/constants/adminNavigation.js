export const ADMIN_MENU_ITEMS = [
  {
    name: 'Personal Data',
    path: '/admin',
    icon: 'personal-data',
    description: 'Review and update your account information.'
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
    name: 'Logout',
    path: '/logout',
    icon: 'logout',
    isError: true,
    description: 'Exit the admin area.'
  }
];

export const getAdminMenuItem = (pathname) =>
  ADMIN_MENU_ITEMS.find((item) => item.path === pathname);
