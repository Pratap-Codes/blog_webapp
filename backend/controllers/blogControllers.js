import { Blog } from "../models/blogModel.js";
import { Comment } from "../models/commentModel.js";
import cloudinary from "../utils/cloudinary.js";
import getDataUri from "../utils/dataUri.js";
import jwt from "jsonwebtoken";


export const createBlog = async (req, res) => {
  try {
    const { title, category } = req.body;
    if (!title || !category) {
      return res.status(400).json({
        message: "Blog title and category is required",
      });
    }

    const blog = await Blog.create({
      title,
      category,
      author: req.id,
    });

    return res.status(201).json({
      success: true,
      blog,
      message: "Blog created successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Failed to create blog",
    });
  }
};

export const updateBlog = async (req, res) => {
  try {
    const blogId = req.params.blogId;
    const { title, category, subtitle, description } = req.body;
    const file = req.file;

    let blog = await Blog.findById(blogId);
    if (!blog) {
      return res.status(404).json({
        message: "Blog not found",
      });
    }
    let thumbnail;
    if (file) {
      const fileUri = getDataUri(file);
      thumbnail = await cloudinary.uploader.upload(fileUri);
    }
    const updateData = {
      title,
      subtitle,
      description,
      category,
      author: req.id,
      ...(thumbnail && { thumbnail: thumbnail.secure_url }),
    };
    blog = await Blog.findByIdAndUpdate(blogId, updateData, {
      returnDocument: "after",
    });
    res.status(200).json({
      success: true,
      message: "Blog update successfully",
      blog,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Failed to update blog",
    });
  }
};
export const getSingleBlog = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.blogId).populate({
      path: "author",
      select: "firstName lastName photoUrl",
    });

    if (!blog) {
      return res.status(404).json({
        success: false,
        message: "Blog not found",
      });
    }

    const token = req.cookies.token || req.headers.authorization?.split(" ")[1];
    let userId = null;

    if (token) {
      try {
        const decoded = jwt.verify(token, process.env.SECRET_KEY);
        userId = decoded.userId;
      } catch (error) {
        userId = null;
      }
    }

    const isOwner = userId && blog.author?._id?.toString() === userId;

    if (!blog.isPublished && !isOwner) {
      return res.status(404).json({
        success: false,
        message: "Blog not found",
      });
    }

    res.status(200).json({
      success: true,
      blog,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
export const getOwnBlog = async (req, res) => {
  try {
    const userId = req.id;
    if (!userId) {
      return res.status(401).json({
        message: "UserID is required",
      });
    }
    const blogs = await Blog.find({ author: userId }).populate({
      path: "author",
      select: "firstName lastName photoUrl",
    });
    if (!blogs || blogs.length === 0) {
      return res.status(404).json({ message: "No blog found", success: false });
    }
    return res.status(200).json({ blogs, success: true });
  } catch (error) {
    console.log(error);
    return res.status(401).json({
      message: "Error fetching blogs",
      error: error.message,
    });
  }
};
export const deleteBlog = async (req, res) => {
  try {
    const blogId = req.params.id;
    const authorId = req.id;
    const blog = await Blog.findById(blogId);
    if (!blog) {
      return res.status(404).json({
        success: false,
        message: "Blog not found",
      });
    }
    if (blog.author.toString() != authorId) {
      return res.status(403).json({
        success: false,
        message: "Unauthorized to delete the blog",
      });
    }
    await Blog.findByIdAndDelete(blogId);
    return res.status(200).json({
      success: true,
      message: "Blog delete successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Error deleting blogs",
      error: error.message,
    });
  }
};

export const getPublishedBlog = async (_, res) => {
  try {
    const blogs = await Blog.find({ isPublished: true })
      .populate({
        path: "author",
        select: "firstName lastName photoUrl",
      })
      .sort({ createdAt: -1 });
    return res.status(200).json({ success: true, blogs });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: "Error fetching blogs", error: error.message });
  }
};

export const publishedToggle = async (req, res) => {
  try {
    const { blogId } = req.params;
    const { publish } = req.query; //Query will be true or false;
    const blog = await Blog.findById(blogId);
    if (!blog) {
      return res.status(404).json({
        message: "Blog not found",
        success: false,
      });
    }
    //Publish status based on query parameter
    blog.isPublished = publish === "true";
    await blog.save();

    const statusMessage = blog.isPublished ? "Published" : "Unpublished";
    return res.status(200).json({
      success: true,
      message: `Blog is ${statusMessage}`,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Failed to update status",
      success: false,
    });
  }
};

export const likeBlog = async (req, res) => {
  try {
    const blogId = req.params.id;
    const likeUserId = req.id;
    const blog = await Blog.findByIdAndUpdate(
      blogId,
      { $addToSet: { likes: likeUserId } },
      { new: true },
    );

    if (!blog) {
      return res.status(404).json({
        message: "Blog not found",
        success: false,
      });
    }
    return res.status(200).json({
      message: "Blog liked",
      success: true,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Failed to like blog",
      success: false,
    });
  }
};
export const dislikeBlog = async (req, res) => {
  try {
    const blogId = req.params.id;
    const likeUserId = req.id;
    const blog = await Blog.findByIdAndUpdate(
      blogId,
      { $pull: { likes: likeUserId } },
      { new: true },
    );

    if (!blog) {
      return res.status(404).json({
        message: "Blog not found",
        success: false,
      });
    }
    return res.status(200).json({
      message: "Blog dislike",
      success: true,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Failed to dislike blog",
      success: false,
    });
  }
};
export const totalBlogLike = async (req, res) => {
  try {
    const userId = req.id;
    const myBlogs = await Blog.find({ author: userId }).select("likes");
    const totalLikes = myBlogs.reduce((acc, blog) => acc + (blog.likes?.length || 0), 0);
    return res.status(200).json({
      success: true,
      totalBlogs: myBlogs.length,
      totalLikes,
    })
  } catch (error) {
    return res.status(500).json({
      message: "Failed to fetch total blog likes",
      success: false,
    });
  }
};
