<template>
    <Accounts :accounts="accounts" :key="accounts.length" displayMode="Table" :navbar="false"/>    
</template>

<script setup lang="ts">
import { Accounts } from '@/views';
import type { AccountInterface } from '@/dto';
import { useServiceStore } from '@/stores';
import { ref, type Ref } from 'vue';
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';

const serviceStore = useServiceStore();
type Mode = 'Spot' | 'Clip';
interface Props {
    mode: Mode,
    spotId?: number,
    clipId?: number,
    profileIds?: number[],
}
const props = defineProps<Props>();
const accounts: Ref<AccountInterface[]> = ref([]);
async function init() {
    if (props.mode === 'Clip' && !props.profileIds && props.clipId) {
        try {
            const res = await serviceStore.getClip(props.clipId)
            console.log(res.data);
        } catch (err) {
            console.log(err);
            toast.error("Failed To Fetch Clip");
            return;
        }
        
    } else if (props.mode === 'Spot' && !props.profileIds && props.spotId) {    
        try {
            accounts.value = await serviceStore.getSpotLikes(props.spotId);
        } catch (err) {
            console.log(err);
            toast.error("Failed To Fetch Profiles");
        }
    }
    console.log(accounts.value)
}
init();
</script>