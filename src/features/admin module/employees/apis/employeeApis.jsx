import { axiosInstance } from "../../../../config/axiosInstance";

export const getAllEmployees = async() => {
    try {
        const res = await axiosInstance.get("/employee?limit=200")
        return res.data.data
    } catch (error) {
        console.log("Error in all employee ", error)
    }
}

getAllEmployees()