// Run with: node seed.js
require("dotenv").config();
const mongoose = require("mongoose");
const Product = require("./models/Product");

// NOTE: Images below are generic stock photography (Unsplash), used as
// visual placeholders grouped by category. They are NOT official brand
// product photography. Swap in real product photos before going live
// publicly to avoid any copyright/trademark concerns.

const img = {
  foundation: "https://images.unsplash.com/photo-1631214524115-cde7de0ba8b9?w=500",
  lipstick: "https://images.unsplash.com/photo-1586495777744-4413f21062fa?w=500",
  kajal: "https://images.unsplash.com/photo-1631730359585-38a4935cbec4?w=500",
  eyeshadow: "https://images.unsplash.com/photo-1512207736890-6ffed4b6ff7c?w=500",
  blush: "https://images.unsplash.com/photo-1596704017254-9b121068fb31?w=500",
  compact: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=500",
  spray: "https://images.unsplash.com/photo-1571875257727-256c39da42af?w=500",
  highlighter: "https://images.unsplash.com/photo-1519699047748-de8e457a634e?w=500",
  concealer: "https://images.unsplash.com/photo-1583241800698-e8ab01c67cf1?w=500",
  cleanser: "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=500",
  cleanser2: "https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=500",
  serum: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=500",
  serum2: "https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?w=500",
  moisturizer: "https://images.unsplash.com/photo-1571781926291-c477ebfd024b?w=500",
  toner: "https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=500",
  sunscreen: "https://images.unsplash.com/photo-1556228852-80b6e13a3970?w=500",
  mask: "https://images.unsplash.com/photo-1596755389378-c31d21fd1273?w=500",
  exfoliator: "https://images.unsplash.com/photo-1598452963314-b09f397a5c48?w=500",
  eyecream: "https://images.unsplash.com/photo-1617897903246-719242758050?w=500",
  lipbalm: "https://images.unsplash.com/photo-1599305090598-fe179d501227?w=500",
};

