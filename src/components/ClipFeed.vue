<template>
    <Clip v-if="!loading && !!clips.length" v-for="clip in clips" :clipId="clip"/>
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
    userId?: number,
}
const props = defineProps<Props>();
const clips: Ref<number[]> = ref([]);
const loading: Ref<boolean> = ref(false);

async function init() {
    if (props.mode === 'Spot' && props.spotId) {
        try {
            loading.value = true;
            const res = await serviceStore.getSpotClips(props.spotId);
            clips.value = res.clip_id_list;
            loading.value = false;
        } catch (err) {
            loading.value = false;
            console.log(err);
            toast.error("Failed To Fetch Spot Clips");
        }
    } else if (props.mode === 'Profile' && props.userId) {
        try {
            loading.value = true;
            const res = await serviceStore.getUserClips(props.userId);
            clips.value = res
            loading.value = false;
        } catch (err) {
            loading.value = false;
            console.log(err);
            toast.error("Failed To Fetch Spot Clips");
        } 
    }
}

init(); 
</script>