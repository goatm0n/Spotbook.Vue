<template>
    <div style="margin: auto; text-align: center;">
        <SBDetail :data="loginForm" :errors="errors" />
        <button type="button" @click="login" class="btn btn-primary">
            Login
        </button>
    </div>
</template>

<script setup lang="ts">
import { useForm } from 'vee-validate';
import { object, string } from 'yup';
import { SBDetail } from '.';
import { ref, type Ref } from 'vue';
import { useServiceStore } from '@/stores';
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';

const serviceStore = useServiceStore();

const validationSchema = object({
    email: string().required().email(),
    password: string().required(),
});
const { defineField, validate, errors } = useForm({validationSchema});
const [emailField] = defineField('email');
const [passwordField] = defineField('password');
const loginForm = ref({
    email: "",
    password: "",
});

async function login() {
    if (loginForm.value.email != undefined) {
        loginForm.value.email = loginForm.value.email.trim();
    }
    if (loginForm.value.password != undefined) {
        loginForm.value.password = loginForm.value.password.trim();
    }
    emailField.value = loginForm.value.email;
    passwordField.value = loginForm.value.password;
    const validation = await validate();
    if (validation.valid) {
        const payload = {email: emailField.value, password: passwordField.value}
        try {
            await serviceStore.login(payload);
            sessionStorage.setItem('email', emailField.value);
            toast.success("Login Successful!");
        } catch (err) {
            console.log(err);
            toast.error("Failed To Login");
        }
    }
}

</script>