# Blushé — Backend

### Node.js/Express API for the Blushé Cosmetic E-Commerce Platform

---

## Overview

This is the backend of **Blushé**, a cosmetic and beauty e-commerce application. It is a Node.js/Express REST API responsible for handling product data, user authentication, orders, and account information (addresses, order history, gift cards). It serves data to the React frontend and connects to a MongoDB database.

This repository/folder contains only the server-side application. The frontend (UI and client logic) is maintained separately.

---

## Features

- **Product APIs** — Endpoints for fetching Makeup and Skincare products, including individual product details
- **Cart & order handling** — Endpoints supporting Add-to-Cart and Buy Now actions, and order creation
- **Authentication** — User sign-up/login with secure session/token handling
- **User account data** — Endpoints for managing saved addresses, order history, and gift cards
- **Database integration** — MongoDB used for persisting products, users, and orders

---

## Tech Stack

| Layer | Technology |
|---|---|
| Runtime | Node.js |
| Framework | Express.js |
| Database | MongoDB (via Mongoose) |
| Authentication | JWT (JSON Web Tokens) |
| Version Control | Git & GitHub |

---

## Project Structure

```
backend/
├── models/          # Mongoose schemas (User, Product, Order, etc.)
├── routes/          # API route definitions
├── controllers/      # Request handling and business logic
├── middleware/       # Auth checks, error handling, etc.
├── config/           # Database connection and environment config
├── server.js          # App entry point
├── package.json
└── README.md
```

---

## Getting Started

### Prerequisites
- Node.js (v18+)
- npm
- MongoDB (local instance or MongoDB Atlas)

### Installation

```bash
git clone https://github.com/Palak-builds/blushe.git
cd blushe/backend
npm install
```

### Running Locally

```bash
npm start
```

The API will run at `http://localhost:5000` by default.

For development with auto-restart on file changes:
```bash
npm run dev
```
*(requires `nodemon` as a dev dependency)*

---

## Environment Variables

Create a `.env` file in the `backend/` root:

```
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

---

## API Overview

| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/products` | Fetch all products (filterable by category) |
| GET | `/api/products/:id` | Fetch a single product's details |
| POST | `/api/auth/signup` | Register a new user |
| POST | `/api/auth/login` | Authenticate a user and return a token |
| GET | `/api/users/me` | Get logged-in user's profile (addresses, gift cards) |
| POST | `/api/orders` | Place a new order |
| GET | `/api/orders` | Get order history for the logged-in user |

*(Adjust to match your actual implemented routes.)*

---

## Database

This project uses **MongoDB** as its database. It was installed and configured **manually on the AWS EC2 (Ubuntu) server** via SSH — not through Docker or an automated provisioning script.

- **Database name:** `blushe`
- **Collections:** `products`, `users`, `orders`
- **Connection:** configured via the `MONGO_URI` variable in the `.env` file

### Setup steps followed on the server

```bash
# Install MongoDB
sudo apt update
sudo apt install -y mongodb

# Start and enable the service
sudo systemctl start mongodb
sudo systemctl enable mongodb

# Verify it's running
sudo systemctl status mongodb

# Create the database and collections via Mongo shell
mongosh
use blushe
db.createCollection("products")
db.createCollection("users")
db.createCollection("orders")
```

> Since the database was set up manually rather than through Infrastructure-as-Code, these steps will need to be repeated manually if the app is redeployed on a new server.

**Note on data files:** The actual MongoDB data files (stored on the server at `/var/lib/mongodb`) are **not** included in this repository. They are raw, non-portable binary files and may contain real user data, so they are intentionally excluded from version control for both practicality and security reasons. Ensure `.env` and any data directories are listed in `.gitignore` so credentials and data are never accidentally pushed to GitHub.

---

## Deployment Notes

The backend is containerized using Docker and deployed to an AWS EC2 (Ubuntu) instance as part of the project's CI/CD pipeline via Jenkins. A push to the `main` branch on GitHub triggers the pipeline, which builds and deploys this backend alongside the frontend.

---

## Author

**Palak**
GitHub: [Palak-builds](https://github.com/Palak-builds)
