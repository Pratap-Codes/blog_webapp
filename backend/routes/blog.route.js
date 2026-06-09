import express from "express"
import { isAuthenticated } from "../middleware/isAuthenticated.js"
import { singleUpload } from "../middleware/multer.js"
import { createBlog, getSingleBlog, updateBlog } from "../controllers/blogControllers.js"

const router = express.Router()

router.post("/", isAuthenticated, createBlog)
router.put("/:blogId", isAuthenticated, singleUpload, updateBlog)
router.get("/:blogId", getSingleBlog);

export default router;