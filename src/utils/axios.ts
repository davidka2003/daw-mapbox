import axios from "axios";
axios.defaults.baseURL =
  "https://api.desperateapewives.com/" || "http://localhost:4000" /* || "https://api.whatisyourdate.xyz" */;
axios.defaults.withCredentials = true;
export default axios;
