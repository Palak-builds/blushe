// Run with: node seed.js
require("dotenv").config();
const mongoose = require("mongoose");
const Product = require("./models/Product");

// NOTE ON IMAGES:
// Official brand product photography (Lakmé, Maybelline, MAC, etc.) can't be
// hardcoded here reliably or legally - it's copyrighted, and hotlinking it
// from random sources is what causes broken/invisible images in production.
//
// Instead, every product below gets a UNIQUE, guaranteed-to-render
// placeholder image generated from its own name + brand (via placehold.co),
// color-coded by subCategory. No two products share an image, and nothing
// will ever 404. Swap `buildImageUrl` for a real CDN/upload pipeline once
// you have your own product photos.

const CATEGORY_COLORS = {
  "kajal": ["1a1a1a", "ffffff"],
  "foundation": ["d4a574", "3b2a1a"],
  "concealer": ["e8c39e", "3b2a1a"],
  "blush": ["e75480", "ffffff"],
  "compact-powder": ["c9a66b", "3b2a1a"],
  "setting-spray": ["6ec6ca", "0b3c3e"],
  "eyeshadow-palette": ["9b59b6", "ffffff"],
  "highlighter": ["f5d76e", "5a4300"],
  "cleanser": ["7fb3d5", "0b2b3c"],
  "toner": ["a3d9a5", "1e3b1f"],
  "serum": ["f0a868", "3b2200"],
  "moisturizer": ["cdeac0", "1e3b1f"],
  "sunscreen": ["ffd54f", "5a4300"],
  "face-mask": ["8bd3c7", "0b3c3e"],
  "exfoliator": ["e08283", "3b0a0b"],
  "eye-cream": ["b39ddb", "2a1a3b"],
  "lip-balm": ["f48fb1", "3b0a1a"],
};

const buildImageUrl = (name, brand, subCategory) => {
  const [bg, fg] = CATEGORY_COLORS[subCategory] || ["cccccc", "333333"];
  const label = encodeURIComponent(`${brand}\n${name}`);
  return `https://placehold.co/500x500/${bg}/${fg}?text=${label}&font=roboto`;
};

