<template>
    <table style="margin: auto; text-align: center;" class="table">
        <thead>
            <th v-for="header in headers">{{ header }}</th>
        </thead>
        <tbody>
            <tr v-for="row in data">
                <td v-for="item in row">{{ item }}</td>
                <td><slot name="row" v-bind="row" /></td>
            </tr>
        </tbody>
    </table>
</template>

<script setup lang="ts">
import { ref, type Ref } from 'vue';

interface Props {
    data: any[],
}

const props = defineProps<Props>();

const headers: Ref<string[]> = ref([]); 

function init() {
    for (const key in props.data) {
        for (const item in props.data[key]) {
            if (!headers.value.includes(item)) {
                headers.value.push(item)
            }
        }
    }
}

init();
</script>