const express = require("express");
const {
  getCategories,
  createCategory,
  deleteCategory,
} = require("../controllers/categoryController.js");
const { upload } = require("../config/cloudinary");
const router = express.Router();

// Route to fetch all categories
router.get("/getCategory", getCategories);

// Route to create a new category
router.post("/createCategory", upload.single("image"), createCategory);

// Route to delete a category by id.
router.post("/deleteCategory/:id", deleteCategory);

module.exports = router;
