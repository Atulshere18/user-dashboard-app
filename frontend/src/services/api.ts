import axios from "axios"

const API_BASE_URL = "http://localhost:5001/user-dashboard-2af34/us-central1"

export const api = axios.create({
  baseURL: API_BASE_URL,
})
