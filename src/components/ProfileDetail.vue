<template>
    <div style="margin: auto; text-align: center;">
        <div v-if="loading"><h1>LOADING</h1></div>
        <div v-if="!loading">
            <SBDetail :data="profile" :errors="errors" />
            <button
                v-if="mode === EProfileDetailMode.EDIT" 
                class="btn btn-primary"
                @click="saveEdits"
            >
                <span>Update</span>
            </button>
            <FollowersButton mode="Profile" :count="followCount" :userId="profile.user" />
        </div>    
    </div>
</template>

<script setup lang="ts">
import { DEFAULT_PROFILE, type ProfileInterface, EProfileDetailMode } from '@/dto';
import { FollowersButton, SBDetail } from "@/components";
import { useServiceStore } from '@/stores';
import { ref, toRef, type Ref, computed } from 'vue';
import { string, object } from 'yup';
import { useForm } from 'vee-validate';
import { useRoute } from 'vue-router';

const route = useRoute();

const serviceStore = useServiceStore();

interface Props {
    profile?: ProfileInterface,
    userId?: number | string,
    mode?: EProfileDetailMode,
}
const props = withDefaults(defineProps<Props>(), {
    mode: EProfileDetailMode.DETAIL,
});

const validationSchema = object({
  full_name: string().required(),
  bio: string().required(),
});

const { defineField, validate, errors } = useForm({validationSchema});

const mode: Ref<EProfileDetailMode> = toRef(props.mode);
const profile: Ref<ProfileInterface> = ref(DEFAULT_PROFILE);
const [full_name] = defineField('full_name');
const [bio] = defineField('bio');

const followCount = computed(() => {
    return profile.value.followers ? profile.value.followers.length : 0;
})

const loading: Ref<boolean> = ref(false);

async function init() { 
    if (props.profile) {
        profile.value = props.profile;
    } else if (props.userId) {
        loading.value = true;
        profile.value = await serviceStore.getProfile(props.userId as number);
        loading.value = false;
    } else if (props.mode===EProfileDetailMode.EDIT && route.params.userId) {
        const id: number = route.params.userId.valueOf() as number;
        loading.value = true;
        profile.value = await serviceStore.getProfile(id);
        loading.value = false;
    }
}

async function saveEdits() {
    full_name.value = profile.value.full_name;
    bio.value = profile.value.bio;
    const validation = await validate();
    const valid = validation.valid;
    if (valid) {
        serviceStore.updateProfile(profile.value);
    }
}

init();
</script>