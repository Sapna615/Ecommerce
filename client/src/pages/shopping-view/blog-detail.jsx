import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, User, Tag, ArrowLeft, Share2, Heart } from "lucide-react";
import { useNavigate } from "react-router-dom";

function BlogDetail() {
  const navigate = useNavigate();
  
  // Sample blog detail data - in real app this would come from API based on URL params
  const blogDetail = {
    id: 1,
    title: "Top T-Shirt Trends in 2026",
    description: "Discover the hottest t-shirt trends dominating the fashion scene this year. From oversized fits to sustainable materials, learn what's making waves in casual fashion.",
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=1200&h=600&fit=crop",
    author: "Fashion Editor",
    date: "April 12, 2026",
    readTime: "5 min read",
    category: "T-Shirts",
    tags: ["T-Shirts", "Fashion", "2026 Trends", "Style Guide"],
    content: `
# Top T-Shirt Trends in 2026

The year 2026 has brought an exciting evolution to the world of t-shirt fashion. From sustainable materials to bold graphics, the t-shirt continues to be a canvas for self-expression and innovation. Let's explore the hottest trends that are dominating the fashion scene this year.

## 1. Oversized Everything

The oversized t-shirt trend continues to reign supreme in 2026. Designers are pushing the boundaries with exaggerated silhouettes that offer both comfort and style. These relaxed fits are perfect for layering and create an effortlessly cool aesthetic that works for all body types.

**Key styling tips:**
- Pair with fitted bottoms to balance proportions
- Roll up the sleeves for a more polished look
- Tuck partially into high-waisted pants for a modern silhouette

## 2. Sustainable Fabrics Take Center Stage

Eco-conscious fashion is no longer a niche market. 2026 has seen a massive surge in t-shirts made from sustainable materials:

- **Organic Cotton**: Grown without harmful pesticides, offering superior softness and breathability
- **Recycled Materials**: T-shirts made from recycled plastic bottles and textile waste
- **Bamboo Fabric**: Naturally antibacterial and incredibly soft
- **Hemp Blends**: Durable, breathable, and require less water to produce

## 3. Graphic Storytelling

Graphics have evolved beyond simple logos. 2026's trend focuses on storytelling through visuals:

- **Minimalist Designs**: Subtle, artistic elements that speak volumes
- **Vintage-Inspired Graphics**: Retro aesthetics with modern twists
- **Abstract Art**: Hand-drawn and digital art pieces that double as wearable art
- **Typography Focus**: Bold statements and inspirational quotes in creative fonts

## 4. Color Revolution

While neutrals remain timeless, 2026 has embraced bold color choices:

- **Pastel Palette**: Soft lavender, mint green, and baby blue dominate spring collections
- **Earth Tones**: Terracotta, olive green, and warm browns for autumn
- **Neon Accents**: Bright pops of color on neutral bases
- **Gradient Effects**: Subtle color transitions that add depth to simple designs

## 5. Texture Play

Texture is the new pattern in 2026 t-shirt design:

- **Ribbed Fabrics**: Adding visual interest and body-hugging fits
- **Slub Textures**: Natural irregularities that create character
- **Washed Effects**: Vintage-inspired distressing that looks authentic
- **Embroidery Details**: Intricate stitching that elevates basic designs

## 6. Functional Fashion

The line between activewear and casual wear continues to blur:

- **Moisture-Wicking Fabrics**: Performance materials in everyday styles
- **Hidden Pockets**: Functional additions without compromising aesthetics
- **UV Protection**: Built-in sun protection for outdoor activities
- **Temperature Regulation**: Fabrics that adapt to body temperature

## 7. Cultural Fusion

Global influences are more prominent than ever:

- **Traditional Patterns**: Cultural motifs reimagined for modern audiences
- **Artisan Techniques**: Hand-crafted elements that celebrate heritage
- **Fusion Designs**: Blending Eastern and Western aesthetics
- **Local Art Collaborations**: Partnerships with artists from around the world

## How to Style 2026's T-Shirt Trends

### For Men:
- **Oversized Fit**: Pair with slim-fit jeans and clean sneakers
- **Graphic Tees**: Let the t-shirt be the focal point with neutral bottoms
- **Color Blocking**: Combine bold colors with complementary neutrals
- **Layering**: Use under open shirts or jackets for dimension

### For Women:
- **Tucked and Tied**: Create waist definition with oversized styles
- **Dress It Up**: Pair t-shirts with skirts and heels for unexpected elegance
- **Athleisure**: Combine performance tees with fashionable activewear bottoms
- **Accessorize**: Use statement jewelry to elevate simple designs

### For Kids:
- **Fun Graphics**: Let personality shine with playful designs
- **Durable Fabrics**: Choose materials that can withstand active lifestyles
- **Growth Room**: Select slightly oversized styles for longer wear
- **Easy Care**: Prioritize machine-washable options

## The Future of T-Shirt Fashion

Looking ahead, we can expect even more innovation:

- **Smart Fabrics**: Temperature-regulating and color-changing materials
- **Customization**: AI-powered design tools for personalized t-shirts
- **Virtual Integration**: AR-enhanced graphics that come to life
- **Circular Fashion**: Fully recyclable t-shirt systems

## Conclusion

The t-shirt has evolved from a basic wardrobe staple to a canvas for innovation, sustainability, and self-expression. Whether you prefer classic simplicity or bold statements, 2026 offers something for every style preference. The key is to choose pieces that not only look good but also align with your values and lifestyle.

Remember, the best t-shirt is one that makes you feel confident and comfortable. Experiment with these trends, but don't be afraid to create your own unique style combinations. After all, fashion is about personal expression, and the t-shirt is the perfect canvas for telling your story.
    `
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: blogDetail.title,
        text: blogDetail.description,
        url: window.location.href,
      });
    } else {
      // Fallback for browsers that don't support Web Share API
      navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
    }
  };

  const handleLike = () => {
    // Implement like functionality
    alert('Liked!');
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Image */}
      <div className="relative h-96 overflow-hidden">
        <img
          src={blogDetail.image}
          alt={blogDetail.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/40" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white px-4">
            <Badge className="mb-4 bg-white/20 text-white">
              {blogDetail.category}
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              {blogDetail.title}
            </h1>
            <p className="text-xl max-w-3xl mx-auto">
              {blogDetail.description}
            </p>
          </div>
        </div>
      </div>

      {/* Article Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Article Meta */}
          <div className="flex flex-wrap items-center gap-4 mb-8 pb-8 border-b">
            <div className="flex items-center gap-2 text-gray-600">
              <User className="w-5 h-5" />
              <span>{blogDetail.author}</span>
            </div>
            <div className="flex items-center gap-2 text-gray-600">
              <Calendar className="w-5 h-5" />
              <span>{blogDetail.date}</span>
            </div>
            <div className="flex items-center gap-2 text-gray-600">
              <Clock className="w-5 h-5" />
              <span>{blogDetail.readTime}</span>
            </div>
            <div className="flex items-center gap-2 ml-auto">
              <Button
                variant="outline"
                size="sm"
                onClick={handleShare}
                className="flex items-center gap-2"
              >
                <Share2 className="w-4 h-4" />
                Share
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={handleLike}
                className="flex items-center gap-2"
              >
                <Heart className="w-4 h-4" />
                Like
              </Button>
            </div>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-8">
            {blogDetail.tags.map((tag, index) => (
              <Badge key={index} variant="secondary" className="text-sm">
                <Tag className="w-3 h-3 mr-1" />
                {tag}
              </Badge>
            ))}
          </div>

          {/* Article Body */}
          <div className="prose prose-lg max-w-none">
            <div dangerouslySetInnerHTML={{ __html: blogDetail.content.replace(/\n/g, '<br>') }} />
          </div>

          {/* Related Articles */}
          <div className="mt-16 pt-8 border-t">
            <h2 className="text-2xl font-bold mb-6">Related Articles</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                <CardContent className="p-6">
                  <h3 className="font-semibold mb-2">How to Style Oversized T-Shirts</h3>
                  <p className="text-sm text-gray-600 mb-3">Master the art of wearing oversized t-shirts...</p>
                  <Button variant="outline" size="sm">Read More</Button>
                </CardContent>
              </Card>
              <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                <CardContent className="p-6">
                  <h3 className="font-semibold mb-2">Best Hoodies for Winter</h3>
                  <p className="text-sm text-gray-600 mb-3">Stay warm and stylish this winter...</p>
                  <Button variant="outline" size="sm">Read More</Button>
                </CardContent>
              </Card>
              <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                <CardContent className="p-6">
                  <h3 className="font-semibold mb-2">Casual Outfit Ideas</h3>
                  <p className="text-sm text-gray-600 mb-3">Transform your everyday look with simple ideas...</p>
                  <Button variant="outline" size="sm">Read More</Button>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Back Button */}
          <div className="mt-8">
            <Button
              onClick={() => navigate('/shop/blog')}
              variant="outline"
              className="flex items-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Blog
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BlogDetail;
