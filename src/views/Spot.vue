<template>
    <div style="margin: auto; text-align: center;">
        <div v-if="loading"><h2>LOADING</h2></div>
        <SBDetail v-if="!loading" :data="spot.properties"/>
        <br>
        <RouterLink 
            :to="{name: 'Spot Followers', params: { spotId: spotId }}" 
            class="btn btn-success"
        >
            Followers
            <br>
            {{ spot.properties.followers.length }}
        </RouterLink>
    </div>
</template>

<script setup lang="ts">
import { SBDetail } from '@/components';
import { ref, type Ref } from 'vue';
import { DEFAULT_SPOT, type SpotInterface } from '@/dto';
import { useServiceStore } from '@/stores';

const serviceStore = useServiceStore();

interface Props {
    spotId?: number | string,
    spot?: SpotInterface,
}
const props = defineProps<Props>();
const spotId: Ref<number> = ref(0); 
const spot: Ref<SpotInterface> = ref(DEFAULT_SPOT);

const loading: Ref<boolean> = ref(false);

async function init() {
    loading.value = true;
    if (props.spotId) {
        try {spotId.value = Number(props.spotId)} catch (err) {console.log(err)}
    }
    if (props.spot) {
        spot.value = props.spot;
    } else if (spotId.value > 0) {
        spot.value = await serviceStore.getSpot(spotId.value); 
    }
    loading.value = false;
}

init();
</script>