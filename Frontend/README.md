# Blushé — Frontend

### React Frontend for the Blushé Cosmetic E-Commerce Platform

---

## Overview

This is the frontend of **Blushé**, a cosmetic and beauty e-commerce application. It is a React-based single-page application responsible for the entire customer-facing experience — product browsing, cart management, checkout flow, and user account pages — styled with a cohesive, pink-themed brand identity.

This repository/folder contains only the client-side application. The backend (API, database, authentication logic) is maintained separately.

---

## Features

- **Category browsing** — Dedicated Makeup and Skincare product sections
- **Product detail pages** — Individual page per product with image, description, and price
- **Cart & checkout** — Add-to-Cart and Buy Now actions
- **User account pages** — Sign-in/login, with views for saved addresses, order history, and gift cards
- **Responsive, brand-consistent UI** — Soft pink color palette maintained across all pages

---

## Tech Stack

| Layer | Technology |
|---|---|
| Library | React.js |
| Styling | CSS3 |
| Package Manager | npm |
| API Communication | REST (via Express backend) |
| Version Control | Git & GitHub |

---

## Project Structure

```
frontend/
├── public/
│   └── index.html
├── src/
│   ├── components/     # Reusable UI components
│   ├── pages/           # Route-level pages (Home, Product, Cart, Account, etc.)
│   ├── assets/           # Images and static assets
│   ├── App.js
│   └── index.js
├── package.json
└── README.md
```

---

## Getting Started

### Prerequisites
- Node.js (v18+)
- npm

### Installation

```bash
git clone https://github.com/Palak-builds/blushe.git
cd blushe/frontend
npm install
```

### Running Locally

```bash
npm start
```

The app will be available at `http://localhost:3000`.

### Building for Production

```bash
npm run build
```

This generates an optimized static build in the `build/` folder, ready to be served or containerized for deployment.

---

## Environment Variables

Create a `.env` file in the `frontend/` root if the app needs to point to a specific backend API URL:

```
REACT_APP_API_URL=http://localhost:5000/api
```

---

## Deployment Notes

The frontend is built and containerized using Docker, then deployed to an AWS EC2 (Ubuntu) instance as part of the project's CI/CD pipeline via Jenkins. Code pushed to the `main` branch on GitHub triggers the pipeline, which builds this frontend and deploys it alongside the backend.

---

## Author

**Palak**
GitHub: [Palak-builds](https://github.com/Palak-builds)
