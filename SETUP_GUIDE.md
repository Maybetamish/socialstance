# \ud83d\ude80 SocialStance - Complete Setup Guide

This guide will walk you through setting up SocialStance on your local machine from scratch.

---

## \ud83d\udccb Table of Contents

1. [Prerequisites](#prerequisites)
2. [Installation Steps](#installation-steps)
3. [Database Configuration](#database-configuration)
4. [Environment Setup](#environment-setup)
5. [Running the Application](#running-the-application)
6. [Creating Test Data](#creating-test-data)
7. [Troubleshooting](#troubleshooting)

---

## \ud83d\udcc4 Prerequisites

Before you begin, ensure you have:

### Required Software
- **Node.js** 18 or higher ([Download](https://nodejs.org/))
- **npm** or **yarn** package manager (comes with Node.js)
- **PostgreSQL** 14 or higher ([Download](https://www.postgresql.org/download/))
- **Git** ([Download](https://git-scm.com/))

### Optional Tools
- **Prisma Studio** (included with Prisma)
- **VS Code** with extensions:
  - Prisma
  - ES7+ React/Redux/React-Native snippets
  - Tailwind CSS IntelliSense

### Verify Installation
```bash
node --version  # Should be v18 or higher
npm --version   # Should be 9 or higher
git --version   # Any recent version
psql --version  # Should be 14 or higher
```

---

## \ud83d\udce6 Installation Steps

### Step 1: Clone/Download the Project

```bash
# If using Git
git clone <your-repository-url>
cd socialstance

# If downloaded as ZIP
# Extract the ZIP file
cd socialstance
```

### Step 2: Navigate to Frontend Directory

```bash
cd frontend
```

### Step 3: Install Dependencies

```bash
# Using npm
npm install

# OR using yarn (recommended)
yarn install
```

**This will install:**
- Next.js 14
- React 18
- Prisma ORM
- NextAuth.js
- Tailwind CSS
- shadcn/ui components
- And all other dependencies (~50 packages)

**Expected time:** 2-5 minutes depending on your internet speed

---

## \ud83d\uddc4\ufe0f Database Configuration

You have 3 options for the database:

### Option 1: Cloud Database (Neon) - Recommended for Beginners

**Pros:** No local setup, always accessible, free tier available

1. Go to [neon.tech](https://neon.tech) and sign up
2. Create a new project
3. Copy the connection string (looks like: `postgresql://user:pass@host.neon.tech/db`)
4. Use this in your `.env` file

### Option 2: Local PostgreSQL - Recommended for Development

**Pros:** Full control, works offline, faster

#### macOS
```bash\n# Install PostgreSQL\nbrew install postgresql@14\n\n# Start PostgreSQL\nbrew services start postgresql@14\n\n# Create database\ncreatedb socialstance\n\n# Test connection\npsql socialstance\n```\n\n#### Windows\n1. Download PostgreSQL installer from [postgresql.org](https://www.postgresql.org/download/windows/)\n2. Run installer (remember the password you set!)\n3. Open pgAdmin 4 (installed with PostgreSQL)\n4. Create new database named `socialstance`\n\n#### Linux (Ubuntu/Debian)\n```bash\n# Install PostgreSQL\nsudo apt update\nsudo apt install postgresql postgresql-contrib\n\n# Start PostgreSQL\nsudo systemctl start postgresql\nsudo systemctl enable postgresql\n\n# Create database\nsudo -u postgres createdb socialstance\n\n# Test connection\nsudo -u postgres psql socialstance\n```\n\n### Option 3: Docker - Recommended for Teams\n\n**Pros:** Consistent environment, easy to share\n\n```bash\n# Pull and run PostgreSQL container\ndocker run --name socialstance-db \\\n  -e POSTGRES_PASSWORD=password \\\n  -e POSTGRES_DB=socialstance \\\n  -e POSTGRES_USER=postgres \\\n  -p 5432:5432 \\\n  -d postgres:14\n\n# Verify it's running\ndocker ps\n\n# Stop database\ndocker stop socialstance-db\n\n# Start database\ndocker start socialstance-db\n```\n\n---\n\n## \u2699\ufe0f Environment Setup\n\n### Step 1: Create .env File\n\n```bash\n# Copy the example file\ncp .env.example .env\n```\n\n### Step 2: Configure Environment Variables\n\nOpen `.env` in your text editor and configure:\n\n#### 1. Database (Required)\n\n**For Cloud (Neon):**\n```env\nDATABASE_URL=\"postgresql://username:password@host.neon.tech/dbname?sslmode=require\"\n```\n\n**For Local PostgreSQL:**\n```env\nDATABASE_URL=\"postgresql://postgres:password@localhost:5432/socialstance\"\n```\n\n**For Docker:**\n```env\nDATABASE_URL=\"postgresql://postgres:password@localhost:5432/socialstance\"\n```\n\n#### 2. NextAuth (Required)\n\n```env\nNEXTAUTH_URL=\"http://localhost:3000\"\nNEXTAUTH_URL_INTERNAL=\"http://localhost:3000\"\nNEXTAUTH_SECRET=\"your-secret-key-here\"\n```\n\n**Generate a secure secret:**\n```bash\n# On macOS/Linux\nopenssl rand -base64 32\n\n# On Windows (PowerShell)\n[Convert]::ToBase64String((1..32 | ForEach-Object { Get-Random -Minimum 0 -Maximum 256 }))\n\n# Copy the output and paste it as NEXTAUTH_SECRET\n```\n\n#### 3. Apify (Required for Social Features)\n\n```env\nAPIFY_TOKEN=\"apify_api_your_token_here\"\n```\n\n**Get your token:**\n1. Sign up at [apify.com](https://apify.com/)\n2. Go to Settings > Integrations\n3. Copy your API token\n4. Paste in `.env`\n\n#### 4. Google OAuth (Optional)\n\n**If you want \"Sign in with Google\":**\n\n1. Go to [Google Cloud Console](https://console.cloud.google.com/)\n2. Create a new project\n3. Enable Google+ API\n4. Create OAuth 2.0 credentials\n5. Add authorized redirect URI: `http://localhost:3000/api/auth/callback/google`\n6. Copy Client ID and Client Secret to `.env`\n\n```env\nGOOGLE_CLIENT_ID=\"your-client-id.apps.googleusercontent.com\"\nGOOGLE_CLIENT_SECRET=\"your-client-secret\"\n```\n\n#### 5. Razorpay (Optional)\n\n**For payment processing (not required to start):**\n\n```env\nRAZORPAY_KEY_ID=\"rzp_test_your_key\"\nRAZORPAY_KEY_SECRET=\"your_secret\"\n```\n\n### Step 3: Initialize Database\n\n```bash\n# Generate Prisma Client\nnpx prisma generate\n\n# Push schema to database (creates all tables)\nnpx prisma db push\n```\n\n**You should see:**\n```\n\u2705 Generated Prisma Client\n\u2705 The database is now in sync with your Prisma schema\n```\n\n---\n\n## \ud83c\udfc3 Running the Application\n\n### Development Mode\n\n```bash\n# Start development server\nnpm run dev\n# OR\nyarn dev\n```\n\n**You should see:**\n```\n\u25b2 Next.js 14.2.35\n- Local:        http://localhost:3000\n- Environments: .env\n\n\u2713 Ready in 2s\n```\n\n### Open in Browser\n\nVisit **http://localhost:3000**\n\nYou should see the SocialStance homepage!\n\n### Production Build\n\n```bash\n# Build for production\nnpm run build\n\n# Start production server\nnpm start\n```\n\n---\n\n## \ud83d\udce6 Creating Test Data\n\n### Method 1: Using Prisma Studio (GUI)\n\n```bash\n# Open Prisma Studio\nnpx prisma studio\n```\n\nThis opens a web interface at `http://localhost:5555` where you can:\n- View all tables\n- Add/edit/delete records\n- See relationships\n\n**Create a test user:**\n1. Click on \"User\" table\n2. Click \"Add record\"\n3. Fill in:\n   - email: test@example.com\n   - name: Test User\n   - password: (use bcrypt hash - see below)\n   - role: INFLUENCER or BRAND\n4. Save\n\n### Method 2: Using Signup Page\n\n1. Go to http://localhost:3000/signup\n2. Choose role (Influencer or Brand)\n3. Fill in details\n4. Click \"Create Account\"\n5. Complete onboarding\n\n### Method 3: Using Test Script\n\nCreate a file `seed-data.js` in `frontend/` folder:\n\n```javascript\nconst { PrismaClient } = require('@prisma/client')\nconst bcrypt = require('bcrypt')\nconst prisma = new PrismaClient()\n\nasync function main() {\n  // Create influencer\n  const influencer = await prisma.user.create({\n    data: {\n      email: 'influencer@test.com',\n      name: 'Test Influencer',\n      password: await bcrypt.hash('password123', 10),\n      role: 'INFLUENCER',\n    },\n  })\n\n  // Create influencer profile\n  await prisma.influencerProfile.create({\n    data: {\n      userId: influencer.id,\n      instagramHandle: 'testinfluencer',\n      niches: ['Fashion', 'Lifestyle'],\n      engagementRate: 4.5,\n      authenticityScore: 85,\n      followers: { instagram: 100000 },\n    },\n  })\n\n  // Create brand\n  const brand = await prisma.user.create({\n    data: {\n      email: 'brand@test.com',\n      name: 'Test Brand',\n      password: await bcrypt.hash('password123', 10),\n      role: 'BRAND',\n    },\n  })\n\n  // Create brand profile\n  await prisma.brandProfile.create({\n    data: {\n      userId: brand.id,\n      companyName: 'Test Company',\n      industry: ['Fashion', 'Tech'],\n      budget: 50000,\n    },\n  })\n\n  console.log('✅ Test data created!')\n}\n\nmain()\n  .catch(console.error)\n  .finally(() => prisma.$disconnect())\n```\n\nRun it:\n```bash\nnode seed-data.js\n```\n\n**Login credentials:**\n- Influencer: influencer@test.com / password123\n- Brand: brand@test.com / password123\n\n---\n\n## \ud83d\udd27 Troubleshooting\n\n### Issue: \"Could not find Prisma Schema\"\n\n**Solution:**\n```bash\n# Make sure you're in the frontend directory\npwd  # Should show .../socialstance/frontend\n\n# Check if schema exists\nls prisma/schema.prisma\n\n# If missing, create it (copy from documentation)\nmkdir -p prisma\n# Then create schema.prisma file\n```\n\n### Issue: \"Cannot connect to database\"\n\n**Solution:**\n```bash\n# Check if PostgreSQL is running\npg_isready  # Should say \"accepting connections\"\n\n# Check DATABASE_URL in .env\ncat .env | grep DATABASE_URL\n\n# Test connection manually\npsql \"$DATABASE_URL\"\n```\n\n### Issue: \"Module not found\"\n\n**Solution:**\n```bash\n# Delete node_modules and reinstall\nrm -rf node_modules\nrm package-lock.json  # or yarn.lock\nnpm install\n```\n\n### Issue: \"Port 3000 already in use\"\n\n**Solution:**\n```bash\n# Find what's using port 3000\nlsof -i :3000  # macOS/Linux\nnetstat -ano | findstr :3000  # Windows\n\n# Kill the process or use different port\nnpm run dev -- -p 3001\n```\n\n### Issue: \"Prisma Client not generated\"\n\n**Solution:**\n```bash\n# Regenerate Prisma Client\nnpx prisma generate\n\n# If still fails, delete and regenerate\nrm -rf node_modules/.prisma\nrm -rf node_modules/@prisma\nnpx prisma generate\n```\n\n### Issue: \"NextAuth error\"\n\n**Solution:**\n```bash\n# Make sure NEXTAUTH_SECRET is set\necho $NEXTAUTH_SECRET\n\n# Generate new secret if needed\nopenssl rand -base64 32\n\n# Add to .env\necho \"NEXTAUTH_SECRET=<your-secret>\" >> .env\n```\n\n---\n\n## \u2705 Verification Checklist\n\nBefore proceeding, verify:\n\n- [ ] Node.js 18+ installed\n- [ ] PostgreSQL running\n- [ ] Database created\n- [ ] `.env` file configured\n- [ ] Dependencies installed (`node_modules` folder exists)\n- [ ] Prisma Client generated\n- [ ] Database schema pushed\n- [ ] Dev server starts without errors\n- [ ] Can access http://localhost:3000\n- [ ] Can signup/login\n\n---\n\n## \ud83c\udf89 Success!\n\nIf everything works:\n1. You can access the app at http://localhost:3000\n2. Create an account via /signup\n3. Complete onboarding\n4. Explore the dashboard\n\n---\n\n## \ud83d\udcda Next Steps\n\n1. Read [ROADMAP.md](ROADMAP.md) for upcoming features\n2. Check [schema.prisma](prisma/schema.prisma) to understand the database\n3. Explore the codebase in `app/` directory\n4. Build your first feature!\n\n---\n\n## \ud83d\udcac Need Help?\n\nIf you're still stuck:\n1. Check error messages carefully\n2. Search for the error on Google\n3. Check Next.js and Prisma documentation\n4. Open an issue on GitHub\n\n---\n\n**Happy Coding! \ud83d\ude80**\n