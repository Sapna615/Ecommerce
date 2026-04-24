import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { ArrowLeft, Upload, X, Save, Send } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { createNewBlog } from "@/store/shop/blog-slice";
import { api } from "@/api";

function WriteBlog() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { toast } = useToast();
  const { user } = useSelector((state) => state.auth);
  
  const [blogData, setBlogData] = useState({
    title: "",
    description: "",
    content: "",
    category: "Fashion Tips",
    tags: [],
    keywords: [],
    image: null,
    imagePreview: "",
    imageUrl: "",
    fileName: ""
  });
  
  const [currentTag, setCurrentTag] = useState("");
  const [currentKeyword, setCurrentKeyword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

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

  const handleImageUpload = async (e) => {
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

      // Immediate local preview
      setBlogData(prev => ({
        ...prev,
        imagePreview: URL.createObjectURL(file),
        fileName: file.name
      }));

      setIsUploading(true);
      const data = new FormData();
      data.append("my_file", file);

      try {
        const response = await api.post("/shop/blog/upload-image", data);
        if (response?.data?.success) {
          setBlogData(prev => ({
            ...prev,
            imageUrl: response.data.result.url,
            imagePreview: response.data.result.url
          }));
          toast({
            title: "Image Uploaded",
            description: "Your blog image has been uploaded successfully."
          });
        }
      } catch (error) {
        console.error("Upload Error Details:", error);
        const errorMessage = error.response?.data?.message || error.message || "Failed to upload image. Please try again.";
        toast({
          title: "Upload Failed",
          description: errorMessage,
          variant: "destructive"
        });
      } finally {
        setIsUploading(false);
      }
    }
  };

  const removeImage = () => {
    setBlogData(prev => ({
      ...prev,
      image: null,
      imagePreview: "",
      imageUrl: "",
      fileName: ""
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

  const submitBlog = async () => {
    // Validation
    if (!blogData.title.trim()) {
      toast({ title: "Title Required", variant: "destructive" });
      return;
    }
    if (!blogData.content.trim()) {
      toast({ title: "Content Required", variant: "destructive" });
      return;
    }
    if (!blogData.imageUrl) {
      toast({ title: "Image Required", variant: "destructive" });
      return;
    }

    setIsSubmitting(true);

    const finalBlogData = {
      userId: user.id,
      title: blogData.title,
      description: blogData.description || blogData.title,
      content: blogData.content,
      image: blogData.imageUrl,
      author: user.userName || "Sapna Rai",
      category: blogData.category,
      tags: blogData.tags,
      keywords: blogData.keywords,
    };

    dispatch(createNewBlog(finalBlogData)).then((data) => {
      if (data?.payload?.success) {
        toast({
          title: "Blog Published!",
          description: "Your blog post is now live.",
        });
        navigate('/shop/blog');
      } else {
        toast({
          title: "Error",
          description: "Failed to publish blog.",
          variant: "destructive",
        });
      }
      setIsSubmitting(false);
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-4xl">
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
            <div className="space-y-2">
              <Label htmlFor="title">Blog Title *</Label>
              <Input
                id="title"
                placeholder="Enter an engaging title"
                value={blogData.title}
                onChange={(e) => handleInputChange('title', e.target.value)}
                className="text-lg"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Short Description</Label>
              <Input
                id="description"
                placeholder="Brief summary of your post"
                value={blogData.description}
                onChange={(e) => handleInputChange('description', e.target.value)}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Category *</Label>
                <select 
                  value={blogData.category} 
                  onChange={(e) => handleInputChange('category', e.target.value)}
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                >
                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="space-y-2">
              <Label>Blog Image *</Label>
              {blogData.imagePreview ? (
                <div className="space-y-2">
                  <div className="relative">
                    <img
                      src={blogData.imagePreview}
                      alt="Blog preview"
                      className={`w-full h-64 object-cover rounded-lg transition-opacity duration-300 ${isUploading ? 'opacity-50' : 'opacity-100'}`}
                    />
                    {isUploading && (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full flex items-center gap-2 shadow-lg">
                          <div className="w-4 h-4 border-2 border-purple-600 border-t-transparent rounded-full animate-spin" />
                          <span className="text-sm font-bold text-purple-600">Uploading to cloud...</span>
                        </div>
                      </div>
                    )}
                    <Button
                      variant="destructive"
                      size="sm"
                      className="absolute top-2 right-2"
                      onClick={removeImage}
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                  {blogData.fileName && (
                    <div className="flex items-center justify-between">
                      <p className="text-xs text-gray-500 flex items-center gap-1">
                        <span className="font-bold">File:</span> {blogData.fileName}
                      </p>
                      {blogData.imageUrl && !isUploading && (
                        <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200 text-[10px] py-0 h-5">
                          Ready to publish
                        </Badge>
                      )}
                    </div>
                  )}
                </div>
              ) : (
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                  <Upload className="w-12 h-12 mx-auto mb-4 text-gray-400" />
                  <p className="text-gray-600 mb-2">{isUploading ? "Uploading..." : "Click to upload blog image"}</p>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                    id="image-upload"
                    disabled={isUploading}
                  />
                  <Button asChild variant="outline" disabled={isUploading}>
                    <label htmlFor="image-upload" className="cursor-pointer">
                      {isUploading ? "Uploading..." : "Choose Image"}
                    </label>
                  </Button>
                </div>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="content">Blog Content *</Label>
              <Textarea
                id="content"
                placeholder="Write your blog content here..."
                value={blogData.content}
                onChange={(e) => handleInputChange('content', e.target.value)}
                className="min-h-[300px]"
              />
            </div>

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

            <div className="space-y-2">
              <Label>SEO Keywords (for Google Search)</Label>
              <div className="flex gap-2">
                <Input
                  placeholder="Add a keyword and press Enter"
                  value={currentKeyword}
                  onChange={(e) => setCurrentKeyword(e.target.value)}
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      if (currentKeyword.trim() && !blogData.keywords.includes(currentKeyword.trim())) {
                        setBlogData(prev => ({
                          ...prev,
                          keywords: [...prev.keywords, currentKeyword.trim()]
                        }));
                        setCurrentKeyword("");
                      }
                    }
                  }}
                  className="flex-1"
                />
                <Button 
                  onClick={() => {
                    if (currentKeyword.trim() && !blogData.keywords.includes(currentKeyword.trim())) {
                      setBlogData(prev => ({
                        ...prev,
                        keywords: [...prev.keywords, currentKeyword.trim()]
                      }));
                      setCurrentKeyword("");
                    }
                  }} 
                  variant="outline"
                >
                  Add
                </Button>
              </div>
              {blogData.keywords.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-2">
                  {blogData.keywords.map((kw, index) => (
                    <Badge key={index} variant="outline" className="flex items-center gap-1 bg-green-50 border-green-200 text-green-700">
                      {kw}
                      <X
                        className="w-3 h-3 cursor-pointer"
                        onClick={() => setBlogData(prev => ({
                          ...prev,
                          keywords: prev.keywords.filter(k => k !== kw)
                        }))}
                      />
                    </Badge>
                  ))}
                </div>
              )}
            </div>

            <div className="flex gap-4 pt-6 border-t">
              <Button
                onClick={submitBlog}
                disabled={isSubmitting || isUploading}
                className="flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white w-full py-6 text-lg"
              >
                <Send className="w-5 h-5" />
                {isSubmitting ? "Publishing..." : "Publish Blog Post"}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default WriteBlog;
