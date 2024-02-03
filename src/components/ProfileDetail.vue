<template>
    <div style="margin: auto; text-align: center;">
        <div v-if="loading"><h1>LOADING</h1></div>
        <div v-if="!loading">
            <SBDetail :data="data" :errors="errors" />
            <ImageUpload
                v-if="isCurrentUser"
                @imageFile="val => profile.profile_picture = val" 
            />
                <br>
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
import { ClipFeed, FollowersButton, ImageUpload, SBDetail } from "@/components";
import { useServiceStore } from '@/stores';
import { ref, toRef, type Ref, computed, watch, reactive } from 'vue';
import { string, object } from 'yup';
import { useForm } from 'vee-validate';
import { useRoute } from 'vue-router';
import { toast } from 'vue3-toastify';

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

const data = ref({
    full_name: full_name,
    bio: bio,
});

const followCount = computed(() => {
    return profile.value.followers ? profile.value.followers.length : 0;
});

const loading: Ref<boolean> = ref(false);
const isCurrentUser: Ref<boolean> = ref(false);

watch(isCurrentUser, (newVal) => {
    if (newVal === true) {
        mode.value = EProfileDetailMode.EDIT;
    }
});

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
    loading.value = true;
    const currentUserId: number | undefined = await serviceStore.getUserId(); 
    loading.value = false;
    if (currentUserId != undefined) {
        if (currentUserId === profile.value.user) {
            isCurrentUser.value = true;
        }
    }
    data.value.full_name = profile.value.full_name;
    data.value.bio = profile.value.bio;
}

async function saveEdits() {
    const validation = await validate();
    const valid = validation.valid;
    if (valid) {    
        profile.value.full_name = full_name.value;
        profile.value.bio = bio.value;
        const res = await serviceStore.updateProfile(profile.value);
        if (res.status=200) {
            toast.success("Updated Successfully")
        }
    }
}

init();
</script>