<template>
    <Clip :clip="clip" />
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

const clip = ref();

async function init() {
    try {
        clip.value = await serviceStore.getClip(Number(props.clipId));        
    } catch (err) {
        console.log(err);
        toast.error('Failed To Load Clip');        
    }

}

init();
</script>