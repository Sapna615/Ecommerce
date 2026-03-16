const express = require("express");
const router = express.Router();

// Mock payment gateway endpoints
router.post("/create-payment", async (req, res) => {
  try {
    const { amount, paymentMethod, orderId, bankDetails } = req.body;
    
    console.log('Payment request:', { amount, paymentMethod, orderId, bankDetails });
    
    // Simulate payment processing
    const paymentId = "PAY_" + Date.now() + "_" + Math.random().toString(36).substr(2, 9);
    
    if (paymentMethod === "cod") {
      res.status(200).json({
        success: true,
        paymentId: paymentId,
        status: "pending",
        message: "Cash on delivery order placed successfully"
      });
    } else if (paymentMethod === "bank") {
      // Simulate bank transfer processing
      res.status(200).json({
        success: true,
        paymentId: paymentId,
        status: "processing",
        message: "Bank transfer initiated. Please complete payment using the provided details.",
        bankDetails: {
          accountNumber: "1234567890",
          accountHolder: "Ecommerce Store",
          ifscCode: "ECOM0123456",
          bankName: "Demo Bank"
        }
      });
    } else {
      // Mock PayPal/UPI/Card payment
      res.status(200).json({
        success: true,
        paymentId: paymentId,
        approvalUrl: `https://mock-payment-gateway.com/pay/${paymentId}`,
        status: "pending",
        message: "Please complete payment on the payment gateway page"
      });
    }
  } catch (error) {
    console.error('Payment error:', error);
    res.status(500).json({
      success: false,
      message: "Payment processing failed"
    });
  }
});

router.post("/verify-payment", async (req, res) => {
  try {
    const { paymentId, orderId } = req.body;
    
    // Simulate payment verification
    res.status(200).json({
      success: true,
      status: "completed",
      message: "Payment verified successfully"
    });
  } catch (error) {
    console.error('Payment verification error:', error);
    res.status(500).json({
      success: false,
      message: "Payment verification failed"
    });
  }
});

module.exports = router;
