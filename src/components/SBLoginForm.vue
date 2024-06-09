<template>
    <GTLoginForm 
        uniqueid="spotbook-login-form"
        :validationSchema="SBLoginFormDTOSchema"
        :loginForm="loginForm"
        @login="login"
    />
</template>

<script setup lang="ts">
import { ref, type Ref } from 'vue';
import { useServiceStore } from '@/stores';
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';
import { useRouter } from 'vue-router';
import { GTLoginForm } from "@goatm0n/goattools.vue.library.components";
import { SBLoginFormDTOSchema, type SBLoginFormDTO } from "@/dto";

//#region Provides
const serviceStore = useServiceStore();
const router = useRouter();
//#endregion

//#region Reactive Data
const loginForm: Ref<SBLoginFormDTO> = ref<SBLoginFormDTO>({
    email: "",
    password: "",
});
//#endregion

//#region Methods
async function login() {
    try {
        await serviceStore.login(loginForm.value);
    } catch {
        toast.error("Failed to Login");
        return
    }
    await router.push('/')
    toast.success("Login Successful!");
    return
}
</script>