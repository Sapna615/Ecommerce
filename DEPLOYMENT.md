# Deployment Guide

## Quick Deploy

### 1. Backend (Render)

**Environment Variables:**
```bash
MONGODB_URL=mongodb+srv://your-db-url
JWT_SECRET=your-secret-key
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
CLIENT_URL=https://your-frontend.vercel.app
```

**Build Command:** `npm install`
**Start Command:** `node server.js`

### 2. Frontend (Vercel)

**Environment Variables:**
```bash
VITE_API_URL=https://your-backend.onrender.com/api
```

**Build Settings:**
- Framework: Vite
- Root Directory: client
- Build Command: npm run build
- Output Directory: dist

## Local Development

1. Start backend: `cd server && node server.js`
2. Start frontend: `cd client && npm run dev`

## How It Works

### Backend (server.js)
- Automatically allows localhost ports for development
- Reads `CLIENT_URL` env var to allow your Vercel frontend
- Reads `VERCEL_URL` for preview deployments

### Frontend (api/index.js)
- Uses `VITE_API_URL` from environment
- Falls back to localhost if not set
- Vercel dashboard env vars override local .env

## Common Issues

1. **CORS errors**: Add your Vercel URL to Render's `CLIENT_URL` env var
2. **404 on /api/auth/login**: Ensure `VITE_API_URL` includes `/api` suffix
3. **Login not persisting**: Check JWT_SECRET is set on Render
