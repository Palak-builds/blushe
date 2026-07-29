const GiftCard = require("../models/GiftCard");

// @desc  Purchase/create a new gift card
// @route POST /api/giftcards
exports.createGiftCard = async (req, res) => {
  try {
    const { amount, purchasedFor } = req.body;
    const giftCard = await GiftCard.create({
      owner: req.user._id,
      initialBalance: amount,
      currentBalance: amount,
      purchasedFor,
    });
    res.status(201).json(giftCard);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc  Get logged-in user's gift cards
// @route GET /api/giftcards
exports.getMyGiftCards = async (req, res) => {
  const cards = await GiftCard.find({ owner: req.user._id });
  res.json(cards);
};

// @desc  Check balance of a gift card by code
// @route GET /api/giftcards/:code
exports.checkGiftCard = async (req, res) => {
  const card = await GiftCard.findOne({ code: req.params.code });
  if (!card) return res.status(404).json({ message: "Gift card not found" });
  res.json({ code: card.code, balance: card.currentBalance, isActive: card.isActive });
};
