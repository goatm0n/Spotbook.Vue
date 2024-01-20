import axios from "axios";

async function apiGet(route: string) {
    return await axios.get(route);
}

async function apiPost(route:string, payload: any) {
    return await axios.post(route, payload);
}

async function apiPut(route:string, payload: any) {
    return await axios.put(route, payload);
}

export default {
    apiGet,
    apiPost,
    apiPut,
}