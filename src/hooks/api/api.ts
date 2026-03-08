import axios from "axios";

const BASE_URL = import.meta.env.API_BASE_URL;

const cookieApiClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

export default cookieApiClient;
