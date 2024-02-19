<template>
    <div style="margin: auto; align-items: center;">
        <SBDataTable :data="displayData">
            <template #row="slotprops">

                <button 
                    v-if="isSpotInSpotList(slotprops.name)" 
                    class="btn btn-sm btn-danger" 
                    @click="handleSaveButtonClick(slotprops.name)"
                >
                    Remove
                </button>
                <button 
                    v-else
                    class="btn btn-sm btn-secondary" 
                    @click="handleSaveButtonClick(slotprops.name)"
                >
                    Save                    
                </button>
            </template>
        </SBDataTable>        
    </div>
</template>

<script setup lang="ts">
import { useServiceStore } from '@/stores';
import { computed, ref, type ComputedRef, type Ref } from 'vue';
import { SBDataTable } from '.';
import type { SpotListDTO, SpotListItemDTO } from '@/dto';
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';
import type { AxiosError } from 'axios';
const serviceStore = useServiceStore();
interface Props {
    spotId: number,
    userId: number,
}
const props = defineProps<Props>();
const loading: Ref<boolean> = ref(false);
const spotList = ref();

const isSpotListUser: ComputedRef<boolean> = computed(() => {
    return spotList.value.user === props.userId;
}) 
const displayData: ComputedRef<any[]> = computed(() => {
    if (!!serviceStore.spotLists.length) {
        return serviceStore.spotLists.map(x => {return {name: x.name}});
    } else {
        return []
    }
});

function isSpotInSpotList(name: string): boolean {
    const spotListId = serviceStore.spotLists.filter(x => x.name === name)[0].id;
    return serviceStore.currentSpotListItems.find((x:SpotListItemDTO) => x.spotlist === spotListId && x.spot === props.spotId)?true:false;
}

async function init() {
    loading.value = true;
    await loadData();
    loading.value = false;
}

async function loadData() {
    const spotListRes = await serviceStore.getSpotLists(props.userId);
    if (spotListRes.status === 200) {
        serviceStore.spotLists = spotListRes.data as SpotListDTO[];
    }
    const spotListItemRes = await serviceStore.getSpotListItems(props.userId, props.spotId);
    if (spotListItemRes.status === 200) {
        serviceStore.currentSpotListItems = spotListItemRes.data as SpotListItemDTO[];
    }
}

async function handleSaveButtonClick(name:string) {
    spotList.value = serviceStore.spotLists.filter(x => x.name === name)[0];
    const spotListId = spotList.value.id;
    const spotListItems = serviceStore.currentSpotListItems.filter(x => x.spotlist === spotListId && x.spot === props.spotId);
    if (spotListItems.length) {
        spotListItems.forEach(item => {
            removeSpotListItem(item);                    
        })  
    } else {
        createSpotListItem(spotListId);
    }
}

async function createSpotListItem(spotListId:number) {
    const spotListItem: SpotListItemDTO = {
        spot: props.spotId,
        spotlist: spotListId,
        user: props.userId,
    }
    try {
        const res = await serviceStore.createSpotListItem(spotListItem);
        if (res.status === 201) {
            toast.success('Saved')
            serviceStore.currentSpotListItems.push(res.data);
        }
    } catch (err:any) {
        if (err.response.status===401) {
            toast.error('Login');
        } else {
            toast.error('Something went wrong')
            console.log(err)
        }
    }
}

async function removeSpotListItem(item: SpotListItemDTO) {
    if (item.user === props.userId || isSpotListUser.value) {
        try {
            const res = await serviceStore.deleteSpotListItem(item.id);  
            if (res.status === 200) {
                toast.success('item deleted')
                serviceStore.currentSpotListItems = serviceStore.currentSpotListItems.filter(x => x.id !== item.id);
            }
        } catch (err:any) {
            if (err.response.status === 401) {
                toast.error('unauthorized')
            } else {
                toast.error('something went wrong');
                console.log(err);
            }
        }
    }
}

init();
</script>