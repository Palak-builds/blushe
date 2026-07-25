const Order = require("../models/Order");
const Cart = require("../models/Cart");
const Product = require("../models/Product");
const GiftCard = require("../models/GiftCard");

// @desc  Place order from cart, OR directly from a single product ("Buy Now")
// @route POST /api/orders
// body: { shippingAddress, paymentMethod, giftCardCode?, buyNow?: { productId, quantity } }
exports.placeOrder = async (req, res) => {
  try {
    const { shippingAddress, paymentMethod, giftCardCode, buyNow } = req.body;
    let orderItems = [];

    if (buyNow) {
      // Buy Now: single product, skip the cart entirely
      const product = await Product.findById(buyNow.productId);
      if (!product) return res.status(404).json({ message: "Product not found" });
      orderItems.push({
        product: product._id,
        name: product.name,
        image: product.images[0],
        price: product.discountPrice || product.price,
        quantity: buyNow.quantity || 1,
      });
    } else {
      // Normal checkout from cart
      const cart = await Cart.findOne({ user: req.user._id }).populate("items.product");
      if (!cart || cart.items.length === 0) {
        return res.status(400).json({ message: "Cart is empty" });
      }
      orderItems = cart.items.map((item) => ({
        product: item.product._id,
        name: item.product.name,
        image: item.product.images[0],
        price: item.priceAtAdd,
        quantity: item.quantity,
      }));
    }

    const itemsTotal = orderItems.reduce((sum, i) => sum + i.price * i.quantity, 0);
    const shippingFee = itemsTotal > 999 ? 0 : 49;
    let totalAmount = itemsTotal + shippingFee;

    let giftCard;
    if (giftCardCode) {
      giftCard = await GiftCard.findOne({ code: giftCardCode, isActive: true });
      if (!giftCard) return res.status(400).json({ message: "Invalid or inactive gift card" });
      const deduction = Math.min(giftCard.currentBalance, totalAmount);
      totalAmount -= deduction;
      giftCard.currentBalance -= deduction;
      await giftCard.save();
    }

    const order = await Order.create({
      user: req.user._id,
      items: orderItems,
      shippingAddress,
      paymentMethod,
      giftCardUsed: giftCard ? giftCard._id : undefined,
      itemsTotal,
      shippingFee,
      totalAmount,
    });

    // Clear cart only if this was a cart checkout (not Buy Now)
    if (!buyNow) {
      await Cart.findOneAndUpdate({ user: req.user._id }, { items: [] });
    }

    res.status(201).json(order);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc  Get logged-in user's order history
// @route GET /api/orders
exports.getMyOrders = async (req, res) => {
  const orders = await Order.find({ user: req.user._id }).sort({ createdAt: -1 });
  res.json(orders);
};

// @desc  Get single order detail
// @route GET /api/orders/:id
exports.getOrderById = async (req, res) => {
  const order = await Order.findById(req.params.id);
  if (!order) return res.status(404).json({ message: "Order not found" });
  if (order.user.toString() !== req.user._id.toString() && req.user.role !== "admin") {
    return res.status(403).json({ message: "Not authorized to view this order" });
  }
  res.json(order);
};
