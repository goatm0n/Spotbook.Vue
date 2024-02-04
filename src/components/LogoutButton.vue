<template>
    <button
        type="button"
        class="btn btn-sm btn-danger"
        @click="logout"
    >
        sign out
    </button>
</template>

<script setup lang="ts">
import router from '@/router';
import { useServiceStore } from '@/stores';

const serviceStore = useServiceStore();
function logout() {
    serviceStore.logOut();
    router.push('/')
}
</script>