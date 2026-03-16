#!/bin/bash

# Setup Script for Ecommerce Store Configuration
# This script helps you configure your email and database settings

echo "🚀 Ecommerce Store Configuration Setup"
echo "======================================"

# Check if .env file exists
if [ -f ".env" ]; then
    echo "⚠️  .env file already exists. Please backup and remove it first."
    echo "   You can run: cp .env .env.backup"
    echo "   Then: rm .env"
    exit 1
fi

# Create .env file from example
echo "📝 Creating .env file from template..."
cp .env.example .env

# Get user input for email configuration
echo ""
echo "📧 Email Configuration"
echo "---------------------"

read -p "Enter your Gmail address: " email_address
read -s -p "Enter your Gmail app password: " email_password
echo ""

# Get user input for MongoDB configuration
echo ""
echo "🗄️  MongoDB Configuration"
echo "------------------------"

read -p "Enter MongoDB URL (default: mongodb://localhost:27017/ecommerce): " mongodb_url
mongodb_url=${mongodb_url:-"mongodb://localhost:27017/ecommerce"}

# Get user input for JWT secret
echo ""
echo "🔐 JWT Configuration"
echo "--------------------"

read -p "Generate JWT secret automatically? (y/n): " generate_jwt
if [ "$generate_jwt" = "y" ]; then
    jwt_secret=$(node -e "console.log(require('crypto').randomBytes(64).toString('hex'))")
else
    read -s -p "Enter your JWT secret: " jwt_secret
fi

# Update .env file
echo ""
echo "🔄 Updating .env file..."

# Update email configuration
sed -i '' "s/your-email@gmail.com/$email_address/g" .env
sed -i '' "s/your-app-password/$email_password/g" .env

# Update MongoDB URL
sed -i '' "s|mongodb://localhost:27017/ecommerce|$mongodb_url|g" .env

# Update JWT secret
sed -i '' "s/your_jwt_secret_key_here/$jwt_secret/g" .env

# Update frontend URL
read -p "Enter frontend URL (default: http://192.168.1.45:5174): " frontend_url
frontend_url=${frontend_url:-"http://192.168.1.45:5174"}
sed -i '' "s|http://192.168.1.45:5174|$frontend_url|g" .env

echo ""
echo "✅ Configuration completed!"
echo ""
echo "📋 Summary:"
echo "   Email: $email_address"
echo "   MongoDB: $mongodb_url"
echo "   Frontend: $frontend_url"
echo ""
echo "🔧 Next steps:"
echo "   1. Make sure 2-factor authentication is enabled on your Gmail"
echo "   2. Generate an app password at: https://myaccount.google.com/apppasswords"
echo "   3. Update the app password in your .env file if needed"
echo "   4. Restart the server: npm run dev"
echo ""
echo "📧 To test email configuration:"
echo "   node -e \"require('./services/emailService').sendVerificationEmail('test@example.com', 'test-token')\""
echo ""
echo "🎉 Your configuration is ready!"
