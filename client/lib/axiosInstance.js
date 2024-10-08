"use server";

import axios from "axios";

const BASE_API_URL = process.env.API_URL;

const axiosInstance = axios.create({
  baseURL: BASE_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true, // Important for sending cookies
});

export default axiosInstance;
