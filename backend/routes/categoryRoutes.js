import express from "express";
import {
  getCategories,
  createCategory,
  deleteCategory,
  getCategoryById,
  updateCategory,
} from "../controllers/categoryController.js";
import { protect, admin } from "../middleware/authMiddleware.js";
import { upload } from "../config/cloudinary.js";

const router = express.Router();

router.get("/getCategory", getCategories);
router.get("/getCategory/:id", getCategoryById);
router.post(
  "/createCategory",
  protect,
  admin,
  upload.single("image"),
  createCategory
);
router.put(
  "/updateCategory/:id",
  protect,
  admin,
  upload.single("image"),
  updateCategory
);
router.delete("/deleteCategory/:id", protect, admin, deleteCategory);

export default router;
