<template>
    <div v-if="!loading" style="margin: auto; text-align: center;">
        <UserList :data="data"/>
    </div>
</template>

<script setup lang="ts">
import { UserList } from '@/components';
import { useServiceStore } from '@/stores';
import { ref, type Ref } from 'vue';

const serviceStore = useServiceStore();
const data = ref();
const loading: Ref<boolean> = ref(false);

async function init() {
    loading.value = true;
    data.value = await serviceStore.getAccounts();
    loading.value = false;
}
init()
</script>