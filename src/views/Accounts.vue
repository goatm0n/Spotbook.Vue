<template>
    <div v-if="!loading" style="margin: auto; text-align: center;">
        <SBNavBar :routeNames="['List', 'Table']" :emit="true" @emitRouteName="handleEmitRouteName"/>
        <AccountList v-if="displayMode === 'List'" :accounts="accounts" :editMode="editMode"/>
        <SBDataTable v-if="displayMode === 'Table'" :data="accounts">
            <template #row="{id}">
                <RouterLink v-if="id && editMode" :to="{ name: 'Account - Edit', params: { id: id }}" class="btn btn-primary">
                    Edit
                </RouterLink>
            </template>
        </SBDataTable>
    </div>
</template>

<script setup lang="ts">
import { AccountList, SBDataTable, SBNavBar } from "@/components";
import { type AccountInterface, DEFAULT_ACCOUNT } from "@/dto/Account";
import { ref, toRef, type Ref } from "vue";
import { useServiceStore } from "@/stores";

interface Props {
    accounts?: AccountInterface[],
    editMode?: boolean,
}
const props = withDefaults(defineProps<Props>(), {
    editMode: false,
})
const editMode = toRef(props.editMode);

type DisplayMode = "Table" | "List";
const displayMode: Ref<DisplayMode> = ref("List");

const serviceStore = useServiceStore();

const loading: Ref<boolean> = ref(false);
const accounts: Ref<AccountInterface[]> = ref([DEFAULT_ACCOUNT]);

async function init() {
    if (props.accounts !== undefined) {
        accounts.value = props.accounts;
        return;
    }
    loading.value = true;
    accounts.value = await serviceStore.getAccounts();
    loading.value = false;
}

function handleEmitRouteName(routeName: any) {
    switch (routeName) {
        case "Table":
            displayMode.value = routeName;
            break;
        case "List":
            displayMode.value = routeName;
        default:
            break;
    }
}

init();
</script>