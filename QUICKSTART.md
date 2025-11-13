# Quick Start Guide

## Setup Everything in 5 Minutes

### 1. Install Dependencies

**Backend:**
```bash
cd backend
npm install
```

**Frontend:**
```bash
cd frontend
npm install
```

### 2. Configure Environment

**Backend** - Create `backend/.env`:
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/convertpulse
JWT_SECRET=your-super-secret-key-change-this
NODE_ENV=development
```

**Frontend** - Create `frontend/.env.local`:
```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

### 3. Start MongoDB

**If using local MongoDB:**
```bash
mongod
```

**Or use MongoDB Atlas** (free tier):
1. Create account at mongodb.com
2. Create cluster
3. Get connection string
4. Update `MONGODB_URI` in backend/.env

### 4. Start the Application

**Terminal 1 - Backend:**
```bash
cd backend
npm run dev
```
Server runs on http://localhost:5000

**Terminal 2 - Frontend:**
```bash
cd frontend
npm run dev
```
Dashboard runs on http://localhost:3000

### 5. Create Your First Site

1. Open http://localhost:3000
2. Click "Get Started" or "Sign Up"
3. Create an account
4. Add your first site
5. Copy the tracking code
6. Test with the demo page!

### 6. Test the Tracker

1. Open `tracker/demo.html` in a text editor
2. Replace `YOUR_API_KEY_HERE` with your site's API key (from dashboard)
3. Update the API endpoint in `tracker/convertpulse.js`:
   ```javascript
   const API_ENDPOINT = 'http://localhost:5000/api/events';
   ```
4. Open `demo.html` in your browser
5. Interact with the page (scroll, click buttons)
6. Check your dashboard for real-time analytics!

## Troubleshooting

### "Cannot connect to MongoDB"
- Make sure MongoDB is running
- Check your MONGODB_URI in .env
- Try: `mongodb://127.0.0.1:27017/convertpulse`

### "Network Error" in frontend
- Ensure backend is running on port 5000
- Check NEXT_PUBLIC_API_URL in .env.local
- Verify CORS is enabled in backend

### "Invalid credentials"
- Make sure you registered an account first
- Check email/password are correct

### Tracker not sending data
- Verify API key in demo.html matches your dashboard
- Check browser console for errors
- Ensure backend is accessible

## Next Steps

1. **Customize the tracker** - Edit `tracker/convertpulse.js`
2. **Style the dashboard** - Modify `frontend/styles/globals.css`
3. **Add features** - Extend backend routes or frontend components
4. **Deploy** - Follow deployment guides in main README

## Default Test Account

You can create a test account:
- **Email**: test@convertpulse.com
- **Password**: password123
- **Name**: Test User

## Pro Tips

- Use MongoDB Compass to view your database visually
- Install React DevTools for debugging frontend
- Use Postman to test API endpoints
- Check backend logs for debugging

## Need Help?

- Check main README.md for detailed documentation
- Review code comments for implementation details
- Each folder has its own README with specific instructions

Happy tracking! 🚀
