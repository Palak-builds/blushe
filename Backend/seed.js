// Run with: node seed.js
require("dotenv").config();
const mongoose = require("mongoose");
const Product = require("./models/Product");

const products = [
  // ---- MAKEUP ----
  {
    name: "Fit Me Matte + Poreless Foundation",
    brand: "Maybelline",
    category: "makeup",
    subCategory: "foundation",
    description: "Lightweight, breathable foundation that matches skin tone and texture.",
    price: 449,
    images: ["https://images.unsplash.com/photo-1631214524115-cde7de0ba8b9?w=500"],
    isBestseller: true,
  },
  {
    name: "Retro Matte Liquid Lipcolor",
    brand: "MAC",
    category: "makeup",
    subCategory: "lipstick",
    description: "Long-lasting, richly pigmented matte liquid lipstick.",
    price: 1950,
    images: ["https://images.unsplash.com/photo-1586495777744-4413f21062fa?w=500"],
  },
  {
    name: "9 to 5 Eyeconic Kohl Eyeliner",
    brand: "Lakmé",
    category: "makeup",
    subCategory: "eyeliner",
    description: "Smudge-proof, long-wearing kohl eyeliner for everyday glam.",
    price: 275,
    images: ["C:\Users\Dell\Downloads\kajal.jfif"],
  },
  {
    name: "Desert Dusk Eyeshadow Palette",
    brand: "Huda Beauty",
    category: "makeup",
    subCategory: "eyeshadow",
    description: "Warm-toned, highly pigmented eyeshadow palette.",
    price: 2900,
    images: ["C:\Users\Dell\Downloads\hudadusk.jpg"],
    isBestseller: true,
  },
  {
    name: "Cream Blush Stick",
    brand: "NYX",
    category: "makeup",
    subCategory: "blush",
    description: "Blendable cream blush for a natural flushed finish.",
    price: 699,
    images: ["https://images.unsplash.com/photo-1596704017254-9b121068fb31?w=500"],
  },

  // ---- SKINCARE ----
  {
    name: "Gentle Skin Cleanser",
    brand: "Cetaphil",
    category: "skincare",
    subCategory: "cleanser",
    description: "Soap-free, fragrance-free cleanser suitable for sensitive skin.",
    price: 550,
    images: ["https://images.unsplash.com/photo-1556228720-195a672e8a03?w=500"],
    isBestseller: true,
  },
  {
    name: "Niacinamide 10% + Zinc 1% Serum",
    brand: "The Ordinary",
    category: "skincare",
    subCategory: "serum",
    description: "High-strength vitamin and mineral blemish formula.",
    price: 690,
    images: ["https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=500"],
    isBestseller: true,
  },
  {
    name: "Sepicalm Redness Relief Serum",
    brand: "Minimalist",
    category: "skincare",
    subCategory: "serum",
    description: "Soothes redness and calms sensitive, reactive skin.",
    price: 599,
    images: ["https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?w=500"],
  },
  {
    name: "Hydro Boost Water Gel Moisturizer",
    brand: "Neutrogena",
    category: "skincare",
    subCategory: "moisturizer",
    description: "Oil-free gel moisturizer with hyaluronic acid for 24-hour hydration.",
    price: 899,
    images: ["https://images.unsplash.com/photo-1571781926291-c477ebfd024b?w=500"],
  },
  {
    name: "Hydrating Facial Cleanser",
    brand: "CeraVe",
    category: "skincare",
    subCategory: "cleanser",
    description: "Ceramide-rich cleanser that restores the protective skin barrier.",
    price: 749,
    images: ["https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=500"],
  },
];

const seedDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    await Product.deleteMany({});
    await Product.insertMany(products);
    console.log(`Seeded ${products.length} products successfully`);
    process.exit();
  } catch (error) {
    console.error("Seeding failed:", error.message);
    process.exit(1);
  }
};

seedDB();
