<div align="center">

  <img src="public/assets/img/logo/logo.svg" alt="Shofy Logo" width="220" />

  # 🛒 Shofy — Next.js Full Stack eCommerce Platform

  <p align="center">
    <strong>A high-performance, enterprise-grade electronics eCommerce storefront built with Next.js, Redux Toolkit, RTK Query, Stripe, and Sass.</strong>
  </p>

  <p align="center">
    <a href="https://shofy-electronics-ecommerce-client.vercel.app" target="_blank">
      <img src="https://img.shields.io/badge/Live_Demo-Visit_Store-0989FF?style=for-the-badge&logo=vercel&logoColor=white" alt="Live Demo" />
    </a>
    <a href="https://github.com/Vitragshah2108/shofy" target="_blank">
      <img src="https://img.shields.io/badge/GitHub-Repository-181717?style=for-the-badge&logo=github&logoColor=white" alt="GitHub Repo" />
    </a>
  </p>

  <p align="center">
    <img src="https://img.shields.io/badge/Next.js-13.3-black?style=flat-square&logo=next.js" alt="Next.js" />
    <img src="https://img.shields.io/badge/React-18.2-61DAFB?style=flat-square&logo=react&logoColor=black" alt="React" />
    <img src="https://img.shields.io/badge/Redux_Toolkit-1.9-764ABC?style=flat-square&logo=redux&logoColor=white" alt="Redux Toolkit" />
    <img src="https://img.shields.io/badge/Stripe-Payments-6772E5?style=flat-square&logo=stripe&logoColor=white" alt="Stripe" />
    <img src="https://img.shields.io/badge/Bootstrap-5.2-7952B3?style=flat-square&logo=bootstrap&logoColor=white" alt="Bootstrap" />
    <img src="https://img.shields.io/badge/Sass-SCSS-CC6699?style=flat-square&logo=sass&logoColor=white" alt="Sass" />
    <img src="https://img.shields.io/badge/License-MIT-green?style=flat-square" alt="License" />
  </p>

</div>

---

## 📖 Table of Contents

