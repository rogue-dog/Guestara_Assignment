const express = require("express");
const router = express.Router();
const Category = require("../models/Category");
const {
  CreateCategory,
  GetAllCategory,
  GetCategoryByNameOrId,
  EditCategory,
} = require("../controllers/Category");

// Create Category
router.post("/", CreateCategory);

// Get all Categories
router.get("/", GetAllCategory);

// Get Category by ID or Name
router.get("/:identifier", GetCategoryByNameOrId);

// Edit Category
router.put("/:id", EditCategory);

module.exports = router;
