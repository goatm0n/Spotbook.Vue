<template>
    <div style="height:100vh; width:100%">
    <LMap 
        ref="map" 
        v-model:zoom="zoom" 
        :center="[54.604429050318664, -5.924117259791455]"
        @click="handleMapClick"
        id="map"
        :use-global-leaflet="false"
    >
        <LTileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            layer-type="base"
            name="OpenStreetMap"
        ></LTileLayer>
        <LMarker 
            v-if="!loading"
            v-for="spot in spots" 
            :latLng="[
                spot.geometry.coordinates[0], 
                spot.geometry.coordinates[1]
            ]"
        >
            <LPopup>
                <RouterLink :to="{name: 'Spot', params: {spotId: spot.id}}">
                    <b>{{ spot.properties.title }}</b>
                </RouterLink>
                <br>
                {{ spot.properties.spotType }}
                <br>
                {{ spot.properties.description }}
                <br>
                <RouterLink :to="{name: 'Upload Clip', params: {spotId: spot.id}}">
                    Upload Clip
                </RouterLink>
                <br>
                <RouterLink :to="{name: 'Profile', params: {userId: spot.properties.user}}">
                    {{ spot.properties.user }}
                </RouterLink>
            </LPopup>
        </LMarker>
        <LMarker
            v-if="!loading && showNewSpotMarker"
            :latLng="newSpotLatLng"
        >
            <LPopup>
                <RouterLink 
                    :to="{
                        name: 'Create Spot', 
                        params: {
                            lat: newSpotLatLng.lat, 
                            lng: newSpotLatLng.lng
                        }
                    }"
                >
                    <b>Create Spot</b>
                </RouterLink>
            </LPopup>
        </LMarker>
        
    </LMap>
  </div>
</template>

<script setup lang="ts">
import "leaflet/dist/leaflet.css";
import { LMap, LTileLayer, LMarker, LPopup } from "@vue-leaflet/vue-leaflet";
import { ref, type Ref } from "vue";
import { useServiceStore } from "@/stores";
import type { SpotInterface } from "@/dto";
import type { SpotDetail } from "@/components";

const serviceStore = useServiceStore();

interface Props {
    spots?: SpotInterface[],
    spotIds?: number[],
}
const props = defineProps<Props>();

const zoom = ref(13);
const spots: Ref<SpotInterface[]> = ref([]);
const showNewSpotMarker: Ref<boolean> = ref(false);
const newSpotLatLng = ref();
const loading: Ref<boolean> = ref(false);

async function init() {
    loading.value = true;
    if (props.spots) {
        spots.value = props.spots;
    } else if (props.spotIds) {
        spots.value = await serviceStore.getSpotsByIds(props.spotIds);
    } else {
        spots.value = await serviceStore.getSpots();  
    }
    loading.value = false;
}

function handleMapClick(e: any) {
    newSpotLatLng.value = e.latlng
    showNewSpotMarker.value = true;
    serviceStore.latLng = [newSpotLatLng.value.lat, newSpotLatLng.value.lng];
}

init();
</script>