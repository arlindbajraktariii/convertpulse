# Installation & Setup Instructions

## Quick Install (All at Once)

From the root directory:

```bash
npm install
npm run install-all
```

This will install dependencies for both backend and frontend.

## Manual Installation

### Backend Dependencies

```bash
cd backend
npm install
```

**Installs:**
- `express` - Web framework
- `mongoose` - MongoDB ODM
- `cors` - Cross-origin resource sharing
- `dotenv` - Environment variables
- `bcryptjs` - Password hashing
- `jsonwebtoken` - JWT authentication
- `express-validator` - Input validation
- `nodemon` - Development auto-reload

### Frontend Dependencies

```bash
cd frontend
npm install
```

**Installs:**
- `next` - React framework
- `react` & `react-dom` - React library
- `recharts` - Chart library
- `axios` - HTTP client
- `next-auth` - Authentication (optional)
- `date-fns` - Date utilities
- `tailwindcss` - CSS framework
- `typescript` - Type safety

## Environment Setup

### Backend Environment Variables

Create `backend/.env`:

```env
# Server Configuration
PORT=5000
NODE_ENV=development

# Database
MONGODB_URI=mongodb://localhost:27017/convertpulse
# Or for MongoDB Atlas:
# MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/convertpulse

# Security
JWT_SECRET=your-super-secret-jwt-key-min-32-chars-change-in-production
```

**Generate a secure JWT secret:**
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

### Frontend Environment Variables

Create `frontend/.env.local`:

```env
# API Configuration
NEXT_PUBLIC_API_URL=http://localhost:5000/api

# Optional: NextAuth (if using)
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-nextauth-secret
```

## MongoDB Setup Options

### Option 1: Local MongoDB

**Install MongoDB:**
- **Windows**: Download from mongodb.com
- **Mac**: `brew install mongodb-community`
- **Linux**: `sudo apt install mongodb`

**Start MongoDB:**
```bash
# Windows
net start MongoDB

# Mac/Linux
brew services start mongodb-community
# or
sudo systemctl start mongod
```

**Verify it's running:**
```bash
mongo --version
```

### Option 2: MongoDB Atlas (Cloud - Recommended)

1. Go to [mongodb.com/cloud/atlas](https://mongodb.com/cloud/atlas)
2. Sign up for free account
3. Create a free cluster (M0 Sandbox)
4. Wait for cluster to be created (~5 mins)
5. Click "Connect" → "Connect your application"
6. Copy connection string
7. Replace `<password>` with your database user password
8. Update `MONGODB_URI` in `backend/.env`

**Example connection string:**
```
mongodb+srv://myuser:mypassword@cluster0.xxxxx.mongodb.net/convertpulse?retryWrites=true&w=majority
```

## Running the Application

### Development Mode (Recommended for Testing)

**Terminal 1 - Backend:**
```bash
cd backend
npm run dev
```
✅ Backend runs on http://localhost:5000

**Terminal 2 - Frontend:**
```bash
cd frontend
npm run dev
```
✅ Frontend runs on http://localhost:3000

### Production Mode

**Backend:**
```bash
cd backend
npm start
```

**Frontend:**
```bash
cd frontend
npm run build
npm start
```

## Verification Steps

### 1. Backend Health Check

Open in browser or use curl:
```bash
curl http://localhost:5000/health
```

Expected response:
```json
{
  "status": "ok",
  "timestamp": "2024-11-12T..."
}
```

### 2. Frontend Check

Open: http://localhost:3000

You should see the ConvertPulse landing page.

### 3. Database Check

**Using MongoDB Compass:**
1. Download MongoDB Compass
2. Connect to: `mongodb://localhost:27017`
3. Look for `convertpulse` database

**Using mongo shell:**
```bash
mongo
> show dbs
> use convertpulse
> show collections
```

## Troubleshooting

### Port Already in Use

**Backend (5000):**
```bash
# Windows
netstat -ano | findstr :5000
taskkill /PID <PID> /F

# Mac/Linux
lsof -ti:5000 | xargs kill -9
```

**Frontend (3000):**
```bash
# Windows
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# Mac/Linux
lsof -ti:3000 | xargs kill -9
```

### MongoDB Connection Failed

1. Check MongoDB is running: `mongod --version`
2. Try alternative URI: `mongodb://127.0.0.1:27017/convertpulse`
3. Check MongoDB logs for errors
4. For Atlas: verify IP whitelist includes your IP

### Dependencies Not Installing

1. Clear npm cache: `npm cache clean --force`
2. Delete `node_modules`: `rm -rf node_modules`
3. Delete `package-lock.json`
4. Run `npm install` again
5. Check Node.js version: `node --version` (should be 18+)

### Frontend Build Errors

1. Delete `.next` folder: `rm -rf .next`
2. Clear cache: `npm cache clean --force`
3. Reinstall: `rm -rf node_modules && npm install`
4. Check TypeScript errors: `npx tsc --noEmit`

## Development Tools (Optional)

### Useful VS Code Extensions
- ESLint
- Prettier
- Tailwind CSS IntelliSense
- MongoDB for VS Code
- Thunder Client (API testing)

### Browser Extensions
- React Developer Tools
- Redux DevTools (if adding Redux)

### CLI Tools
```bash
# Install globally (optional)
npm install -g nodemon
npm install -g vercel
npm install -g typescript
```

## Next Steps

1. ✅ Verify backend is running
2. ✅ Verify frontend is running
3. ✅ Create a test account
4. ✅ Add a test site
5. ✅ Test the tracker
6. 📖 Read the QUICKSTART.md guide
7. ✅ Complete the CHECKLIST.md
8. 🚀 Deploy to production

## Support

If you encounter issues:
1. Check console logs (both backend and frontend)
2. Review error messages carefully
3. Verify all environment variables are set
4. Ensure MongoDB is accessible
5. Check that ports are not blocked by firewall

---

**Installation Time**: ~5-10 minutes
**First Run Setup**: ~2-3 minutes

Happy coding! 🎉
