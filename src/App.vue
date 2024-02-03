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

const serviceStore = useServiceStore();

const route = useRoute();
</script>
