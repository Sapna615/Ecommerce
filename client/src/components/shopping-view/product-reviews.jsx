import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Star, ThumbsUp, ThumbsDown, Trash2, Edit, User } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";

function ProductReviews({ productId, reviews = [], onAddReview, onEditReview, onDeleteReview, currentUserId }) {
  const { toast } = useToast();
  const [newReview, setNewReview] = useState({
    rating: 5,
    title: "",
    content: "",
    images: []
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [editingReview, setEditingReview] = useState(null);

  const renderStars = (rating, interactive = false, onRatingChange = null) => {
    return (
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`w-5 h-5 ${
              star <= rating
                ? 'text-yellow-400 fill-current'
                : 'text-gray-300'
            } ${interactive ? 'cursor-pointer hover:text-yellow-400' : ''}`}
            onClick={() => interactive && onRatingChange && onRatingChange(star)}
          />
        ))}
      </div>
    );
  };

  const handleSubmitReview = async () => {
    if (!newReview.title.trim() || !newReview.content.trim()) {
      toast({
        title: "Missing Information",
        description: "Please provide both title and review content.",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);
    
    try {
      await onAddReview({
        ...newReview,
        productId,
        userId: currentUserId
      });
      
      setNewReview({
        rating: 5,
        title: "",
        content: "",
        images: []
      });
      
      toast({
        title: "Review Submitted!",
        description: "Your review has been added successfully."
      });
    } catch (error) {
      toast({
        title: "Submission Failed",
        description: "Failed to submit review. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEditReview = (review) => {
    setEditingReview(review);
  };

  const handleUpdateReview = async () => {
    try {
      await onEditReview(editingReview);
      setEditingReview(null);
      toast({
        title: "Review Updated",
        description: "Your review has been updated successfully."
      });
    } catch (error) {
      toast({
        title: "Update Failed",
        description: "Failed to update review. Please try again.",
        variant: "destructive"
      });
    }
  };

  const handleDeleteReview = async (reviewId) => {
    if (window.confirm("Are you sure you want to delete this review?")) {
      try {
        await onDeleteReview(reviewId);
        toast({
          title: "Review Deleted",
          description: "Your review has been deleted successfully."
        });
      } catch (error) {
        toast({
          title: "Delete Failed",
          description: "Failed to delete review. Please try again.",
          variant: "destructive"
        });
      }
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="space-y-6">
      {/* Review Summary */}
      <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
        <div className="flex items-center gap-4">
          <div className="text-center">
            <div className="text-3xl font-bold">
              {reviews.length > 0 
                ? (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1)
                : "0.0"
              }
            </div>
            {renderStars(
              reviews.length > 0 
                ? Math.round(reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length)
                : 0
            )}
            <div className="text-sm text-gray-600">
              {reviews.length} {reviews.length === 1 ? 'Review' : 'Reviews'}
            </div>
          </div>
        </div>
        
        {/* Rating Distribution */}
        <div className="flex-1 max-w-md">
          {[5, 4, 3, 2, 1].map((rating) => {
            const count = reviews.filter(r => r.rating === rating).length;
            const percentage = reviews.length > 0 ? (count / reviews.length) * 100 : 0;
            return (
              <div key={rating} className="flex items-center gap-2 mb-1">
                <span className="text-sm w-3">{rating}</span>
                <Star className="w-4 h-4 text-yellow-400 fill-current" />
                <div className="flex-1 bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-yellow-400 h-2 rounded-full" 
                    style={{ width: `${percentage}%` }}
                  />
                </div>
                <span className="text-sm w-8 text-right">{count}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Add Review Form */}
      <Card>
        <CardHeader>
          <CardTitle>Write a Review</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label>Rating</Label>
            {renderStars(newReview.rating, true, (rating) => 
              setNewReview(prev => ({ ...prev, rating }))
            )}
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="review-title">Review Title</Label>
            <Input
              id="review-title"
              placeholder="Summarize your experience"
              value={newReview.title}
              onChange={(e) => setNewReview(prev => ({ ...prev, title: e.target.value }))}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="review-content">Review</Label>
            <Textarea
              id="review-content"
              placeholder="Tell us about your experience with this product"
              value={newReview.content}
              onChange={(e) => setNewReview(prev => ({ ...prev, content: e.target.value }))}
              className="min-h-[100px]"
            />
          </div>
          
          <Button 
            onClick={handleSubmitReview}
            disabled={isSubmitting}
            className="w-full"
          >
            {isSubmitting ? "Submitting..." : "Submit Review"}
          </Button>
        </CardContent>
      </Card>

      {/* Reviews List */}
      <div className="space-y-4">
        {reviews.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <User className="w-12 h-12 mx-auto mb-4 text-gray-300" />
            <p>No reviews yet. Be the first to review this product!</p>
          </div>
        ) : (
          reviews.map((review) => (
            <Card key={review.id}>
              <CardContent className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                        <User className="w-5 h-5 text-gray-600" />
                      </div>
                      <div>
                        <div className="font-semibold">{review.userName || "Anonymous"}</div>
                        <div className="text-sm text-gray-500">{formatDate(review.createdAt)}</div>
                      </div>
                    </div>
                    
                    {renderStars(review.rating)}
                    
                    <h4 className="font-semibold mt-2 mb-1">{review.title}</h4>
                    <p className="text-gray-700">{review.content}</p>
                    
                    {review.images && review.images.length > 0 && (
                      <div className="flex gap-2 mt-3">
                        {review.images.map((image, index) => (
                          <img
                            key={index}
                            src={image}
                            alt={`Review image ${index + 1}`}
                            className="w-20 h-20 object-cover rounded"
                          />
                        ))}
                      </div>
                    )}
                  </div>
                  
                  {/* Review Actions */}
                  {review.userId === currentUserId && (
                    <div className="flex gap-2 ml-4">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleEditReview(review)}
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDeleteReview(review.id)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  )}
                </div>
                
                {/* Helpful Votes */}
                <div className="flex items-center gap-4 pt-4 border-t">
                  <span className="text-sm text-gray-600">Was this review helpful?</span>
                  <div className="flex gap-2">
                    <Button variant="ghost" size="sm" className="flex items-center gap-1">
                      <ThumbsUp className="w-4 h-4" />
                      <span className="text-sm">{review.helpfulVotes || 0}</span>
                    </Button>
                    <Button variant="ghost" size="sm" className="flex items-center gap-1">
                      <ThumbsDown className="w-4 h-4" />
                      <span className="text-sm">{review.notHelpfulVotes || 0}</span>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>

      {/* Edit Review Modal */}
      {editingReview && (
        <Card className="border-2 border-blue-200">
          <CardHeader>
            <CardTitle>Edit Your Review</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Rating</Label>
              {renderStars(editingReview.rating, true, (rating) => 
                setEditingReview(prev => ({ ...prev, rating }))
              )}
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="edit-title">Review Title</Label>
              <Input
                id="edit-title"
                value={editingReview.title}
                onChange={(e) => setEditingReview(prev => ({ ...prev, title: e.target.value }))}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="edit-content">Review</Label>
              <Textarea
                id="edit-content"
                value={editingReview.content}
                onChange={(e) => setEditingReview(prev => ({ ...prev, content: e.target.value }))}
                className="min-h-[100px]"
              />
            </div>
            
            <div className="flex gap-2">
              <Button onClick={handleUpdateReview}>Update Review</Button>
              <Button variant="outline" onClick={() => setEditingReview(null)}>
                Cancel
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

export default ProductReviews;
