# 🚀 GitHub Deployment Checklist

## 📋 Pre-Deployment Checklist

### ✅ Code Quality
- [ ] All API endpoints tested locally
- [ ] No console errors in browser
- [ ] All environment variables documented
- [ ] No hardcoded URLs in frontend
- [ ] CORS configuration updated for production
- [ ] Build process works without errors

### ✅ Environment Configuration
- [ ] Client `.env.example` updated with production instructions
- [ ] Backend CORS includes Vercel URLs
- [ ] API baseURL uses environment variables
- [ ] All secrets properly configured

### ✅ Frontend (client/)
- [ ] API calls use `import.meta.env.VITE_API_URL`
- [ ] Build command works: `npm run build`
- [ ] Vite configuration correct for deployment
- [ ] No localhost URLs hardcoded

### ✅ Backend (server/)
- [ ] CORS allows Vercel production URLs
- [ ] Environment variables properly set
- [ ] MongoDB connection string ready
- [ ] JWT secret configured
- [ ] Email settings configured

## 🔄 Deployment Steps

### 1. Push to GitHub
```bash
git add .
git commit -m "Ready for deployment: Production configuration updated"
git push origin main
```

### 2. Deploy Backend (Render)
1. Go to [Render Dashboard](https://dashboard.render.com)
2. Connect GitHub repository
3. Configure service settings
4. Add environment variables from `.env.fixed`
5. Deploy and copy URL

### 3. Deploy Frontend (Vercel)
1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Import GitHub repository
3. Configure build settings
4. Add `VITE_API_URL` environment variable
5. Deploy and test

### 4. Post-Deployment Testing
- [ ] Authentication flow works
- [ ] Products load correctly
- [ ] Cart functionality works
- [ ] Checkout process works
- [ ] No CORS errors
- [ ] All API calls successful

## 🐛 Common Issues & Solutions

### CORS Errors
**Problem**: "Access to XMLHttpRequest blocked by CORS policy"
**Solution**: 
1. Check Render environment variables include `CLIENT_URL`
2. Verify Vercel URL is in CORS allowlist
3. Ensure API calls use correct production URL

### API Connection Issues
**Problem**: "Network Error" or "ERR_CONNECTION_REFUSED"
**Solution**:
1. Verify backend deployed successfully on Render
2. Check `VITE_API_URL` in Vercel environment
3. Ensure backend is running on correct port (5002)

### Build Failures
**Problem**: Vercel build fails
**Solution**:
1. Check `package.json` build scripts
2. Verify all imports are correct
3. Check for TypeScript errors if applicable

### Environment Variable Issues
**Problem**: API calls returning undefined
**Solution**:
1. Verify Vercel environment variables are set
2. Check variable names (must start with `VITE_`)
3. Restart Vercel deployment after changes

## 📞 Support Information

### Required Environment Variables

#### Backend (Render)
```bash
MONGODB_URL=mongodb+srv://...
JWT_SECRET=your_secret
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_SECURE=false
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_app_password
EMAIL_FROM=noreply@yourstore.com
PORT=5002
CLIENT_URL=https://your-vercel-app.vercel.app
```

#### Frontend (Vercel)
```bash
VITE_API_URL=https://your-backend.onrender.com/api
```

### Important Notes
- Always use HTTPS in production URLs
- Test with actual URLs, not localhost
- Monitor deployment logs for errors
- Update CORS when changing domains

---

**Ready to deploy! 🎉**
