import { Blog } from "../models/blogModel.js";
import cloudinary from "../utils/cloudinary.js";
import getDataUri from "../utils/dataUri.js";

export const createBlog = async(req, res) => {
    try {
        const {title, category} = req.body;
        if(!title || !category){
            return res.status(400).json({
                message:"Blog title and category is required"
            })
        }

        const blog = await Blog.create({
            title,
            category,
            author:req.id
        })

        return res.status(201).json({
            success:true,
            blog,
            message:"Blog created successfully"
        })
    } catch (error) {
        console.log(error)
         return res.status(500).json({
            message:"Failed to create blog"
        })
    }
}

export const updateBlog = async(req, res) => {
        try {
            const blogId = req.params.blogId
            const {title, category, subtitle, description} = req.body;
            const file = req.file;

            let blog = await Blog.findById(blogId);
            if(!blog){
                return res.status(404).json({
                    message:"Blog not found"
                })
            }
            let thumbnail;
            if(file){
                const fileUri = getDataUri(file)
                thumbnail = await cloudinary.uploader.upload(fileUri)
            }
            const updateData = {title, subtitle, description, category, author:req.id,  ...(thumbnail && { thumbnail: thumbnail.secure_url })}
            blog = await  Blog.findByIdAndUpdate(blogId, updateData, {returnDocument:"after"})
            res.status(200).json({
                success:true,
                message:"Blog update successfully",
                blog,
            })
        } catch (error) {
            console.log(error)
            return res.status(500).json({
            success:false,
            message:"Failed to update blog"
        })
        }
}