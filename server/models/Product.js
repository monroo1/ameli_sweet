const { Schema, model, Types } = require("mongoose");

const Product = new Schema({
  name: { type: String, required: true, unique: true },
  price: { type: Number, required: true },
  promoPrice: { type: Number },
  description: { type: String, required: true },
  category: { type: Types.ObjectId, ref: "Category" },
  fillings: [{ type: Types.ObjectId, ref: "Filling" }],
  images: [
    {
      href: { type: String, required: true },
      name: { type: String, required: true },
    },
  ],
  isStock: { type: Boolean, require: true },
  quantityInStock: { type: Number },
});

module.exports = model("Product", Product);
