const { Schema, model, Types } = require("mongoose");

const BasketItem = new Schema({
  product: { type: Types.ObjectId, ref: "Product" },
  filling: { type: Types.ObjectId, ref: "Filling" },
  count: { type: Number, require: true },
});

module.exports = model("BasketItem", BasketItem);
