import type { AxiosErrorHandle } from "@/api/APIClient";
import router from "@/router";
import type { AxiosError } from "axios";
import { inject, provide } from "vue";
import { toast } from "vue3-toastify";


export function useProvideAxiosErrorHandle() {
    async function axiosErrorHandle(axiosError: AxiosError): Promise<void> {
        switch (axiosError.response?.status) {
            case 401: {
                await router.push('/login');
                toast.error('Login Required');
                break;
            }
            default: {
                throw axiosError;
            }
        }
    }
    provide<AxiosErrorHandle>('axiosErrorHandle', axiosErrorHandle as AxiosErrorHandle);    
    return { useAxiosErrorHandle }
}

export function useAxiosErrorHandle() {
    return inject<AxiosErrorHandle>('axiosErrorHandle');
}