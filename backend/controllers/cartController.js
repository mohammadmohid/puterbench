const Cart = require("../models/cart");
const Product = require("../models/product");

// Add item to cart
const addToCart = async (req, res) => {
  const { userId, productId, quantity } = req.body;

  try {
    let cart = await Cart.findOne({ user: userId });

    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    if (!cart) {
      cart = new Cart({
        user: userId,
        items: [{ product: productId, quantity }],
        totalPrice: product.price * quantity,
        totalItems: quantity,
      });
    } else {
      const itemIndex = cart.items.findIndex(
        (item) => item.product.toString() === productId
      );

      if (itemIndex > -1) {
        cart.items[itemIndex].quantity += quantity;
      } else {
        cart.items.push({ product: productId, quantity });
      }

      cart.totalPrice += product.price * quantity;
      cart.totalItems += quantity;
    }

    const updatedCart = await cart.save();
    res.status(200).json(updatedCart);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error", error });
  }
};

// Remove item from cart
const removeFromCart = async (req, res) => {
  const { userId, productId } = req.body;

  try {
    const cart = await Cart.findOne({ user: userId });

    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    const itemIndex = cart.items.findIndex(
      (item) => item.product.toString() === productId
    );

    if (itemIndex > -1) {
      const product = await Product.findById(productId);
      cart.totalPrice -= cart.items[itemIndex].quantity * product.price;
      cart.totalItems -= cart.items[itemIndex].quantity;
      cart.items.splice(itemIndex, 1);
    } else {
      return res.status(404).json({ message: "Product not found in cart" });
    }

    const updatedCart = await cart.save();
    res.status(200).json(updatedCart);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error", error });
  }
};

// Get cart details
const getCart = async (req, res) => {
  const { userId } = req.params;

  try {
    const cart = await Cart.findOne({ user: userId }).populate(
      "items.product",
      "name price image"
    );
    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }
    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error", error });
  }
};

module.exports = {
  addToCart,
  removeFromCart,
  getCart,
};
