import axios from "axios";
export const request = axios.create({
    baseURL: 'http://localhost:8080',
    headers: {
        'Authorization': localStorage.getItem("token")
    }
});
