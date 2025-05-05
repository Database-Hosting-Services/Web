import axios from "axios";

const publicAxios = axios.create({
  baseURL: "https://api-production-67e2.up.railway.app/api",
  headers: {
    "Content-Type": "application/json",
  },
});

publicAxios.interceptors.request.use(
  (request) => {
    return request;
  },
  (error) => {
    console.error("Request error:", error);
    return Promise.reject(error);
  },
);

export default publicAxios;
