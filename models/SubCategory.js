const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const SubCategorySchema = new Schema(
  {
    name: { type: String, required: true },
    image: { type: String, required: true },
    description: { type: String, required: true },
    taxApplicability: { type: Boolean },
    tax: { type: Number },
    category: { type: Schema.Types.ObjectId, ref: "Category", required: true },
  },
  { versionKey: false }
);

module.exports = mongoose.model("SubCategory", SubCategorySchema);
