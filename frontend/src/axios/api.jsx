import axios from "axios";

const api = axios.create({
    baseURL: "https://schedulebarberapp.onrender.com/"
})

export default api;

// "https://schedulebarberapp.onrender.com/"

// "http://localhost:5000/"