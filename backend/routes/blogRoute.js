import express from "express"
import { isAuthenticated } from "../middleware/isAuthenticated.js"
import { singleUpload } from "../middleware/multer.js"
import { createBlog, deleteBlog, dislikeBlog, getOwnBlog, getPublishedBlog, getSingleBlog, likeBlog, publishedToggle, totalBlogLike, updateBlog } from "../controllers/blogControllers.js"

const router = express.Router()

router.post("/", isAuthenticated, createBlog)
router.get("/get-published-blogs", getPublishedBlog)
router.put("/:blogId", isAuthenticated, singleUpload, updateBlog)
router.get("/get-own-blogs", isAuthenticated, getOwnBlog)
router.delete("/delete/:id", isAuthenticated, deleteBlog)
router.get("/:blogId", getSingleBlog);
router.get("/:id/like", isAuthenticated, likeBlog)
router.get("/:id/dislike", isAuthenticated, dislikeBlog)
router.get("/my-blogs/likes", isAuthenticated, totalBlogLike)
router.patch("/:blogId/", isAuthenticated, publishedToggle)

export default router;