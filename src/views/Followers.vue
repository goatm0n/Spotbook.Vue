<template>
    <div style="margin: auto; text-align: center;">
        <Profiles :profiles="profiles" v-bind:key="profiles.length"/>
    </div>
</template>

<script setup lang="ts">
import { ref, type Ref } from 'vue';
import { Profiles } from '@/views';
import { DEFAULT_PROFILE, type ProfileInterface } from '@/dto';
import { useServiceStore } from '@/stores';

const serviceStore = useServiceStore();

interface Props {
    userId?: number | string,   //could be string from route
    profiles?: ProfileInterface[],
    userIdList?: number[],
    spotId?: number | string,
}
const props = defineProps<Props>();

const userId: Ref<number> = ref(0);
const spotId: Ref<number> = ref(0);
const profiles: Ref<ProfileInterface[]> = ref([DEFAULT_PROFILE]); 

const loading: Ref<boolean> = ref(false);

async function init() {
    loading.value = true;
    try {
        if (props.userId && props.spotId) {
            throw new Error("Cannot have both userId and spotId prop");
        } else if (props.userId && !props.spotId) {
            userId.value = Number(props.userId);
            profiles.value = await serviceStore.getProfileFollowers(userId.value);
        } else if (props.spotId && !props.userId) {
            spotId.value = Number(props.spotId);
            profiles.value = await serviceStore.getSpotFollowers(spotId.value);
        }
    } catch (err) {
        console.log(err);
    }
    loading.value = false;
}

init()
</script>