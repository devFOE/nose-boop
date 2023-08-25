import axios from "axios";
const baseURL = process.env.NODE_ENV.localeCompare("development")
  ? "https://backend-dot-voter-searcher.uk.r.appspot.com"
  : "http://localhost:8080";

const api = axios.create({
  baseURL,
});

export default api;
