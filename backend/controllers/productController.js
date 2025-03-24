const Product = require("../models/product");
const Category = require("../models/category");

// Create a new product
const createProduct = async (req, res) => {
  try {
    const category = await Category.findById(req.body.category);
    if (!category) return res.status(400).send("Invalid Category");

    // Handle main image
    let mainImage = "";
    if (req.files && req.files.image && req.files.image.length > 0) {
      mainImage = req.files.image[0].path; // Access the first image file
    }

    // Handle multiple images
    let additionalImages = [];
    if (req.files && req.files.images && req.files.images.length > 0) {
      additionalImages = req.files.images.map((file) => file.path);
    }

    const product = new Product({
      name: req.body.name,
      description: req.body.description,
      richDescription: req.body.richDescription,
      image: mainImage,
      images: additionalImages,
      brand: req.body.brand,
      price: req.body.price,
      category: req.body.category,
      countInStock: req.body.countInStock,
      rating: req.body.rating,
      numReviews: req.body.numReviews,
      isFeatured: req.body.isFeatured,
    });

    const savedProduct = await product.save();
    res.status(201).json(savedProduct);
  } catch (error) {
    console.error("Error creating product:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Get all products
const getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    if (!products) {
      return res.status(404).json({ message: "No products found" });
    }
    res.status(200).json(products);
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Get a single product by ID
const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json(product);
  } catch (error) {
    console.error("Error fetching product:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Update a product by ID
const updateProduct = async (req, res) => {
  try {
    // First, get the existing product
    const existingProduct = await Product.findById(req.params.id);
    if (!existingProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    // Prepare update object
    const updateData = { ...req.body };

    // Handle main image update
    if (req.files && req.files.image) {
      // Delete old main image if it exists
      if (existingProduct.image) {
        const publicId = existingProduct.image.split("/").pop().split(".")[0];
        await deleteImage(publicId);
      }
      updateData.image = req.files.image[0].path;
    }

    // Handle additional images update
    if (req.files && req.files.images) {
      // If there's a complete replacement of additional images
      if (existingProduct.images && existingProduct.images.length > 0) {
        // Delete all old additional images
        for (const imageUrl of existingProduct.images) {
          const publicId = imageUrl.split("/").pop().split(".")[0];
          await deleteImage(publicId);
        }
      }
      updateData.images = req.files.images.map((file) => file.path);
    }

    // If category is being updated, verify it exists
    if (updateData.category) {
      const categoryExists = await Category.findById(updateData.category);
      if (!categoryExists) {
        return res.status(400).send("Invalid Category");
      }
    }

    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      {
        $set: updateData,
      },
      { new: true }
    );

    res.status(200).json(updatedProduct);
  } catch (error) {
    console.error("Error updating product:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const deleteProductImage = async (req, res) => {
  try {
    const { id, imageIndex } = req.params;
    const product = await Product.findById(id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    // Check if it's the main image or an additional image
    if (imageIndex === "main") {
      if (product.image) {
        const publicId = product.image.split("/").pop().split(".")[0];
        await deleteImage(publicId);
        product.image = "";
      }
    } else {
      const index = parseInt(imageIndex);
      if (index >= 0 && index < product.images.length) {
        const imageUrl = product.images[index];
        const publicId = imageUrl.split("/").pop().split(".")[0];
        await deleteImage(publicId);
        product.images.splice(index, 1);
      } else {
        return res.status(400).json({ message: "Invalid image index" });
      }
    }

    await product.save();
    res.status(200).json(product);
  } catch (error) {
    console.error("Error deleting product image:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Delete a product by ID
const deleteProduct = async (req, res) => {
  try {
    const deletedProduct = await Product.findByIdAndDelete(req.params.id);
    if (!deletedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }
    res
      .status(200)
      .json({ message: "Product deleted successfully", deletedProduct });
  } catch (error) {
    console.error("Error deleting product:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProductImage,
  deleteProduct,
};
