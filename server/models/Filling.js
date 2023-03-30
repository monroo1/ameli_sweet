const { Schema, model } = require("mongoose");

const Filling = new Schema({
  name: { type: String, required: true, unique: true },
  price: { type: Number, required: true },
  description: { type: String, required: true },
  images: [
    {
      href: { type: String, required: true },
      name: { type: String, required: true },
    },
  ],
});

module.exports = model("Filling", Filling);
