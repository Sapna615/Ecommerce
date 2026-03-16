# 🔐 Admin vs User Section Management Guide

## 🎯 **How to Identify Admin vs User Sections:**

### **1. 📊 In MongoDB Database:**

#### **Check User Roles in MongoDB:**
```javascript
// Connect to MongoDB
mongo ecommerce

// Check all users and their roles
db.users.find({}, {userName: 1, email: 1, role: 1, createdAt: 1})

// Find admin users specifically
db.users.find({role: "admin"})

// Find regular users
db.users.find({role: "user"})

// Find users without role (default to user)
db.users.find({role: {$exists: false}})
```

#### **Change User Role in MongoDB:**
```javascript
// Promote a user to admin
db.users.updateOne(
  {email: "user@example.com"}, 
  {$set: {role: "admin"}}
)

// Demote an admin to user
db.users.updateOne(
  {email: "admin@example.com"}, 
  {$set: {role: "user"}}
)

// Remove role (becomes regular user)
db.users.updateOne(
  {email: "admin@example.com"}, 
  {$unset: {role: ""}}
)

// Create a new admin user
db.users.insertOne({
  userName: "admin",
  email: "admin@example.com", 
  password: "$2a$10$hashedpasswordhere", // Hash this properly
  role: "admin",
  createdAt: new Date(),
  isEmailVerified: true
})
```

---

### **2. 🔍 In Frontend Code:**

#### **Check User Role in Redux State:**
```javascript
// Open browser console and check:
console.log('Current user:', store.getState().auth.user);

// Check if user is admin:
const user = JSON.parse(localStorage.getItem('user'));
console.log('User role:', user?.role);
console.log('Is admin:', user?.role === 'admin');
```

#### **Admin Route Protection:**
```javascript
// File: client/src/App.jsx
<Route
  path="/admin"
  element={
    <CheckAuth isAuthenticated={isAuthenticated} user={user}>
      <AdminLayout />  // Only accessible to admins
    </CheckAuth>
  }
>
  <Route path="dashboard" element={<AdminDashboard />} />
  <Route path="products" element={<AdminProducts />} />
  <Route path="orders" element={<AdminOrders />} />
</Route>

// User routes (accessible to all)
<Route
  path="/shop"
  element={
    <CheckAuth isAuthenticated={isAuthenticated} user={user}>
      <ShoppingLayout />
    </CheckAuth>
  }
>
  <Route path="home" element={<ShoppingHome />} />
  <Route path="mens" element={<MensShopping />} />
  <Route path="womens" element={<WomensShopping />} />
  // ... other user routes
</Route>
```

---

### **3. 🛡️ In Backend Code:**

#### **Admin Middleware Protection:**
```javascript
// File: server/middleware/auth-middleware.js

// Regular user authentication
const authenticateToken = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ message: "No token provided" });
  
  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) return res.status(401).json({ message: "Invalid token" });
    req.user = decoded;
    next();
  });
};

// Admin-only authentication
const authenticateAdminToken = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ message: "No token provided" });
  
  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) return res.status(401).json({ message: "Invalid token" });
    if (decoded.role !== 'admin') {
      return res.status(403).json({ message: "Admin access required!" });
    }
    req.user = decoded;
    next();
  });
};
```

#### **Admin Routes Protection:**
```javascript
// File: server/routes/admin/products.js
router.post('/add', authenticateAdminToken, addProduct);
router.put('/edit/:id', authenticateAdminToken, editProduct);
router.delete('/delete/:id', authenticateAdminToken, deleteProduct);

// User routes (regular authentication)
router.post('/add', authenticateToken, addToCart);
router.get('/get', authenticateToken, getCartItems);
```

---

### **4. 🎨 Visual Indicators in UI:**

#### **Admin Panel URL Structure:**
```
🔐 Admin Section URLs:
- http://localhost:5173/admin/dashboard
- http://localhost:5173/admin/products
- http://localhost:5173/admin/orders
- http://localhost:5173/admin/features

🛒 User Section URLs:
- http://localhost:5173/shop/home
- http://localhost:5173/shop/mens
- http://localhost:5173/shop/womens
- http://localhost:5173/shop/checkout
```

#### **Admin Panel Navigation:**
```javascript
// File: client/src/components/admin-view/sidebar.jsx
const adminSidebarMenuItems = [
  {
    id: "dashboard",
    label: "Dashboard",
    path: "/admin/dashboard",
    icon: <LayoutDashboard />,
  },
  {
    id: "products", 
    label: "Products",
    path: "/admin/products",
    icon: <ShoppingBasket />,
  },
  {
    id: "orders",
    label: "Orders", 
    path: "/admin/orders",
    icon: <BadgeCheck />,
  },
];
```

