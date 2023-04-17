const { Schema, model, Types } = require("mongoose");

const Basket = new Schema({
  user: { type: Types.ObjectId, ref: "User" },
  basketItems: [{ type: Types.ObjectId, ref: "BasketItem" }],
});

module.exports = model("Basket", Basket);
