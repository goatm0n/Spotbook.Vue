<template>
    <button
        type="button"
        :class="btnClass"
        @click="following = !following"
    >
        <span v-if="following">Following</span>
        <span v-else>Follow</span>
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
    following?: boolean,
    userId?: number,
    spotId?: number,
}
const props = withDefaults(defineProps<Props>(), {
    following: false,
})
const following: Ref<boolean> = toRef(props.following);
const btnClass: ComputedRef<string> = computed(() => {
    return following.value ? "btn btn-sm btn-success" : "btn btn-sm btn-secondary";
});
watch(following, (newVal) => {
    if (props.userId) {
        serviceStore.userFollowToggle(props.userId).catch((err:AxiosError) => {
            if (err.response?.status === 401) {
                toast.error("Login Required");
            }
        });    
    } else if (props.spotId) {
        serviceStore.spotFollowToggle(props.spotId).catch((err:AxiosError) => {
            if (err.response?.status === 401) {
                toast.error("Login Required");
            }
        });
    }    
});
</script>