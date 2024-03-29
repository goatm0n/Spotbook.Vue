<template>
    <div v-if="!loading" style="margin: auto; text-align: center;">
        <SBNavBar v-if="navbar" :routeNames="['List', 'Table']" :emit="true" @emitRouteName="handleEmitRouteName"/>
        <AccountList v-if="displayMode === 'List'" :accounts="accounts" :editMode="editMode"/>
        <SBUserTable v-if="displayMode === 'Table'" :data="accounts"/>
    </div>
</template>

<script setup lang="ts">
import { AccountList, SBNavBar, SBUserTable } from "@/components";
import { type AccountInterface, DEFAULT_ACCOUNT } from "@/dto/Account";
import { ref, toRef, type Ref, computed } from "vue";
import { useServiceStore } from "@/stores";

interface Props {
    accounts?: AccountInterface[],
    editMode?: boolean,
    displayMode?: DisplayMode,
    navbar?: boolean,
}
const props = withDefaults(defineProps<Props>(), {
    editMode: false,
    displayMode: "List",
    navbar: true,
})
const editMode = toRef(props.editMode);

type DisplayMode = "Table" | "List";
const displayMode: Ref<DisplayMode> = toRef(props.displayMode);

const serviceStore = useServiceStore();

const loading: Ref<boolean> = ref(false);
const accounts: Ref<AccountInterface[]> = ref([DEFAULT_ACCOUNT]);
const displayData = computed(() => {
    let res: any = [];
    accounts.value.forEach(account => {
        res.push({username: account.username, id: account.id})
    })
    return res;
})

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