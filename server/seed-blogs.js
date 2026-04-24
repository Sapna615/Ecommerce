const mongoose = require('mongoose');
require('dotenv').config();

const BlogSchema = new mongoose.Schema({
    userId: String,
    title: String,
    description: String,
    content: String,
    image: String,
    author: String,
    date: {
        type: String,
        default: () => new Date().toLocaleString('en-US', { 
            month: 'long', 
            day: 'numeric', 
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        }),
    },
    category: String,
    tags: [String],
    keywords: [String],
    likes: { type: Number, default: 0 },
    comments: { type: Array, default: [] }
}, { timestamps: true });

const Blog = mongoose.model('Blog', BlogSchema);

async function seedBlogs() {
    try {
        await mongoose.connect(process.env.MONGODB_URL || "mongodb://localhost:27017/ecommerce");
        console.log("Connected to MongoDB");

        const sampleBlogs = [
            {
                userId: "admin_seed",
                title: "Top 10 T-Shirt Trends for Summer 2026",
                description: "Discover the hottest t-shirt trends that will dominate the fashion scene this summer. From vibrant neons to vintage washes, stay ahead of the style curve.",
                content: `
                    <p>Summer is just around the corner, and it's time to refresh your wardrobe with the latest t-shirt trends. Whether you're heading to the beach or a rooftop party, the right tee can make all the difference.</p>
                    
                    <h2>1. Vintage Graphic Tees</h2>
                    <p>Nostalgia is back in a big way. Look for t-shirts featuring 90s bands, retro cartoon characters, and faded logos. Pair them with distressed denim for an effortless cool look.</p>
                    
                    <h2>2. Oversized Fits</h2>
                    <p>The baggy silhouette continues to reign supreme. Oversized t-shirts offer comfort and a modern streetwear vibe. Pro tip: tuck the front into your trousers to balance the proportions.</p>
                    
                    <h2>3. Pastel Hues</h2>
                    <p>Soft lavender, mint green, and pale lemon are the colors of the season. These shades are easy on the eyes and perfect for staying cool under the sun.</p>
                    
                    <p>Stay tuned for more fashion tips from StyleTee Hub!</p>
                `,
                image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800&q=80",
                author: "Sapna Rai",
                category: "T-Shirt Trends",
                tags: ["summer", "fashion", "trends"],
                keywords: ["best t-shirts 2026", "summer fashion trends", "how to style t-shirts", "StyleTee Hub"]
            },
            {
                userId: "admin_seed",
                title: "How to Care for Your Cotton Hoodies",
                description: "Keep your favorite hoodies looking brand new with our expert care guide. Learn the best washing, drying, and storage techniques.",
                content: `
                    <p>A good hoodie is an investment in comfort. To ensure your cotton hoodies stay soft and vibrant for years, follow these simple care instructions.</p>
                    
                    <h2>Wash Inside Out</h2>
                    <p>Always turn your hoodies inside out before throwing them in the wash. This protects the outer fabric and any printed designs from friction.</p>
                    
                    <h2>Use Cold Water</h2>
                    <p>Hot water can shrink cotton and fade colors. Stick to cold water cycles and use a mild detergent.</p>
                    
                    <h2>Air Dry When Possible</h2>
                    <p>High heat from dryers is the enemy of cotton fibers. Lay your hoodies flat on a drying rack to maintain their shape and softness.</p>
                    
                    <p>Proper care means your StyleTee Hub hoodie will be your favorite for a long time.</p>
                `,
                image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=800&q=80",
                author: "Sapna Rai",
                category: "Clothing Care",
                tags: ["hoodies", "maintenance", "cotton"],
                keywords: ["how to wash hoodies", "cotton hoodie care", "StyleTee Hub maintenance"]
            },
            {
                userId: "admin_seed",
                title: "Accessories to Elevate Your T-Shirt Look",
                description: "Small details can make a big impact. Learn how to use jewelry, hats, and bags to take your basic tee from simple to sophisticated.",
                content: `
                    <p>A plain t-shirt is the perfect canvas for your personal style. Here's how to accessorize like a pro.</p>
                    
                    <h2>Layered Necklaces</h2>
                    <p>Gold chains or beaded necklaces added over a crew neck tee create visual interest and draw the eye upward. Mix different lengths for a trendy, effortless look.</p>
                    
                    <h2>Statement Hats</h2>
                    <p>A classic baseball cap or a stylish bucket hat can instantly change the vibe of your outfit. Choose a color that complements your shirt for a cohesive look.</p>
                    
                    <h2>The Right Bag</h2>
                    <p>A crossbody bag for a casual day out or a sleek tote for a more polished appearance. The bag you choose sets the tone for your entire ensemble.</p>
                `,
                image: "https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=800&q=80",
                author: "Sapna Rai",
                category: "Styling Ideas",
                tags: ["accessories", "style", "tips"],
                keywords: ["how to accessorize t-shirts", "fashion accessories 2026", "StyleTee Hub styling"]
            }
        ];

        await Blog.insertMany(sampleBlogs);
        console.log("Sample blogs added successfully!");
        process.exit(0);
    } catch (error) {
        console.error("Error seeding blogs:", error);
        process.exit(1);
    }
}

seedBlogs();
