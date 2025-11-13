# 🔧 ConvertPulse - Troubleshooting Guide

## Common Issues & Solutions

---

## 1. MongoDB Connection Errors

### Error: `ENOTFOUND localhost:27017`
**Problem:** MongoDB server isn't running

**Solutions:**

**Windows:**
```bash
# Check if MongoDB service is running
Get-Service MongoDB

# Start MongoDB service
Start-Service MongoDB

# Or check Task Manager:
# Services tab → look for "MongoDB Server"
```

**macOS:**
```bash
# Start MongoDB with Homebrew
brew services start mongodb-community

# Check if running
brew services list
```

**Linux:**
```bash
# Check status
sudo systemctl status mongod

# Start MongoDB
sudo systemctl start mongod

# Enable on boot
sudo systemctl enable mongod
```

### Error: `Authentication failed`
**Problem:** Wrong MongoDB credentials (Atlas)

**Solution:**
1. Go to MongoDB Atlas dashboard
2. Click "Database Access"
3. Reset password for your user
4. Update `MONGODB_URI` in `backend/.env`
5. Make sure you're using correct username and password

---

## 2. Port Already in Use

### Error: `EADDRINUSE: address already in use :::5000`
**Problem:** Something is already using port 5000

**Solutions:**

**Windows (PowerShell):**
```bash
# Find process using port 5000
netstat -ano | findstr :5000

# Kill the process (replace PID with the number shown)
taskkill /PID 12345 /F

# Or change port in backend/.env:
PORT=5001
```

**macOS/Linux:**
```bash
# Find process
lsof -i :5000

# Kill it
kill -9 <PID>

# Or change port
sed -i 's/PORT=5000/PORT=5001/' backend/.env
```

### Error: `EADDRINUSE: address already in use :::3000`
**Problem:** Port 3000 is in use

**Solutions:**
```bash
# Windows
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# macOS/Linux
lsof -i :3000
kill -9 <PID>
```

---

## 3. Module Not Found Errors

### Error: `Cannot find module 'express'`
**Problem:** Dependencies not installed

**Solutions:**
```bash
# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd frontend
npm install

# Or install all at once from root
cd ..
npm run install-all
```

### Error: `Module not found: Can't resolve '@/lib/api'`
**Problem:** Path aliases not resolved

**Solution:** This is a Next.js build issue
```bash
# Clear Next.js cache
cd frontend
rm -rf .next

# Reinstall dependencies
npm install

# Try again
npm run dev
```

---

## 4. Environment Variable Issues

### Error: `JWT_SECRET is not set`
**Problem:** `.env` file not created or not loaded

**Solutions:**

**Create backend/.env:**
```bash
PORT=5000
MONGODB_URI=mongodb://localhost:27017/convertpulse
JWT_SECRET=super-secret-key-12345
NODE_ENV=development
```

**Create frontend/.env.local:**
```bash
NEXT_PUBLIC_API_URL=http://localhost:5000/api
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-secret-key
```

**Then restart both servers:**
```bash
# Kill both processes and restart
npm run dev
```

---

## 5. API Connection Issues

### Error: `Failed to fetch from http://localhost:5000/api`
**Problem:** Backend isn't running or CORS issue

**Solutions:**
1. Make sure backend is running:
   ```bash
   curl http://localhost:5000/health
   ```
   Should return: `{"status":"ok","timestamp":"..."}`

2. Check `NEXT_PUBLIC_API_URL` in `frontend/.env.local`:
   ```
   NEXT_PUBLIC_API_URL=http://localhost:5000/api
   ```

3. Check backend CORS settings:
   - Should allow requests from `http://localhost:3000`
   - Current code allows all origins (fine for dev)

---

## 6. Authentication Issues

### Error: `Invalid credentials` when logging in
**Problem:** Wrong email/password or user doesn't exist

**Solutions:**
1. Make sure you registered first (use Sign Up, not Login)
2. Check email and password are correct
3. Try creating new account with different email
4. Check browser console (F12) for detailed error

### Error: `No authentication token provided`
**Problem:** Token not saved or expired

**Solutions:**
```bash
# Open browser DevTools (F12)
# Go to Application → Storage → Local Storage
# Check if "token" key exists and has value

# If not:
1. Log out (clear localStorage)
2. Log in again
3. Token should be saved automatically
```

---

## 7. Tracker Issues

### Tracker script not loading
**Problem:** Tracker file not found or wrong path

**Solutions:**
1. Check `demo.html` has correct API key:
   ```html
   <script src="convertpulse.js" data-site-id="YOUR_API_KEY"></script>
   ```

2. Check `convertpulse.js` is in same folder as `demo.html`

3. Check `API_ENDPOINT` in `convertpulse.js`:
   ```javascript
   const API_ENDPOINT = 'http://localhost:5000/api/events';
   ```

### Events not being tracked
**Problem:** Multiple possible causes

**Solutions:**
1. **Check API endpoint** in browser console (F12):
   ```bash
   # Should see POST requests to http://localhost:5000/api/events/batch
   # Look at Network tab
   ```

