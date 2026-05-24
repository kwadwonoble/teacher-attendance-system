import axios from "axios";

const API = axios.create({

  baseURL:
    "https://teacher-attendance-system-1-qgf0.onrender.com",

});

export default API;