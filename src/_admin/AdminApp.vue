<template>
    <div>
        <header>
            <SBNavBar :key="route.fullPath" :route-names="routes"/>
        </header>
        <RouterView :key="route.fullPath"/>
    </div>
</template>

<script setup lang="ts">
import { RouterView, useRoute, useRouter } from 'vue-router';
import { SBNavBar } from "@/components";
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';
import { useServiceStore } from '@/stores';
import { useProvideAxiosErrorHandle, useProvideSpotMapIcons } from '@/composables';
import { ADMIN_ROUTES } from './router';
import { computed } from 'vue';
useServiceStore();
const route = useRoute();
useRouter();
useProvideAxiosErrorHandle();
useProvideSpotMapIcons();

const routes = computed<string[]>(() => {
    const navRoutes: string[] = []
    ADMIN_ROUTES.map((x) => {
        if (x.meta?.showInNavBar && x.name) {
            navRoutes.push(x.name.toString());
        }
    });
    return navRoutes;
});
</script>
