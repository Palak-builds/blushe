const express = require("express");
const { addAddress, getAddresses, updateAddress, deleteAddress } = require("../controllers/addressController");
const { protect } = require("../middleware/auth");

const router = express.Router();
router.use(protect);

router.get("/", getAddresses);
router.post("/", addAddress);
router.put("/:addressId", updateAddress);
router.delete("/:addressId", deleteAddress);

module.exports = router;
