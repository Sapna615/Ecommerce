import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { ArrowLeft, Upload, X, Save, Send } from "lucide-react";

function WriteBlog() {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [blogData, setBlogData] = useState({
    title: "",
    content: "",
    category: "",
    tags: [],
    image: null,
    imagePreview: ""
  });
  
  const [currentTag, setCurrentTag] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const categories = [
    "T-Shirt Styles",
    "T-Shirt Materials", 
    "T-Shirt Trends",
    "T-Shirt Care",
    "Fashion Tips",
    "Styling Ideas"
  ];

  const handleInputChange = (field, value) => {
    setBlogData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast({
          title: "File too large",
          description: "Please upload an image smaller than 5MB",
          variant: "destructive"
        });
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        setBlogData(prev => ({
          ...prev,
          image: file,
          imagePreview: reader.result
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setBlogData(prev => ({
      ...prev,
      image: null,
      imagePreview: ""
    }));
  };

  const addTag = () => {
    if (currentTag.trim() && !blogData.tags.includes(currentTag.trim())) {
      setBlogData(prev => ({
        ...prev,
        tags: [...prev.tags, currentTag.trim()]
      }));
      setCurrentTag("");
    }
  };

  const removeTag = (tagToRemove) => {
    setBlogData(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }));
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addTag();
    }
  };

  const saveDraft = async () => {
    if (!blogData.title.trim()) {
      toast({
        title: "Title Required",
        description: "Please add a title before saving.",
        variant: "destructive"
      });
      return;
    }

    setIsSaving(true);
    
    try {
      // Simulate saving draft
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: "Draft Saved",
        description: "Your blog draft has been saved successfully."
      });
    } catch (error) {
      toast({
        title: "Save Failed",
        description: "Failed to save draft. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSaving(false);
    }
  };

  const submitBlog = async () => {
    // Validation
    if (!blogData.title.trim()) {
      toast({
        title: "Title Required",
        description: "Please add a blog title.",
        variant: "destructive"
      });
      return;
    }

    if (!blogData.content.trim()) {
      toast({
        title: "Content Required", 
        description: "Please add blog content.",
        variant: "destructive"
      });
      return;
    }

    if (!blogData.category) {
      toast({
        title: "Category Required",
        description: "Please select a category.",
        variant: "destructive"
      });
      return;
    }

    if (!blogData.image) {
      toast({
        title: "Image Required",
        description: "Please upload a blog image.",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);

    try {
      // Simulate blog submission
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      toast({
        title: "Blog Submitted!",
        description: "Your blog has been submitted for review. We'll notify you once it's approved.",
      });
      
      // Navigate to blog page after successful submission
      setTimeout(() => {
        navigate('/shop/blog');
      }, 2000);
      
    } catch (error) {
      toast({
        title: "Submission Failed",
        description: "Failed to submit blog. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Button
            variant="outline"
            onClick={() => navigate('/shop/blog')}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Blog
          </Button>
          <h1 className="text-3xl font-bold">Write a Blog Post</h1>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Share Your Fashion Knowledge</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Blog Title */}
            <div className="space-y-2">
              <Label htmlFor="title">Blog Title *</Label>
              <Input
                id="title"
                placeholder="Enter an engaging title for your blog post"
                value={blogData.title}
                onChange={(e) => handleInputChange('title', e.target.value)}
                className="text-lg"
              />
            </div>

            {/* Category Selection */}
            <div className="space-y-2">
              <Label>Category *</Label>
              <Select value={blogData.category} onValueChange={(value) => handleInputChange('category', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Blog Image */}
            <div className="space-y-2">
              <Label>Blog Image *</Label>
              {blogData.imagePreview ? (
                <div className="relative">
                  <img
                    src={blogData.imagePreview}
                    alt="Blog preview"
                    className="w-full h-64 object-cover rounded-lg"
                  />
                  <Button
                    variant="destructive"
                    size="sm"
                    className="absolute top-2 right-2"
                    onClick={removeImage}
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              ) : (
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                  <Upload className="w-12 h-12 mx-auto mb-4 text-gray-400" />
                  <p className="text-gray-600 mb-2">Click to upload blog image</p>
                  <p className="text-sm text-gray-500 mb-4">PNG, JPG up to 5MB</p>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                    id="image-upload"
                  />
                  <Button asChild variant="outline">
                    <label htmlFor="image-upload" className="cursor-pointer">
                      Choose Image
                    </label>
                  </Button>
                </div>
              )}
            </div>

            {/* Blog Content */}
            <div className="space-y-2">
              <Label htmlFor="content">Blog Content *</Label>
              <Textarea
                id="content"
                placeholder="Write your blog content here. Share your fashion tips, trends, and ideas..."
                value={blogData.content}
                onChange={(e) => handleInputChange('content', e.target.value)}
                className="min-h-[300px]"
              />
              <p className="text-sm text-gray-500">
                {blogData.content.length} characters
              </p>
            </div>

            {/* Tags */}
            <div className="space-y-2">
              <Label>Tags</Label>
              <div className="flex gap-2">
                <Input
                  placeholder="Add a tag and press Enter"
                  value={currentTag}
                  onChange={(e) => setCurrentTag(e.target.value)}
                  onKeyPress={handleKeyPress}
                  className="flex-1"
                />
                <Button onClick={addTag} variant="outline">
                  Add Tag
                </Button>
              </div>
              {blogData.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-2">
                  {blogData.tags.map((tag, index) => (
                    <Badge key={index} variant="secondary" className="flex items-center gap-1">
                      {tag}
                      <X
                        className="w-3 h-3 cursor-pointer"
                        onClick={() => removeTag(tag)}
                      />
                    </Badge>
                  ))}
                </div>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4 pt-6 border-t">
              <Button
                variant="outline"
                onClick={saveDraft}
                disabled={isSaving}
                className="flex items-center gap-2"
              >
                <Save className="w-4 h-4" />
                {isSaving ? "Saving..." : "Save Draft"}
              </Button>
              <Button
                onClick={submitBlog}
                disabled={isSubmitting}
                className="flex items-center gap-2"
              >
                <Send className="w-4 h-4" />
                {isSubmitting ? "Submitting..." : "Submit for Review"}
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Guidelines */}
        <Card className="mt-6">
          <CardHeader>
            <CardTitle className="text-lg">Blog Guidelines</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>Write original content that provides value to our readers</li>
              <li>Keep content focused on t-shirts, hoodies, and fashion</li>
              <li>Use clear headings and proper formatting</li>
              <li>Include relevant images to enhance your content</li>
              <li>All submissions are reviewed before publication</li>
              <li>Be respectful and constructive in your writing</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default WriteBlog;
