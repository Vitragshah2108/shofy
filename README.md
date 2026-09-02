<div align="center">

  <img src="public/assets/img/logo/logo.svg" alt="Shofy Logo" width="200" />

  # Shofy – Premium Full Stack eCommerce Platform

  [![Next.js](https://img.shields.io/badge/Next.js-13.3-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
  [![React](https://img.shields.io/badge/React-18.2-blue?style=for-the-badge&logo=react)](https://reactjs.org/)
  [![Redux Toolkit](https://img.shields.io/badge/Redux_Toolkit-1.9-purple?style=for-the-badge&logo=redux)](https://redux-toolkit.js.org/)
  [![Bootstrap](https://img.shields.io/badge/Bootstrap-5.2-purple?style=for-the-badge&logo=bootstrap)](https://getbootstrap.com/)
  [![Stripe](https://img.shields.io/badge/Stripe-Payments-6772e5?style=for-the-badge&logo=stripe)](https://stripe.com/)
  [![Vercel](https://img.shields.io/badge/Vercel-Deployed-black?style=for-the-badge&logo=vercel)](https://vercel.com/)

  <p align="center">
    A state-of-the-art eCommerce platform built with Next.js, Redux Toolkit, RTK Query, Stripe, Bootstrap 5, and Sass. Featuring rich electronics product catalogs, smart fuzzy search, dynamic multi-currency and multi-language support, real-time cart/wishlist/comparison, and seamless authentication.
  </p>

</div>

---

## 🚀 Key Highlights & Features

### 🛍️ Smart Catalog & Electronics Storefront
- **Visual Accuracy**: 100% matched product photography, technical specifications, and realistic market pricing across Tablets, Headphones, Smartwatches, Gaming PCs, Cameras, and Accessories.
- **Smart Multi-Field Search Engine**: Intelligent fuzzy matching across titles, categories, subcategories, tags, brands, and descriptions with singular/plural stemming (e.g., `headphone` ↔ `headphones`, `watch` ↔ `smart watch`).
- **Interactive Topbar Switchers**: Live Language (English, Hindi, Gujarati, Spanish, French, German) & Currency (USD $, INR ₹, EUR €, GBP £, AED د.إ, CAD $) with browser persistence.
- **Dynamic Product Filtering**: Multi-range price sliders, brand filters, category selectors, and pagination with boundary protections.
- **Side-by-Side Product Comparison**: Compare technical specifications, descriptions, ratings, and pricing side-by-side.

### 🔐 Authentication & User Dashboard
- **Instant Authentication & Session Management**: Seamless sign-in with Google OAuth and email/password accounts with persistent cookies.
- **Strict Password Validation**: Secure authentication with toast alerts for incorrect credentials and instant error handling.
- **Dedicated User Dashboard**: Order history, delivery status tracking, profile information updates, password management, and direct logout redirection.

### 💳 Cart, Wishlist & Stripe Checkout
- **Slide-out Mini Cart**: Quick quantity updates, price calculations, and item removals.
- **Persistent Wishlist**: Save favorite items across browsing sessions.
- **Stripe Payment Gateway**: End-to-end checkout with secure payment processing.

---

## 🛠️ Technology Stack

- **Frontend Core:** Next.js (Pages Router & SSR), React 18, HTML5 Semantic Layouts
- **State Management & Data Fetching:** Redux Toolkit, RTK Query
- **Styling & UI:** Bootstrap 5, Vanilla Sass / SCSS, Swiper.js, React-Slick, FontAwesome 6 Pro
- **Payment Processing:** Stripe Elements & Stripe JS
- **Authentication:** Google OAuth 2.0 (`@react-oauth/google`), JSON Web Tokens & Cookies (`js-cookie`)
- **Forms & Validation:** React Hook Form, Yup Resolvers
- **Notifications:** React-Toastify

---

## 📦 Getting Started Locally

### 1. Clone the repository
```bash
git clone https://github.com/Vitragshah2108/shofy.git
cd shofy/shofy-electronics-ecommerce-client
```

### 2. Install dependencies
```bash
npm install --legacy-peer-deps
```

### 3. Configure environment variables
Create a `.env` file in the root directory:
```env
NEXT_PUBLIC_API_BASE_URL=https://shofy-backend.vercel.app
NEXT_PUBLIC_STRIPE_KEY=your_stripe_publishable_key
NEXT_PUBLIC_GOOGLE_CLIENT_ID=your_google_client_id.apps.googleusercontent.com
```

### 4. Run the development server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 5. Build for production
```bash
npm run build
npm run start
```

---

## 🌐 Deploy to Vercel

Deploy instantly using the Vercel CLI:

```bash
npx vercel --prod
```

---

## 👤 Author & Maintainer

- **Name:** Vitrag Shah
- **Email:** [vitragshah2108@gmail.com](mailto:vitragshah2108@gmail.com)
- **Instagram:** [@21_vitrag](https://www.instagram.com/21_vitrag)
- **Phone:** +91 79909 67124
- **Address:** 5, Shivdhara, Mahakali Mandir Road, Near Saurabh School, Kanknol Road, Himatnagar, Gujarat, India

---

## 📄 License
This project is licensed under the MIT License.