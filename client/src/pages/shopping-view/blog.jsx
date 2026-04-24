import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, User, Tag, BookOpen, Heart, Share2, Plus, PenTool } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { useDispatch, useSelector } from "react-redux";
import { createNewBlog, fetchAllBlogs } from "@/store/shop/blog-slice";
import { Label } from "@/components/ui/label";

function ShoppingBlog() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { blogList, isLoading } = useSelector((state) => state.shopBlog);
  const { user, isAuthenticated } = useSelector((state) => state.auth);
  const [email, setEmail] = useState("");
  const { toast } = useToast();

  useEffect(() => {
    dispatch(fetchAllBlogs());
  }, [dispatch]);

  const handleCreateBlog = (e) => {
    e.preventDefault();
    if (!isAuthenticated) {
      toast({
        title: "Login Required",
        description: "Please login to write a blog post.",
        variant: "destructive",
      });
      return;
    }
    navigate('/shop/write-blog');
  };

  // Sample fallback data if list is empty
  const defaultBlogPosts = [
    {
      id: 2,
      title: "How to Style Oversized T-Shirts",
      description: "Master the art of wearing oversized t-shirts with our comprehensive styling guide. Learn how to balance proportions and create effortlessly cool looks.",
      image: "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=400&h=300&fit=crop",
      author: "Sapna Rai",
      date: "April 10, 2026",
      readTime: "4 min read",
      category: "Fashion Tips"
    },
    {
      id: 3,
      title: "Best T-Shirts for Summer",
      description: "Stay cool and stylish this summer with our curated selection of the best t-shirts. From classic cotton to modern blends, find the perfect tee for hot weather.",
      image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=300&fit=crop",
      author: "Sapna Rai",
      date: "April 8, 2026",
      readTime: "6 min read",
      category: "T-Shirts"
    }
  ];

  const currentBlogPosts = blogList && blogList.length > 0 ? blogList : defaultBlogPosts;
  const featuredBlog = currentBlogPosts[0];
  const otherPosts = currentBlogPosts.slice(1);

  const categories = [
    { name: "T-Shirt Styles", count: 12, icon: "👕" },
    { name: "T-Shirt Materials", count: 8, icon: "🧵" },
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
    toast({
      title: "Successfully Subscribed!",
      description: `Thank you for subscribing with ${email}.`,
    });
    setEmail("");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-purple-600 to-pink-600 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-4">Fashion Blog</h1>
          <p className="text-xl max-w-2xl mx-auto mb-8">
            Latest trends, tips, and styling ideas
          </p>
          {isAuthenticated && (
            <Button 
              onClick={handleCreateBlog}
              className="bg-white text-purple-600 hover:bg-gray-100 font-bold px-8 py-6 rounded-full shadow-lg flex items-center gap-2 mx-auto"
            >
              <PenTool className="w-5 h-5" />
              Write a Blog Post
            </Button>
          )}
        </div>
      </section>

      {/* Featured Blog */}
      {featuredBlog && (
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
                    {featuredBlog.description?.length > 200 
                      ? `${featuredBlog.description.substring(0, 200)}...` 
                      : featuredBlog.description}
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
                      onClick={() => navigate(`/shop/blog/${featuredBlog._id || featuredBlog.id}`)}
                    >
                      Read More
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </section>
      )}

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
            {otherPosts.map((post) => (
              <Card key={post._id || post.id} className="overflow-hidden hover:shadow-lg transition-shadow duration-300 group">
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
                    {post.description?.length > 150 
                      ? `${post.description.substring(0, 150)}...` 
                      : post.description}
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
                      onClick={() => navigate(`/shop/blog/${post._id || post.id}`)}
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
