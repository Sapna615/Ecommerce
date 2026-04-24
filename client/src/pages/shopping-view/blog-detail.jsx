import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, User, Tag, ArrowLeft, Share2, Heart, BookOpen, TrendingUp, Sparkles, Palette, Shirt, Leaf, MonitorPlay, Recycle } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchBlogDetails } from "@/store/shop/blog-slice";
import { Helmet } from "react-helmet-async";

function BlogDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { blogDetails, isLoading } = useSelector((state) => state.shopBlog);
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);

  useEffect(() => {
    if (id) {
      dispatch(fetchBlogDetails(id));
    }
  }, [id, dispatch]);

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: blogDetails?.title,
        text: blogDetails?.description,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
    }
  };

  const handleLike = () => {
    setLiked(!liked);
    setLikeCount(liked ? likeCount - 1 : likeCount + 1);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-xl font-semibold text-purple-600 animate-pulse">Loading blog post...</p>
      </div>
    );
  }

  if (!blogDetails) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-4">
        <p className="text-xl font-semibold text-gray-600 mb-4">Blog post not found.</p>
        <Button onClick={() => navigate('/shop/blog')} variant="outline">Back to Blog</Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50">
      <Helmet>
        <title>{blogDetails.title} | StyleTee Hub Blog</title>
        <meta name="description" content={blogDetails.description} />
        <meta name="keywords" content={blogDetails.keywords?.join(", ")} />
        <meta property="og:title" content={blogDetails.title} />
        <meta property="og:description" content={blogDetails.description} />
        <meta property="og:image" content={blogDetails.image} />
      </Helmet>
      {/* Hero Image */}
      <div className="relative h-[50vh] min-h-[400px] overflow-hidden">
        <img
          src={blogDetails.image}
          alt={blogDetails.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white px-4 max-w-4xl">
            <Badge className="mb-4 bg-white/20 backdrop-blur-md text-white border border-white/30 px-4 py-1">
              {blogDetails.category}
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 drop-shadow-2xl">
              {blogDetails.title}
            </h1>
            <p className="text-xl md:text-2xl text-white/90 drop-shadow-lg font-medium">
              {blogDetails.description}
            </p>
          </div>
        </div>
      </div>

      {/* Article Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Article Meta */}
          <div className="bg-white/90 backdrop-blur-md rounded-3xl p-6 md:p-8 mb-10 shadow-2xl border border-purple-100/50 -mt-20 relative z-10">
            <div className="flex flex-wrap items-center gap-6 mb-8 pb-8 border-b border-purple-100">
              <div className="flex items-center gap-3 text-purple-900">
                <div className="bg-purple-100 p-2 rounded-full">
                  <User className="w-5 h-5 text-purple-600" />
                </div>
                <span className="font-bold">{blogDetails.author}</span>
              </div>
              <div className="flex items-center gap-3 text-purple-900">
                <div className="bg-purple-100 p-2 rounded-full">
                  <Calendar className="w-5 h-5 text-purple-600" />
                </div>
                <span className="font-bold">{blogDetails.date}</span>
              </div>
              <div className="flex items-center gap-3 text-purple-900">
                <div className="bg-purple-100 p-2 rounded-full">
                  <Clock className="w-5 h-5 text-purple-600" />
                </div>
                <span className="font-bold">{blogDetails.readTime}</span>
              </div>
              <div className="flex items-center gap-3 ml-auto">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleShare}
                  className="rounded-full border-purple-200 text-purple-700 hover:bg-purple-600 hover:text-white transition-all shadow-sm"
                >
                  <Share2 className="w-4 h-4 mr-2" />
                  Share
                </Button>
                <Button
                  variant={liked ? "default" : "outline"}
                  size="sm"
                  onClick={handleLike}
                  className={`rounded-full transition-all shadow-sm ${liked ? 'bg-red-500 text-white hover:bg-red-600' : 'border-purple-200 text-purple-700 hover:bg-purple-50'}`}
                >
                  <Heart className={`w-4 h-4 mr-2 ${liked ? 'fill-current' : ''}`} />
                  {liked ? 'Liked' : 'Like'} ({likeCount})
                </Button>
              </div>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-3">
              {blogDetails.tags && blogDetails.tags.map((tag, index) => (
                <Badge key={index} variant="secondary" className="text-sm bg-gradient-to-r from-purple-100 to-pink-100 text-purple-900 hover:from-purple-200 hover:to-pink-200 transition-all border-none px-4 py-1 rounded-full cursor-default">
                  <Tag className="w-3 h-3 mr-2" />
                  {tag}
                </Badge>
              ))}
            </div>
          </div>

          {/* Article Body */}
          <div className="bg-white/95 backdrop-blur-md rounded-3xl p-8 md:p-12 mb-12 shadow-2xl border border-purple-100/50 prose prose-lg max-w-none prose-purple prose-headings:text-purple-900 prose-p:text-gray-700 prose-strong:text-purple-800 prose-img:rounded-3xl">
            <div 
              className="leading-relaxed space-y-6"
              dangerouslySetInnerHTML={{ __html: blogDetails.content.replace(/\n/g, '<br>') }} 
            />
          </div>

          {/* Related Articles - Static for now */}
          <div className="mt-20 pt-12 border-t border-purple-200">
            <h2 className="text-3xl font-extrabold mb-10 text-purple-900 flex items-center gap-3">
              <BookOpen className="w-8 h-8 text-purple-600" />
              Related Articles
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <Card className="hover:shadow-2xl transition-all duration-500 cursor-pointer group border-none bg-white/80 overflow-hidden rounded-3xl">
                <div className="relative h-48 overflow-hidden">
                  <img
                    src="https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=400&h=300&fit=crop"
                    alt="Oversized T-Shirts"
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-purple-900/40 to-transparent" />
                </div>
                <CardContent className="p-6">
                  <h3 className="font-bold text-lg mb-3 text-purple-900 line-clamp-2">How to Style Oversized T-Shirts</h3>
                  <Button variant="link" className="text-purple-600 p-0 h-auto font-bold hover:text-purple-800">Read Article →</Button>
                </CardContent>
              </Card>
              {/* Add more related cards as needed */}
            </div>
          </div>

          {/* Back Button */}
          <div className="mt-16 text-center">
            <Button
              onClick={() => navigate('/shop/blog')}
              variant="outline"
              size="lg"
              className="rounded-full flex items-center gap-3 border-purple-200 text-purple-700 hover:bg-purple-600 hover:text-white transition-all px-10 py-6 text-lg font-bold shadow-lg"
            >
              <ArrowLeft className="w-5 h-5" />
              Back to Blog
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BlogDetail;
