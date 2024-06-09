<template>
    <GTDataTable :data="displayData">
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
    </GTDataTable>
</template>

<script setup lang="ts">
import { GTDataTable } from '@goatm0n/goattools.vue.library.components';
import { computed } from 'vue';
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