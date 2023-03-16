import axios from "axios";
import env from "react-dotenv";

// baseURL is resolved clientside, so not possible to add it to the .env file.
//
const api = axios.create({
  baseURL: env.API_URL || "http://127.0.0.12:3000",
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
