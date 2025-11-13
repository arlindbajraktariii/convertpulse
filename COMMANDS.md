# ⚡ Quick Command Reference

## All Commands You Need

### 🎯 First Time Setup

```bash
# 1. Install all dependencies
cd c:\xamppp\htdocs\convertpulse
npm run install-all

# This installs:
# - Backend dependencies (8 packages)
# - Frontend dependencies (when you run npm install in frontend)
# - Root dependencies (2 packages)
```

### 🗄️ Set Up MongoDB

**Option A: MongoDB Atlas (Cloud - Easiest)**
1. Visit https://www.mongodb.com/cloud/atlas
2. Sign up (free account)
3. Create M0 Sandbox cluster
4. Add database user
5. Allow access from anywhere (0.0.0.0/0)
6. Get connection string
7. Update: `backend/.env` with MONGODB_URI

**Option B: Local MongoDB (Windows)**
1. Download: https://www.mongodb.com/try/download/community
2. Install (next → next → finish)
3. Use: `mongodb://localhost:27017/convertpulse` in `.env`

### 🚀 Start Development Servers

**Terminal 1 - Backend:**
```bash
cd c:\xamppp\htdocs\convertpulse\backend
npm run dev
```

**Terminal 2 - Frontend:**
```bash
cd c:\xamppp\htdocs\convertpulse\frontend
npm run dev
```

**Expected output:**
- Backend: `🚀 Server running on port 5000`
- Frontend: `▲ Next.js 14.0.4 - Ready on http://localhost:3000`

### 🌐 Access the Application

Open your browser: **http://localhost:3000**

---

## 📝 Common Tasks

### Install Frontend Dependencies (if not done)
```bash
cd c:\xamppp\htdocs\convertpulse\frontend
npm install
```

### Test Backend API Health
```bash
curl http://localhost:5000/health
```

Or just open: **http://localhost:5000/health** in browser

### Kill Process Using Port 5000 (if stuck)
```bash
# PowerShell
netstat -ano | findstr :5000
taskkill /PID <PID> /F
```

### Kill Process Using Port 3000 (if stuck)
```bash
# PowerShell
netstat -ano | findstr :3000
taskkill /PID <PID> /F
```

### Clean Install (Reset Everything)
```bash
# From root directory
rm -rf backend\node_modules frontend\node_modules node_modules
npm cache clean --force
npm run install-all
```

### Run Production Build
```bash
cd c:\xamppp\htdocs\convertpulse\frontend
npm run build
npm start
```

---

## 🧪 Testing Commands

### Create Test Account
1. Go to http://localhost:3000
2. Click "Sign Up"
3. Fill in form:
   - Name: `Test User`
   - Email: `test@example.com`
   - Password: `password123`
4. Click "Sign Up"

### Add Test Site
1. Dashboard should load
2. Click "Add Site"
3. Fill in:
   - Name: `Test Site`
   - Domain: `test.example.com`
4. Click "Add Site"
5. Copy API key

### Test Tracker
1. Open `c:\xamppp\htdocs\convertpulse\tracker\demo.html` in text editor
2. Replace `YOUR_API_KEY_HERE` with copied API key
3. Open `demo.html` in browser
4. Scroll down page
5. Click buttons
6. Wait 5-10 seconds
7. Go back to dashboard
8. Refresh (F5)
9. See events in charts!

---

## 🚢 Deployment Commands

### Deploy Frontend to Vercel
```bash
# Install Vercel CLI
npm install -g vercel

# From frontend directory
cd c:\xamppp\htdocs\convertpulse\frontend
vercel

# Follow prompts
```

### Deploy Backend to Render
```bash
# Go to render.com
# Create new Web Service
# Connect your repository
# Set start command: npm start
# Add environment variables
# Deploy!
```

---

## 📚 Documentation Commands

```bash
# View all markdown files (Windows)
dir c:\xamppp\htdocs\convertpulse\*.md

# View specific file
type c:\xamppp\htdocs\convertpulse\QUICKSTART.md

# Or just open in VS Code
code c:\xamppp\htdocs\convertpulse\
```

---

## 🔧 Troubleshooting Commands

### Check Node Version
```bash
node --version
npm --version
```

### Check If Port 5000 is Used
```bash
netstat -ano | findstr :5000
```

### Check If Port 3000 is Used
```bash
netstat -ano | findstr :3000
```

### Check If MongoDB is Running
```bash
# If local install
mongod --version

# If Atlas - just needs internet
```

