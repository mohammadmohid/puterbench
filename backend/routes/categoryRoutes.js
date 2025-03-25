import express from "express";
import {
  getCategories,
  createCategory,
  deleteCategory,
} from "../controllers/categoryController.js";
import { upload } from "../config/cloudinary.js";

const router = express.Router();

// Route to fetch all categories
router.get("/getCategory", getCategories);

// Route to create a new category
router.post("/createCategory", upload.single("image"), createCategory);

// Route to delete a category by id.
router.post("/deleteCategory/:id", deleteCategory);

export default router;
