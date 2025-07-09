import axios from "axios";
import { getToken } from "./";

const privateAxios = axios.create({
  baseURL: "https://orbix.fly.dev/api",
  headers: {
    "Content-Type": "application/json",
  },
});

privateAxios.interceptors.request.use(
  (request) => {
    request.headers.Authorization = `Bearer ${getToken()}`;
    return request;
  },
  (error) => {
    console.error("Request error:", error);
    return Promise.reject(error);
  },
);

export default privateAxios;
