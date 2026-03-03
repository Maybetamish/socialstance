# 🎯 SocialStance - Influencer Marketplace Platform

[![Next.js](https://img.shields.io/badge/Next.js-14+-black)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.4+-blue)](https://www.typescriptlang.org/)
[![Prisma](https://img.shields.io/badge/Prisma-5.19+-2D3748)](https://www.prisma.io/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-14+-316192)](https://www.postgresql.org/)

A modern, full-featured influencer marketplace connecting brands with authentic content creators. Features real-time analytics, AI-powered fraud detection, and automated media kit generation.

---

## ✨ Features

### For Influencers
- 📊 **Real-time Analytics Dashboard** - Track followers, engagement, and performance
- 🔗 **Social Media Integration** - Connect Instagram, Twitter, TikTok, YouTube
- 🛡️ **Fraud Detection Score** - AI-powered authenticity verification
- 📄 **Auto Media Kit Generator** - Professional media kits in seconds
- 💼 **Portfolio Management** - Showcase your best work
- 💰 **Deal Management** - Track collaborations and earnings

### For Brands
- 🔍 **Advanced Discovery** - Find perfect influencers with smart filters
- 📈 **Campaign Management** - Create and track marketing campaigns
- 🤝 **Deal Workflow** - Seamless collaboration process
- ⭐ **Verified Metrics** - Fraud-free, authentic engagement data
- 💳 **Integrated Payments** - Secure payment processing

---

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ and npm/yarn
- PostgreSQL database (local or cloud)
- Git

### Installation

```bash
# 1. Clone the repository
git clone <your-repo-url>
cd socialstance

# 2. Navigate to frontend directory
cd frontend

# 3. Install dependencies
npm install
# or
yarn install

# 4. Set up environment variables
cp .env.example .env
# Edit .env with your configuration

# 5. Set up database
npx prisma generate
npx prisma db push

# 6. Start development server
npm run dev
# or
yarn dev
```

Visit **http://localhost:3000** to see your app!

---

## 📁 Project Structure

```
socialstance/
├── frontend/                    # Next.js application
│   ├── app/                    # Next.js 14 App Router
│   │   ├── (auth)/            # Authentication pages
│   │   │   ├── login/         # Login page
│   │   │   ├── signup/        # Signup page
│   │   │   └── onboarding/    # Onboarding flow
│   │   ├── (dashboard)/       # Protected dashboard routes
│   │   │   ├── influencer/    # Influencer pages
│   │   │   │   ├── dashboard/ # Main dashboard
│   │   │   │   ├── analytics/ # Analytics (TODO)
│   │   │   │   └── media-kit/ # Media kit generator
│   │   │   └── brand/         # Brand pages
│   │   │       ├── dashboard/ # Discovery & search
│   │   │       ├── campaigns/ # Campaigns (TODO)
│   │   │       └── deals/     # Deals (TODO)
│   │   ├── api/               # API routes
│   │   │   ├── auth/          # NextAuth endpoints
│   │   │   ├── influencer/    # Influencer APIs
│   │   │   ├── brand/         # Brand APIs
│   │   │   ├── social/        # Social media APIs
│   │   │   ├── fraud/         # Fraud detection
│   │   │   └── mediakit/      # Media kit generation
│   │   ├── globals.css        # Global styles
│   │   ├── layout.tsx         # Root layout
│   │   └── page.tsx           # Homepage
│   ├── components/            # React components
│   │   ├── ui/               # shadcn/ui components
│   │   ├── influencer/       # Influencer-specific (TODO)
│   │   └── brand/            # Brand-specific (TODO)
│   ├── lib/                  # Utility libraries
│   │   ├── prisma.ts         # Prisma client
│   │   ├── auth.ts           # NextAuth config
│   │   ├── apify.ts          # Apify integration
│   │   └── utils.ts          # Helper functions
│   ├── prisma/               # Database
│   │   └── schema.prisma     # Database schema
│   ├── middleware.ts         # Auth middleware
│   ├── .env.example          # Environment template
│   ├── .env                  # Your config (gitignored)
│   ├── next.config.js        # Next.js config
│   ├── tailwind.config.ts    # Tailwind config
│   ├── tsconfig.json         # TypeScript config
│   ├── package.json          # Dependencies
│   └── ROADMAP.md           # Feature roadmap
├── .gitignore                # Git ignore rules
└── README.md                 # This file
```

---

## 🔧 Configuration

### Environment Variables

Copy `.env.example` to `.env` and configure:

```env
# Database (Required)
DATABASE_URL="postgresql://user:pass@host:5432/dbname"

# NextAuth (Required)
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="generate-with-openssl-rand-base64-32"

# Apify (Required for social features)
APIFY_TOKEN="apify_api_your_token"

# Google OAuth (Optional)
GOOGLE_CLIENT_ID="your-client-id"
GOOGLE_CLIENT_SECRET="your-secret"

# Razorpay (Optional)
RAZORPAY_KEY_ID="rzp_test_key"
RAZORPAY_KEY_SECRET="your_secret"
```

See `.env.example` for detailed documentation.

---

## 🗄️ Database Setup

### Option 1: Neon (Recommended)

1. Sign up at [neon.tech](https://neon.tech)
2. Create a new project
3. Copy the connection string
4. Add to `.env` as `DATABASE_URL`

### Option 2: Local PostgreSQL

```bash
# Install PostgreSQL
brew install postgresql@14  # macOS
sudo apt install postgresql # Linux

# Start PostgreSQL
brew services start postgresql@14  # macOS
sudo systemctl start postgresql    # Linux

# Create database
createdb socialstance

# Update .env
DATABASE_URL="postgresql://postgres:password@localhost:5432/socialstance"
```

### Option 3: Docker

```bash
docker run --name socialstance-db \
  -e POSTGRES_PASSWORD=password \
  -e POSTGRES_DB=socialstance \
  -p 5432:5432 \
  -d postgres:14
```

---

## 📚 Key Commands

```bash
# Development
npm run dev          # Start dev server
npm run build        # Build for production
npm start            # Start production server
npm run lint         # Lint code

# Database
npx prisma generate  # Generate Prisma Client
npx prisma db push   # Push schema to database
npx prisma studio    # Open database GUI
npx prisma migrate dev --name description  # Create migration

# Testing (Future)
npm run test         # Run tests
```

---

## 🔐 Authentication

SocialStance uses **NextAuth.js** for authentication with support for:

- ✅ Email/Password (credentials)
- ✅ Google OAuth
- 🔜 Facebook, Twitter (easy to add)

### Test Accounts

**Influencer:**
- Email: sarah@socialstance.com
- Password: password123

**Brand:**
- Email: marketing@ecostyle.com
- Password: password123

---

## 🎨 Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **Database:** PostgreSQL with Prisma ORM
- **Auth:** NextAuth.js
- **Styling:** Tailwind CSS + shadcn/ui
- **Icons:** Lucide React
- **Charts:** Recharts (for analytics)
- **API:** Apify (social media scraping)
- **Payments:** Razorpay (configured, not yet implemented)

---

## 🗺️ Roadmap

See [ROADMAP.md](frontend/ROADMAP.md) for detailed feature plans.

### ✅ Completed
- Authentication system
- Influencer & Brand dashboards
- Social media integration
- Fraud detection algorithm
- Media kit generator
- Influencer discovery

### 🚧 In Progress
- Analytics dashboard with charts
- Campaign management
- Deal workflow
- Payment integration

### 📋 Planned
- Messaging system
- Notifications
- Portfolio management
- Rating & reviews
- Admin panel

---

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📝 License

This project is proprietary. All rights reserved.

---

## 💬 Support

For issues or questions:
- Open an issue on GitHub
- Email: support@socialstance.com

---

## 🙏 Acknowledgments

- **Next.js** - React framework
- **Prisma** - Database ORM
- **shadcn/ui** - UI components
- **Vercel** - Deployment platform
- **Neon** - Serverless PostgreSQL

---

**Built with ❤️ by the SocialStance Team**
