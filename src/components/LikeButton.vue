<template>
    <button
        type="button"
        :class="btnClass"
        @click="liked = !liked"
    >
        <span v-if="liked">Liked</span>
        <span v-else>Like</span>
    </button>
</template>

<script setup lang="ts">
import { useServiceStore } from '@/stores';
import type { AxiosError } from 'axios';
import { computed, type ComputedRef, type Ref, toRef, watch } from 'vue';
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';
const serviceStore = useServiceStore();
interface Props {
    liked?: boolean,
    clipId?: number,
    spotId?: number,
}
const props = withDefaults(defineProps<Props>(), {
    liked: false,
})
const liked: Ref<boolean> = toRef(props.liked);
const btnClass: ComputedRef<string> = computed(() => {
    return liked.value ? "btn btn-sm btn-success" : "btn btn-sm btn-primary";
});
watch(liked, (newVal) => {
    if (props.clipId) {
        serviceStore.clipLikeToggle(props.clipId).catch((err:AxiosError) => {
            if (err.response?.status === 401) {
                toast.error("Login Required");
            }
        })
           
    }    
});
</script>