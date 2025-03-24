const Category = require("../models/category");

// Fetch all categories
const getCategories = async (req, res) => {
  try {
    const categoryList = await Category.find();
    if (!categoryList) {
      return res.status(500).json({ success: false });
    }
    res.send(categoryList);
  } catch (error) {
    console.error("Error fetching categories:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Create a new category
const createCategory = async (req, res) => {
  try {
    // If there's a file uploaded
    let mainImage = "";
    if (req.file && req.file.path) {
      mainImage = req.file.path;
    }

    const category = new Category({
      name: req.body.name,
      image: mainImage,
      color: req.body.color,
    });

    const savedCategory = await category.save();
    if (!savedCategory) {
      return res.status(404).send("The Category cannot be created");
    }
    res.status(201).json(savedCategory);
  } catch (error) {
    console.error("Error creating category:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const deleteCategory = async (req, res) => {
  try {
    const deletedCategory = await Category.findByIdAndDelete(req.params.id);
    if (!deletedCategory) {
      return res.status(404).json({ message: "Category not found" });
    }
    res
      .status(200)
      .json({ message: "Category deleted successfully", deletedCategory });
  } catch (error) {
    console.error("Error deleting category:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = {
  getCategories,
  createCategory,
  deleteCategory,
};
