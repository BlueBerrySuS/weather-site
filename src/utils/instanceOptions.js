import axios from "axios"

export const instance = axios.create({
    baseURL: "https://api.openweathermap.org/data/2.5/",
    params: {appid: "fb2d3c16f97ffd44a5d3206e0882e709"}
})