- [Overview](#-overview)
- [Key Features](#-key-features)
- [Architecture & Tech Stack](#-architecture--tech-stack)
- [Live Storefront Highlights](#-live-storefront-highlights)
- [Project Directory Structure](#-project-directory-structure)
- [Getting Started](#-getting-started)
- [Environment Variables](#-environment-variables)
- [Available Scripts](#-available-scripts)
- [Deployment](#-deployment)
- [License](#-license)

---

## 🌟 Overview

**Shofy** is a modern, responsive eCommerce web application designed specifically for electronics and consumer tech products. Built from the ground up with **Next.js**, **Redux Toolkit**, and **RTK Query**, Shofy delivers sub-second page loads, real-time inventory filtering, multi-currency calculation, intelligent search capabilities, and secure end-to-end checkout with Stripe.

---

## ✨ Key Features

### 🔍 Smart Multi-Field Search Engine
- **Fuzzy Token Matching**: Searches seamlessly across product titles, categories, subcategories, brand names, and product descriptions.
- **Stemming & Plural Support**: Intelligently handles singular/plural queries (e.g., typing `headphone` returns all `headphones`, `watch` matches `smart watches`).
- **Real-Time Suggestions**: Integrated directly into the sticky header and category dropdowns.

### 🌐 Global Localization (Language & Currency)
- **Multi-Currency Engine**: Live price conversions with currency symbols (`USD $`, `INR ₹`, `EUR €`, `GBP £`, `AED د.إ`, `CAD $`).
- **Multi-Language Switcher**: Built-in support for English, Hindi, Gujarati, Spanish, French, and German.
- **State Persistence**: User preferences are automatically remembered across browser sessions.

### 🛍️ Comprehensive Shopping Experience
- **Electronics Catalog**: Curated photography, technical specs, discounts, and real-time inventory counts across Tablets, Headphones, Smartwatches, Gaming Laptops, and Cameras.
- **Dynamic Product Filtering**: Filter by category, brand, price slider, and color swatches.
- **Side-by-Side Product Comparison**: Compare specifications, descriptions, ratings, and pricing side-by-side with an interactive comparison matrix.
- **Slide-out Cart & Wishlist**: Real-time quantity adjustments, subtotal calculations, and free-shipping threshold progress bars.
- **Product Quick View**: Inspect detailed product attributes, galleries, and add-to-cart actions without leaving the catalog page.

### 🔐 Robust Authentication & Dashboard
- **Google OAuth 2.0 & Email/Password Sign-In**: Instant authentication with persistent session cookies.
- **Client-Side Validation & Security**: Powered by React Hook Form & Yup schema validation with custom password bullet sizing.
- **Customer Dashboard**: Track order history, update personal profiles, manage delivery addresses, and change passwords.

### 💳 Secure Stripe Checkout
- Seamless integration with Stripe Elements for credit/debit card processing.
- Order confirmation receipts with full order breakdown and itemized receipts.

---

## 🛠️ Architecture & Tech Stack

| Layer | Technologies |
| :--- | :--- |
| **Framework & Core** | [Next.js](https://nextjs.org/) (SSR / SSG), [React 18](https://reactjs.org/) |
| **State Management** | [Redux Toolkit](https://redux-toolkit.js.org/) (`@reduxjs/toolkit`), [RTK Query](https://redux-toolkit.js.org/rtk-query/overview) |
| **Styling & UI** | [Sass (SCSS)](https://sass-lang.com/), [Bootstrap 5](https://getbootstrap.com/), [Swiper](https://swiperjs.com/), [React Slick](https://react-slick.neostack.com/) |
| **Payments** | [Stripe.js](https://stripe.com/), `@stripe/react-stripe-js` |
| **Authentication** | Google OAuth (`@react-oauth/google`), JWT & Cookie Sessions (`js-cookie`) |
| **Form Handling** | [React Hook Form](https://react-hook-form.com/), [Yup](https://github.com/jquense/yup) |
| **Notifications** | [React-Toastify](https://fkhadra.github.io/react-toastify/) |
| **Icons & Typography** | [FontAwesome 6 Pro](https://fontawesome.com/), Google Fonts (`Outfit`, `Jost`, `Roboto`) |
| **Deployment** | [Vercel](https://vercel.com/) |

---

## 📂 Project Directory Structure

```
shofy-electronics-ecommerce-client/
├── public/
│   └── assets/
│       ├── img/          # Banners, logos, product photos, icons
│       └── scss/         # Modular SCSS stylesheets & components
├── src/
│   ├── components/       # Reusable React components
│   │   ├── blog/         # Blog feeds, sidebars, and article details
│   │   ├── cart/         # Cart tables, mini-cart, subtotal calculations
│   │   ├── checkout/     # Stripe billing forms, order review
│   │   ├── compare/      # Side-by-side comparison tables
│   │   ├── forms/        # Login, registration, password recovery forms
│   │   ├── hero-banner/  # Animated hero carousels & sliders
│   │   ├── my-account/   # User profile dashboard & order history
│   │   ├── product-details/ # Product galleries, swatches, specs
│   │   ├── products/     # Category product grids & showcase carousels
│   │   └── shop/         # Catalog filters, pagination, sorting
│   ├── data/             # Local electronics inventory catalog dataset
│   ├── hooks/            # Custom React hooks (pagination, checkout submit)
│   ├── layout/           # Headers, footers, mobile navigation, wrappers
│   ├── pages/            # Next.js page routes (SSR & Dynamic routing)
│   ├── redux/            # Redux store, auth/cart/wishlist/compare slices
│   ├── styles/           # Global styles and Bootstrap imports
│   ├── svg/              # Custom SVG icon components
│   └── utils/            # Toast helpers, currency formatters
├── .env.example          # Environment variable template
├── next.config.js        # Next.js build and optimization configuration
├── package.json          # Project dependencies and script commands
└── README.md             # Project documentation
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v16.x or higher)
- npm or yarn

### 1. Clone the repository
```bash
git clone https://github.com/Vitragshah2108/shofy.git
cd shofy/shofy-electronics-ecommerce-client
```

### 2. Install dependencies
```bash
npm install --legacy-peer-deps
```

### 3. Setup environment variables
Create a `.env` file in the root directory:
```bash
cp .env.example .env
```
Populate `.env` with your credentials:
```env
NEXT_PUBLIC_API_BASE_URL=https://shofy-backend.vercel.app
NEXT_PUBLIC_STRIPE_KEY=your_stripe_publishable_key
NEXT_PUBLIC_GOOGLE_CLIENT_ID=your_google_oauth_client_id.apps.googleusercontent.com
```

### 4. Run the development server
```bash
npm run dev
```
Navigate to [http://localhost:3000](http://localhost:3000) to view the application.

---

## ⚙️ Environment Variables

| Variable | Description | Example |
| :--- | :--- | :--- |
| `NEXT_PUBLIC_API_BASE_URL` | Backend API base endpoint | `https://shofy-backend.vercel.app` |
| `NEXT_PUBLIC_STRIPE_KEY` | Stripe publishable key | `pk_test_...` |
| `NEXT_PUBLIC_GOOGLE_CLIENT_ID` | Google Cloud OAuth 2.0 Client ID | `23455951198-...apps.googleusercontent.com` |

---

## 📜 Available Scripts

| Command | Description |
| :--- | :--- |
| `npm run dev` | Starts the Next.js development server on port 3000 |
| `npm run build` | Compiles and builds the application for production |
| `npm run start` | Launches the production server bundle |
| `npm run lint` | Runs Next.js ESLint checks across the codebase |

---

## 🌐 Deployment

This application is optimized for deployment on **[Vercel](https://vercel.com/)**.

### Deploy via Vercel CLI:
```bash
npx vercel --prod
```

### Deploy via Git Integration:
1. Push your changes to GitHub:
   ```bash
   git push origin main
   ```
2. Import the repository in your Vercel Dashboard.
3. Configure the environment variables in **Project Settings > Environment Variables**.
4. Deploy!

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).