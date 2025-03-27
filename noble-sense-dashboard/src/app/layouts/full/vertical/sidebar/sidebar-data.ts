import { NavItem } from './nav-item/nav-item';

export const navItems: NavItem[] = [
  {
    navCap: 'Users',
  },
  {
    displayName: 'Customers',
    iconName: 'user-circle',
    route: '/pages/customers',
  },
  // {
  //   displayName: 'Managers',
  //   iconName: 'brand-ctemplar',
  //   route: '/pages/managers',
  // },
  {
    displayName: 'Admins',
    iconName: 'brand-ctemplar',
    route: '/pages/admins',
  },
  {
    displayName: 'reclamations',
    iconName: 'alert-circle',
    route: '/pages/reclamations',
  },
  {
    navCap: 'Shop',
  },
  {
    displayName: 'Categories',
    iconName: 'category',
    route: '/pages/categories',
  },
  {
    displayName: 'Products',
    iconName: 'zoom-code',
    route: '/pages/products',
  },

  {
    displayName: 'orders',
    iconName: 'shopping-cart',
    route: '/pages/orders',
  },
  {
    displayName: 'reviews',
    iconName: 'star',
    route: '/pages/reviews',
  },
  {
    displayName: 'sider-bar',
    iconName: 'align-left',
    route: '/pages/home-slider',
  },

  // {
  //   displayName: 'daily-products',
  //   iconName: 'checklist',
  //   route: '/pages/daily-products',
  // },
  // {
  //   navCap: 'Logs',
  // },
  // {
  //   displayName: 'Les Logs',
  //   iconName: 'note',
  //   route: '/pages/sensitive-logs',
  // },
];
