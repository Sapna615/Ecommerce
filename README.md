# 🛍️ E-Commerce Shopping Platform

A modern, full-stack e-commerce application built with React, Node.js, and MongoDB. Features user authentication, product management, shopping cart, payment integration, and more.

## 🌟 Features

### 👤 User Authentication & Management
- **User Registration & Login** with email verification
- **Password Reset** functionality
- **Profile Management** with order history
- **JWT-based Authentication** for secure access
- **Social Login Ready** (Google, Facebook integration)

### 🛍️ Shopping Experience
- **Product Catalog** with advanced filtering and search
- **Product Categories** (Men, Women, Kids T-shirts)
- **Detailed Product Pages** with image galleries
- **Shopping Cart** with real-time updates
- **Wishlist** functionality for saved items
- **Product Reviews** and ratings system

### 📦 Order Management
- **Checkout Process** with multiple payment options
- **Order Tracking** system
- **Order History** with detailed status
- **Invoice Generation** for purchases
- **Shipping Address** management

### 💳 Payment Integration
- **PayPal Integration** for secure payments
- **Multiple Payment Methods** support
- **Secure Checkout** with SSL encryption
- **Order Confirmation** with email notifications

### 📱 Admin Dashboard
- **Product Management** (CRUD operations)
- **Order Management** with status updates
- **User Management** and analytics
- **Sales Analytics** and reporting
- **Inventory Management** system

### 🎨 Frontend Features
- **Responsive Design** for all devices
- **Modern UI/UX** with Tailwind CSS
- **Product Search** with real-time filtering
- **Shopping Cart** with quantity management
- **User Dashboard** with order tracking
- **Blog System** with SEO-friendly URLs

### 🔧 Backend Features
- **RESTful API** with Express.js
- **MongoDB Database** with Mongoose ODM
- **JWT Authentication** with refresh tokens
- **Email Notifications** with Nodemailer
- **File Upload** with Cloudinary integration
- **CORS Configuration** for cross-origin requests

## 🛠️ Technology Stack

### Frontend
- **React 18** with Hooks and Context API
- **Vite** for fast development and building
- **Tailwind CSS** for responsive styling
- **Lucide React** for modern icons
- **Axios** for API communication
- **React Router** for navigation
- **Redux Toolkit** for state management

### Backend
- **Node.js** with Express.js framework
- **MongoDB** with Mongoose ODM
- **JWT** for authentication
- **Nodemailer** for email services
- **Cloudinary** for image storage
- **PayPal SDK** for payment processing
- **Bcrypt** for password hashing

### Development Tools
- **ESLint** for code quality
- **Prettier** for code formatting
- **Git** for version control
- **Vercel** for frontend deployment
- **Render** for backend deployment

## 📁 Project Structure

```
ecommerce/
├── client/                 # React frontend application
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   ├── pages/         # Route pages
│   │   ├── store/         # Redux state management
│   │   ├── api/           # API communication layer
│   │   └── assets/         # Static assets
│   ├── public/             # Public files
│   └── package.json        # Frontend dependencies
├── server/                # Node.js backend application
│   ├── controllers/        # Route controllers
│   ├── models/           # Database models
│   ├── routes/           # API routes
│   ├── helpers/          # Utility functions
│   └── server.js         # Main server file
├── DEPLOYMENT-GUIDE.md   # Deployment instructions
├── GITHUB-CHECKLIST.md    # Pre-deployment checklist
└── README.md              # This file
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn package manager
- MongoDB database
- Git for version control

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/ecommerce.git
   cd ecommerce
   ```

2. **Install dependencies**
   ```bash
   # Frontend dependencies
   cd client
   npm install
   
   # Backend dependencies
   cd ../server
   npm install
   ```

3. **Environment Configuration**
   
   **Frontend (.env)**
   ```bash
   VITE_API_URL=http://localhost:5002/api
   ```
   
   **Backend (.env)**
   ```bash
   MONGODB_URL=mongodb+srv://your-connection-string
   JWT_SECRET=your-jwt-secret
   EMAIL_HOST=smtp.gmail.com
   EMAIL_USER=your-email@gmail.com
   EMAIL_PASS=your-app-password
   ```

