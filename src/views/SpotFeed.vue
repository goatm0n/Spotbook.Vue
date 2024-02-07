<template>
    <SBNavBar :routeNames="spotListNames" :emit="true" @emitRouteName="val => spotListName = val"/>
    <div v-if="!loading">
        <Spots v-if="spots" :spots="spots"/>
    </div>
</template>

<script setup lang="ts">
import { SBNavBar } from '@/components';
import { Spots } from '@/views';
import type { SpotInterface } from '@/dto';
import { useServiceStore } from '@/stores';
import { ref, watch, type Ref } from 'vue';

const serviceStore = useServiceStore();
interface Props {
    userId: string | number,
}
const props = defineProps<Props>();

const spotListName = ref('following');
const loading: Ref<boolean> = ref(false);
const spots: Ref<SpotInterface[]|undefined> = ref();

const spotListNames: string[] = [
    'following',
    'likes',
]
watch(spotListName, (val) => {
    refreshSpots();
});

async function refreshSpots() {
    loading.value = true;
    const res = await serviceStore.getSpotList(Number(props.userId), spotListName.value);
    if (res.status === 200) {
        spots.value = res.data.features;
    }
    loading.value = false;
}

async function init() {
    await refreshSpots();
}
init();
</script>