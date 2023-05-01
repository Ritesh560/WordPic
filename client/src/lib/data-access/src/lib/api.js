import axios from "axios"
import { BACKEND_URL } from "../../../../../config"

const accessToken = localStorage.getItem("accessToken")

export const AuthorizedApi = axios.create({
  baseURL: BACKEND_URL,
  headers: {
    Authorization: `${accessToken}`,
    "Content-type": "application/json",
  },
})

export const PublicApi = axios.create({
  baseURL: BACKEND_URL,
  headers: {
    "Content-type": "application/json",
  },
})
