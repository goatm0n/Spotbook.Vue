<template>
  <div>
    <header>
      <SBNavBar :routeNames="NAVBAR_ROUTES_NAMES" :key="route.fullPath"/>
    </header>
    <RouterView :key="route.fullPath"/>
  </div>
</template>

<script setup lang="ts">
import { RouterView, useRouter, useRoute } from 'vue-router';
import { SBNavBar } from "./components";
import { computed } from 'vue';
import { ADMIN_NAVBAR_ROUTES_NAMES } from '@/_admin/router';

const route = useRoute();
const router = useRouter();

const NAVBAR_ROUTES_NAMES = computed(() => {
  return router.currentRoute.value.fullPath.startsWith('/admin') ? 
    ADMIN_NAVBAR_ROUTES_NAMES : undefined;
})
</script>
