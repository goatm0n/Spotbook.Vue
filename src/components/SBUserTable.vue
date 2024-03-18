<template>
    <SBDataTable :data="displayData">
        <template #row="{id}">
            <RouterLink 
                v-if="id" 
                :to="{ 
                    name: 'Profile', 
                    params: {userId: id}
                }" 
                class="btn btn-sm btn-primary"
            >
                View Profile
            </RouterLink>
            <slot name="buttons" v-bind="{id}"></slot>
        </template>
    </SBDataTable>
</template>

<script setup lang="ts">
import { SBDataTable } from '@/components';
import { useServiceStore } from '@/stores';
import { computed, ref, toRef, type Ref } from 'vue';
interface Props {
    data: any[],
}
const props = defineProps<Props>();
const displayData = computed(() => {
    let res: any = [];
    props.data.forEach((obj:any) => {
        res.push({username: obj.username, id: obj.id})
    })
    return res;
});
</script>