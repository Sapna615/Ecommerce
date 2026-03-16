const mongoose = require("mongoose");
const Feature = require("./models/Feature");
require("dotenv").config();

// Sample feature images for banner carousel
const sampleFeatureImages = [
  {
    image: "https://images.unsplash.com/photo-1607082318824-0b96f801c7dc?w=1200&h=600&fit=crop"
  },
  {
    image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1200&h=600&fit=crop"
  },
  {
    image: "https://images.unsplash.com/photo-1472851294608-e067f8a6c0da?w=1200&h=600&fit=crop"
  }
];

async function seedFeatureImages() {
  try {
    await mongoose.connect("mongodb://localhost:27017/ecommerce");
    console.log("Connected to MongoDB");

    // Clear existing feature images
    await Feature.deleteMany({});
    console.log("Cleared existing feature images");

    // Insert sample feature images
    const insertedImages = await Feature.insertMany(sampleFeatureImages);
    console.log(`Inserted ${insertedImages.length} sample feature images`);

    console.log("Feature images seeded successfully!");
    process.exit(0);
  } catch (error) {
    console.error("Error seeding feature images:", error);
    process.exit(1);
  }
}

seedFeatureImages();
