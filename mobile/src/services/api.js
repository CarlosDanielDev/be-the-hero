import axios from "axios";

const api = axios.create({
  baseURL: "https://protected-headland-81683.herokuapp.com"
});

export default api;
