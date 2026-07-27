import axiosInstance from "./axiosInstance";

export const createBlog = (data) =>{
    return axiosInstance.post("/blog/", data)
}
export const getPublishedBlog = () =>{
    return axiosInstance.get("/blog/get-published-blogs")
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