#### **User Navigation:**
```javascript
// File: client/src/components/shopping-view/header.jsx
const shoppingViewHeaderMenuItems = [
  { id: "home", label: "Home", path: "/shop/home" },
  { id: "men", label: "Men", path: "/shop/mens" },
  { id: "women", label: "Women", path: "/shop/womens" },
  { id: "kids", label: "Kids", path: "/shop/kids" },
  // ... shopping items
];
```

---

## 🛠️ **How to Change User Roles:**

### **Method 1: MongoDB Shell (Recommended)**
```bash
# Connect to MongoDB
mongo ecommerce

# Check current roles
db.users.find({}, {userName: 1, email: 1, role: 1})

# Change user role
db.users.updateOne(
  {email: "targetuser@example.com"}, 
  {$set: {role: "admin"}}
)

# Verify the change
db.users.find({email: "targetuser@example.com"})
```

### **Method 2: Create Admin User Script**
```javascript
// File: server/create-admin.js
require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('./models/User');

async function createAdminUser() {
  try {
    await mongoose.connect(process.env.MONGODB_URL);
    
    const hashedPassword = await bcrypt.hash('admin123', 10);
    
    const adminUser = new User({
      userName: 'admin',
      email: 'admin@example.com',
      password: hashedPassword,
      role: 'admin',
      isEmailVerified: true
    });
    
    await adminUser.save();
    console.log('Admin user created successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error creating admin:', error);
    process.exit(1);
  }
}

createAdminUser();
```

### **Method 3: Update Existing User Script**
```javascript
// File: server/make-admin.js
require('dotenv').config();
const mongoose = require('mongoose');
const User = require('./models/User');

async function makeUserAdmin(email) {
  try {
    await mongoose.connect(process.env.MONGODB_URL);
    
    const result = await User.updateOne(
      {email: email},
      {$set: {role: 'admin'}}
    );
    
    if (result.modifiedCount > 0) {
      console.log(`User ${email} is now an admin!`);
    } else {
      console.log(`User ${email} not found or already admin`);
    }
    
    process.exit(0);
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
}

makeUserAdmin(process.argv[2]); // Pass email as argument
```

---

## 🧪 **Testing Admin vs User Access:**

### **Test Admin Access:**
```bash
# 1. Login as admin user
# 2. Try to access admin URLs
curl -H "Authorization: Bearer <admin_token>" \
     http://localhost:5002/api/admin/products/get

# Should return: Product list
# 3. Try to access user URLs (should also work)
curl -H "Authorization: Bearer <admin_token>" \
     http://localhost:5002/api/shop/cart/get
```

### **Test User Access:**
```bash
# 1. Login as regular user
# 2. Try to access admin URLs (should fail)
curl -H "Authorization: Bearer <user_token>" \
     http://localhost:5002/api/admin/products/get

# Should return: "Admin access required!"
# 3. Try to access user URLs (should work)
curl -H "Authorization: Bearer <user_token>" \
     http://localhost:5002/api/shop/cart/get
```

---

## 📋 **Quick Reference Commands:**

### **MongoDB Operations:**
```javascript
// Check all users
db.users.find({}, {userName: 1, email: 1, role: 1})

// Make user admin
db.users.updateOne({email: "user@example.com"}, {$set: {role: "admin"}})

// Remove admin role
db.users.updateOne({email: "admin@example.com"}, {$set: {role: "user"}})

// Count admins vs users
db.users.aggregate([
  {$group: {_id: "$role", count: {$sum: 1}}}
])
```

### **URL Access Patterns:**
```
🔐 Admin URLs (role: "admin" required):
/admin/dashboard
/admin/products  
/admin/orders
/admin/features

🛒 User URLs (any authenticated user):
/shop/home
/shop/mens
/shop/womens
/shop/checkout
/shop/profile
```

### **Frontend Role Check:**
```javascript
// In browser console
const user = JSON.parse(localStorage.getItem('user'));
console.log('User:', user?.userName);
console.log('Role:', user?.role);
console.log('Is Admin:', user?.role === 'admin');
```

---

## 🎯 **Summary:**

### **Where to Check/Change Roles:**
1. **MongoDB Database** - Primary source of truth
2. **Frontend Redux State** - Current session
3. **Backend JWT Tokens** - Authentication
4. **Route Protection** - Access control

### **Key Indicators:**
- **Admin URLs** start with `/admin`
- **User URLs** start with `/shop`
- **Database role field** determines access
- **JWT token contains role** for backend validation

### **Management Methods:**
- **MongoDB Shell** - Direct database access
- **Admin Scripts** - Automated user management
- **Frontend Console** - Session debugging
- **Backend Logs** - Access monitoring

**🔐 You now have complete control over admin vs user access management!** 🎉
