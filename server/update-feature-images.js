const mongoose = require("mongoose");
const Feature = require("./models/Feature");
require("dotenv").config();

// Reliable feature images for banner carousel
const reliableFeatureImages = [
  {
    image: "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=1200&h=600&fit=crop"
  },
  {
    image: "https://images.unsplash.com/photo-1445205170230-053b83016050?w=1200&h=600&fit=crop"
  },
  {
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&h=600&fit=crop"
  }
];

async function updateFeatureImages() {
  try {
    await mongoose.connect("mongodb://localhost:27017/ecommerce");
    console.log("Connected to MongoDB");

    // Clear existing feature images
    await Feature.deleteMany({});
    console.log("Cleared existing feature images");

    // Insert reliable feature images
    const insertedImages = await Feature.insertMany(reliableFeatureImages);
    console.log(`Inserted ${insertedImages.length} reliable feature images`);

    console.log("Feature images updated successfully!");
    process.exit(0);
  } catch (error) {
    console.error("Error updating feature images:", error);
    process.exit(1);
  }
}

updateFeatureImages();
