<template>
    <Clip v-for="clip in clips" :clip="clip"/>
</template>

<script setup lang="ts">
import { useServiceStore } from '@/stores';
import { ref, type Ref } from 'vue';
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';
import { Clip } from '@/components';
import type { ClipInterface } from '@/dto';

const serviceStore = useServiceStore();

type Mode = 'Spot' | 'Profile';
interface Props {
    mode: Mode,
    spotId?: number,
}
const props = defineProps<Props>();

const clips: Ref<ClipInterface[]> = ref([]);

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