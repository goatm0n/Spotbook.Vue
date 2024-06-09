<template>
    <div style="margin: auto; text-align: center;">
        <SBNavBar :routeNames="['List', 'Table', 'Clips', 'Map']" :emit="true" @emitRouteName="handleEmitRouteName"/>
        <div v-if="loading"><h2>LOADING</h2></div>
        <div v-if="!loading && displayMode === 'List'" v-for="spot in spots" style="border: 1px solid grey; border-radius: 16px; width: max-content; margin: auto; padding: 0.01em 16px;">
            <SpotDetail :spot="spot" />
        </div>
        <GTDataTable v-if="!loading && displayMode === 'Table'" :data="displayData">
            <template #row=slotprops>
                <RouterLink class="btn btn-sm btn-primary" :to="`/spot/${slotprops.id}`">
                    Visit Spot 
                </RouterLink>
            </template>
        </GTDataTable>
        <ClipFeed v-if="!loading && displayMode === 'Clips'" :spotIdList="spotIdList" mode="Spot"/>
        <SpotMap v-if="displayMode==='Map'" :spots="spots"/>
    </div>
</template>

<script setup lang="ts">
import { DEFAULT_SPOT, type SpotInterface } from '@/dto';
import { useServiceStore } from '@/stores';
import { computed, ref, toRef, type Ref, type ComputedRef } from 'vue';
import { ClipFeed, SBNavBar, SpotDetail, SpotMap } from '@/components';
import { useRouter } from 'vue-router';
import { GTDataTable } from '@goatm0n/goattools.vue.library.components';

const router = useRouter();
const serviceStore = useServiceStore();

interface Props {
    spots?:  SpotInterface[],
}
const props = defineProps<Props>();
const spots: Ref<SpotInterface[]> = props.spots ? toRef(props.spots) : ref([DEFAULT_SPOT]);

type DisplayMode = 'Table' | 'List' | 'Clips' | 'Map';
const displayMode: Ref<DisplayMode> = ref('Map');
const loading: Ref<boolean> = ref(false);

const spotIdList: ComputedRef<number[]> = computed(() => {
    let res: number[] = [];
    spots.value.forEach((spot:SpotInterface) => {
        res.push(spot.id);
    });
    return res;
})

const displayData = computed(() => {
    let res: any = [];
    spots.value.forEach((obj:SpotInterface) => {
        res.push({
            id: obj.id,
            title: obj.properties.title,
            type: obj.properties.spotType,
            description: obj.properties.description,
        })
    })
    return res;
});

async function init() {
    loading.value = true;
    if (!props.spots) {
        spots.value = await serviceStore.getSpots();
    }
    loading.value = false;
}

function handleEmitRouteName(routeName: any) {
    displayMode.value = routeName
}

init();
</script>