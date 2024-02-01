<template>
        <div style="margin: auto; text-align: center;">
            <div v-if="!image">
                <ImageUpload @image="val => image = val" @image-file="val => imageFile = val"/>
            </div>
            <div v-if="image">
                <img :src="image" style="max-width: 50%; max-height: 50%;">
            </div>
            <SBDetail :data="data" :errors="errors" />
            <button class="btn btn-primary" @click="handleUpload">Upload Clip</button>
        </div>
</template>

<script setup lang="ts">
import { SBDetail, ImageUpload } from '@/components';
import type { ClipForm } from '@/dto';
import { useServiceStore } from '@/stores';
import { useForm } from 'vee-validate';
import { reactive, ref, watch, type Ref } from 'vue';
import { object, string } from 'yup';

const serviceStore = useServiceStore();

interface Props {
    spotId: number | string,
}
const props = defineProps<Props>();

const validationSchema = object({
    textContent: string().matches(RegExp('^[A-Za-z0-9., ]+$')),
});
const { defineField, validate, errors } = useForm({validationSchema});

const [textContent] = defineField('textContent');

const data = reactive({
    textContent: textContent,
});
const image = ref();
const imageFile: Ref<File | undefined> = ref()

async function handleUpload() {
    if (textContent.value != undefined) {
        textContent.value = textContent.value.trim();
        if (textContent.value.length === 0) {
            textContent.value = undefined;
        }
    }
    const validation = await validate();
    if (validation.valid) {
        const postData: ClipForm = {
            spot: Number(props.spotId),
            textContent: textContent.value,
            image: imageFile.value 
        }
        await serviceStore.uploadClip(postData)
    }
}

function handleImageUpload(e: Event) {
    if (!e) {
        return;
    }
    const inputElem = e.target as HTMLInputElement;
    const files = inputElem.files;
    if (!files?.length) {
        return;
    }
    imageFile.value = files[0];
    const reader = new FileReader();
    reader.onloadend = function() {
        image.value = reader.result;
    }
    reader.readAsDataURL(imageFile.value);
}

</script>

<style>
input[type="file"] {
    display: none;
}
.custom-form-label {
    border: 1px solid black;
    display: inline-block;
    padding: 6px 12px;
    cursor: pointer;
}
</style>