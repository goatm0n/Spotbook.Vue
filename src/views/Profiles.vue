<template>
    <div style="margin: auto; text-align: center;">
        <header>
            {{ $route.name }}
        </header>
        <SBNavBar :routeNames="['Table', 'List']" :emit="true" @emitRouteName="handleEmitRouteName"/>
        <div v-if="loading"><h2>LOADING</h2></div>
        <SBDataTable v-if="displayMode==='Table' && !loading" :data="tableData">
            <template #row="{user}">
                <RouterLink v-if="user && admin" :to="{ name: 'Edit Profile', params: { userId: user }}" class="btn btn-primary">
                    Edit
                </RouterLink>
                <FollowersButton v-if="user" mode="Profile" :count="followersCount(user)" :userId="user"/>
                <RouterLink v-if="user" :to="{ name: 'Profile', params: {userId: user}}" class="btn btn-sm btn-primary">
                    View Profile
                </RouterLink>
            </template>
        </SBDataTable>
        <ProfileList v-if="displayMode==='List' && !loading" :profiles="profiles" :editMode="admin" />
        <span v-if="!loading && profiles.length === 0"><h3>No Profiles to display</h3></span>
    </div>
    
</template>

<script setup lang="ts">
import { type Ref, toRef, ref, computed } from 'vue';
import { type ProfileInterface, DEFAULT_PROFILE } from '@/dto';
import { SBDataTable, SBNavBar, ProfileList, FollowersButton } from '@/components';
import { useServiceStore } from '@/stores';

const serviceStore = useServiceStore();

interface Props {
    admin?: boolean,
    profiles?: ProfileInterface[],
}
const props = withDefaults(defineProps<Props>(), {
    admin: false,
});
const admin: Ref<boolean> = toRef(props.admin);

type DisplayMode = 'Table' | 'List';
const displayMode: Ref<DisplayMode> = ref('Table');

function handleEmitRouteName(routeName: any) {
    if (routeName === 'Table' || 'List') { displayMode.value = routeName}
}

const profiles: Ref<ProfileInterface[]> = ref([DEFAULT_PROFILE]);

const tableData = computed(() => {
    let res: any = [];
    profiles.value.forEach(profile => {
        res.push({user: profile.user, full_name: profile.full_name, bio: profile.bio})
    })
    return res;
})

function followersCount(userId: number): number {
    const profile: ProfileInterface | undefined = profiles.value.find((x) => x.user === userId);
    if (profile?.followers) {
        return profile.followers.length;
    } else {
        return 0;
    }
}

const loading: Ref<boolean> = ref(false);

async function init() {
    if (props.profiles !== undefined) {
        loading.value = true;
        profiles.value = props.profiles;
        loading.value = false;
        return;
    }
    loading.value = true;
    await loadData();
    loading.value = false;
}

async function loadData() {
    profiles.value = await serviceStore.getProfiles();
}

init();
</script>