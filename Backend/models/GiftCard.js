const mongoose = require("mongoose");
const crypto = require("crypto");

const giftCardSchema = new mongoose.Schema(
  {
    code: { type: String, required: true, unique: true, default: () => crypto.randomBytes(6).toString("hex").toUpperCase() },
    owner: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    initialBalance: { type: Number, required: true },
    currentBalance: { type: Number, required: true },
    purchasedFor: { type: String }, // optional recipient name for gifting
    isActive: { type: Boolean, default: true },
    expiresAt: { type: Date },
  },
  { timestamps: true }
);

module.exports = mongoose.model("GiftCard", giftCardSchema);
