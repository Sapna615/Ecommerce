const Blog = require("../../models/Blog");

const createBlog = async (req, res) => {
  try {
    const { userId, title, description, content, image, author, category, tags, keywords } = req.body;

    const newBlog = new Blog({
      userId,
      title,
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
    const blog = await Blog.findById(id);

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

module.exports = { createBlog, fetchAllBlogs, getBlogDetails };
