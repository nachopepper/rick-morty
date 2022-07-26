import axios from "axios";

axios.defaults.baseURL = process.env.VUE_APP_API_URL;
console.log('url', process.env.VUE_APP_API_URL)
axios.defaults.headers.common["Authorization"] =
  localStorage.getItem("Authorization") || null;

axios.defaults.headers.common = {
  Authorization: localStorage.getItem("Authorization") || null,
  "Access-Control-Allow-Origin": "*",
  "Content-Type": "application/json",
};
