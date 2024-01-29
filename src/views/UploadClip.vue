<template>
    <SBDetail :data="data" :errors="errors" />
    <button class="btn btn-primary" @click="handleUpload">Upload</button>
</template>

<script setup lang="ts">
import { SBDetail } from '@/components';
import { useForm } from 'vee-validate';
import { ref } from 'vue';
import { object, string } from 'yup';

interface Props {
    spotId: number,
}
const props = defineProps<Props>();

const validationSchema = object({
    textContent: string(),
});
const { defineField, validate, errors } = useForm({validationSchema});

const textContent = defineField('textContent');

const data = ref({
    textContent: textContent,
})

async function handleUpload() {
    
}

</script>