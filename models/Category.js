const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CategorySchema = new Schema(
  {
    name: { type: String, required: true },
    image: { type: String, required: true },
    description: { type: String, required: true },
    taxApplicability: { type: Boolean, default: false, required: true },
    tax: { type: Number },
    taxType: { type: String },
  },
  { versionKey: false }
);
CategorySchema.pre("save", function (next) {
  if (!this.taxApplicability) {
    this.tax = undefined;
    this.taxType = undefined;
  }
  next();
});

module.exports = mongoose.model("Category", CategorySchema);
