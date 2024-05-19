const express = require("express");
const router = express.Router();
const Item = require("../models/Item");
const Category = require("../models/Category");
const SubCategory = require("../models/SubCategory");
const {
  GetAllItems,
  CreateItem,
  GetItemsByCategory,
  GetItemsBySubCategory,
  GetItemByIdOrName,
  EditItem,
  SearchItemByName,
} = require("../controllers/Item");

// Create Item
router.post("/", CreateItem);

// Get all Items
router.get("/", GetAllItems);

// Get Items by Category
router.get("/category/:categoryId", GetItemsByCategory);

// Get Items by SubCategory
router.get("/subcategory/:subCategoryId", GetItemsBySubCategory);

// Get Item by ID or Name
router.get("/:identifier", GetItemByIdOrName);

// Edit Item
router.put("/:id", EditItem);

// Search Item by Name
router.get("/search/:name", SearchItemByName);

module.exports = router;
