/**
 * Smart Seeder — fetches REAL products with MATCHING images from DummyJSON API
 * Categories pulled: mens-watches, womens-watches, mens-shirts, tops,
 *                    mens-shoes, womens-shoes, womens-dresses, womens-bags, sunglasses
 *
 * Run: node seeder.js
 */

import mongoose from "mongoose";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import https from "https";

const __filename = fileURLToPath(import.meta.url);
const __dirname  = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, ".env") });
if (!process.env.MONGODB_URL) {
  dotenv.config({ path: path.join(__dirname, "..", ".env") });
}

const MONGODB_URL = process.env.MONGODB_URL;
if (!MONGODB_URL) {
  console.error("❌ MONGODB_URL not found in .env");
  process.exit(1);
}

// ── Mongoose model ───────────────────────────────────────────────
const productSchema = new mongoose.Schema({
  name:         { type: String, required: true },
  image:        { type: String, required: true },
  brand:        { type: String, required: true },
  price:        { type: Number, required: true },
  category:     { type: String, required: true },
  countInStock: { type: Number, required: true },
  description:  { type: String, required: true },
  rating:       { type: Number, default: 0 },
  numReviews:   { type: Number, default: 0 },
});
const Product = mongoose.model("Product", productSchema);

// ── Fetch helper ─────────────────────────────────────────────────
const fetchJSON = (url) =>
  new Promise((resolve, reject) => {
    https.get(url, (res) => {
      let data = "";
      res.on("data", (chunk) => (data += chunk));
      res.on("end", () => {
        try { resolve(JSON.parse(data)); }
        catch (e) { reject(e); }
      });
    }).on("error", reject);
  });

// ── Category map: DummyJSON slug → your store category ───────────
const categoryMap = {
  "mens-watches":   "Watches",
  "womens-watches": "Watches",
  "mens-shirts":    "Mens",
  "tops":           "Women",
  "mens-shoes":     "Shoes",
  "womens-shoes":   "Shoes",
  "womens-dresses": "Women",
  "womens-bags":    "Accessories",
  "sunglasses":     "Accessories",
};

// ── Main ─────────────────────────────────────────────────────────
const seedDB = async () => {
  console.log("🔗 Connecting to:", MONGODB_URL.slice(0, 40) + "...");
  await mongoose.connect(MONGODB_URL);
  console.log("✅ Connected to MongoDB\n");

  const allProducts = [];

  for (const [slug, storeCategory] of Object.entries(categoryMap)) {
    process.stdout.write(`📦 Fetching ${slug}...`);
    try {
      const data = await fetchJSON(
        `https://dummyjson.com/products/category/${slug}?limit=5`
      );
      const mapped = data.products.map((p) => ({
        name:         p.title,
        image:        p.thumbnail,           // ✅ real matching product image
        brand:        p.brand || "Generic",
        price:        parseFloat(p.price.toFixed(2)),
        category:     storeCategory,
        countInStock: Math.min(p.stock, 30),
        description:  p.description,
        rating:       parseFloat(p.rating.toFixed(1)),
        numReviews:   Math.floor(Math.random() * 400) + 50,
      }));
      allProducts.push(...mapped);
      console.log(` ✓ ${mapped.length} products`);
    } catch (err) {
      console.log(` ✗ failed (${err.message})`);
    }
  }

  console.log(`\n🌱 Inserting ${allProducts.length} products (keeping existing)...`);
  const inserted = await Product.insertMany(allProducts);

  const total = await Product.countDocuments();
  console.log(`✅ Inserted ${inserted.length} new products`);
  console.log(`📊 Total products in database: ${total}`);

  // Breakdown
  console.log("\n📦 New products by category:");
  const cats = [...new Set(allProducts.map((p) => p.category))];
  cats.forEach((cat) => {
    const count = allProducts.filter((p) => p.category === cat).length;
    console.log(`   ${cat.padEnd(14)} → ${count} products`);
  });

  await mongoose.disconnect();
  console.log("\n👋 Done!");
  process.exit(0);
};

seedDB().catch((err) => {
  console.error("❌ Seed failed:", err.message);
  process.exit(1);
});