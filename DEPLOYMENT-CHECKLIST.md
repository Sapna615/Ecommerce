# 🚀 Deployment Troubleshooting Checklist

## ✅ **Pre-Deployment Checks**

### **Environment Variables**
- [ ] MONGODB_URL is properly configured in Render environment
- [ ] CLIENT_URL is set to Vercel URL in Render environment  
- [ ] JWT_SECRET is configured in Render environment
- [ ] All email settings are configured in Render environment
- [ ] PayPal credentials are configured in Render environment (if using PayPal)

### **File Structure**
- [ ] Server root directory is correctly set in Render
- [ ] package.json exists in server root
- [ ] All required files are present and accessible
- [ ] No conflicting files in root directory

### **Import Paths**
- [ ] All import paths use relative paths from server root
- [ ] No import paths use `../` or absolute paths
- [ ] All controller files exist and are accessible
- [ ] All route files exist and are accessible

### **CORS Configuration**
- [ ] Environment variables are properly set for production URLs
- [ ] Vercel URL is added to allowed origins
- [ ] No hardcoded origins remain in production

### **Database Configuration**
- [ ] MongoDB connection string is properly formatted
- [ ] Database is accessible from Render
- [ ] Connection timeout is configured appropriately
- [ ] Backup database connection is available

## 🔧 **Common Deployment Issues & Solutions**

### **Issue: Module Not Found**
**Error**: `Cannot find module './controllers/auth/auth-controller'`
**Solution**: 
1. Check if file exists at correct path
2. Verify import path uses relative path from server root
3. Ensure file is not in .gitignore

### **Issue: Environment Variables Missing**
**Error**: `MONGODB_URL is not defined`
**Solution**:
1. Add MONGODB_URL to Render environment variables
2. Ensure .env file is not in .gitignore
3. Use production database connection string

### **Issue: CORS Errors**
**Error**: `CORS policy blocked`
**Solution**:
1. Add Vercel URL to CLIENT_URL in Render
2. Add VERCEL_URL to environment if needed
3. Test CORS configuration works with production URLs

### **Issue: Port Binding**
**Error**: `Port already in use`
**Solution**:
1. Use PORT environment variable (default 5002)
2. Ensure no hardcoded ports in server.js

## 📋 **Render-Specific Configuration**

### **Required Environment Variables**
```
MONGODB_URL=mongodb+srv://your-username:your-password@your-cluster.mongodb.net/your-database
JWT_SECRET=your-jwt-secret-key
CLIENT_URL=https://your-vercel-app.vercel.app
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
PORT=5002
```

### **Build Settings**
- **Build Command**: `npm install`
- **Start Command**: `node server.js`
- **Node Version**: Use Node.js 18+ (Render default)

### **Post-Deployment Testing**
1. [ ] Test authentication endpoints
2. [ ] Test product listing
3. [ ] Test cart functionality  
4. [ ] Test checkout process
5. [ ] Test admin dashboard access

### **Troubleshooting Steps**
1. Check Render build logs for specific error messages
2. Verify all environment variables are set correctly
3. Check if MongoDB connection string is valid and accessible
4. Test individual API endpoints using curl or Postman
5. Ensure CORS origins include your production frontend URL

## 🔗 **Helpful Resources**

- [Render Documentation](https://render.com/docs)
- [Node.js Documentation](https://nodejs.org/docs)
- [MongoDB Atlas](https://docs.mongodb.com/manual/reference/connection-string/)
- [Express.js Documentation](https://expressjs.com/)

---

**Last Updated**: April 14, 2026
