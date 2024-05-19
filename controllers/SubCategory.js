const Item = require("../models/Item");
const Category = require("../models/Category");
const SubCategory = require("../models/SubCategory");
const mongoose = require("mongoose");

async function CreateSubCategory(req, res) {
  const { name, image, description, taxApplicability, tax, categoryId } =
    req.body;
  try {
    const category = await Category.countDocuments({ _id: categoryId });
    if (!category) {
      return res.status(404).json({ error: "Category not found" });
    }
    const subCategory = new SubCategory({
      name,
      image,
      description,
      taxApplicability:
        taxApplicability !== undefined
          ? taxApplicability
          : category.taxApplicability,
      tax: tax !== undefined ? tax : category.tax,
      category: categoryId,
    });
    await subCategory.save();
    res.status(201).json(subCategory);
  } catch (error) {
    res.status(400).json({ error: error.message });
    console.log(error);
  }
}
async function GetAllSubCategory(req, res) {
  try {
    const subCategories = await SubCategory.find();
    res.status(200).json(subCategories);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}
async function GetSubCategoryByCategory(req, res) {
  const { categoryId } = req.params;
  try {
    const subCategories = await SubCategory.find({ category: categoryId });
    res.status(200).json(subCategories);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}
async function GetSubcategoryByNameOrId(req, res) {
  try {
    var { identifier } = req.params;

    const subCategory = await SubCategory.findOne({
      $or: mongoose.isObjectIdOrHexString(identifier)
        ? [{ _id: identifier }]
        : [{ name: identifier }],
    });
    if (!subCategory) {
      return res.status(404).json({ error: "SubCategory not found" });
    }
    res.status(200).json(subCategory);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

async function EditSubCategory(req, res) {
  const { id } = req.params;
  const updates = req.body;
  try {
    const subCategory = await SubCategory.findByIdAndUpdate(id, updates, {
      new: true,
    });
    if (!subCategory) {
      return res.status(404).json({ error: "SubCategory not found" });
    }
    res.status(200).json(subCategory);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

module.exports = {
  CreateSubCategory,
  GetAllSubCategory,
  GetSubCategoryByCategory,
  GetSubcategoryByNameOrId,
  EditSubCategory,
};
