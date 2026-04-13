import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, User, Tag, BookOpen, Heart, Share2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";

function ShoppingBlog() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const { toast } = useToast();
  
  // Sample blog data
  const featuredBlog = {
    id: 1,
    title: "Top T-Shirt Trends in 2026",
    description: "Discover the hottest t-shirt trends dominating the fashion scene this year. From oversized fits to sustainable materials, learn what's making waves in casual fashion.",
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800&h=400&fit=crop",
    author: "Fashion Editor",
    date: "April 12, 2026",
    readTime: "5 min read",
    category: "T-Shirts"
  };

  const blogPosts = [
    {
      id: 2,
      title: "How to Style Oversized T-Shirts",
      description: "Master the art of wearing oversized t-shirts with our comprehensive styling guide. Learn how to balance proportions and create effortlessly cool looks.",
      image: "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=400&h=300&fit=crop",
      author: "Style Expert",
      date: "April 10, 2026",
      readTime: "4 min read",
      category: "Fashion Tips"
    },
    {
      id: 3,
      title: "Best Hoodies for Winter",
      description: "Stay warm and stylish this winter with our curated selection of the best hoodies. From classic pullovers to modern zip-ups.",
      image: "https://images.unsplash.com/photo-1556821840-3aeb4018bbd3?w=400&h=300&fit=crop",
      author: "Winter Fashion",
      date: "April 8, 2026",
      readTime: "6 min read",
      category: "Hoodies"
    },
    {
      id: 4,
      title: "Casual Outfit Ideas",
      description: "Transform your everyday look with these simple yet effective casual outfit combinations. Perfect for work, weekends, and everything in between.",
      image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400&h=300&fit=crop",
      author: "Lifestyle Editor",
      date: "April 5, 2026",
      readTime: "3 min read",
      category: "Casual Wear"
    },
    {
      id: 5,
      title: "Men vs Women Fashion Trends",
      description: "Explore the key differences and similarities in current men's and women's fashion trends. Find your perfect style inspiration.",
      image: "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=400&h=300&fit=crop",
      author: "Trend Analyst",
      date: "April 2, 2026",
      readTime: "7 min read",
      category: "Fashion Tips"
    },
    {
      id: 6,
      title: "How to Choose Perfect Fit",
      description: "Never buy the wrong size again! Our complete guide to finding the perfect fit for your body type and style preferences.",
      image: "https://images.unsplash.com/photo-1445205170230-053b83016050?w=400&h=300&fit=crop",
      author: "Fit Specialist",
      date: "March 30, 2026",
      readTime: "5 min read",
      category: "T-Shirt Care"
    },
    {
      id: 7,
      title: "T-Shirt Materials Guide",
      description: "From cotton to bamboo, learn about different t-shirt materials and find the perfect fabric for your lifestyle and comfort needs.",
      image: "https://images.unsplash.com/photo-1522778139015-aa489e8b9a3b?w=400&h=300&fit=crop",
      author: "Material Expert",
      date: "March 28, 2026",
      readTime: "6 min read",
      category: "T-Shirt Materials"
    }
  ];

  const categories = [
    { name: "T-Shirt Styles", count: 12, icon: "👕" },
    { name: "T-Shirt Materials", count: 8, icon: "�" },
    { name: "T-Shirt Trends", count: 15, icon: "✨" },
    { name: "T-Shirt Care", count: 6, icon: "🧺" }
  ];

  const handleSubscribe = () => {
    if (!email) {
      toast({
        title: "Email Required",
        description: "Please enter your email address to subscribe.",
        variant: "destructive",
      });
      return;
    }

    if (!email.includes('@') || !email.includes('.')) {
      toast({
        title: "Invalid Email",
        description: "Please enter a valid email address.",
        variant: "destructive",
      });
      return;
    }

    // Simulate subscription API call
    toast({
      title: "Successfully Subscribed!",
      description: `Thank you for subscribing with ${email}. You'll receive our latest fashion updates soon.`,
    });
    
    // Clear the email input
    setEmail("");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-purple-600 to-pink-600 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-4">Fashion Blog</h1>
          <p className="text-xl max-w-2xl mx-auto">
            Latest trends, tips, and styling ideas
          </p>
        </div>
      </section>

      {/* Featured Blog */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">Featured Article</h2>
          <Card className="overflow-hidden hover:shadow-xl transition-shadow duration-300">
            <div className="md:flex">
              <div className="md:w-1/2">
                <img
                  src={featuredBlog.image}
                  alt={featuredBlog.title}
                  className="w-full h-64 md:h-full object-cover"
                />
              </div>
              <div className="md:w-1/2 p-8">
                <div className="flex items-center gap-2 mb-4">
                  <Badge className="bg-purple-100 text-purple-800">
                    {featuredBlog.category}
                  </Badge>
                  <div className="flex items-center gap-1 text-sm text-gray-500">
                    <Calendar className="w-4 h-4" />
                    {featuredBlog.date}
                  </div>
                </div>
                <h3 className="text-2xl font-bold mb-4 text-gray-900">
                  {featuredBlog.title}
                </h3>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  {featuredBlog.description}
                </p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4 text-sm text-gray-500">
                    <div className="flex items-center gap-1">
                      <User className="w-4 h-4" />
                      {featuredBlog.author}
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {featuredBlog.readTime}
                    </div>
                  </div>
                  
                  <Button 
                    className="bg-purple-600 hover:bg-purple-700"
                    onClick={() => navigate(`/shop/blog/${featuredBlog.id}`)}
                  >
                    Read More
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">Categories</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.map((category, index) => (
              <Card key={index} className="text-center p-6 hover:shadow-lg transition-shadow duration-300 cursor-pointer">
                <CardContent className="pt-6">
                  <div className="text-4xl mb-4">{category.icon}</div>
                  <h3 className="text-lg font-semibold mb-2 text-gray-900">
                    {category.name}
                  </h3>
                  <p className="text-sm text-gray-600">
                    {category.count} articles
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Blog Posts Grid */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">Latest Articles</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.map((post) => (
              <Card key={post.id} className="overflow-hidden hover:shadow-lg transition-shadow duration-300 group">
                <div className="relative">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-4 left-4">
                    <Badge className="bg-white/90 text-gray-800">
                      {post.category}
                    </Badge>
                  </div>
                </div>
                <CardContent className="p-6">
                  <div className="flex items-center gap-2 mb-3 text-sm text-gray-500">
                    <Calendar className="w-4 h-4" />
                    {post.date}
                    <span className="text-gray-300">•</span>
                    <Clock className="w-4 h-4" />
                    {post.readTime}
                  </div>
                  <h3 className="text-xl font-semibold mb-3 text-gray-900 group-hover:text-purple-600 transition-colors">
                    {post.title}
                  </h3>
                  <p className="text-gray-600 mb-4 line-clamp-3">
                    {post.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3 text-sm text-gray-500">
                      <div className="flex items-center gap-1">
                        <User className="w-4 h-4" />
                        {post.author}
                      </div>
                    </div>
                    <Button 
                      variant="outline" 
                      size="sm"
                      className="hover:bg-purple-600 hover:text-white transition-colors"
                      onClick={() => navigate(`/shop/blog/${post.id}`)}
                    >
                      Read More
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-16 bg-gradient-to-r from-purple-600 to-pink-600 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <BookOpen className="w-16 h-16 mx-auto mb-6" />
            <h2 className="text-3xl font-bold mb-4">Subscribe for Latest Fashion Updates</h2>
            <p className="text-xl mb-8">
              Get the latest fashion trends, styling tips, and exclusive content delivered to your inbox
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <input
                type="email"
                placeholder="Enter your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 max-w-md px-4 py-3 rounded-lg border border-white/20 bg-white/10 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent"
              />
              <Button 
                size="lg"
                className="bg-white text-purple-600 hover:bg-gray-100 px-8 py-3 text-lg font-semibold"
                onClick={handleSubscribe}
              >
                Subscribe
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default ShoppingBlog;
