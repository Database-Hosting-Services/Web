import axios from "axios";

const privateAxios = axios.create({
  baseURL: "https://api-production-67e2.up.railway.app/api",
  headers: {
    "Content-Type": "application/json",
  },
});

privateAxios.interceptors.request.use(
  (request) => {
    return request;
  },
  (error) => {
    console.error("Request error:", error);
    return Promise.reject(error);
  },
);

export default privateAxios;
