const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ItemSchema = new Schema(
  {
    name: { type: String, required: true },
    image: { type: String, required: true },
    description: { type: String, required: true },
    taxApplicability: { type: Boolean, default: false },
    tax: { type: Number, default: 0 },
    baseAmount: { type: Number, required: true },
    discount: { type: Number, default: 0, required: true },
    totalAmount: { type: Number, required: true },
    category: { type: Schema.Types.ObjectId, ref: "Category", required: true },
    subCategory: {
      type: Schema.Types.ObjectId,
      ref: "SubCategory",
      required: true,
    },
  },
  { versionKey: false }
);

module.exports = mongoose.model("Item", ItemSchema);
