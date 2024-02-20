<template>
    <SBNavBar :key="spotListNames.length" :routeNames="spotListNames" :emit="true" @emitRouteName="val => spotListName = val"/>
    <div v-if="!loading">
        <Spots v-if="spots" :spots="spots"/>
    </div>
</template>

<script setup lang="ts">
import { SBNavBar } from '@/components';
import { Spots } from '@/views';
import type { SpotInterface, SpotListDTO } from '@/dto';
import { useServiceStore } from '@/stores';
import { ref, watch, type Ref, toRef } from 'vue';

const serviceStore = useServiceStore();
interface Props {
    userId: string | number,
    spotListName?: string,
}
const props = withDefaults(defineProps<Props>(), {
    spotListName: 'following'
});
const spotListName = toRef(props.spotListName);
const loading: Ref<boolean> = ref(false);
const spots: Ref<SpotInterface[]|undefined> = ref();
const spotLists: Ref<SpotListDTO[]|undefined> = ref()

const spotListNames: string[] = [
    'following',
    'likes',
]
watch(spotListName, (val) => {
    refreshSpots();
});

async function refreshSpots() {
    loading.value = true;
    const isCustomList = ():boolean => {
        return (
            spotListName.value !== 'following' 
            && spotListName.value !== 'likes' 
        ) 
    }
    const res = isCustomList() && spotLists.value != undefined ? await serviceStore.getSpotListById(spotLists.value.filter(x => x.name === spotListName.value)[0].id) : await serviceStore.getSpotList(Number(props.userId), spotListName.value);
    if (res.status === 200) {
        spots.value = isCustomList() ? res.data.spots.features : res.data.features;
    }
    loading.value = false;
}

async function init() {
    const spotListsRes = await serviceStore.getSpotLists(Number(props.userId));
    if (spotListsRes.status = 200) {
        spotLists.value = spotListsRes.data as SpotListDTO[];
        spotLists.value.forEach((spotlist:SpotListDTO) => {
            spotListNames.push(spotlist.name)
        }); 
    }
    await refreshSpots();
}
init();
</script>