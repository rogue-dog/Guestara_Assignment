const Item = require("../models/Item");
const Category = require("../models/Category");
const SubCategory = require("../models/SubCategory");
const mongoose = require("mongoose");

async function CreateCategory(req, res) {
  const { name, image, description, taxApplicability, tax, taxType } = req.body;
  try {
    const category = new Category({
      name,
      image,
      description,
      taxApplicability,
      tax,
      taxType,
    });
    await category.save();
    res.status(201).json(category);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

async function GetAllCategory(req, res) {
  try {
    const categories = await Category.find();
    res.status(200).json(categories);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}
async function GetCategoryByNameOrId(req, res) {
  const { identifier } = req.params;
  try {
    const category = await Category.findOne({
      $or: mongoose.isObjectIdOrHexString(identifier)
        ? { _id: identifier }
        : { name: identifier },
    });
    if (!category) {
      return res.status(404).json({ error: "Category not found" });
    }
    res.status(200).json(category);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

async function EditCategory(req, res) {
  const { id } = req.params;
  const updates = req.body;
  try {
    const category = await Category.findByIdAndUpdate(id, updates, {
      new: true,
    });
    if (!category) {
      return res.status(404).json({ error: "Category not found" });
    }
    res.status(200).json(category);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

module.exports = {
  GetAllCategory,
  CreateCategory,
  GetCategoryByNameOrId,
  EditCategory,
};
