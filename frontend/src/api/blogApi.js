import axiosInstance from "./axiosInstance";

export const createBlog = (data) =>{
    return axiosInstance.get("/blog/", data)
}
export const getAllBlogs = () =>{
    return axiosInstance.get("/blog/all")
}
export const getOwnBlogs = () =>{
    return axiosInstance.get("/blog/get-own-blogs")
}
export const getBlogById = (blogId) =>{
    return axiosInstance.get(`/blog/${blogId}`)
}
export const deleteBlogById = (id) =>{
    return axiosInstance.get(`/blog/delete/${id}`)
}