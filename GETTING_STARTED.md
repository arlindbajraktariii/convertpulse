# 🚀 ConvertPulse - Getting Started (Local Setup)

## ✅ Current Status

You have successfully created the complete ConvertPulse SaaS application!

### What's Working:
- ✅ Backend server running on port 5000
- ✅ All dependencies installed
- ✅ Environment files configured
- ✅ Frontend ready to install

### What's Needed:
- ⏳ MongoDB connection (for database)
- ⏳ Frontend server started
- ⏳ Test the application

---

## 🗄️ MongoDB Setup

You have **2 options** to get MongoDB running:

### Option 1: MongoDB Atlas (Cloud - Easiest for Testing)

1. Go to **https://www.mongodb.com/cloud/atlas**
2. **Sign up for free** (creates M0 Sandbox cluster)
3. Create a database user:
   - Click "Database Access"
   - Click "Add New Database User"
   - Username: `admin`
   - Password: (save this!)
   - Click "Add User"

4. Allow access from your IP:
   - Click "Network Access"
   - Click "Add IP Address"
   - Choose "Allow Access from Anywhere" (for development)
   - Click "Confirm"

5. Get connection string:
   - Click "Database" → "Clusters"
   - Click "Connect" on your cluster
   - Choose "Connect your application"
   - Copy the connection string
   - It should look like:
     ```
     mongodb+srv://admin:PASSWORD@cluster0.xxxxx.mongodb.net/convertpulse?retryWrites=true&w=majority
     ```

6. Update `backend/.env`:
   ```env
   MONGODB_URI=mongodb+srv://admin:YOUR_PASSWORD@cluster0.xxxxx.mongodb.net/convertpulse?retryWrites=true&w=majority
   ```

### Option 2: Local MongoDB Installation

#### Windows:
1. Download MongoDB from: https://www.mongodb.com/try/download/community
2. Run installer (choose typical setup)
3. MongoDB runs automatically as a service
4. Use `MONGODB_URI=mongodb://localhost:27017/convertpulse` in `.env`

#### macOS:
```bash
brew install mongodb-community
brew services start mongodb-community
```

#### Linux:
```bash
sudo apt install mongodb
sudo systemctl start mongod
```

---

## 🚀 Starting the Application

### Step 1: Make sure MongoDB is running
- **Atlas**: No action needed (cloud-based)
- **Local**: Service should be running

### Step 2: Start Backend (Terminal 1)

```bash
cd C:\xamppp\htdocs\convertpulse\backend
npm run dev
```

Expected output:
```
🚀 Server running on port 5000
✅ MongoDB connected
```

### Step 3: Start Frontend (Terminal 2)

```bash
cd C:\xamppp\htdocs\convertpulse\frontend
npm run dev
```

Expected output:
```
▲ Next.js 14.0.4
- Ready in 1.5s
- Ready on http://localhost:3000
```

### Step 4: Open in Browser

Visit: **http://localhost:3000**

You should see the ConvertPulse landing page!

---

## 🧪 Testing the Application

### 1. Create an Account
- Click "Get Started" or "Sign Up"
- Fill in:
  - Name: `Test User`
  - Email: `test@example.com`
  - Password: `password123`
- Click "Sign Up"

### 2. Add Your First Site
- You'll be redirected to dashboard
- Click "Add Site"
- Name: `My Test Site`
- Domain: `example.com`
- Click "Add Site"

### 3. Copy API Key
- You'll see your site in the list
- Copy the API key (looks like: `a1b2c3d4e5f6g7h8`)

### 4. Test the Tracker
- Open `tracker/demo.html` in a text editor
- Replace `YOUR_API_KEY_HERE` with your copied API key
- Open `demo.html` in your browser
- Scroll down, click buttons
- Wait 5-10 seconds for events to batch and send

### 5. Check Dashboard
- Go back to http://localhost:3000/dashboard
- Click the "Refresh" or wait for auto-refresh
- You should see:
  - Pageviews: 1
  - Unique Sessions: 1
  - Scroll depth: 75% (or whatever you scrolled)
  - Charts with your data!

---

## 🐛 Troubleshooting

### Backend won't start
```
Error: ENOTFOUND localhost:27017
```
**Solution:** MongoDB isn't running
- **Windows**: Start MongoDB service
- **macOS**: Run `brew services start mongodb-community`
- **Linux**: Run `sudo systemctl start mongod`
- **Or use Atlas**: Update MONGODB_URI in .env

### Frontend won't start
```
Error: Port 3000 is already in use
```
**Solution:** Kill the process on port 3000
```bash
# Windows (PowerShell)
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# Mac/Linux
lsof -ti:3000 | xargs kill -9
```

### Can't connect to database
- Check MongoDB is running
- Verify MONGODB_URI in `backend/.env` is correct
- Check internet connection (if using Atlas)
- Verify IP is whitelisted (Atlas)

### Events not showing in dashboard
1. Check browser console for errors (F12)
2. Check backend logs (Terminal 1)
3. Verify API key is correct in demo.html
4. Check that `API_ENDPOINT` in tracker/convertpulse.js points to http://localhost:5000/api/events
5. Wait 5+ seconds for batch processing

---

## 📦 Project Structure Recap

```
convertpulse/
├── backend/           # Express API
│   ├── .env          # ← Update MONGODB_URI here
│   ├── server.js     # ← Main backend file
│   └── routes/       # API endpoints
│
├── frontend/         # Next.js dashboard
│   ├── .env.local    # ← Already configured
│   ├── pages/        # App pages
│   └── lib/          # API client
│
├── tracker/          # JavaScript tracker
│   ├── convertpulse.js
│   └── demo.html     # ← Test with this file
│
└── QUICKSTART.md     # Full setup guide
```

---

## ✅ Success Checklist

- [ ] MongoDB set up (Atlas or Local)
- [ ] `backend/.env` has correct MONGODB_URI
- [ ] `backend` running on port 5000
- [ ] `frontend` running on port 3000
- [ ] Can open http://localhost:3000
- [ ] Can create account
- [ ] Can add a site
- [ ] Can see demo.html tracker working
- [ ] Events appear in dashboard

---

## 🚀 Next Steps

1. **Complete the checklist above**
2. **Test all features** in your dashboard
3. **Explore the code** in backend/frontend folders
4. **Read the documentation**:
   - `README.md` - Full overview
   - `API.md` - API endpoints
   - `ARCHITECTURE.md` - System design
   - `ROADMAP.md` - Future features

5. **Deploy when ready**:
   - Frontend → Vercel
   - Backend → Render or Railway
   - Database → MongoDB Atlas

---

## 💡 Quick Commands Reference

```bash
# Install everything
cd convertpulse
npm run install-all

# Start backend (Terminal 1)
cd backend
npm run dev

# Start frontend (Terminal 2)
cd frontend
npm run dev

# Test API health check
curl http://localhost:5000/health

# Run frontend production build
cd frontend
npm run build
npm start
```

---

## 📞 Need Help?

Check these files in order:
1. `INSTALL.md` - Detailed installation
2. `CHECKLIST.md` - Step-by-step checklist
3. `API.md` - API documentation
4. `README.md` - Full documentation

---

**You've successfully created a complete SaaS application!** 🎉

Once MongoDB is set up, everything else should work smoothly.

Good luck! 🚀
