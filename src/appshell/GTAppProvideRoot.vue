<template>
    <slot></slot>
</template>

<script setup lang="ts">
import 'vue3-toastify/dist/index.css';
import '@goatm0n/goattools.vue.library.components/dist/style.css'
import { useProvideAxiosErrorHandle, useProvideNavigationItems } from '@/composables';
useProvideAxiosErrorHandle();
useProvideNavigationItems();
</script>
