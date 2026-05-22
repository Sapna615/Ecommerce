const mongoose = require('mongoose');
require('dotenv').config({path: './.env'});
const Order = require('./models/Order');

mongoose.connect(process.env.MONGODB_URL).then(async () => {
  const orders = await Order.find({ "addressInfo.phone": "09569919257" });
  orders.forEach(o => {
    console.log(`Order ID: ${o._id}, Items count: ${o.cartItems.length}`);
    if (o.cartItems.length === 1) {
       console.log(JSON.stringify(o.cartItems, null, 2));
    }
  });
  process.exit(0);
}).catch(console.log);
