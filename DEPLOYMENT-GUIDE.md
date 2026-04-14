# 🚀 Deployment Guide: Vercel + Render

## 📋 Prerequisites
- GitHub repository with all code pushed
- Vercel account for frontend deployment
- Render account for backend deployment
- All environment variables configured

## 🔧 Step 1: Backend Deployment (Render)

### 1.1 Create Render Service
1. Go to [Render Dashboard](https://dashboard.render.com)
2. Click "New +" → "Web Service"
3. Connect your GitHub repository
4. Configure:
   - **Name**: `ecommerce-backend`
   - **Root Directory**: `server`
   - **Runtime**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `node server.js`

### 1.2 Environment Variables (Render)
Add these in Render Dashboard → Environment:
```bash
MONGODB_URL=mongodb+srv://your_connection_string
JWT_SECRET=your_jwt_secret
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_SECURE=false
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_app_password
EMAIL_FROM=noreply@yourstore.com
PORT=5002
CLIENT_URL=https://your-vercel-app.vercel.app
```

### 1.3 Deploy & Get URL
- Deploy the service
- Copy the Render URL (e.g., `https://your-app.onrender.com`)

## 🌐 Step 2: Frontend Deployment (Vercel)

### 2.1 Create Vercel Project
1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Click "Add New..." → "Project"
3. Import your GitHub repository
4. Configure:
   - **Framework**: Vite
   - **Root Directory**: `client`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`

### 2.2 Environment Variables (Vercel)
Add these in Vercel Dashboard → Settings → Environment Variables:
```bash
VITE_API_URL=https://your-backend-app.onrender.com/api
```

### 2.3 Deploy & Test
- Deploy the project
- Test the live application
- Verify API calls work correctly

## 🔗 Step 3: Final Configuration

### 3.1 Update CORS in Backend
Ensure your backend CORS includes:
- Your Vercel URL
- All localhost URLs for testing

### 3.2 Test API Connection
1. Test authentication flow
2. Test product listing
3. Test cart functionality
4. Test checkout process

## 🐛 Common Issues & Solutions

### CORS Issues
```javascript
// In server.js, ensure all origins are added:
const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:5174",
  "https://your-vercel-app.vercel.app", // Add your Vercel URL
];
```

### API URL Issues
```javascript
// In client/.env, ensure correct URL:
VITE_API_URL=https://your-backend.onrender.com/api
```

### Environment Variables
- **Frontend**: Must start with `VITE_` prefix
- **Backend**: No prefix required
- **Production URLs**: Use HTTPS, not HTTP

## 📝 Deployment Checklist

### Backend (Render)
- [ ] MongoDB connection string configured
- [ ] JWT secret set
- [ ] Email configuration complete
- [ ] PORT set to 5002
- [ ] CLIENT_URL set to Vercel URL
- [ ] CORS includes Vercel domain

### Frontend (Vercel)
- [ ] VITE_API_URL points to Render backend
- [ ] Build settings correct for Vite
- [ ] Environment variables added
- [ ] Custom domain configured (if needed)

### Testing
- [ ] Authentication works
- [ ] Product listing loads
- [ ] Cart functionality works
- [ ] Checkout process works
- [ ] No CORS errors in console
- [ ] All API calls successful

## 🔄 Post-Deployment

### Monitor Logs
- **Render**: Check build and runtime logs
- **Vercel**: Check function logs and build errors

### Update DNS (if custom domain)
1. Add A record for Vercel
2. Configure CNAME for custom domain
3. Update CORS origins if needed

## 📞 Support

If you encounter issues:
1. Check browser console for errors
2. Verify environment variables
3. Test API endpoints individually
4. Check CORS configuration
5. Review deployment logs

---

**Happy Deploying! 🎉**
