const Item = require("../models/Item");
const Category = require("../models/Category");
const SubCategory = require("../models/SubCategory");
const { default: mongoose } = require("mongoose");

async function GetAllItems(req, res) {
  try {
    const items = await Item.find();
    res.status(200).json(items);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}
async function CreateItem(req, res) {
  const {
    name,
    image,
    description,
    taxApplicability,
    tax,
    baseAmount,
    discount,
    category,
    subCategory,
  } = req.body;
  try {
    const category_count = await Category.countDocuments({ _id: category });
    if (category_count == 0) {
      return res.status(404).json({ error: "Category not found" });
    }
    const subcategory_count = await SubCategory.countDocuments({
      _id: subCategory,
    });
    if (subcategory_count == 0) {
      return res.status(404).json({ error: "SubCategory not found" });
    }
    const totalAmount = baseAmount - (discount || 0);
    const item = new Item({
      name,
      image,
      description,
      taxApplicability,
      tax,
      baseAmount,
      discount,
      totalAmount,
      category,
      subCategory,
    });

    await item.save();
    res.status(201).json(item);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

async function GetItemsByCategory(req, res) {
  const { categoryId } = req.params;
  try {
    const items = await Item.find({ category: categoryId });
    res.status(200).json(items);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}
async function GetItemsBySubCategory(req, res) {
  const { subCategoryId } = req.params;
  try {
    const items = await Item.find({ subCategory: subCategoryId });
    res.status(200).json(items);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

async function GetItemByIdOrName(req, res) {
  const { identifier } = req.params;
  try {
    const item = await Item.findOne({
      $or: mongoose.isObjectIdOrHexString(identifier)
        ? { _id: identifier }
        : { name: identifier },
    });
    if (!item) {
      return res.status(404).json({ error: "Item not found" });
    }
    res.status(200).json(item);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}
async function EditItem(req, res) {
  const { id } = req.params;
  const updates = req.body;
  try {
    const item = await Item.findByIdAndUpdate(id, updates, { new: true });
    if (!item) {
      return res.status(404).json({ error: "Item not found" });
    }
    res.status(200).json(item);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

async function SearchItemByName(req, res) {
  const { name } = req.params;
  try {
    const items = await Item.find({ name: { $regex: name, $options: "i" } });
    res.status(200).json(items);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

module.exports = {
  GetAllItems,
  CreateItem,
  GetAllItems,
  GetItemsByCategory,
  GetItemsBySubCategory,
  GetItemByIdOrName,
  EditItem,
  SearchItemByName,
};
