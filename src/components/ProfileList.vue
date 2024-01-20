<template>
    <div v-if="!loading" style="margin: auto; text-align: center;">
        <div v-for="profile in profiles" style="border: 1px solid grey; border-radius: 16px; width: max-content; margin: auto; padding: 0.01em 16px;">
            <ProfileDetail :profile="profile" :mode="mode"/>
        </div>
    </div>
</template>

<script setup lang="ts">
import { DEFAULT_PROFILE, type ProfileInterface, EProfileDetailMode } from '@/dto';
import { ProfileDetail } from '@/components';
import { ref, type Ref } from 'vue'; 
import { useServiceStore } from '@/stores';

const serviceStore = useServiceStore();

interface Props {
    profiles?: ProfileInterface[],
    editMode?: boolean,
}
const props = withDefaults(defineProps<Props>(), {
    editMode: false,
});

const mode: Ref<EProfileDetailMode.EDIT | EProfileDetailMode.DETAIL> = props.editMode ? 
    ref(EProfileDetailMode.EDIT) : ref(EProfileDetailMode.DETAIL);

const profiles: Ref<ProfileInterface[]> = ref([DEFAULT_PROFILE]);

const loading: Ref<boolean> = ref(false);

async function init() {
    if (props.profiles) {
        profiles.value = props.profiles;
        return;
    }
    loading.value = true;
    profiles.value = await serviceStore.getProfiles();
}

init();
</script>