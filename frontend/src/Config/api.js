import axios from "axios";

export const API_URL = "http://127.0.0.1:8000"
// export const API_URL = "http://18.222.95.253:8000"

export const api = axios.create({
    baseURL:API_URL,
    headers:{
        "Content-Type":"application/json",
    }
})