import axios from "axios";

const Api = axios.create({
  baseURL: "http://localhost:5000/",
});

Api.interceptors.request.use((config: any) => {
  config.headers["Authorization"] =
    "Bearer " + localStorage.getItem("@token") || "";

  return config;
});

export default Api;
