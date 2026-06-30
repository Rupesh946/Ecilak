# Ecilak — Premium Beauty & Skincare E-Commerce

A full-stack beauty e-commerce platform built with **Next.js 14** (App Router), **TypeScript**, **Tailwind CSS**, **Prisma**, and **PostgreSQL** (Supabase).

---

## ✨ Features

- **Beautiful Storefront** — Warm, minimal, premium aesthetic with serif/sans-serif font pairing, soft animations, and mobile-first responsive design
- **Product Catalog** — Browse by category, search, filter by price/rating, with product variants (shades, sizes)
- **Shopping Cart** — Persistent guest cart (cookie-based) and user cart (database-synced), with coupon code support
- **Wishlist** — Save favorite products (synced to database for logged-in users)
- **Authentication** — Email/password signup & login with JWT sessions, plus Google OAuth via NextAuth.js
- **Checkout & Payments** — Multi-step checkout with Razorpay integration (test/sandbox mode)
- **Order Management** — Order tracking with status flow: pending → paid → processing → shipped → delivered
- **Reviews & Ratings** — Authenticated product reviews with star ratings
- **Admin Dashboard** — Protected admin panel (`/admin`) with product CRUD, order management, coupon management, and stats overview
- **SEO** — Dynamic sitemap, robots.txt, OpenGraph/Twitter cards, Product JSON-LD structured data
- **Email Notifications** — Order confirmation emails via Resend

---

## 🛠 Tech Stack

| Layer         | Technology                                  |
| ------------- | ------------------------------------------- |
| Framework     | Next.js 14 (App Router)                     |
| Language      | TypeScript                                  |
| Styling       | Tailwind CSS + shadcn/ui                    |
| Database      | PostgreSQL (Supabase)                       |
| ORM           | Prisma 7                                    |
| Auth          | NextAuth.js (Credentials + Google OAuth)    |
| Payments      | Razorpay (sandbox/test mode)                |
| Email         | Resend                                      |
| State Mgmt    | Zustand (cart, wishlist, UI state)           |

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** 18+ and **npm**
- A **PostgreSQL** database (we recommend [Supabase](https://supabase.com) — free tier works)
- (Optional) **Razorpay** test credentials for payment testing
- (Optional) **Resend** API key for order confirmation emails
- (Optional) **Google OAuth** credentials for social login

### 1. Clone the repository

```bash
git clone https://github.com/your-username/ecilak.git
cd ecilak
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Copy the example env file and fill in your values:

```bash
cp .env.example .env
```

Required variables:

| Variable                 | Description                                      |
| ------------------------ | ------------------------------------------------ |
| `DATABASE_URL`           | PostgreSQL connection string (Supabase)           |
| `NEXTAUTH_URL`           | Your app URL (e.g., `http://localhost:3000`)       |
| `NEXTAUTH_SECRET`        | Random 32+ character secret for JWT signing       |
| `GOOGLE_CLIENT_ID`       | Google OAuth client ID                            |
| `GOOGLE_CLIENT_SECRET`   | Google OAuth client secret                        |
| `RAZORPAY_KEY_ID`        | Razorpay test key ID                              |
| `RAZORPAY_KEY_SECRET`    | Razorpay test key secret                          |
| `RAZORPAY_WEBHOOK_SECRET`| Razorpay webhook verification secret              |
| `RESEND_API_KEY`         | Resend API key for transactional emails           |

### 4. Set up the database

```bash
# Generate Prisma client
npx prisma generate

# Push schema to your database (creates tables)
npx prisma db push

# Seed with sample beauty products
npx prisma db seed
```

### 5. Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### 6. (Optional) Open Prisma Studio

```bash
npx prisma studio
```

---

## 📁 Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── admin/              # Protected admin dashboard
│   ├── account/            # Login, signup, profile, orders
│   ├── api/                # API route handlers
│   ├── cart/               # Cart page
│   ├── checkout/           # Multi-step checkout + success
│   ├── product/[slug]/     # Product detail page
│   ├── shop/               # Category/product listing
│   ├── sitemap.ts          # Dynamic sitemap generator
│   ├── robots.ts           # robots.txt generator
│   ├── error.tsx           # Global error boundary
│   └── layout.tsx          # Root layout with metadata
├── components/
│   ├── layout/             # Navbar, Footer, MobileMenu
│   └── ui/                 # ProductCard, CartDrawer, StarRating, etc.
├── lib/                    # Utilities, Prisma client, auth helpers
├── store/                  # Zustand stores (cart, wishlist, UI)
└── generated/prisma/       # Auto-generated Prisma client
prisma/
├── schema.prisma           # Database schema
└── seed.ts                 # Seed script with sample data
```

---

## 🔒 Security Notes

- All secrets are read from `.env` — never hardcoded
- `.env` is gitignored — use `.env.example` as a template
- Admin routes are protected server-side via middleware (role check on JWT token)
- Passwords are hashed with **bcryptjs** before storage
- Razorpay payments are confirmed via **webhook** — never trusted from client-side redirect alone
- User-generated content (reviews, contact form) should be sanitized before rendering

---

## 📦 Available Scripts

| Command                  | Description                                   |
| ------------------------ | --------------------------------------------- |
| `npm run dev`            | Start development server                      |
| `npm run build`          | Build for production                          |
| `npm run start`          | Start production server                       |
| `npm run lint`           | Run ESLint                                    |
| `npx prisma generate`   | Regenerate Prisma client after schema changes |
| `npx prisma db push`    | Push schema changes to database               |
| `npx prisma db seed`    | Seed database with sample products            |
| `npx prisma studio`     | Open Prisma Studio (visual DB editor)         |

---

## 📄 License

This project is private. All rights reserved.
