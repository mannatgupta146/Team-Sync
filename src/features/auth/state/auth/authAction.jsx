import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInstance } from "../../../../config/axiosInstance";

export const loginEmployee = createAsyncThunk("auth/login", async({credentials, thunkApi}) => {
    try {
        const res = await axiosInstance.post("/auth/login", credentials)
        return res.data.data
    } catch (error) {
        return thunkApi.rejectWithValue(error)
    }
})