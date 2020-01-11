import axios from "axios";

const api = axios.create({
  baseURL:
    "https://randomuser.me/api/1.3/?nat=br&inc=name,email,picture&seed=988ce3b1e38ebe0d&noinfo"
});

export default api;
