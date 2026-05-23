import axios from "axios";

const API = axios.create({

  baseURL: "https://teacher-attendance-system-1-qgf0.onrender.com/api",

  timeout: 10000,

});

API.interceptors.response.use(

  (response) => response,

  (error) => {

    console.error(
      "API ERROR:",
      error.response || error.message
    );

    return Promise.reject(error);

  }

);

export default API;