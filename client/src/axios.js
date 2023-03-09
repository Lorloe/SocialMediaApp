import axios from "axios";

export const makeRequest = axios.create({
  baseURL: "http://localhost:8800/api/",
  withCredentials: true,    //Gui ma thong bao truy cap(acces token) den backend server
});