<template>
    <ul style="list-style-type: none; padding: 0; margin: 0;">
        <li v-for="key in keys">
          <label :for="key">{{ key }}</label>
          <br>
          <input :id="key" type="text" v-model="data[key]"> 
          <p v-if="errors" :key="errors" style="color: red;">{{ errors[key] }}</p>
        </li>
        <slot name="data" v-bind="data"></slot>
    </ul>
</template>

<script setup lang="ts">
import { ref, toRef, type Ref } from 'vue';

interface Props {
    data: any,
    errors?: any,
}
const props = defineProps<Props>();

const data: Ref<any> = toRef(props.data);
const keys: Ref<string[]> = ref([]);

function init() {
    for (const key in data.value) {
        keys.value.push(key);
    }
}

init();
</script>