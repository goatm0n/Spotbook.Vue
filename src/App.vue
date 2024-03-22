<template>
    <div>
        <header>
            <SBNavBar :key="route.fullPath"/>
        </header>
        <RouterView :key="route.fullPath"/>
    </div>
</template>

<script setup lang="ts">
import { RouterView, useRouter, useRoute } from 'vue-router';
import { SBNavBar } from "./components";
import { useServiceStore } from './stores';
import { provide } from 'vue';
import type { AxiosError } from 'axios';
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';
import type { AxiosErrorHandle } from './api/APIClient';

const serviceStore = useServiceStore();
const route = useRoute();
const router = useRouter();

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
</script>
