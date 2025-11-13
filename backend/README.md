# ConvertPulse Backend API

Backend API for ConvertPulse - Landing Page Analytics SaaS

## Setup

1. Install dependencies:
```bash
npm install
```

2. Create `.env` file:
```bash
cp .env.example .env
```

3. Update `.env` with your MongoDB URI and JWT secret

4. Start the server:
```bash
# Development
npm run dev

# Production
npm start
```

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user

### Sites
- `GET /api/sites` - Get all sites (requires auth)
- `POST /api/sites` - Create new site (requires auth)
- `DELETE /api/sites/:id` - Delete site (requires auth)

### Events
- `POST /api/events` - Track single event
- `POST /api/events/batch` - Track multiple events

### Stats
- `GET /api/stats/:siteId?timeframe=7d` - Get analytics stats (requires auth)

## Tech Stack
- Node.js + Express
- MongoDB + Mongoose
- JWT Authentication
- bcryptjs for password hashing
