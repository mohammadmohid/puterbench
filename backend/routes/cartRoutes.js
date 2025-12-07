import express from "express";
import {
  addToCart,
  removeFromCart,
  getCart,
  updateCartItem,
} from "../controllers/cartController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/addToCart", protect, addToCart);
router.put("/updateCart", protect, updateCartItem);
router.delete("/removeFromCart", protect, removeFromCart);
router.get("/:userId", protect, getCart);

export default router;
