const Blog = require("../../models/Blog");

const createBlog = async (req, res) => {
  try {
    const { userId, title, description, content, image, author, category, tags, keywords } = req.body;

    let baseSlug = (title || "blog")
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)+/g, "");
      
    if (!baseSlug) baseSlug = "blog";

    let uniqueSlug = baseSlug;
    let counter = 1;
    while (await Blog.findOne({ slug: uniqueSlug })) {
      uniqueSlug = `${baseSlug}-${counter}`;
      counter++;
    }

    const newBlog = new Blog({
      userId,
      title,
      slug: uniqueSlug,
      description,
      content,
      image,
      author,
      category,
      tags,
      keywords,
    });

    await newBlog.save();

    res.status(201).json({
      success: true,
      message: "Blog created successfully",
      data: newBlog,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Error occurred while creating blog",
    });
  }
};

const fetchAllBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find({}).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      data: blogs,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Error occurred while fetching blogs",
    });
  }
};

const getBlogDetails = async (req, res) => {
  try {
    const { id } = req.params;
    const mongoose = require("mongoose");
    const isValidObjectId = mongoose.Types.ObjectId.isValid(id);

    let blog;
    if (isValidObjectId) {
      blog = await Blog.findById(id);
    }
    if (!blog) {
      blog = await Blog.findOne({ slug: id });
    }

    if (!blog) {
      return res.status(404).json({
        success: false,
        message: "Blog not found",
      });
    }

    res.status(200).json({
      success: true,
      data: blog,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Error occurred while fetching blog details",
    });
  }
};

const likeBlog = async (req, res) => {
  try {
    const { id } = req.params;
    const { userId } = req.body;
    const mongoose = require("mongoose");

    const isValidObjectId = mongoose.Types.ObjectId.isValid(id);
    let blog;
    if (isValidObjectId) {
      blog = await Blog.findById(id);
    }
    if (!blog) {
      blog = await Blog.findOne({ slug: id });
    }
    if (!blog) {
      return res.status(404).json({ success: false, message: "Blog not found" });
    }

    // Track likedBy as an array of userIds (or session IDs for guests)
    if (!blog.likedBy) blog.likedBy = [];

    const alreadyLiked = blog.likedBy.includes(userId);

    if (alreadyLiked) {
      // Unlike
      blog.likedBy = blog.likedBy.filter((uid) => uid !== userId);
      blog.likes = Math.max(0, (blog.likes || 1) - 1);
    } else {
      // Like
      blog.likedBy.push(userId);
      blog.likes = (blog.likes || 0) + 1;
    }

    await blog.save();

    res.status(200).json({
      success: true,
      data: {
        likes: blog.likes,
        liked: !alreadyLiked,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Error updating like" });
  }
};

const updateBlog = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, content, image, category, tags, keywords } = req.body;

    const mongoose = require("mongoose");
    const isValidObjectId = mongoose.Types.ObjectId.isValid(id);

    let blog;
    if (isValidObjectId) {
      blog = await Blog.findById(id);
    }
    if (!blog) {
      blog = await Blog.findOne({ slug: id });
    }

    if (!blog) {
      return res.status(404).json({ success: false, message: "Blog not found" });
    }

    blog.title = title || blog.title;
    blog.description = description || blog.description;
    blog.content = content || blog.content;
    blog.image = image || blog.image;
    blog.category = category || blog.category;
    blog.tags = tags || blog.tags;
    blog.keywords = keywords || blog.keywords;

    await blog.save();

    res.status(200).json({
      success: true,
      message: "Blog updated successfully",
      data: blog,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Error occurred while updating blog",
    });
  }
};

module.exports = { createBlog, fetchAllBlogs, getBlogDetails, likeBlog, updateBlog };
