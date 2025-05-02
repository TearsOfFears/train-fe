import axios from "axios";
import { getTokenFromLocalStorage } from "../utils/localstorage";

export const instance = axios.create({
    // baseURL: 'http://localhost:5000/api/',
    baseURL: process.env.REACT_APP_SERVER_URL,
    headers: {
        Authorization: 'Bearer ' + getTokenFromLocalStorage() || ''
    }
})