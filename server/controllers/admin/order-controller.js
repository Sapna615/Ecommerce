const Order = require("../../models/Order");
const User = require("../../models/User");

const getAllOrdersOfAllUsers = async (req, res) => {
  try {
    const orders = await Order.find({}).sort({ createdAt: -1 });

    if (!orders.length) {
      return res.status(404).json({
        success: false,
        message: "No orders found!",
      });
    }

    // Manually populate user information for each order
    const populatedOrders = await Promise.all(
      orders.map(async (order) => {
        try {
          const user = await User.findById(order.userId).select('userName email phone');
          return {
            ...order.toObject(),
            userId: user || { userName: 'Unknown', email: 'N/A', phone: 'N/A' }
          };
        } catch (error) {
          console.log('Error populating user for order:', order._id, error);
          return {
            ...order.toObject(),
            userId: { userName: 'Unknown', email: 'N/A', phone: 'N/A' }
          };
        }
      })
    );

    console.log(`Found ${populatedOrders.length} orders for admin with user details`);
    
    res.status(200).json({
      success: true,
      data: populatedOrders,
    });
  } catch (e) {
    console.log("Error fetching all orders:", e);
    res.status(500).json({
      success: false,
      message: "Some error occurred while fetching orders!",
    });
  }
};

const getOrderDetailsForAdmin = async (req, res) => {
  try {
    const { id } = req.params;

    const order = await Order.findById(id);

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found!",
      });
    }

    // Manually populate user and product information
    try {
      const user = await User.findById(order.userId).select('userName email phone addresses');
      const populatedOrder = {
        ...order.toObject(),
        userId: user || { userName: 'Unknown', email: 'N/A', phone: 'N/A', addresses: [] }
      };

      // Populate product information for cart items
      const populatedCartItems = await Promise.all(
        populatedOrder.cartItems.map(async (item) => {
          try {
            const product = await require('../../models/Product').findById(item.productId)
              .select('title image price salePrice');
            return {
              ...item,
              productId: product || { title: 'Product Not Found', image: '', price: 0, salePrice: 0 }
            };
          } catch (error) {
            return {
              ...item,
              productId: { title: 'Product Not Found', image: '', price: 0, salePrice: 0 }
            };
          }
        })
      );

      populatedOrder.cartItems = populatedCartItems;

      console.log("Admin fetched order details:", populatedOrder._id);
      
      res.status(200).json({
        success: true,
        data: populatedOrder,
      });
    } catch (error) {
      console.log("Error populating order details:", error);
      res.status(200).json({
        success: true,
        data: order, // Return original order if population fails
      });
    }
  } catch (e) {
    console.log("Error fetching order details:", e);
    res.status(500).json({
      success: false,
      message: "Some error occurred while fetching order details!",
    });
  }
};

const updateOrderStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { orderStatus } = req.body;

    const order = await Order.findById(id);

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found!",
      });
    }

    await Order.findByIdAndUpdate(id, { orderStatus });

    res.status(200).json({
      success: true,
      message: "Order status is updated successfully!",
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Some error occured!",
    });
  }
};

module.exports = {
  getAllOrdersOfAllUsers,
  getOrderDetailsForAdmin,
  updateOrderStatus,
};
