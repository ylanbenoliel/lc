import axios from "axios";

const api = axios.create({
  baseURL: "https://randomuser.me/api/1.3/"
});

export default api;
