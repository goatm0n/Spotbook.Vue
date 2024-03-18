<template>
    <SBTextbox
     uniqueId="sbusersearch-username-textbox" 
     v-model:modelValue="username" 
     labelText="username"
     :errorText="errorText"
    />
    <button
     @click.prevent="getUsersLike(username)"
     class="btn btn-sm btn-primary"
    >Search</button>
    <SBUserTable :data="users">
        <template #buttons="{id}">
            <slot name="buttons" v-bind="{id}"></slot>
        </template>
    </SBUserTable>
</template>

<script setup lang="ts">
import type { AccountDTO } from '@/dto';
import { useServiceStore } from '@/stores';
import type { AxiosError } from 'axios';
import { ref, type Ref } from 'vue';
import { SBTextbox, SBUserTable } from "@/components";

const serviceStore = useServiceStore();

const username = ref("");
const users: Ref<AccountDTO[]> = ref([]);
const errorText: Ref<string|undefined> = ref();

async function getUsersLike(username: string) {
    try {
        users.value = await serviceStore.getUsersLike(username);
    } catch (error) {
        let err = error as AxiosError;
        switch (err.response?.status) {
            case 404:
                errorText.value = 'No users with this username';
                users.value = [];
                break;
            default:
                throw (error)
        }
    }
}

</script>