const products = [
  // ================= MAKEUP =================

  // ---- Kajal (4) ----
  { name: "Eyeconic Kajal", brand: "Lakmé", category: "makeup", subCategory: "kajal", description: "Smudge-proof, long-wearing kajal for intense definition.", price: 220, isBestseller: true },
  { name: "Colossal Kajal", brand: "Maybelline", category: "makeup", subCategory: "kajal", description: "Deep black, 36-hour smudge-proof kajal.", price: 199 },
  { name: "Kohl Attitude Kajal", brand: "NYX", category: "makeup", subCategory: "kajal", description: "Creamy, richly pigmented kohl kajal.", price: 650 },
  { name: "Diva Deep Black Kajal", brand: "Sugar Cosmetics", category: "makeup", subCategory: "kajal", description: "Waterproof, transfer-proof intense black kajal.", price: 299 },

  // ---- Foundation (4) ----
  { name: "Fit Me Matte + Poreless Foundation", brand: "Maybelline", category: "makeup", subCategory: "foundation", description: "Lightweight, breathable foundation for a natural matte finish.", price: 449, isBestseller: true },
  { name: "Studio Fix Fluid Foundation", brand: "MAC", category: "makeup", subCategory: "foundation", description: "Medium-to-full coverage matte foundation.", price: 3200 },
  { name: "Perfect Radiance Foundation", brand: "Lakmé", category: "makeup", subCategory: "foundation", description: "Brightening foundation with a dewy natural glow.", price: 575 },
  { name: "Ace of Face Foundation Stick", brand: "Sugar Cosmetics", category: "makeup", subCategory: "foundation", description: "Buildable coverage foundation stick for on-the-go application.", price: 699 },

  // ---- Concealer (4) ----
  { name: "Instant Age Rewind Concealer", brand: "Maybelline", category: "makeup", subCategory: "concealer", description: "Brightens and covers dark circles instantly.", price: 375, isBestseller: true },
  { name: "Studio Finish Concealer", brand: "MAC", category: "makeup", subCategory: "concealer", description: "Full coverage, long-lasting matte concealer.", price: 1850 },
  { name: "Absolute Perfect Concealer", brand: "Lakmé", category: "makeup", subCategory: "concealer", description: "Creamy, blendable concealer for everyday coverage.", price: 425 },
  { name: "Ultra Matte Concealer", brand: "NYX", category: "makeup", subCategory: "concealer", description: "High-coverage matte finish concealer.", price: 750 },

  // ---- Blush (4) ----
  { name: "Cream Blush Stick", brand: "NYX", category: "makeup", subCategory: "blush", description: "Blendable cream blush for a natural flushed finish.", price: 699 },
  { name: "Cheek Pop Blush", brand: "Maybelline", category: "makeup", subCategory: "blush", description: "Lightweight, buildable pop of colour for cheeks.", price: 375, isBestseller: true },
  { name: "Powder Blush", brand: "MAC", category: "makeup", subCategory: "blush", description: "Silky powder blush with a soft-focus finish.", price: 2400 },
  { name: "Contour De Force Blush", brand: "Sugar Cosmetics", category: "makeup", subCategory: "blush", description: "Richly pigmented blush duo for a sculpted look.", price: 599 },

  // ---- Compact Powder (4) ----
  { name: "9 to 5 Primer + Matte Perfect Cover Compact", brand: "Lakmé", category: "makeup", subCategory: "compact-powder", description: "Long-lasting matte finish compact powder.", price: 460, isBestseller: true },
  { name: "Fit Me Compact Powder", brand: "Maybelline", category: "makeup", subCategory: "compact-powder", description: "Oil-absorbing compact for a shine-free look.", price: 299 },
  { name: "Studio Fix Powder Plus Foundation", brand: "MAC", category: "makeup", subCategory: "compact-powder", description: "Two-in-one powder and foundation compact.", price: 3100 },
  { name: "Poreless Face Perfecting Compact", brand: "Colorbar", category: "makeup", subCategory: "compact-powder", description: "Blurs pores for a smooth, poreless finish.", price: 550 },

  // ---- Setting Spray (4) ----
  { name: "All Nighter Setting Spray", brand: "Urban Decay", category: "makeup", subCategory: "setting-spray", description: "Long-lasting setting spray that locks makeup in place.", price: 2900, isBestseller: true },
  { name: "Prep + Prime Fix+", brand: "MAC", category: "makeup", subCategory: "setting-spray", description: "Multi-purpose finishing and refreshing mist.", price: 2100 },
  { name: "Matte Finish Setting Spray", brand: "NYX", category: "makeup", subCategory: "setting-spray", description: "Lightweight matte-finish makeup setting spray.", price: 899 },
  { name: "24 Hour Setting Spray", brand: "Sugar Cosmetics", category: "makeup", subCategory: "setting-spray", description: "Weightless mist for all-day makeup wear.", price: 650 },

  // ---- Eyeshadow Palette (4) ----
  { name: "Desert Dusk Eyeshadow Palette", brand: "Huda Beauty", category: "makeup", subCategory: "eyeshadow-palette", description: "Warm-toned, highly pigmented eyeshadow palette.", price: 2900, isBestseller: true },
  { name: "Naked Eyeshadow Palette", brand: "Urban Decay", category: "makeup", subCategory: "eyeshadow-palette", description: "Neutral-tone eyeshadow palette for everyday looks.", price: 3400 },
  { name: "9 to 5 Eye Shadow Palette", brand: "Lakmé", category: "makeup", subCategory: "eyeshadow-palette", description: "Versatile everyday shades in one compact palette.", price: 750 },
  { name: "Ultimate Eyeshadow Palette", brand: "NYX", category: "makeup", subCategory: "eyeshadow-palette", description: "Highly blendable multi-shade eyeshadow palette.", price: 1600 },

  // ---- Highlighter (4) ----
  { name: "Fit Me Highlighter Stick", brand: "Maybelline", category: "makeup", subCategory: "highlighter", description: "Buildable, luminous glow highlighter stick.", price: 399, isBestseller: true },
  { name: "Mini Sun Disc Highlighter", brand: "Fenty Beauty", category: "makeup", subCategory: "highlighter", description: "Ultra-fine, blinding-light powder highlighter.", price: 2600 },
  { name: "Strobe Cream Highlighter", brand: "MAC", category: "makeup", subCategory: "highlighter", description: "Luminizing cream highlighter for a lit-from-within glow.", price: 2500 },
  { name: "Glow Kit Highlighter Palette", brand: "Sugar Cosmetics", category: "makeup", subCategory: "highlighter", description: "Multi-shade highlighter palette for face sculpting.", price: 899 },

  // ================= SKINCARE =================

  // ---- Cleanser (4) ----
  { name: "Gentle Skin Cleanser", brand: "Cetaphil", category: "skincare", subCategory: "cleanser", description: "Soap-free, fragrance-free cleanser suitable for sensitive skin.", price: 550, isBestseller: true },
  { name: "Hydrating Facial Cleanser", brand: "CeraVe", category: "skincare", subCategory: "cleanser", description: "Ceramide-rich cleanser that restores the protective skin barrier.", price: 749 },
  { name: "Squeaky Clean Foaming Cleanser", brand: "Plum", category: "skincare", subCategory: "cleanser", description: "Foaming cleanser that removes dirt without stripping skin.", price: 425 },
  { name: "Ubtan Natural Face Cleanser", brand: "Mamaearth", category: "skincare", subCategory: "cleanser", description: "Turmeric and saffron-based gentle daily cleanser.", price: 299 },

  // ---- Toner (4) ----
  { name: "Glycolic Acid 7% Toning Solution", brand: "The Ordinary", category: "skincare", subCategory: "toner", description: "Exfoliating toner for smoother, brighter-looking skin.", price: 890, isBestseller: true },
  { name: "Skin Perfecting Toner", brand: "Minimalist", category: "skincare", subCategory: "toner", description: "Alcohol-free hydrating toner with niacinamide.", price: 449 },
  { name: "Rose Water Facial Toner", brand: "Dot & Key", category: "skincare", subCategory: "toner", description: "Soothing rose-based toner for daily hydration.", price: 375 },
  { name: "Refreshing Skin Tonic", brand: "Simple", category: "skincare", subCategory: "toner", description: "Gentle, alcohol-free toner for sensitive skin.", price: 350 },

  // ---- Serum (4) ----
  { name: "Niacinamide 10% + Zinc 1% Serum", brand: "The Ordinary", category: "skincare", subCategory: "serum", description: "High-strength vitamin and mineral blemish formula.", price: 690, isBestseller: true },
  { name: "Sepicalm Redness Relief Serum", brand: "Minimalist", category: "skincare", subCategory: "serum", description: "Soothes redness and calms sensitive, reactive skin.", price: 599 },
  { name: "10% Vitamin C Face Serum", brand: "Dot & Key", category: "skincare", subCategory: "serum", description: "Brightening serum that targets dullness and dark spots.", price: 695 },
  { name: "Hyaluronic Acid 2% + B5 Serum", brand: "The Ordinary", category: "skincare", subCategory: "serum", description: "Intense hydration serum for plumper-looking skin.", price: 720 },

  // ---- Moisturizer (4) ----
  { name: "Hydro Boost Water Gel Moisturizer", brand: "Neutrogena", category: "skincare", subCategory: "moisturizer", description: "Oil-free gel moisturizer with hyaluronic acid for 24-hour hydration.", price: 899, isBestseller: true },
  { name: "Moisturising Cream", brand: "CeraVe", category: "skincare", subCategory: "moisturizer", description: "Ceramide-rich cream for dry to very dry skin.", price: 825 },
  { name: "Water Facial Moisturiser", brand: "Simple", category: "skincare", subCategory: "moisturizer", description: "Lightweight daily moisturiser for sensitive skin.", price: 375 },
  { name: "Onion Daily Moisturizer", brand: "Mamaearth", category: "skincare", subCategory: "moisturizer", description: "Lightweight moisturiser for daily hydration and shine control.", price: 349 },

  // ---- Sunscreen (4) ----
  { name: "Ultra Light Matte Sunscreen SPF 50", brand: "Minimalist", category: "skincare", subCategory: "sunscreen", description: "Broad-spectrum sunscreen with a matte, non-greasy finish.", price: 549, isBestseller: true },
  { name: "Water Light Sunscreen SPF 50", brand: "Dot & Key", category: "skincare", subCategory: "sunscreen", description: "Lightweight, no-white-cast daily sunscreen.", price: 595 },
  { name: "Ultra Sheer Dry-Touch Sunscreen SPF 55", brand: "Neutrogena", category: "skincare", subCategory: "sunscreen", description: "Fast-absorbing, non-greasy broad-spectrum sunscreen.", price: 549 },
  { name: "AC+ Mattifying Sunscreen SPF 50", brand: "Plum", category: "skincare", subCategory: "sunscreen", description: "Oil-control sunscreen suitable for acne-prone skin.", price: 425 },

  // ---- Face Mask (4) ----
  { name: "Charcoal Purifying Face Mask", brand: "Mamaearth", category: "skincare", subCategory: "face-mask", description: "Detoxifying mask that draws out impurities.", price: 349, isBestseller: true },
  { name: "Multi-Vitamin Sheet Mask", brand: "Dot & Key", category: "skincare", subCategory: "face-mask", description: "Hydrating sheet mask packed with antioxidants.", price: 149 },
  { name: "Water Bomb Sleeping Mask", brand: "Minimalist", category: "skincare", subCategory: "face-mask", description: "Overnight hydrating mask for plump, dewy skin.", price: 650 },
  { name: "Purifying Clay Mask", brand: "The Ordinary", category: "skincare", subCategory: "face-mask", description: "Deep-cleansing clay mask for congested pores.", price: 780 },

  // ---- Exfoliator (4) ----
  { name: "AHA 30% + BHA 2% Peeling Solution", brand: "The Ordinary", category: "skincare", subCategory: "exfoliator", description: "Intense exfoliating treatment for smoother, brighter skin.", price: 790, isBestseller: true },
  { name: "Walnut Face Scrub", brand: "Mamaearth", category: "skincare", subCategory: "exfoliator", description: "Gentle exfoliating scrub with natural walnut granules.", price: 299 },
  { name: "Vitamin C Face Scrub", brand: "Plum", category: "skincare", subCategory: "exfoliator", description: "Brightening scrub that removes dead skin cells.", price: 375 },
  { name: "2% BHA Liquid Exfoliant", brand: "Minimalist", category: "skincare", subCategory: "exfoliator", description: "Salicylic acid exfoliant for smoother, clearer skin.", price: 599 },

  // ---- Eye Cream (4) ----
  { name: "Caffeine Solution 5% + EGCG Eye Serum", brand: "The Ordinary", category: "skincare", subCategory: "eye-cream", description: "Reduces the appearance of puffiness and dark circles.", price: 690, isBestseller: true },
  { name: "Under Eye Cream", brand: "Minimalist", category: "skincare", subCategory: "eye-cream", description: "Caffeine and peptide-infused cream for tired eyes.", price: 549 },
  { name: "Vitamin C Under Eye Cream", brand: "Dot & Key", category: "skincare", subCategory: "eye-cream", description: "Brightening eye cream to reduce dark circles.", price: 595 },
  { name: "Hydro Boost Eye Gel Cream", brand: "Neutrogena", category: "skincare", subCategory: "eye-cream", description: "Lightweight gel-cream with hyaluronic acid for the eye area.", price: 699 },

  // ---- Lip Balm (4) ----
  { name: "Petroleum Jelly Lip Care", brand: "Cetaphil", category: "skincare", subCategory: "lip-balm", description: "Deeply moisturising balm for dry, chapped lips.", price: 199, isBestseller: true },
  { name: "Nourishing Lip Butter", brand: "Plum", category: "skincare", subCategory: "lip-balm", description: "Shea butter-based balm for soft, hydrated lips.", price: 275 },
  { name: "Tinted Lip Balm", brand: "Mamaearth", category: "skincare", subCategory: "lip-balm", description: "Nourishing balm with a subtle tint of colour.", price: 249 },
  { name: "Overnight Lip Mask", brand: "Minimalist", category: "skincare", subCategory: "lip-balm", description: "Intensive overnight treatment for soft, plump lips.", price: 399 },
];

// Attach a unique, non-repeating image to every product.
products.forEach((p) => {
  p.images = [buildImageUrl(p.name, p.brand, p.subCategory)];
});

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
