import axios from "axios";

export const axiosInstance = axios.create({
    baseURL: "/api",
    withCredentials: true
})

axiosInstance.interceptors.response.use(
    (response)=> response,
    async (error)=> {
        const originalReq = error.config

        if(error.response.status === 401 && !originalReq._retry) {
            originalReq._retry = true

            try {
                await axiosInstance.get("/auth/get-accessToken")
                return axiosInstance(originalReq)
                
            } catch (error) {
                window.location.href = "/auth/login"
                return Promise.reject(error)
            }
        }
    }
)