2. **Verify API key** is correct:
   ```bash
   # Go to dashboard, copy the exact API key
   # Paste in demo.html: data-site-id="..."
   ```

3. **Check backend logs** (Terminal running backend):
   ```bash
   # Should show event POST requests
   # Look for: POST /api/events/batch
   ```

4. **Check browser console** for JavaScript errors:
   ```bash
   # Press F12 → Console tab
   # Look for any red errors
   ```

5. **Wait for batch timeout** (5 seconds):
   ```bash
   # Events batch every 5 seconds
   # Wait before checking dashboard
   ```

---

## 8. Database Issues

### Error: `db.collection is not a function`
**Problem:** MongoDB connection failed but code continues

**Solution:**
1. Verify MongoDB is running
2. Check MONGODB_URI is correct
3. Check username/password (if using Atlas)
4. Restart backend server

### No data showing in dashboard even with events
**Problem:** Events not being saved

**Solutions:**
1. Check MongoDB is running
2. Check backend logs for save errors
3. Verify database has collections:
   ```bash
   mongo convertpulse
   show collections
   ```

---

## 9. Build Issues

### Error during `npm run build` (frontend)
**Problem:** TypeScript or build errors

**Solutions:**
```bash
# Clear build cache
rm -rf .next node_modules/.next

# Rebuild
npm run build

# Check for TypeScript errors
npx tsc --noEmit

# Install missing types if needed
npm install --save-dev @types/node @types/react
```

---

## 10. Performance Issues

### Slow dashboard loading
**Problem:** Large number of events

**Solutions:**
1. Check timeframe selection (try "24h" first)
2. Check database indexes are created:
   ```javascript
   // In Event schema (models/Event.js)
   eventSchema.index({ siteId: 1, timestamp: -1 });
   ```

3. Restart backend to rebuild indexes

### High CPU usage
**Problem:** Node process using lots of CPU

**Solutions:**
1. Check for infinite loops in code
2. Limit event data queried in `/api/stats`
3. Add pagination for large datasets
4. Use database caching (Redis)

---

## 11. Deployment Issues

### Error deploying to Vercel
**Problem:** Environment variables missing

**Solutions:**
1. Go to Vercel dashboard
2. Project → Settings → Environment Variables
3. Add: `NEXT_PUBLIC_API_URL=https://your-api.com/api`
4. Redeploy

### Error deploying backend to Render
**Problem:** MongoDB connection string not set

**Solutions:**
1. Go to Render dashboard
2. Service → Environment
3. Add environment variable: `MONGODB_URI=your_connection_string`
4. Redeploy

---

## 12. Quick Fixes

### "Something weird happened" - Hard Reset

```bash
# Terminal 1: Kill backend
Ctrl+C

# Terminal 2: Kill frontend
Ctrl+C

# Clear caches
cd backend && npm cache clean --force
cd ../frontend && npm cache clean --force

# Remove node_modules
rm -rf backend/node_modules frontend/node_modules

# Reinstall
npm run install-all

# Restart
# Terminal 1: cd backend && npm run dev
# Terminal 2: cd frontend && npm run dev
```

### Database Completely Broken

```bash
# Delete all collections (will lose data)
mongo convertpulse
db.dropDatabase()
exit

# Or using MongoDB Compass:
# 1. Connect to your database
# 2. Right-click database → Delete database
# 3. Restart backend

# New collections will be created on first insert
```

---

## 🆘 Still Having Issues?

### Debug Checklist

- [ ] MongoDB running? `mongo --version` or check service
- [ ] Correct MONGODB_URI in `backend/.env`?
- [ ] Backend running on port 5000?
- [ ] Frontend running on port 3000?
- [ ] Can open http://localhost:3000?
- [ ] No errors in browser console (F12)?
- [ ] No errors in backend terminal?
- [ ] Correct API key in demo.html?
- [ ] .env files exist (not .env.example)?
- [ ] All npm packages installed?

### Get Detailed Errors

1. **Backend logs:**
   ```bash
   # Already visible in Terminal 1
   # Look for any error messages
   ```

2. **Browser console:**
   - Press F12 in browser
   - Click "Console" tab
   - Look for red errors

3. **Network requests:**
   - Press F12 in browser
   - Click "Network" tab
   - Try an action (login, add site, etc.)
   - Look at request/response

### Still stuck?

Review these files:
1. `README.md` - Full documentation
2. `INSTALL.md` - Installation steps
3. `API.md` - API details
4. `ARCHITECTURE.md` - System design

---

## 📞 Common Solutions Summary

| Problem | Quick Fix |
|---------|-----------|
| MongoDB error | Start MongoDB service |
| Port in use | Kill process or change port |
| Module not found | `npm install` |
| Can't connect API | Check backend is running |
| No data showing | Wait 5 sec + refresh dashboard |
| Auth error | Create new account |
| Tracker not working | Verify API key + wait for batch |
| Build error | Delete `.next` folder + rebuild |

---

Good luck! You've got this! 💪
