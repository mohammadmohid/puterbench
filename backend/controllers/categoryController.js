import Category from "../models/category.js";
import { deleteImage } from "../config/cloudinary.js";

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

// Fetch single category by ID
const getCategoryById = async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);
    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }
    res.status(200).json(category);
  } catch (error) {
    console.error("Error fetching category:", error);
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

const updateCategory = async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);
    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }

    const updateData = {
      name: req.body.name,
      color: req.body.color,
    };

    if (req.file && req.file.path) {
      if (category.image) {
        const publicId = category.image;
        await deleteImage(publicId);
      }
      updateData.image = req.file.path;
    }

    const updatedCategory = await Category.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    );

    res.status(200).json(updatedCategory);
  } catch (error) {
    console.error("Error updating category:", error);
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

export {
  getCategories,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategory,
};
