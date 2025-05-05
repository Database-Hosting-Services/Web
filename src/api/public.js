import axios from "axios";

const publicAxios = axios.create({
  baseURL: "https://api-production-67e2.up.railway.app/api",
  headers: {
    "Content-Type": "application/json",
  },
});

export default publicAxios;
