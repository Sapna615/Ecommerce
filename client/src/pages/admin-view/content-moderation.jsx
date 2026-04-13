import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  CheckCircle, 
  XCircle, 
  Eye, 
  Trash2, 
  Edit, 
  Calendar,
  User,
  Star,
  MessageSquare,
  FileText,
  AlertCircle
} from "lucide-react";
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";

function ContentModeration() {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("blogs");

  // Sample data - in real app this would come from API
  const [pendingBlogs, setPendingBlogs] = useState([
    {
      id: 1,
      title: "My T-Shirt Collection Journey",
      author: "John Doe",
      email: "john@example.com",
      category: "T-Shirt Styles",
      content: "I've been collecting t-shirts for over 10 years...",
      submittedAt: "2026-04-12",
      image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=200&h=150&fit=crop"
    },
    {
      id: 2,
      title: "Sustainable Fashion Guide",
      author: "Jane Smith",
      email: "jane@example.com",
      category: "T-Shirt Materials",
      content: "How to choose eco-friendly t-shirts...",
      submittedAt: "2026-04-11",
      image: "https://images.unsplash.com/photo-1522778139015-aa489e8b9a3b?w=200&h=150&fit=crop"
    }
  ]);

  const [pendingReviews, setPendingReviews] = useState([
    {
      id: 1,
      productName: "Classic White T-Shirt",
      reviewer: "Mike Johnson",
      email: "mike@example.com",
      rating: 4,
      title: "Great quality, fits perfectly",
      content: "I love this t-shirt! The fabric is soft and the fit is amazing...",
      submittedAt: "2026-04-12"
    },
    {
      id: 2,
      productName: "Oversized Hoodie",
      reviewer: "Sarah Wilson",
      email: "sarah@example.com",
      rating: 5,
      title: "Best hoodie ever!",
      content: "This is the most comfortable hoodie I've ever owned...",
      submittedAt: "2026-04-11"
    }
  ]);

  const [approvedBlogs, setApprovedBlogs] = useState([
    {
      id: 3,
      title: "Top T-Shirt Trends in 2026",
      author: "Fashion Editor",
      category: "T-Shirt Trends",
      publishedAt: "2026-04-10",
      views: 1250,
      likes: 89
    }
  ]);

  const [approvedReviews, setApprovedReviews] = useState([
    {
      id: 3,
      productName: "Vintage Logo T-Shirt",
      reviewer: "Alex Brown",
      rating: 5,
      title: "Perfect vintage look",
      publishedAt: "2026-04-10",
      helpfulVotes: 23
    }
  ]);

  const handleApproveBlog = (blogId) => {
    const blog = pendingBlogs.find(b => b.id === blogId);
    if (blog) {
      setPendingBlogs(prev => prev.filter(b => b.id !== blogId));
      setApprovedBlogs(prev => [...prev, {
        ...blog,
        publishedAt: new Date().toISOString().split('T')[0],
        views: 0,
        likes: 0
      }]);
      
      toast({
        title: "Blog Approved",
        description: `"${blog.title}" has been published successfully.`
      });
    }
  };

  const handleRejectBlog = (blogId, reason) => {
    const blog = pendingBlogs.find(b => b.id === blogId);
    if (blog) {
      setPendingBlogs(prev => prev.filter(b => b.id !== blogId));
      
      toast({
        title: "Blog Rejected",
        description: `"${blog.title}" has been rejected. ${reason || ''}`,
        variant: "destructive"
      });
    }
  };

  const handleApproveReview = (reviewId) => {
    const review = pendingReviews.find(r => r.id === reviewId);
    if (review) {
      setPendingReviews(prev => prev.filter(r => r.id !== reviewId));
      setApprovedReviews(prev => [...prev, {
        ...review,
        publishedAt: new Date().toISOString().split('T')[0],
        helpfulVotes: 0
      }]);
      
      toast({
        title: "Review Approved",
        description: "Review has been published successfully."
      });
    }
  };

  const handleRejectReview = (reviewId) => {
    const review = pendingReviews.find(r => r.id === reviewId);
    if (review) {
      setPendingReviews(prev => prev.filter(r => r.id !== reviewId));
      
      toast({
        title: "Review Rejected",
        description: "Review has been rejected.",
        variant: "destructive"
      });
    }
  };

  const BlogCard = ({ blog, isPending = true }) => (
    <Card className="mb-4">
      <CardContent className="p-6">
        <div className="flex gap-4">
          {blog.image && (
            <img
              src={blog.image}
              alt={blog.title}
              className="w-24 h-24 object-cover rounded-lg"
            />
          )}
          <div className="flex-1">
            <div className="flex justify-between items-start mb-2">
              <div>
                <h3 className="text-lg font-semibold mb-1">{blog.title}</h3>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <User className="w-4 h-4" />
                  <span>{blog.author}</span>
                  <span>({blog.email})</span>
                </div>
              </div>
              <Badge variant={isPending ? "secondary" : "default"}>
                {isPending ? "Pending" : "Published"}
              </Badge>
            </div>
            
            <div className="flex items-center gap-4 text-sm text-gray-600 mb-2">
              <Badge variant="outline">{blog.category}</Badge>
              <div className="flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                <span>{isPending ? blog.submittedAt : blog.publishedAt}</span>
              </div>
              {!isPending && (
                <>
                  <span>Views: {blog.views}</span>
                  <span>Likes: {blog.likes}</span>
                </>
              )}
            </div>
            
            <p className="text-gray-700 mb-4 line-clamp-2">{blog.content}</p>
            
            {isPending ? (
              <div className="flex gap-2">
                <Button
                  onClick={() => handleApproveBlog(blog.id)}
                  className="flex items-center gap-2"
                >
                  <CheckCircle className="w-4 h-4" />
                  Approve
                </Button>
                <Button
                  variant="destructive"
                  onClick={() => handleRejectBlog(blog.id, "Content quality issues")}
                  className="flex items-center gap-2"
                >
                  <XCircle className="w-4 h-4" />
                  Reject
                </Button>
                <Button variant="outline" className="flex items-center gap-2">
                  <Eye className="w-4 h-4" />
                  Preview
                </Button>
              </div>
            ) : (
              <div className="flex gap-2">
                <Button variant="outline" className="flex items-center gap-2">
                  <Eye className="w-4 h-4" />
                  View Live
                </Button>
                <Button variant="outline" className="flex items-center gap-2">
                  <Edit className="w-4 h-4" />
                  Edit
                </Button>
                <Button variant="destructive" className="flex items-center gap-2">
                  <Trash2 className="w-4 h-4" />
                  Remove
                </Button>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );

  const ReviewCard = ({ review, isPending = true }) => (
    <Card className="mb-4">
      <CardContent className="p-6">
        <div className="flex justify-between items-start mb-2">
          <div>
            <h3 className="text-lg font-semibold mb-1">{review.productName}</h3>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <User className="w-4 h-4" />
              <span>{review.reviewer}</span>
              <span>({review.email})</span>
            </div>
          </div>
          <Badge variant={isPending ? "secondary" : "default"}>
            {isPending ? "Pending" : "Published"}
          </Badge>
        </div>
        
        <div className="flex items-center gap-4 text-sm text-gray-600 mb-2">
          <div className="flex items-center gap-1">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-4 h-4 ${
                  i < review.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
                }`}
              />
            ))}
            <span className="ml-1">{review.rating}/5</span>
          </div>
          <div className="flex items-center gap-1">
            <Calendar className="w-4 h-4" />
            <span>{isPending ? review.submittedAt : review.publishedAt}</span>
          </div>
          {!isPending && (
            <span>Helpful: {review.helpfulVotes}</span>
          )}
        </div>
        
        <h4 className="font-medium mb-1">{review.title}</h4>
        <p className="text-gray-700 mb-4 line-clamp-2">{review.content}</p>
        
        {isPending ? (
          <div className="flex gap-2">
            <Button
              onClick={() => handleApproveReview(review.id)}
              className="flex items-center gap-2"
            >
              <CheckCircle className="w-4 h-4" />
              Approve
            </Button>
            <Button
              variant="destructive"
              onClick={() => handleRejectReview(review.id)}
              className="flex items-center gap-2"
            >
              <XCircle className="w-4 h-4" />
              Reject
            </Button>
          </div>
        ) : (
          <div className="flex gap-2">
            <Button variant="outline" className="flex items-center gap-2">
              <Eye className="w-4 h-4" />
              View
            </Button>
            <Button variant="destructive" className="flex items-center gap-2">
              <Trash2 className="w-4 h-4" />
              Remove
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );

  return (
    <div className="p-6">
      <div className="flex items-center gap-2 mb-6">
        <AlertCircle className="w-6 h-6" />
        <h1 className="text-2xl font-bold">Content Moderation</h1>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="blogs" className="flex items-center gap-2">
            <FileText className="w-4 h-4" />
            Pending Blogs ({pendingBlogs.length})
          </TabsTrigger>
          <TabsTrigger value="approved-blogs" className="flex items-center gap-2">
            <CheckCircle className="w-4 h-4" />
            Approved Blogs ({approvedBlogs.length})
          </TabsTrigger>
          <TabsTrigger value="reviews" className="flex items-center gap-2">
            <MessageSquare className="w-4 h-4" />
            Pending Reviews ({pendingReviews.length})
          </TabsTrigger>
          <TabsTrigger value="approved-reviews" className="flex items-center gap-2">
            <Star className="w-4 h-4" />
            Approved Reviews ({approvedReviews.length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="blogs" className="mt-6">
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Pending Blog Submissions</h2>
            {pendingBlogs.length === 0 ? (
              <Card>
                <CardContent className="p-8 text-center text-gray-500">
                  <FileText className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                  <p>No pending blog submissions</p>
                </CardContent>
              </Card>
            ) : (
              pendingBlogs.map(blog => (
                <BlogCard key={blog.id} blog={blog} isPending={true} />
              ))
            )}
          </div>
        </TabsContent>

        <TabsContent value="approved-blogs" className="mt-6">
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Published Blogs</h2>
            {approvedBlogs.length === 0 ? (
              <Card>
                <CardContent className="p-8 text-center text-gray-500">
                  <FileText className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                  <p>No published blogs yet</p>
                </CardContent>
              </Card>
            ) : (
              approvedBlogs.map(blog => (
                <BlogCard key={blog.id} blog={blog} isPending={false} />
              ))
            )}
          </div>
        </TabsContent>

        <TabsContent value="reviews" className="mt-6">
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Pending Review Submissions</h2>
            {pendingReviews.length === 0 ? (
              <Card>
                <CardContent className="p-8 text-center text-gray-500">
                  <MessageSquare className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                  <p>No pending review submissions</p>
                </CardContent>
              </Card>
            ) : (
              pendingReviews.map(review => (
                <ReviewCard key={review.id} review={review} isPending={true} />
              ))
            )}
          </div>
        </TabsContent>

        <TabsContent value="approved-reviews" className="mt-6">
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Published Reviews</h2>
            {approvedReviews.length === 0 ? (
              <Card>
                <CardContent className="p-8 text-center text-gray-500">
                  <Star className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                  <p>No published reviews yet</p>
                </CardContent>
              </Card>
            ) : (
              approvedReviews.map(review => (
                <ReviewCard key={review.id} review={review} isPending={false} />
              ))
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}

export default ContentModeration;
