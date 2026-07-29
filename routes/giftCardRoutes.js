const express = require("express");
const { createGiftCard, getMyGiftCards, checkGiftCard } = require("../controllers/giftCardController");
const { protect } = require("../middleware/auth");

const router = express.Router();

router.post("/", protect, createGiftCard);
router.get("/", protect, getMyGiftCards);
router.get("/:code", protect, checkGiftCard);

module.exports = router;
