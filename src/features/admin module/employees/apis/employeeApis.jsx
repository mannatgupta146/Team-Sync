import { axiosInstance } from "../../../../config/axiosInstance";

export const getAllEmployees = async() => {
    try {
        const res = await axiosInstance.get("/employee?limit=200")
        return res.data.data
    } catch (error) {
        console.log("Error in all employee ", error)
        throw error
    }
}

export const createEmployee = async(employeeData) => {
    const payload = {
        name: employeeData.name,
        email: employeeData.email,
        password: employeeData.password,
        role: employeeData.role,
        department: employeeData.department,
        status: employeeData.status
    };

    // Use native fetch with credentials: 'omit' to prevent the browser
    // from processing Set-Cookie response headers and overwriting the admin's session.
    const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        credentials: "omit",
        body: JSON.stringify(payload)
    });

    if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        const errorMessage = errorData.message || `Error: ${response.status} ${response.statusText}`;
        throw new Error(errorMessage);
    }

    return response.json();
}