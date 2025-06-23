import axios from "axios";

const publicAxios = axios.create({
  baseURL: "https://orbix.fly.dev/api",
  headers: {
    "Content-Type": "application/json",
  },
});

export default publicAxios;
