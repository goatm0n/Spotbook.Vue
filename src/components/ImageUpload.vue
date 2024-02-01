<template>
    <label 
        for="file-input" 
        class="btn btn-secondary"
    >
        Click to Upload Image
    </label>
    <input 
        v-on:change="handleImageUpload" 
        type="file" 
        class="form-control" 
        id="file-input" 
        accept="image/png image/jpeg
    ">
</template>

<script setup lang="ts">
const emit = defineEmits(['image', 'imageFile']);
function handleImageUpload(e: Event) {
    if (!e) {
        return;
    }
    const inputElem = e.target as HTMLInputElement;
    const files = inputElem.files;
    if (!files?.length) {
        return;
    }
    const imageFile = files[0];
    const reader = new FileReader();
    reader.onloadend = function() {
        const image = reader.result;
        emit('image', image);
        emit('imageFile', imageFile);
    }
    reader.readAsDataURL(imageFile);
}
</script>