const express = require("express");
const {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProductImage,
  deleteProduct,
} = require("../controllers/productController");
const { upload } = require("../config/cloudinary");
const router = express.Router();

const uploadFields = upload.fields([
  { name: "image", maxCount: 1 },
  { name: "images", maxCount: 10 },
]);

// Route to create a new product
router.post("/addProduct", uploadFields, createProduct);

// Route to fetch all products
router.get("/getProducts", getProducts);

// Route to fetch a single product by ID
router.get("/getProduct/:id", getProductById);

// Route to update a product by ID
router.put("/updateProduct/:id", uploadFields, updateProduct);

// Route to delete a product by ID
router.delete("/deleteProduct/:id", deleteProduct);

// // Route to delete a product image by ID
router.delete("/:id/images/:imageIndex", deleteProductImage);

module.exports = router;
