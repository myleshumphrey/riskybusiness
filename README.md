# Risk Profile — Small Business Risk Assessment Dashboard

A clean, modern web application that helps small businesses quickly generate a strong, credible risk profile. Answer a short set of guided questions, receive a risk score, category breakdown, and actionable recommendations.

## Tech Stack

- **Frontend**: Next.js 16, TypeScript, Tailwind CSS, shadcn/ui, Recharts
- **Backend**: Next.js API routes, Prisma
- **Database**: PostgreSQL (Supabase recommended for production)
- **Auth**: NextAuth.js with credentials provider
- **PDF**: @react-pdf/renderer for report generation

## Local Setup

### Prerequisites

- Node.js 20+
- PostgreSQL (or Supabase account)

### 1. Clone and install

```bash
git clone https://github.com/myleshumphrey/riskybusiness.git
cd riskybusiness
npm install
```

### 2. Environment variables

```bash
cp .env.example .env
```

Edit `.env` and set:

- `DATABASE_URL` — PostgreSQL connection string (e.g. from Supabase)
- `NEXTAUTH_SECRET` — Generate with `openssl rand -base64 32`
- `NEXTAUTH_URL` — `http://localhost:3000` for local dev

### 3. Database

```bash
npx prisma migrate dev
npm run db:seed
```

Or with `db push` (no migration files):

```bash
npx prisma db push
npm run db:seed
```

### 4. Run the app

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Demo login

- **Email**: demo@example.com
- **Password**: demo1234
- **Admin**: Same credentials — visit `/admin`

## Netlify Deployment

### 1. Push to GitHub

Ensure your repo is pushed to GitHub.

### 2. Connect on Netlify

1. Log in to [Netlify](https://netlify.com)
2. Add new site → Import from Git
3. Connect your GitHub repo (`riskybusiness`)

### 3. Build settings

Netlify auto-detects Next.js. Default settings:

- **Build command**: `npm run build`
- **Publish directory**: (handled by Next.js adapter)

### 4. Environment variables

In Netlify: Site settings → Environment variables. Add:

| Variable | Value | Notes |
|----------|-------|-------|
| `DATABASE_URL` | `postgresql://...` | Supabase connection string (use direct connection, not pooler for Prisma) |
| `NEXTAUTH_SECRET` | (generate) | `openssl rand -base64 32` |
| `NEXTAUTH_URL` | `https://your-site.netlify.app` | Your Netlify URL |
| `NEXT_PUBLIC_APP_URL` | `https://your-site.netlify.app` | Same as above |

### 5. Database migrations

For first deploy, run migrations against your production DB:

```bash
DATABASE_URL="your-production-url" npx prisma migrate deploy
```

Or use Prisma Migrate in your CI. For `db push`-based workflows, ensure schema is applied before first deploy.

### 6. Deploy

Push to `main` to trigger a deploy. Netlify uses the OpenNext adapter for Next.js automatically.

## Project Structure

```
src/
├── app/
│   ├── (auth)/           # Login, signup
│   ├── (dashboard)/      # Dashboard, assessment, report
│   ├── admin/            # Admin panel
│   ├── api/              # API routes
│   └── page.tsx          # Landing
├── components/
├── lib/
│   ├── scoring/          # Risk scoring engine
│   ├── assessment/       # Question definitions
│   ├── db.ts
│   └── auth.ts
└── prisma/
```

## License

MIT
