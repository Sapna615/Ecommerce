# MongoDB Data Structure Overview

This document explains where all the data is stored in MongoDB for your ecommerce website.

## Database: `ecommerce`

## Collections (Tables):

### 1. `users` Collection
**Location**: `ecommerce.users`

**Schema**:
```javascript
{
  _id: ObjectId,
  userName: String,
  email: String,
  password: String, // Hashed password
  role: String, // "user" or "admin"
  phone: String,
  isEmailVerified: Boolean,
  isPhoneVerified: Boolean,
  emailVerificationToken: String,
  phoneVerificationCode: String,
  passwordResetToken: String,
  passwordResetExpires: Date,
  createdAt: Date,
  profilePicture: String,
  addresses: [ObjectId] // References to Address collection
}
```

**Sample Data**:
```javascript
{
  _id: "69b68098f56e1d8a18e7ec70",
  userName: "john_doe",
  email: "john@example.com",
  password: "$2a$12$hash...",
  role: "user",
  phone: "+1234567890",
  isEmailVerified: true,
  isPhoneVerified: false,
  createdAt: "2026-03-15T10:01:29.298Z"
}
```

### 2. `products` Collection
**Location**: `ecommerce.products`

**Schema**:
```javascript
{
  _id: ObjectId,
  title: String,
  description: String,
  category: String,
  brand: String,
  price: Number,
  salePrice: Number,
  totalStock: Number,
  image: String,
  averageReview: Number,
  sizes: [String],
  colors: [String],
  createdAt: Date,
  updatedAt: Date
}
```

### 3. `orders` Collection
**Location**: `ecommerce.orders`

**Schema**:
```javascript
{
  _id: ObjectId,
  userId: ObjectId, // Reference to User
  cartItems: [{
    productId: ObjectId,
    title: String,
    image: String,
    price: Number,
    quantity: Number
  }],
  addressInfo: {
    address: String,
    city: String,
    pincode: String,
    phone: String,
    notes: String
  },
  orderStatus: String, // "pending", "processing", "shipped", "delivered"
  paymentMethod: String, // "cod", "bank", "upi", "card"
  paymentStatus: String,
  totalAmount: Number,
  orderDate: Date,
  orderUpdateDate: Date,
  paymentDetails: Object
}
```

### 4. `carts` Collection
**Location**: `ecommerce.carts`

**Schema**:
```javascript
{
  _id: ObjectId,
  userId: String,
  items: [{
    productId: ObjectId,
    title: String,
    image: String,
    price: Number,
    salePrice: Number,
    quantity: Number
  }],
  createdAt: Date,
  updatedAt: Date
}
```

### 5. `wishlists` Collection
**Location**: `ecommerce.wishlists`

**Schema**:
```javascript
{
  _id: ObjectId,
  userId: String,
  productId: ObjectId,
  createdAt: Date
}
```

### 6. `addresses` Collection
**Location**: `ecommerce.addresses`

**Schema**:
```javascript
{
  _id: ObjectId,
  userId: String,
  address: String,
  city: String,
  pincode: String,
  phone: String,
  notes: String,
  createdAt: Date,
  updatedAt: Date
}
```

### 7. `reviews` Collection
**Location**: `ecommerce.reviews`

**Schema**:
```javascript
{
  _id: ObjectId,
  productId: ObjectId,
  userId: String,
  userName: String,
  reviewMessage: String,
  reviewValue: Number, // 1-5 stars
  createdAt: Date,
  updatedAt: Date
}
```

## How to View Data in MongoDB:

### Using MongoDB Compass:
1. Open MongoDB Compass
2. Connect to: `mongodb://localhost:27017`
3. Select database: `ecommerce`
4. Click on any collection to view data

### Using MongoDB Shell:
```bash
# Connect to MongoDB
mongosh

# Switch to ecommerce database
use ecommerce

# View all collections
show collections

# View users data
db.users.find().pretty()

# View products data
db.products.find().pretty()

# View orders data
db.orders.find().pretty()

# View cart data
db.carts.find().pretty()

# View wishlist data
db.wishlists.find().pretty()

# View addresses data
db.addresses.find().pretty()

# View reviews data
db.reviews.find().pretty()
```

### Using Node.js:
```javascript
// In your server.js or any script
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/ecommerce');

// Get all users
const User = require('./models/User');
const users = await User.find();
console.log('All Users:', users);

// Get all orders
const Order = require('./models/Order');
const orders = await Order.find();
console.log('All Orders:', orders);
```

## Admin vs User Sections:

### Admin Section:
- **Users**: Can view, manage, and delete all users
- **Products**: Can add, edit, delete products, manage inventory
- **Orders**: Can view all orders, update order status
- **Analytics**: Can view sales reports, user statistics
- **Dashboard**: Complete overview of the ecommerce platform

### User Section:
- **Profile**: Can view and edit their own profile
- **Cart**: Can add/remove items, update quantities
- **Wishlist**: Can add/remove wishlist items
- **Orders**: Can view their own orders and order history
- **Addresses**: Can manage their shipping addresses
- **Reviews**: Can add product reviews

## API Endpoints:

### Admin Endpoints:
- `GET /api/admin/dashboard/stats` - Dashboard statistics
- `GET /api/admin/users` - All users
- `GET /api/admin/orders` - All orders
- `PUT /api/admin/orders/:orderId/status` - Update order status
- `GET /api/admin/analytics/products` - Product analytics
- `DELETE /api/admin/users/:userId` - Delete user

### User Endpoints:
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/auth/verify-email` - Email verification
- `POST /api/auth/forgot-password` - Forgot password
- `GET /api/shop/products/get` - Get products
- `POST /api/shop/cart/add` - Add to cart
- `GET /api/shop/order/list/:userId` - User orders

## Data Relationships:
- `users` → `orders` (one-to-many)
- `users` → `carts` (one-to-one)
- `users` → `wishlists` (one-to-many)
- `users` → `addresses` (one-to-many)
- `products` → `orders` (one-to-many via cartItems)
- `products` → `wishlists` (one-to-many)
- `products` → `reviews` (one-to-many)

## Security Notes:
- All passwords are hashed using bcrypt
- Email verification tokens are temporary
- Password reset tokens expire after 1 hour
- Admin routes require admin authentication
- User data is isolated by userId

This structure allows for complete separation between admin and user functionality while maintaining data integrity and security.
