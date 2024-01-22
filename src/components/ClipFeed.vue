<template>
    <Clip v-for="clip in clips" />
</template>

<script setup lang="ts">
import { useServiceStore } from '@/stores';
import { ref } from 'vue';
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';
import { Clip } from '@/components';

const serviceStore = useServiceStore();

type Mode = 'Spot' | 'Profile';
interface Props {
    mode: Mode,
    spotId?: number,
}
const props = defineProps<Props>();

const clips = ref([]);

async function init() {
    if (props.mode === 'Spot' && props.spotId) {
        try {
            clips.value = await serviceStore.getSpotClips(props.spotId);
        } catch (err) {
            console.log(err);
            toast.error("Failed To Fetch Spot Clips");
        }
    }
    console.log(clips.value)
}

init();
</script>