import axios from "axios";

const SERVER_URL = import.meta.env.VITE_SERVER_URL;
axios.defaults.withCredentials = true;
export const axiosInstance = axios.create({
  baseURL: SERVER_URL,
  // baseURL: "/api",
  timeout: 10000,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});
