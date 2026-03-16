const paypal = require("paypal-rest-sdk");

paypal.configure({
  mode: process.env.PAYPAL_MODE || "sandbox",
  client_id: process.env.PAYPAL_CLIENT_ID || "sandbox_client_id",
  client_secret: process.env.PAYPAL_CLIENT_SECRET || "sandbox_client_secret",
});

module.exports = paypal;
