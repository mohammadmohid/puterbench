import express from "express";
import {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProductImage,
  deleteProduct,
} from "../controllers/productController.js";
import { protect, admin } from "../middleware/authMiddleware.js";
import { upload } from "../config/cloudinary.js";

const router = express.Router();

const uploadFields = upload.fields([
  { name: "image", maxCount: 1 },
  { name: "images", maxCount: 10 },
]);

// Public
router.get("/getProducts", getProducts);
router.get("/getProduct/:id", getProductById);

// Protected/Admin
router.post("/addProduct", protect, admin, uploadFields, createProduct);
router.put("/updateProduct/:id", protect, admin, uploadFields, updateProduct);
router.delete("/deleteProduct/:id", protect, admin, deleteProduct);
router.delete("/:id/images/:imageIndex", protect, admin, deleteProductImage);

export default router;
