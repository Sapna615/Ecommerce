import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, User, Tag, ArrowLeft, Share2, Heart, BookOpen, TrendingUp, Sparkles, Palette, Shirt, Leaf, MonitorPlay, Recycle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

function BlogDetail() {
  const navigate = useNavigate();
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(128);
  
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
    setLiked(!liked);
    setLikeCount(liked ? likeCount - 1 : likeCount + 1);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50">
      {/* Hero Image */}
      <div className="relative h-96 overflow-hidden">
        <img
          src={blogDetail.image}
          alt={blogDetail.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/40 to-transparent" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white px-4">
            <Badge className="mb-4 bg-white/20 backdrop-blur-sm text-white border border-white/30">
              {blogDetail.category}
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold mb-4 drop-shadow-lg">
              {blogDetail.title}
            </h1>
            <p className="text-xl max-w-3xl mx-auto text-white/95 drop-shadow">
              {blogDetail.description}
            </p>
          </div>
        </div>
      </div>

      {/* Article Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Article Meta */}
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 mb-8 shadow-xl border border-purple-100">
            <div className="flex flex-wrap items-center gap-6 mb-6 pb-6 border-b border-purple-100">
              <div className="flex items-center gap-2 text-purple-700">
                <User className="w-5 h-5" />
                <span className="font-medium">{blogDetail.author}</span>
              </div>
              <div className="flex items-center gap-2 text-purple-700">
                <Calendar className="w-5 h-5" />
                <span className="font-medium">{blogDetail.date}</span>
              </div>
              <div className="flex items-center gap-2 text-purple-700">
                <Clock className="w-5 h-5" />
                <span className="font-medium">{blogDetail.readTime}</span>
              </div>
              <div className="flex items-center gap-2 ml-auto">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleShare}
                  className="flex items-center gap-2 border-purple-200 text-purple-700 hover:bg-purple-50"
                >
                  <Share2 className="w-4 h-4" />
                  Share
                </Button>
                <Button
                  variant={liked ? "default" : "outline"}
                  size="sm"
                  onClick={handleLike}
                  className={`flex items-center gap-2 ${liked ? 'bg-red-500 text-white hover:bg-red-600' : 'border-purple-200 text-purple-700 hover:bg-purple-50'}`}
                >
                  <Heart className={`w-4 h-4 ${liked ? 'fill-current' : ''}`} />
                  {liked ? 'Liked' : 'Like'} ({likeCount})
                </Button>
              </div>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-2">
              {blogDetail.tags.map((tag, index) => (
                <Badge key={index} variant="secondary" className="text-sm bg-purple-100 text-purple-800 hover:bg-purple-200 transition-colors">
                  <Tag className="w-3 h-3 mr-1" />
                  {tag}
                </Badge>
              ))}
            </div>
          </div>

          {/* Article Body */}
          <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-8 mb-8 shadow-xl border border-purple-100 prose prose-lg max-w-none">
            <div dangerouslySetInnerHTML={{ __html: blogDetail.content.replace(/\n/g, '<br>') }} />
          </div>

          {/* Related Articles */}
          <div className="mt-16 pt-8 border-t border-purple-200">
            <h2 className="text-3xl font-bold mb-8 text-purple-900 flex items-center gap-2">
              <BookOpen className="w-8 h-8 text-purple-600" />
              Related Articles
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="hover:shadow-xl transition-all duration-300 cursor-pointer group border border-purple-100 overflow-hidden">
                <div className="relative h-40 overflow-hidden">
                  <img
                    src="https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=400&h=200&fit=crop"
                    alt="Oversized T-Shirts"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-purple-900/60 to-transparent" />
                </div>
                <CardContent className="p-6 pt-2">
                  <h3 className="font-semibold mb-2 text-purple-900">How to Style Oversized T-Shirts</h3>
                  <p className="text-sm text-gray-600 mb-3">Master the art of wearing oversized t-shirts...</p>
                  <Button variant="outline" size="sm" className="border-purple-200 text-purple-700 hover:bg-purple-50">Read More</Button>
                </CardContent>
              </Card>
              <Card className="hover:shadow-xl transition-all duration-300 cursor-pointer group border border-purple-100 overflow-hidden">
                <div className="relative h-40 overflow-hidden">
                  <img
                    src="https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=200&fit=crop"
                    alt="Summer T-Shirts"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-purple-900/60 to-transparent" />
                </div>
                <CardContent className="p-6 pt-2">
                  <h3 className="font-semibold mb-2 text-purple-900">Best T-Shirts for Summer</h3>
                  <p className="text-sm text-gray-600 mb-3">Stay cool and stylish this summer with our curated selection of the best t-shirts...</p>
                  <Button variant="outline" size="sm" className="border-purple-200 text-purple-700 hover:bg-purple-50">Read More</Button>
                </CardContent>
              </Card>
              <Card className="hover:shadow-xl transition-all duration-300 cursor-pointer group border border-purple-100 overflow-hidden">
                <div className="relative h-40 overflow-hidden">
                  <img
                    src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=400&h=200&fit=crop"
                    alt="Casual Outfit Ideas"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-purple-900/60 to-transparent" />
                </div>
                <CardContent className="p-6 pt-2">
                  <h3 className="font-semibold mb-2 text-purple-900">Casual Outfit Ideas</h3>
                  <p className="text-sm text-gray-600 mb-3">Transform your everyday look with simple ideas...</p>
                  <Button variant="outline" size="sm" className="border-purple-200 text-purple-700 hover:bg-purple-50">Read More</Button>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Back Button */}
          <div className="mt-12 text-center">
            <Button
              onClick={() => navigate('/shop/blog')}
              variant="outline"
              size="lg"
              className="flex items-center gap-2 border-purple-200 text-purple-700 hover:bg-purple-50 px-8"
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
