const mongoose = require("mongoose");

const BlogSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    author: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    readTime: {
      type: String,
      default: "5 min read",
    },
    date: {
      type: String,
      default: () => new Date().toLocaleString('en-US', { 
        month: 'long', 
        day: 'numeric', 
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      }),
    },
    tags: [String],
    keywords: [String],
    likes: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Blog", BlogSchema);
