import axiosInstance from "./axiosInstance";

export const loginUser = (Credentials) =>{
    return axiosInstance.post("user/login", Credentials)
}
export const registerUser = (Credentials) =>{
    return axiosInstance.post("user/login", Credentials)
}
export const logoutUser = () =>{
    return axiosInstance.post("user/logout")
}