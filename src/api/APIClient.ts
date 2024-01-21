import axios from "axios";

async function apiGet(route: string) {
    return await axios.get(route);
}

async function apiPost(route:string, payload: any, axiosConfig?: any) {
    return await axios.post(route, payload, axiosConfig);
}

async function apiPut(route:string, payload: any, axiosConfig?: any) {
    return await axios.put(route, payload, axiosConfig);
}

export default {
    apiGet,
    apiPost,
    apiPut,
}