<template>
    <GTAppProvideRoot>
        <header>
            <GTNavBar :key="route.fullPath"/>
        </header>
        <RouterView :key="route.fullPath"/>
    </GTAppProvideRoot>
</template>

<script setup lang="ts">
import { RouterView, useRoute } from 'vue-router';
import GTNavBar from '@/components/GTNavBar.vue';
import GTAppProvideRoot from './GTAppProvideRoot.vue';
const route = useRoute();
</script>
