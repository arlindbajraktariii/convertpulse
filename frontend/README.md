# Guesswhere Frontend

Next.js dashboard for Guesswhere analytics platform.

## Setup

1. Install dependencies:
```bash
npm install
```

2. Create `.env.local` file:
```bash
cp .env.local.example .env.local
```

3. Update environment variables in `.env.local`

4. Run development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000)

## Build for Production

```bash
npm run build
npm start
```

## Features

- 🔐 JWT Authentication
- 📊 Real-time Analytics Dashboard
- 📈 Interactive Charts (Recharts)
- 🎨 Modern UI with TailwindCSS
- 📱 Fully Responsive
- ⚡ Fast & Lightweight

## Pages

- `/` - Landing page with pricing
- `/login` - User login
- `/register` - User registration
- `/dashboard` - Analytics dashboard

## Tech Stack

- Next.js 14
- TypeScript
- TailwindCSS
- Recharts
- Axios

## Deployment

Deploy to Vercel:

```bash
vercel deploy
```

Or use the Vercel GitHub integration for automatic deployments.
