import axios from "axios";
import settings from "../settings.json";

const api = axios.create({
  baseURL: `${settings.API_URL}:${settings.API_PORT}`
});

export default api;
