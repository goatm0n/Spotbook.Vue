<template>
    <SpotDetail mode="Create" :lat="(Number(props.lat))" :lng="(Number(props.lng) )"/>
</template>

<script setup lang="ts">
import { SpotDetail } from '@/components';

interface Props {
    lat: string,
    lng: string,
}

const props = defineProps<Props>();

</script>