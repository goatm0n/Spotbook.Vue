<template>
    <div v-if="!loading" style="margin: auto; text-align: center;">
        <div v-for="account in accounts" style="border: 1px solid grey; border-radius: 16px; width: max-content; margin: auto; padding: 0.01em 16px;">
            <AccountDetail :id="(account.id)" :mode="mode"/>
        </div>
    </div>
</template>

<script setup lang="ts">
import { AccountDetail } from "@/components";
import { EAccountDetailMode, type AccountInterface } from "@/dto/Account";
import { ref, type Ref } from "vue";
import { useServiceStore } from "@/stores";

interface Props {
    accounts?: AccountInterface[],
    editMode?: boolean,
}

const props = withDefaults(defineProps<Props>(), {
    editMode: false,
});
const mode: Ref<EAccountDetailMode.EDIT | EAccountDetailMode.DETAIL> = props.editMode ? ref(EAccountDetailMode.EDIT) : ref(EAccountDetailMode.DETAIL);

const serviceStore = useServiceStore();

const loading: Ref<boolean> = ref(false);

const accounts: Ref<AccountInterface[] | undefined> = ref();

async function init() {
    if (props.accounts !== undefined) {
        accounts.value = props.accounts;
        return;
    }
    loading.value = true;
    accounts.value = await serviceStore.getAccounts();
    loading.value = false;
}

init();
</script>