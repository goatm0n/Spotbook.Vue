<template>
    <div v-if="loading">loading</div>
    <div v-else>
        <button class="btn btn-sm btn-primary" @click="openModal=true">Add SpotListUser</button>
        <SBUserTable v-if="spotlistusers.length>0" :data="userTableData">
            <template #buttons="{id}">
                <button @click="removeSpotListUser(id)" class="btn btn-sm btn-danger">Remove</button>
            </template>
        </SBUserTable>
        <SBModal :isOpen="openModal" @modal-close="openModal = false">
            <template #header>
                <h1>Add SpotListUser</h1>
            </template>
            <template #content>
                <SBUserSearch :filter="searchFilter">
                    <template #buttons="{id}">
                        <button @click.prevent="addSpotListUser(id)" class="btn btn-sm btn-success">
                            Add User
                        </button>
                    </template>
                </SBUserSearch>
            </template>
        </SBModal>
    </div>
</template>

<script setup lang="ts">
import { SBUserTable, SBModal, SBUserSearch } from '@/components';
import type { AccountDTO } from '@/dto/Account';
import type { SpotListUser } from '@/dto/Spot';
import { useServiceStore } from '@/stores';
import { computed, ref, type Ref } from 'vue';
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';

interface Props {
    spotlistId: number | string,
}
const props = defineProps<Props>();
const serviceStore = useServiceStore();

const spotlistusers: Ref<SpotListUser[]> = ref([]);

const loading: Ref<boolean> = ref(false);
const openModal: Ref<boolean> = ref(false);

const userTableData = computed(() => {
    return spotlistusers.value.map((x) => {
        return {
            id: x.user,
            username: x.username
        }
    });
})

function searchFilter(account: AccountDTO): boolean {
    return !spotlistusers.value.find((x) => x.user === account.id);
}

async function removeSpotListUser(userId:number) {
    try {
        await serviceStore.deleteSpotListUser(userId);
    } catch (error) {
        toast.error("Something went wrong")
        throw error
    }
}

async function addSpotListUser(userId: number) {
    loading.value = true;
    try {
        const newUser = await serviceStore.createSpotListUser(userId, Number(props.spotlistId));
        spotlistusers.value.push(newUser);
    } catch {
        toast.error("s=asjdjksoand");
    } finally {
        loading.value = false;
    }
}

async function init() {
    loading.value = true;
    try {
        spotlistusers.value = await serviceStore.getSpotListUsers(Number(props.spotlistId));
    } catch {
        toast.error("Failed to load users");
    } finally {
        loading.value = false;
    }
}

init();
</script>