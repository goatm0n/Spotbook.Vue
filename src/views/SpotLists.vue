<template>
    <div style="margin: auto; align-items: center;">
        <SBDataTable :key="serviceStore.spotLists.length" :data="displayData">
            <template #row="slotprops">
                <RouterLink class="btn btn-sm btn-secondary" :to="{name:'Spot Feed Named', params:{userId: userId, spotListName: slotprops.name}}">
                    View
                </RouterLink>
                <button class="btn btn-sm btn-danger" @click="deleteSpotList(slotprops.name)">
                    Delete
                </button>
            </template>
        </SBDataTable>    
        <button v-if="!addNewSpotList" class="btn btn-sm btn-secondary" @click="addNewSpotList = true">Add New SpotList</button>
        <SpotListDetail v-if="addNewSpotList" mode="Create" @cancel="addNewSpotList = false"/>
    </div>
</template>

<script setup lang="ts">
import { SBDataTable, SpotListDetail } from "@/components";
import type { SpotListDTO } from "@/dto";
import { useServiceStore } from "@/stores";
import { type ComputedRef, computed, ref, type Ref } from "vue";
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';
const serviceStore = useServiceStore();
const displayData: ComputedRef<any[]> = computed(() => {
    if (!!serviceStore.spotLists.length) {
        return serviceStore.spotLists.map(x => {return {name: x.name}});
    } else {
        return []
    }
});
const userId = ref();
const loading: Ref<boolean> = ref(false);
const addNewSpotList: Ref<boolean> = ref(false);
async function init() {
    loading.value = true;
    userId.value = await serviceStore.getUserId();
    if (userId != undefined) {
        const spotListRes = await serviceStore.getSpotLists(userId.value);
        if (spotListRes.status === 200) {
            serviceStore.spotLists = spotListRes.data as SpotListDTO[];
        }
    }
    loading.value = false;
}
async function deleteSpotList(name:string) {
    const spotlist = serviceStore.spotLists.filter(x => x.name === name)[0];
    try {
        const res = await serviceStore.deleteSpotList(spotlist.id);
        if (res.status===200) {
            const spotListIndex = serviceStore.spotLists.findIndex(x => x.id === spotlist.id)
            serviceStore.spotLists.splice(spotListIndex, 1)
            toast.success('SpotList Deleted')
        }
    } catch (err:any) {
        if (err.response.status===401) {
            toast.error('Authentication Error')
        } else {
            toast.error('something went wrong')
        }
    } 
}
init();
</script>