### Clear npm Cache
```bash
npm cache clean --force
```

### Rebuild Dependencies
```bash
cd backend
rm -rf node_modules package-lock.json
npm install
```

### Check Environment Variables
```bash
# View backend .env
type c:\xamppp\htdocs\convertpulse\backend\.env

# View frontend .env.local
type c:\xamppp\htdocs\convertpulse\frontend\.env.local
```

---

## 📊 Project Structure Reference

```
Root:                c:\xamppp\htdocs\convertpulse\
Backend:             c:\xamppp\htdocs\convertpulse\backend\
Frontend:            c:\xamppp\htdocs\convertpulse\frontend\
Tracker:             c:\xamppp\htdocs\convertpulse\tracker\
Documentation:       c:\xamppp\htdocs\convertpulse\*.md
```

---

## 🎯 Fastest Path to Running

```bash
# Step 1: Install (one-time)
cd c:\xamppp\htdocs\convertpulse
npm run install-all

# Step 2: Set MONGODB_URI in backend\.env
# Edit: c:\xamppp\htdocs\convertpulse\backend\.env
# Change MONGODB_URI to your connection string

# Step 3: Start backend (Terminal 1)
cd c:\xamppp\htdocs\convertpulse\backend
npm run dev

# Step 4: Start frontend (Terminal 2)
cd c:\xamppp\htdocs\convertpulse\frontend
npm run dev

# Step 5: Open browser
# http://localhost:3000
```

---

## 🔐 Important Credentials to Change

**Change These Before Production:**

1. **JWT_SECRET** (backend/.env)
   ```bash
   # Current (development only): 
   # super-secret-jwt-key-change-in-production-12345
   
   # Generate new one:
   node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
   ```

2. **NEXTAUTH_SECRET** (frontend/.env.local)
   ```bash
   # Generate new one:
   openssl rand -base64 32
   ```

3. **MongoDB Credentials**
   - Use strong database password
   - Restrict IP access (not 0.0.0.0/0)

---

## 📦 All npm Scripts

### Root
```bash
npm run install-all     # Install all dependencies
npm run dev             # Start both backend & frontend
```

### Backend
```bash
npm run dev             # Start with nodemon (auto-reload)
npm start               # Start with node (production)
```

### Frontend
```bash
npm run dev             # Start development server
npm run build           # Build for production
npm start               # Start production server
npm run lint            # Run linter
```

---

## 🌐 Important URLs

| Component | URL |
|-----------|-----|
| Frontend App | http://localhost:3000 |
| Landing Page | http://localhost:3000 |
| Dashboard | http://localhost:3000/dashboard |
| Backend API | http://localhost:5000 |
| Health Check | http://localhost:5000/health |
| Demo Page | ./tracker/demo.html |

---

## 📋 Default Test Credentials

You can use these to test (after creating account):
- **Email:** test@example.com
- **Password:** password123
- **Name:** Test User

---

## 🆘 If Something Breaks

```bash
# Nuclear option - reset everything
cd c:\xamppp\htdocs\convertpulse

# Kill all processes
netstat -ano | findstr :5000 | findstr LISTENING
netstat -ano | findstr :3000 | findstr LISTENING
# taskkill /PID <PID> /F

# Clean install
rm -rf backend/node_modules frontend/node_modules node_modules
rm -rf frontend/.next
npm cache clean --force
npm run install-all

# Restart
# Terminal 1: cd backend && npm run dev
# Terminal 2: cd frontend && npm run dev
```

---

## 📞 Quick Help

| Issue | Command |
|-------|---------|
| Port in use | `netstat -ano \| findstr :PORT` |
| Clear cache | `npm cache clean --force` |
| Reset deps | `rm -rf node_modules && npm install` |
| Check Node | `node --version` |
| View logs | Check terminal output |
| Test API | `curl http://localhost:5000/health` |

---

## ✅ Checklist to Running

- [ ] Dependencies installed (`npm run install-all`)
- [ ] MongoDB set up (Atlas or local)
- [ ] `backend/.env` configured with MONGODB_URI
- [ ] Backend starts (`npm run dev` shows no errors)
- [ ] Frontend starts (`npm run dev` shows ready)
- [ ] Can open http://localhost:3000
- [ ] Can create account
- [ ] Can add site
- [ ] Can test tracker

---

**You're ready!** Start with GETTING_STARTED.md 🚀
