const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    brand: { type: String, required: true }, // e.g. Maybelline, MAC, Cetaphil
    category: {
      type: String,
      required: true,
      enum: ["makeup", "skincare"],
    },
    subCategory: { type: String }, // e.g. lipstick, foundation, cleanser, serum
    description: { type: String },
    price: { type: Number, required: true },
    discountPrice: { type: Number }, // optional sale price
    stock: { type: Number, default: 50 },
    images: [{ type: String, required: true }], // image URLs
    rating: { type: Number, default: 0 },
    numReviews: { type: Number, default: 0 },
    isBestseller: { type: Boolean, default: false },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", productSchema);
