import axios, { AxiosError } from "axios";

export interface AxiosErrorHandle {
    (axiosError: AxiosError): Promise<void>
}

async function apiGet(route: string) {
    return await axios.get(route);
}

async function apiPost(route:string, payload: any, axiosConfig?: any, axiosErrorHandle?: AxiosErrorHandle) {
    try {
        return await axios.post(route, payload, axiosConfig);
    } catch (error) {
        if (axiosErrorHandle) {
            axiosErrorHandle(error as AxiosError);
        } else {
            throw error
        }
    }    
}

async function apiPut(route:string, payload: any, axiosConfig?: any) {
    return await axios.put(route, payload, axiosConfig);
}
    
async function apiDelete(route:string, axiosConfig?: any) {
    return await axios.delete(route, axiosConfig);
}

export default {
    apiGet,
    apiPost,
    apiPut,
    apiDelete,
}