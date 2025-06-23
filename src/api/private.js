import axios from "axios";

const privateAxios = axios.create({
  baseURL: "https://orbix.fly.dev/api",
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
