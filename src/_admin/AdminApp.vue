<template>
    <GTAdminApp />
</template>

<script setup lang="ts">
import { useServiceStore } from '@/stores';
import { useProvideAxiosErrorHandle, useProvideSpotMapIcons } from '@/composables';
import { GTAdminApp } from '@/appshell';
useServiceStore();
useProvideAxiosErrorHandle();
useProvideSpotMapIcons();

</script>
