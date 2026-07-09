import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInstance } from "../../../../config/axiosInstance";

export const registerEmployee = createAsyncThunk("auth/register", async (userData, thunkAPI) => {
    try {
        const { fullname, email, password, role } = userData;
        const payload = { name: fullname, email, password, role };
        const res = await axiosInstance.post("/auth/register", payload);
        return res.data.data;
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response?.data?.message || error.message);
    }
});

export const loginEmployee = createAsyncThunk("auth/login", async (credentials, thunkAPI) => {
    try {
        const res = await axiosInstance.post("/auth/login", credentials);
        return res.data.data;
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response?.data?.message || error.message);
    }
});

export const currentLoggedEmployee = createAsyncThunk("auth/me", async (_, thunkAPI) => {
    try {
        const res = await axiosInstance.get("/auth/me");
        return res.data.user;
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response?.data?.message || error.message);
    }
});