const express = require("express");
const router = express.Router();
const SubCategory = require("../models/SubCategory");
const Category = require("../models/Category");
const {
  CreateSubCategory,
  GetAllSubCategory,
  GetSubCategoryByCategory,
  GetSubcategoryByNameOrId,
  EditSubCategory,
} = require("../controllers/SubCategory");

// Create SubCategory
router.post("/", CreateSubCategory);

// Get all SubCategories
router.get("/", GetAllSubCategory);

// Get SubCategories by Category
router.get("/category/:categoryId", GetSubCategoryByCategory);

// Get SubCategory by ID or Name
router.get("/:identifier", GetSubcategoryByNameOrId);

// Edit SubCategory
router.put("/:id", EditSubCategory);

module.exports = router;
