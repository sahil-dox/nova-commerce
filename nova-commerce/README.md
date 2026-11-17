# NOVA — Advanced E-Commerce Frontend

A responsive, multi-page storefront built with React, Vite, React Router and custom CSS. The experience includes a home page, product catalogue, product details, wishlist, cart and a demo checkout.

## Features

- Responsive desktop, tablet and mobile layouts
- Product catalogue with category filtering, search, price range and sorting
- Product detail pages with quantity selection and related products
- Shopping cart with quantity controls, remove actions and delivery calculation
- Wishlist / saved items
- Persistent cart and wishlist using `localStorage`
- Checkout form with validation and selectable demo payment methods
- Toast feedback, empty states and reusable components
- Indian Rupee formatting and complimentary shipping threshold

## Tech stack

- React 18
- Vite 6
- React Router 6
- Lucide React icons
- CSS (custom responsive design system)

## Run locally

Requirements: Node.js 18 or newer.

```bash
npm install
npm run dev
```

Open the local URL printed by Vite (usually `http://localhost:5173`).

Build for production:

```bash
npm run build
npm run preview
```

## Project structure

```text
nova-commerce/
├── index.html
├── package.json
├── vite.config.js
├── README.md
└── src/
    ├── main.jsx
    ├── App.jsx
    ├── styles.css
    ├── components/
    │   ├── Header.jsx
    │   ├── Footer.jsx
    │   ├── ProductCard.jsx
    │   └── Toast.jsx
    ├── context/
    │   └── ShopContext.jsx
    ├── data/
    │   └── products.js
    └── pages/
        ├── Home.jsx
        ├── Shop.jsx
        ├── Product.jsx
        ├── Cart.jsx
        ├── Checkout.jsx
        └── Wishlist.jsx
```

## Important notes

This is a frontend-only portfolio project. Product data is local sample data. Checkout is a demonstration flow: it does not charge a payment method, create a real order, send emails, or connect to inventory. Images are loaded from Unsplash and Google Fonts are loaded remotely.

## Suggested next upgrades

1. Connect a backend API and database.
2. Add authentication and customer profiles.
3. Integrate a payment provider in test mode.
4. Add admin product and order management.
5. Add automated tests with Vitest and React Testing Library.
6. Add accessibility audits and performance checks.
