const express = require("express");
const {
  addToCart,
  removeFromCart,
  getCart,
} = require("../controllers/cartController");
const router = express.Router();

// Add to cart
router.post("/addToCart", addToCart);

// Remove from cart
router.delete("/removeFromCart", removeFromCart);

// Get cart
router.get("/:userId", getCart);

module.exports = router;
