const menu_data = [
  {
    id: 1,
    single_link: true,
    title: 'Home',
    link: '/',
  },
  {
    id: 2,
    sub_menu: true,
    title: 'Shop',
    link: '/shop',
    sub_menus: [
      { title: 'All Products', link: '/shop' },
      { title: 'Browse by Categories', link: '/shop-category' },
      { title: 'Exclusive Deals', link: '/coupon' },
      { title: 'Full Width Catalog', link: '/shop-hidden-sidebar' },
    ],
  },
  {
    id: 3,
    products: true,
    title: 'Products',
    link: '/shop',
    product_pages: [
      {
        title: 'Browse Catalog',
        link: '/shop',
        mega_menus: [
          { title: 'Electronics Collection', link: '/shop' },
          { title: 'All Categories', link: '/shop-category' },
          { title: 'Featured Showcase', link: '/shop-hidden-sidebar' },
          { title: 'Top Rated Tech', link: '/shop' },
        ]
      },
      {
        title: 'Product Experience',
        link: '/product-details',
        mega_menus: [
          { title: 'Detailed Overview', link: '/product-details' },
          { title: 'Video Demonstration', link: '/product-details-video' },
          { title: 'Flash Deals & Countdown', link: '/product-details-countdown' },
          { title: 'Variants & Color Swatches', link: '/product-details-swatches' },
        ]
      },
      {
        title: 'Customer Suite',
        link: '/cart',
        mega_menus: [
          { title: 'Shopping Cart', link: '/cart' },
          { title: 'Compare Products', link: '/compare' },
          { title: 'Saved Wishlist', link: '/wishlist' },
          { title: 'Secure Checkout', link: '/checkout' },
          { title: 'My Account & Orders', link: '/profile' },
        ]
      },
      {
        title: 'Account & Support',
        link: '/profile',
        mega_menus: [
          { title: 'Sign In', link: '/login' },
          { title: 'Create Account', link: '/register' },
          { title: 'Recover Password', link: '/forgot' },
          { title: 'Help & Contact', link: '/contact' },
        ]
      },
    ]
  },
  {
    id: 4,
    single_link: true,
    title: 'Deals & Coupons',
    link: '/coupon',
  },
  {
    id: 5,
    sub_menu: true,
    title: 'Blog',
    link: '/blog',
    sub_menus: [
      { title: 'Tech Articles', link: '/blog' },
      { title: 'Blog Grid', link: '/blog-grid' },
      { title: 'Reviews & News', link: '/blog-list' },
      { title: 'Featured Story', link: '/blog-details' },
    ]
  },
  {
    id: 6,
    single_link: true,
    title: 'Contact',
    link: '/contact',
  },
]

export default menu_data;

// mobile_menu
export const mobile_menu = [
  {
    id: 1,
    single_link: true,
    title: 'Home',
    link: '/',
  },
  {
    id: 2,
    sub_menu: true,
    title: 'Shop',
    link: '/shop',
    sub_menus: [
      { title: 'All Products', link: '/shop' },
      { title: 'Product Categories', link: '/shop-category' },
      { title: 'Full Width Catalog', link: '/shop-hidden-sidebar' },
      { title: 'Special Offers', link: '/coupon' },
    ],
  },
  {
    id: 3,
    sub_menu: true,
    title: 'Product Views',
    link: '/shop',
    sub_menus: [
      { title: 'Product Details', link: '/product-details' },
      { title: 'With Video Demo', link: '/product-details-video' },
      { title: 'With Live Countdown', link: '/product-details-countdown' },
      { title: 'Color & Size Swatches', link: '/product-details-swatches' },
    ],
  },
  {
    id: 4,
    sub_menu: true,
    title: 'My Store',
    link: '/cart',
    sub_menus: [
      { title: 'Shopping Cart', link: '/cart' },
      { title: 'Compare Items', link: '/compare' },
      { title: 'Wishlist', link: '/wishlist' },
      { title: 'Checkout', link: '/checkout' },
      { title: 'My Profile', link: '/profile' },
    ],
  },
  {
    id: 5,
    single_link: true,
    title: 'Coupons',
    link: '/coupon',
  },
  {
    id: 6,
    sub_menu: true,
    title: 'Blog',
    link: '/blog',
    sub_menus: [
      { title: 'Articles', link: '/blog' },
      { title: 'Grid View', link: '/blog-grid' },
      { title: 'List View', link: '/blog-list' },
    ]
  },
  {
    id: 7,
    single_link: true,
    title: 'Contact',
    link: '/contact',
  },
]