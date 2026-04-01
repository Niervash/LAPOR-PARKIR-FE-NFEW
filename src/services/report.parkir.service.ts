import { cookieApiClient } from "../hooks";
import { getAuth, GetItem } from "../utils/cookies.storage";
import axios from "axios"; // Import axios for type guard

const BASE_URL = "https://parkir-production-b2ec.up.railway.app";