<template>
    <div>
        <header>
            <SBNavBar :key="route.fullPath"/>
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
useServiceStore();
const route = useRoute();
useRouter();
useProvideAxiosErrorHandle();
useProvideSpotMapIcons();
</script>
