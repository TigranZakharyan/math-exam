import axios from 'axios'
import { default as secureStore } from './secureStore'
import type { AxiosRequestConfig } from "axios";

const instance = axios.create({
	baseURL: 'http://localhost:8080'
})

instance.interceptors.request.use(async (config: AxiosRequestConfig) => {
	const access_token = await secureStore.getItem('access_token')
	config.headers && (config.headers["Authorization"] = `Bearer ${access_token}`);
	return config
},
error => {
    return Promise.reject(error);
})

export default instance
