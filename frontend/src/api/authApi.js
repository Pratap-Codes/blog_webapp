import axiosInstance from "./axiosInstance";

export const loginUser = (Credentials) =>{
    return axiosInstance.post("user/login", Credentials)
}
export const registerUser = (Credentials) =>{
    return axiosInstance.post("user/register", Credentials)
}
export const logoutUser = () =>{
    return axiosInstance.post("user/logout")
}
export const getAllUsers = () =>{
    return axiosInstance.get("user/all-users")
}