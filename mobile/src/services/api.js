import axios from "axios";

const api = axios.create({
  baseURL: "http://192.168.3.150:5001"
});

export default api;
