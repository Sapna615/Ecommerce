#!/bin/bash

echo "🧪 Testing Frontend API Access"
echo "================================"

# Test API endpoints that frontend will use
echo "📱 Testing Men's Section API:"
curl -s "http://192.168.1.45:5002/api/shop/products/get?category=mens" | jq '.success, .data | length'

echo ""
echo "📱 Testing Women's Section API:"
curl -s "http://192.168.1.45:5002/api/shop/products/get?category=womens" | jq '.success, .data | length'

echo ""
echo "📱 Testing Kids Section API:"
curl -s "http://192.168.1.45:5002/api/shop/products/get?category=kids" | jq '.success, .data | length'

echo ""
echo "📱 Testing Footwear Section API:"
curl -s "http://192.168.1.45:5002/api/shop/products/get?category=footwear" | jq '.success, .data | length'

echo ""
echo "📱 Testing Accessories Section API:"
curl -s "http://192.168.1.45:5002/api/shop/products/get?category=accessories" | jq '.success, .data | length'

echo ""
echo "🎯 Testing Product Details API:"
PRODUCT_ID=$(curl -s "http://192.168.1.45:5002/api/shop/products/get" | jq -r '.data[0]._id')
curl -s "http://192.168.1.45:5002/api/shop/products/get/$PRODUCT_ID" | jq '.success, .data.title'

echo ""
echo "✅ All API tests completed!"
echo "🌐 If all tests show success: true, the frontend should work."
echo "🔄 Please refresh your browser (Ctrl+Shift+R) to clear cache."
