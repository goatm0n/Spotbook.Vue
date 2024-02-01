<template>
    <div style="margin: auto; text-align: center;">
        <SBNavBar :routeNames="['List', 'Table']" :emit="true" @emitRouteName="handleEmitRouteName"/>
        <div v-if="loading"><h2>LOADING</h2></div>
        <div v-if="!loading && displayMode === 'List'" v-for="spot in spots" style="border: 1px solid grey; border-radius: 16px; width: max-content; margin: auto; padding: 0.01em 16px;">
            <SpotDetail :spot="spot" />
        </div>
        <SBDataTable v-if="!loading && displayMode === 'Table'" :data="spots">
            <template #row="{spot}">
                <button class="btn btn-sm btn-primary" @click="editSpot(spot)">
                    Edit
                </button>
            </template>
        </SBDataTable>
    </div>
</template>

<script setup lang="ts">
import { DEFAULT_SPOT, type SpotInterface } from '@/dto';
import { useServiceStore } from '@/stores';
import { ref, type Ref } from 'vue';
import { Spot } from "@/views";
import { SBDataTable, SBNavBar, SpotDetail } from '@/components';
import { useRouter } from 'vue-router';

const router = useRouter();
const serviceStore = useServiceStore();

interface Props {
    spots:  SpotInterface[],
}

const props = defineProps<Props>();

const spots: Ref<SpotInterface[]> = ref([DEFAULT_SPOT]);

type DisplayMode = 'Table' | 'List';
const displayMode: Ref<DisplayMode> = ref('List');

const loading: Ref<boolean> = ref(false);

async function init() {
    loading.value = true;
    if (!props.spots) {
        spots.value = await serviceStore.getSpots();
    }
    loading.value = false;
}

function handleEmitRouteName(routeName: any) {
    if (routeName === 'Table' || 'List') { displayMode.value = routeName}
}

function editSpot(spot: SpotInterface) {
    alert("not yet implemented")
}

init();
</script>