4. **Start Development Servers**
   ```bash
   # Start backend (port 5002)
   cd server
   npm run dev
   
   # Start frontend (port 5173)
   cd ../client
   npm run dev
   ```

5. **Access Application**
   - Frontend: http://localhost:5173
   - Backend API: http://localhost:5002/api

## 🌐 API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `POST /api/auth/logout` - User logout
- `POST /api/auth/refresh` - Refresh JWT token
- `POST /api/auth/forgot-password` - Password reset

### Products
- `GET /api/products` - Get all products
- `GET /api/products/:id` - Get product by ID
- `GET /api/products/category/:category` - Get products by category
- `POST /api/products/search` - Search products

### Cart
- `GET /api/cart` - Get user cart
- `POST /api/cart/add` - Add item to cart
- `PUT /api/cart/update` - Update cart item
- `DELETE /api/cart/remove/:id` - Remove cart item

### Orders
- `GET /api/orders` - Get user orders
- `POST /api/orders/create` - Create new order
- `GET /api/orders/:id` - Get order by ID

## 🎨 UI/UX Features

### Design System
- **Modern Design** with gradient backgrounds
- **Glass Morphism** effects for modern aesthetics
- **Responsive Layout** for mobile, tablet, desktop
- **Dark/Light Mode** support ready
- **Smooth Animations** and transitions

### User Experience
- **Loading States** for better feedback
- **Error Handling** with user-friendly messages
- **Form Validation** with real-time feedback
- **Search Functionality** with instant results
- **Filter Options** for product discovery

## 📱 Mobile Responsiveness

- **Mobile-First** design approach
- **Touch-Friendly** interfaces
- **Optimized Images** for faster loading
- **Progressive Web App** ready
- **Cross-Browser** compatibility

## 🔒 Security Features

- **JWT Authentication** with refresh tokens
- **Password Hashing** with bcrypt
- **CORS Protection** for API security
- **Input Validation** and sanitization
- **Rate Limiting** for API protection
- **HTTPS Ready** for production

## 📊 Performance Optimizations

- **Code Splitting** for faster loading
- **Image Optimization** with lazy loading
- **Caching Strategy** for better performance
- **SEO Optimized** with meta tags
- **Bundle Size** optimization

## 🛍️ E-Commerce Features

### Product Management
- **Product Variants** (size, color, etc.)
- **Inventory Tracking** in real-time
- **Product Images** with zoom functionality
- **Product Reviews** and ratings
- **Wishlist Management** for users

### Shopping Experience
- **One-Click Checkout** for registered users
- **Guest Checkout** option available
- **Multiple Payment** methods
- **Shipping Calculator** integration
- **Discount Codes** and coupons

### Order Processing
- **Real-time Inventory** updates
- **Automated Email** notifications
- **Order Status** tracking
- **Return Management** system
- **Customer Support** integration

## 🚀 Deployment

### Frontend (Vercel)
1. Connect repository to Vercel
2. Configure build settings
3. Add environment variables
4. Deploy automatically on push

### Backend (Render)
1. Connect repository to Render
2. Configure Node.js runtime
3. Add environment variables
4. Deploy with automatic scaling

See [DEPLOYMENT-GUIDE.md](./DEPLOYMENT-GUIDE.md) for detailed instructions.

## 🧪 Testing

### Frontend Testing
- Component unit tests with Jest
- Integration tests with React Testing Library
- E2E tests with Cypress ready
- Performance testing with Lighthouse

### Backend Testing
- API endpoint testing with Jest
- Database integration tests
- Authentication flow testing
- Payment integration testing

## 📈 Analytics & Monitoring

- **User Behavior** tracking
- **Sales Analytics** dashboard
- **Performance Metrics** monitoring
- **Error Tracking** integration ready
- **Conversion Rate** optimization

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 📞 Support

For support and questions:
- Create an issue in the repository
- Check the [DEPLOYMENT-GUIDE.md](./DEPLOYMENT-GUIDE.md) for deployment help
- Review the [GITHUB-CHECKLIST.md](./GITHUB-CHECKLIST.md) for pre-deployment checks

---

**Built with ❤️ using modern web technologies**
