<template>
    <Clip v-if="clipId" :clipId="Number(clipId)" />
</template>

<script setup lang="ts">
import { Clip } from '@/components';
import { useServiceStore } from '@/stores';
import { ref } from 'vue';
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';

const serviceStore = useServiceStore();
interface Props {
    clipId: string,
}
const props = defineProps<Props>();
</script>