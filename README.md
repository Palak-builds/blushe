# Blushé

### Full-Stack Cosmetic E-Commerce Platform with End-to-End DevOps Deployment

---

## Overview

Blushé is a full-stack cosmetic and beauty e-commerce application, built and deployed with a complete DevOps workflow — covering everything from frontend and backend development to containerization, CI/CD automation, and cloud hosting. The platform offers a shopping experience across two main categories, **Makeup** and **Skincare**, with a cohesive pink-themed design, product browsing, cart and checkout functionality, and user account management.

This repository contains the full project: `Frontend/`, `Backend/`, and the supporting deployment configuration.

---

## Project Objective

To design, build, and deploy a production-style e-commerce application end-to-end — combining full-stack development with real DevOps practices: version control, containerization, automated CI/CD pipelines, and cloud server deployment.

---

## Repository Structure

```
blushe/
├── Frontend/            # React client application
│   ├── src/
│   ├── public/
│   └── README.md
├── Backend/              # Node/Express API and database logic
│   ├── models/
│   ├── routes/
│   ├── controllers/
│   └── README.md
├── LICENSE
└── README.md             # (this file)
```

---

## Application Features

- **Category-based browsing** — Separate Makeup and Skincare sections
- **Product detail pages** — Individual page per product with image, description, and price
- **Cart & checkout** — Add-to-Cart and Buy Now purchase options
- **User accounts** — Sign-in/login with a dashboard for saved addresses, order history, and gift cards
- **Curated catalog** — Products modeled after real, recognizable cosmetic brands
- **Consistent brand design** — Soft pink color palette across every page

---

## Technology Stack

| Layer | Technology |
|---|---|
| Frontend | React.js (Vite), HTML5, CSS3 |
| Backend | Node.js, Express.js |
| Database | MongoDB |
| Authentication | JWT (JSON Web Tokens) |
| Version Control | Git & GitHub |
| Containerization | Docker |
| CI/CD | Jenkins |
| Hosting | AWS EC2 (Ubuntu) |
| Remote Access | MobaXterm (SSH) |

---

## Why This Stack Was Chosen

- **React (Vite)** — For a fast, component-based frontend suited to a product-heavy catalog, with quicker builds than a traditional CRA setup.
- **Node.js & Express** — A lightweight, JavaScript-based backend that pairs naturally with a React frontend, handling authentication, product data, and orders through a REST API.
- **MongoDB** — A flexible, document-based database well-suited to product listings with varying attributes across categories.
- **Docker** — Ensures the application runs consistently across the local machine and the production server, avoiding environment-related inconsistencies.
- **Jenkins** — Automates the build-and-deploy pipeline so that every push to `main` is built and deployed without manual steps.
- **AWS EC2** — Provides real cloud hosting experience, including server management and SSH-based deployment, rather than local-only testing.

---

## Deployment Pipeline

```
Local Commit → GitHub Push → Jenkins Build → Docker Containerize → EC2 Deployment
```

1. Code is developed and committed locally, then pushed to GitHub.
2. Jenkins detects the change and triggers the CI/CD pipeline.
3. The application is built and packaged into Docker containers.
4. The containerized app is deployed to an AWS EC2 (Ubuntu) instance, making it live.

---

## Database

MongoDB was installed and configured **manually on the AWS EC2 server** via SSH, rather than through Docker or an automated script.

- **Database name:** `blushe`
- **Collections:** `products`, `users`, `orders`
- **Connection:** configured via `MONGO_URI` in the backend's `.env` file

Raw database files are not included in this repository — they are non-portable binary files stored on the server (`/var/lib/mongodb`) and may contain real user data, so they're intentionally excluded for both practicality and security. See `Backend/README.md` for full setup steps.

---

## Getting Started

### Prerequisites
- Node.js (v18+)
- npm
- MongoDB (local or Atlas)
- Docker (optional, for containerized setup)

### Clone the repository
```bash
git clone https://github.com/Palak-builds/blushe.git
cd blushe
```

### Run the frontend
```bash
cd Frontend
npm install
npm run dev
```

### Run the backend
```bash
cd Backend
npm install
npm start
```

See `Frontend/README.md` and `Backend/README.md` for detailed setup instructions specific to each part.

---

## Deployment Challenges & Resolutions

Deploying across two environments (local Windows machine and a remote EC2 server) surfaced real Git and infrastructure challenges:

**1. Push rejected — non-fast-forward errors**
The remote repository had commits that didn't exist locally, and vice versa. Git blocked the push to prevent overwriting history.
*Resolved by:* pulling and merging diverged branches (`git pull origin main --no-rebase`), using `--allow-unrelated-histories` where local and remote had separate origins.

**2. Divergent branch reconciliation required**
Git needed an explicit strategy to reconcile diverged branches.
*Resolved by:* pulling with an explicit merge strategy to safely combine histories.

**3. Untracked files blocking a clean commit**
A leftover, untracked `blushe/` folder on the EC2 server prevented a clean working tree.
*Resolved by:* verifying its contents were unneeded, then removing it before committing.

**4. Missing upstream branch tracking**
The local `main` branch wasn't linked to `origin/main`, so pushes/pulls had no default remote.
*Resolved by:* setting the upstream explicitly with `git push --set-upstream origin main`.

**Root cause:** Nearly all issues traced back to local and remote Git histories being out of sync — common when a repository is initialized in more than one place without an initial pull. The consistent fix pattern: **pull → resolve → push.**

---

## Key Learnings

- Practical experience resolving real Git divergence and non-fast-forward conflicts across multiple environments.
- Hands-on setup of a full CI/CD pipeline using Git, Jenkins, and Docker together.
- Direct experience managing a remote cloud server (AWS EC2) via SSH, including manual database configuration.
- Reinforced the importance of syncing repositories before pushing when multiple environments are involved.

---

## License

This project is licensed under the terms specified in the `LICENSE` file.

---

## Author

**Palak**
GitHub: [Palak-builds](https://github.com/Palak-builds)
