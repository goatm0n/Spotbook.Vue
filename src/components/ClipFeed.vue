<template>
    <div v-if="!loading && !!clips.length" v-for="clip in clips">
        <Clip v-if="clip && clip.id" :clip="clip" :clipId="clip.id"/>
    </div>
</template>

<script setup lang="ts">
import { useServiceStore } from '@/stores';
import { ref, type Ref } from 'vue';
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';
import { Clip } from '@/components';
import type { ClipDetail } from '@/dto';
import type { AxiosError } from 'axios';

const serviceStore = useServiceStore();
type Mode = 'Spot' | 'Profile';
interface Props {
    mode: Mode,
    spotId?: number,
    userId?: number,
    spotIdList?: number[],
}
const props = defineProps<Props>();
const clips: Ref<ClipDetail[]> = ref([]);
const loading: Ref<boolean> = ref(false);

async function init() {
    if (props.mode === 'Spot' && props.spotId) {
        try {
            loading.value = true;
            const res = await serviceStore.getSpotClipFeed(props.spotId);
            clips.value = res;
            loading.value = false;
        } catch (err) {
            loading.value = false;
            console.log(err);
            const res = err as AxiosError;
            if (res.response?.status !== 404) {
                toast.error("Failed To Fetch Spot Clips");
            }
        }
    } else if (props.mode === 'Profile' && props.userId) {
        try {
            loading.value = true;
            const res = await serviceStore.getProfileClipFeed(props.userId);
            clips.value = res;
            loading.value = false;
        } catch (err) {
            loading.value = false;
            console.log(err);
            const res = err as AxiosError;
            if (res.response?.status !== 404) {
                toast.error("Failed To Fetch Profile Clips");
            }
        } 
    } else if (props.mode === 'Spot' && props.spotIdList) {
        loading.value = true;
        for (const key in props.spotIdList) {
            try {
                const res: ClipDetail[] = await serviceStore.getSpotClipFeed(props.spotIdList[key]);
                clips.value = clips.value.concat(res);
            } catch (err) {
                console.log(err);
                const res = err as AxiosError;
                if (res.response?.status !== 404) {
                    toast.error("Failed To Fetch Clips")
                }
            }
        }
        loading.value = false;
    }
}

init(); 
</script>