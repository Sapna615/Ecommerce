const Product = require("../../models/Product");

function normalizeText(s) {
  return String(s || "")
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function extractPossibleProductQuery(text) {
  // Very small heuristic: remove common intent words
  return normalizeText(text)
    .replace(/\b(size|sizes|color|colors|price|stock|available|availability|show|tell|want|need|add|cart|wishlist|order|buy)\b/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

async function answerWithProducts(userMessage) {
  const cleaned = normalizeText(userMessage);
  const maybeQuery = extractPossibleProductQuery(cleaned);

  // Search by title/brand/category/subcategory
  const regex = new RegExp(maybeQuery || cleaned, "i");
  const products = await Product.find({
    $or: [{ title: regex }, { brand: regex }, { category: regex }, { subcategory: regex }],
  })
    .limit(5)
    .select("title brand category subcategory price salePrice totalStock colors sizes")
    .lean();

  if (!products.length) {
    return {
      reply:
        "I couldn’t find a matching product. Try searching with the exact product name (e.g. “Classic White T-Shirt”) or a brand (e.g. “Nike”).",
      matches: [],
    };
  }

  const lines = products.map((p, idx) => {
    const price = p.salePrice > 0 ? `${p.salePrice} (sale, was ${p.price})` : `${p.price}`;
    const colors = Array.isArray(p.colors) && p.colors.length ? p.colors.join(", ") : "N/A";
    const sizes = Array.isArray(p.sizes) && p.sizes.length ? p.sizes.join(", ") : "N/A";
    return `${idx + 1}) ${p.title} — ${p.brand} — ${p.category}/${p.subcategory} — price: ${price} — stock: ${p.totalStock} — colors: ${colors} — sizes: ${sizes}`;
  });

  return {
    reply:
      "Here are the closest matches:\n" +
      lines.join("\n") +
      "\n\nTell me which one (1-5) and what size/color you want, and I’ll guide you.",
    matches: products,
  };
}

const chat = async (req, res) => {
  try {
    const { message } = req.body || {};
    if (!message || !String(message).trim()) {
      return res.status(400).json({ success: false, message: "Message is required" });
    }

    const text = String(message).trim();
    const cleaned = normalizeText(text);

    // Quick intents
    if (cleaned.includes("help") || cleaned.includes("how")) {
      return res.json({
        success: true,
        reply:
          "Ask me about products (name/brand/category), sizes, colors, price, stock, wishlist, cart, or orders.\nExample: “Do you have a black t-shirt in M?”",
      });
    }

    if (cleaned.includes("wishlist")) {
      return res.json({
        success: true,
        reply:
          "To use wishlist: open a product → click “Add to Wishlist”. You must be logged in. You can view it in Shop → Wishlist.",
      });
    }

    if (cleaned.includes("cart")) {
      return res.json({
        success: true,
        reply:
          "To add to cart: open a product → select color and size → click “Add to Cart”. Then go to Cart/Checkout to place the order.",
      });
    }

    // Default: product-aware answer
    const result = await answerWithProducts(text);
    return res.json({ success: true, ...result });
  } catch (error) {
    console.error("AI chat error:", error);
    return res.status(500).json({ success: false, message: "AI assistant failed" });
  }
};

module.exports = { chat };