const products = [
  // ================= MAKEUP =================

  // ---- Kajal (4) ----
  { name: "Eyeconic Kajal", brand: "Lakmé", category: "makeup", subCategory: "kajal", description: "Smudge-proof, long-wearing kajal for intense definition.", price: 220, images: [img.kajal], isBestseller: true },
  { name: "Colossal Kajal", brand: "Maybelline", category: "makeup", subCategory: "kajal", description: "Deep black, 36-hour smudge-proof kajal.", price: 199, images: [img.kajal] },
  { name: "Kohl Attitude Kajal", brand: "NYX", category: "makeup", subCategory: "kajal", description: "Creamy, richly pigmented kohl kajal.", price: 650, images: [img.kajal] },
  { name: "Diva Deep Black Kajal", brand: "Sugar Cosmetics", category: "makeup", subCategory: "kajal", description: "Waterproof, transfer-proof intense black kajal.", price: 299, images: [img.kajal] },

  // ---- Foundation (4) ----
  { name: "Fit Me Matte + Poreless Foundation", brand: "Maybelline", category: "makeup", subCategory: "foundation", description: "Lightweight, breathable foundation for a natural matte finish.", price: 449, images: [img.foundation], isBestseller: true },
  { name: "Studio Fix Fluid Foundation", brand: "MAC", category: "makeup", subCategory: "foundation", description: "Medium-to-full coverage matte foundation.", price: 3200, images: [img.foundation] },
  { name: "Perfect Radiance Foundation", brand: "Lakmé", category: "makeup", subCategory: "foundation", description: "Brightening foundation with a dewy natural glow.", price: 575, images: [img.foundation] },
  { name: "Ace of Face Foundation Stick", brand: "Sugar Cosmetics", category: "makeup", subCategory: "foundation", description: "Buildable coverage foundation stick for on-the-go application.", price: 699, images: [img.foundation] },

  // ---- Concealer (4) ----
  { name: "Instant Age Rewind Concealer", brand: "Maybelline", category: "makeup", subCategory: "concealer", description: "Brightens and covers dark circles instantly.", price: 375, images: [img.concealer], isBestseller: true },
  { name: "Studio Finish Concealer", brand: "MAC", category: "makeup", subCategory: "concealer", description: "Full coverage, long-lasting matte concealer.", price: 1850, images: [img.concealer] },
  { name: "Absolute Perfect Concealer", brand: "Lakmé", category: "makeup", subCategory: "concealer", description: "Creamy, blendable concealer for everyday coverage.", price: 425, images: [img.concealer] },
  { name: "Ultra Matte Concealer", brand: "NYX", category: "makeup", subCategory: "concealer", description: "High-coverage matte finish concealer.", price: 750, images: [img.concealer] },

  // ---- Blush (4) ----
  { name: "Cream Blush Stick", brand: "NYX", category: "makeup", subCategory: "blush", description: "Blendable cream blush for a natural flushed finish.", price: 699, images: [img.blush] },
  { name: "Cheek Pop Blush", brand: "Maybelline", category: "makeup", subCategory: "blush", description: "Lightweight, buildable pop of colour for cheeks.", price: 375, images: [img.blush], isBestseller: true },
  { name: "Powder Blush", brand: "MAC", category: "makeup", subCategory: "blush", description: "Silky powder blush with a soft-focus finish.", price: 2400, images: [img.blush] },
  { name: "Contour De Force Blush", brand: "Sugar Cosmetics", category: "makeup", subCategory: "blush", description: "Richly pigmented blush duo for a sculpted look.", price: 599, images: [img.blush] },

  // ---- Compact Powder (4) ----
  { name: "9 to 5 Primer + Matte Perfect Cover Compact", brand: "Lakmé", category: "makeup", subCategory: "compact-powder", description: "Long-lasting matte finish compact powder.", price: 460, images: [img.compact], isBestseller: true },
  { name: "Fit Me Compact Powder", brand: "Maybelline", category: "makeup", subCategory: "compact-powder", description: "Oil-absorbing compact for a shine-free look.", price: 299, images: [img.compact] },
  { name: "Studio Fix Powder Plus Foundation", brand: "MAC", category: "makeup", subCategory: "compact-powder", description: "Two-in-one powder and foundation compact.", price: 3100, images: [img.compact] },
  { name: "Poreless Face Perfecting Compact", brand: "Colorbar", category: "makeup", subCategory: "compact-powder", description: "Blurs pores for a smooth, poreless finish.", price: 550, images: [img.compact] },

  // ---- Setting Spray (4) ----
  { name: "All Nighter Setting Spray", brand: "Urban Decay", category: "makeup", subCategory: "setting-spray", description: "Long-lasting setting spray that locks makeup in place.", price: 2900, images: [img.spray], isBestseller: true },
  { name: "Prep + Prime Fix+", brand: "MAC", category: "makeup", subCategory: "setting-spray", description: "Multi-purpose finishing and refreshing mist.", price: 2100, images: [img.spray] },
  { name: "Matte Finish Setting Spray", brand: "NYX", category: "makeup", subCategory: "setting-spray", description: "Lightweight matte-finish makeup setting spray.", price: 899, images: [img.spray] },
  { name: "24 Hour Setting Spray", brand: "Sugar Cosmetics", category: "makeup", subCategory: "setting-spray", description: "Weightless mist for all-day makeup wear.", price: 650, images: [img.spray] },

  // ---- Eyeshadow Palette (4) ----
  { name: "Desert Dusk Eyeshadow Palette", brand: "Huda Beauty", category: "makeup", subCategory: "eyeshadow-palette", description: "Warm-toned, highly pigmented eyeshadow palette.", price: 2900, images: [img.eyeshadow], isBestseller: true },
  { name: "Naked Eyeshadow Palette", brand: "Urban Decay", category: "makeup", subCategory: "eyeshadow-palette", description: "Neutral-tone eyeshadow palette for everyday looks.", price: 3400, images: [img.eyeshadow] },
  { name: "9 to 5 Eye Shadow Palette", brand: "Lakmé", category: "makeup", subCategory: "eyeshadow-palette", description: "Versatile everyday shades in one compact palette.", price: 750, images: [img.eyeshadow] },
  { name: "Ultimate Eyeshadow Palette", brand: "NYX", category: "makeup", subCategory: "eyeshadow-palette", description: "Highly blendable multi-shade eyeshadow palette.", price: 1600, images: [img.eyeshadow] },

  // ---- Highlighter (4) ----
  { name: "Fit Me Highlighter Stick", brand: "Maybelline", category: "makeup", subCategory: "highlighter", description: "Buildable, luminous glow highlighter stick.", price: 399, images: [img.highlighter], isBestseller: true },
  { name: "Mini Sun Disc Highlighter", brand: "Fenty Beauty", category: "makeup", subCategory: "highlighter", description: "Ultra-fine, blinding-light powder highlighter.", price: 2600, images: [img.highlighter] },
  { name: "Strobe Cream Highlighter", brand: "MAC", category: "makeup", subCategory: "highlighter", description: "Luminizing cream highlighter for a lit-from-within glow.", price: 2500, images: [img.highlighter] },
  { name: "Glow Kit Highlighter Palette", brand: "Sugar Cosmetics", category: "makeup", subCategory: "highlighter", description: "Multi-shade highlighter palette for face sculpting.", price: 899, images: [img.highlighter] },

  // ================= SKINCARE =================

  // ---- Cleanser (4) ----
  { name: "Gentle Skin Cleanser", brand: "Cetaphil", category: "skincare", subCategory: "cleanser", description: "Soap-free, fragrance-free cleanser suitable for sensitive skin.", price: 550, images: [img.cleanser], isBestseller: true },
  { name: "Hydrating Facial Cleanser", brand: "CeraVe", category: "skincare", subCategory: "cleanser", description: "Ceramide-rich cleanser that restores the protective skin barrier.", price: 749, images: [img.cleanser2] },
  { name: "Squeaky Clean Foaming Cleanser", brand: "Plum", category: "skincare", subCategory: "cleanser", description: "Foaming cleanser that removes dirt without stripping skin.", price: 425, images: [img.cleanser] },
  { name: "Ubtan Natural Face Cleanser", brand: "Mamaearth", category: "skincare", subCategory: "cleanser", description: "Turmeric and saffron-based gentle daily cleanser.", price: 299, images: [img.cleanser2] },

  // ---- Toner (4) ----
  { name: "Glycolic Acid 7% Toning Solution", brand: "The Ordinary", category: "skincare", subCategory: "toner", description: "Exfoliating toner for smoother, brighter-looking skin.", price: 890, images: [img.toner], isBestseller: true },
  { name: "Skin Perfecting Toner", brand: "Minimalist", category: "skincare", subCategory: "toner", description: "Alcohol-free hydrating toner with niacinamide.", price: 449, images: [img.toner] },
  { name: "Rose Water Facial Toner", brand: "Dot & Key", category: "skincare", subCategory: "toner", description: "Soothing rose-based toner for daily hydration.", price: 375, images: [img.toner] },
  { name: "Refreshing Skin Tonic", brand: "Simple", category: "skincare", subCategory: "toner", description: "Gentle, alcohol-free toner for sensitive skin.", price: 350, images: [img.toner] },

  // ---- Serum (4) ----
  { name: "Niacinamide 10% + Zinc 1% Serum", brand: "The Ordinary", category: "skincare", subCategory: "serum", description: "High-strength vitamin and mineral blemish formula.", price: 690, images: [img.serum], isBestseller: true },
  { name: "Sepicalm Redness Relief Serum", brand: "Minimalist", category: "skincare", subCategory: "serum", description: "Soothes redness and calms sensitive, reactive skin.", price: 599, images: [img.serum2] },
  { name: "10% Vitamin C Face Serum", brand: "Dot & Key", category: "skincare", subCategory: "serum", description: "Brightening serum that targets dullness and dark spots.", price: 695, images: [img.serum] },
  { name: "Hyaluronic Acid 2% + B5 Serum", brand: "The Ordinary", category: "skincare", subCategory: "serum", description: "Intense hydration serum for plumper-looking skin.", price: 720, images: [img.serum2] },

  // ---- Moisturizer (4) ----
  { name: "Hydro Boost Water Gel Moisturizer", brand: "Neutrogena", category: "skincare", subCategory: "moisturizer", description: "Oil-free gel moisturizer with hyaluronic acid for 24-hour hydration.", price: 899, images: [img.moisturizer], isBestseller: true },
  { name: "Moisturising Cream", brand: "CeraVe", category: "skincare", subCategory: "moisturizer", description: "Ceramide-rich cream for dry to very dry skin.", price: 825, images: [img.moisturizer] },
  { name: "Water Facial Moisturiser", brand: "Simple", category: "skincare", subCategory: "moisturizer", description: "Lightweight daily moisturiser for sensitive skin.", price: 375, images: [img.moisturizer] },
  { name: "Onion Daily Moisturizer", brand: "Mamaearth", category: "skincare", subCategory: "moisturizer", description: "Lightweight moisturiser for daily hydration and shine control.", price: 349, images: [img.moisturizer] },

  // ---- Sunscreen (4) ----
  { name: "Ultra Light Matte Sunscreen SPF 50", brand: "Minimalist", category: "skincare", subCategory: "sunscreen", description: "Broad-spectrum sunscreen with a matte, non-greasy finish.", price: 549, images: [img.sunscreen], isBestseller: true },
  { name: "Water Light Sunscreen SPF 50", brand: "Dot & Key", category: "skincare", subCategory: "sunscreen", description: "Lightweight, no-white-cast daily sunscreen.", price: 595, images: [img.sunscreen] },
  { name: "Ultra Sheer Dry-Touch Sunscreen SPF 55", brand: "Neutrogena", category: "skincare", subCategory: "sunscreen", description: "Fast-absorbing, non-greasy broad-spectrum sunscreen.", price: 549, images: [img.sunscreen] },
  { name: "AC+ Mattifying Sunscreen SPF 50", brand: "Plum", category: "skincare", subCategory: "sunscreen", description: "Oil-control sunscreen suitable for acne-prone skin.", price: 425, images: [img.sunscreen] },

  // ---- Face Mask (4) ----
  { name: "Charcoal Purifying Face Mask", brand: "Mamaearth", category: "skincare", subCategory: "face-mask", description: "Detoxifying mask that draws out impurities.", price: 349, images: [img.mask], isBestseller: true },
  { name: "Multi-Vitamin Sheet Mask", brand: "Dot & Key", category: "skincare", subCategory: "face-mask", description: "Hydrating sheet mask packed with antioxidants.", price: 149, images: [img.mask] },
  { name: "Water Bomb Sleeping Mask", brand: "Minimalist", category: "skincare", subCategory: "face-mask", description: "Overnight hydrating mask for plump, dewy skin.", price: 650, images: [img.mask] },
  { name: "Purifying Clay Mask", brand: "The Ordinary", category: "skincare", subCategory: "face-mask", description: "Deep-cleansing clay mask for congested pores.", price: 780, images: [img.mask] },

  // ---- Exfoliator (4) ----
  { name: "AHA 30% + BHA 2% Peeling Solution", brand: "The Ordinary", category: "skincare", subCategory: "exfoliator", description: "Intense exfoliating treatment for smoother, brighter skin.", price: 790, images: [img.exfoliator], isBestseller: true },
  { name: "Walnut Face Scrub", brand: "Mamaearth", category: "skincare", subCategory: "exfoliator", description: "Gentle exfoliating scrub with natural walnut granules.", price: 299, images: [img.exfoliator] },
  { name: "Vitamin C Face Scrub", brand: "Plum", category: "skincare", subCategory: "exfoliator", description: "Brightening scrub that removes dead skin cells.", price: 375, images: [img.exfoliator] },
  { name: "2% BHA Liquid Exfoliant", brand: "Minimalist", category: "skincare", subCategory: "exfoliator", description: "Salicylic acid exfoliant for smoother, clearer skin.", price: 599, images: [img.exfoliator] },

  // ---- Eye Cream (4) ----
  { name: "Caffeine Solution 5% + EGCG Eye Serum", brand: "The Ordinary", category: "skincare", subCategory: "eye-cream", description: "Reduces the appearance of puffiness and dark circles.", price: 690, images: [img.eyecream], isBestseller: true },
  { name: "Under Eye Cream", brand: "Minimalist", category: "skincare", subCategory: "eye-cream", description: "Caffeine and peptide-infused cream for tired eyes.", price: 549, images: [img.eyecream] },
  { name: "Vitamin C Under Eye Cream", brand: "Dot & Key", category: "skincare", subCategory: "eye-cream", description: "Brightening eye cream to reduce dark circles.", price: 595, images: [img.eyecream] },
  { name: "Hydro Boost Eye Gel Cream", brand: "Neutrogena", category: "skincare", subCategory: "eye-cream", description: "Lightweight gel-cream with hyaluronic acid for the eye area.", price: 699, images: [img.eyecream] },

  // ---- Lip Balm (4) ----
  { name: "Petroleum Jelly Lip Care", brand: "Cetaphil", category: "skincare", subCategory: "lip-balm", description: "Deeply moisturising balm for dry, chapped lips.", price: 199, images: [img.lipbalm], isBestseller: true },
  { name: "Nourishing Lip Butter", brand: "Plum", category: "skincare", subCategory: "lip-balm", description: "Shea butter-based balm for soft, hydrated lips.", price: 275, images: [img.lipbalm] },
  { name: "Tinted Lip Balm", brand: "Mamaearth", category: "skincare", subCategory: "lip-balm", description: "Nourishing balm with a subtle tint of colour.", price: 249, images: [img.lipbalm] },
  { name: "Overnight Lip Mask", brand: "Minimalist", category: "skincare", subCategory: "lip-balm", description: "Intensive overnight treatment for soft, plump lips.", price: 399, images: [img.lipbalm] },
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
