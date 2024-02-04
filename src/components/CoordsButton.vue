<template>
    <button
        v-if="!showCoords"
        type="button"
        class="btn btn-sm btn-secondary"
        @click="showCoords=true"
    >
        coordinates
    </button>
    <div v-if="showCoords">
        {{ props.coords }}
    </div>
</template>

<script setup lang="ts">
import { ref, type Ref } from 'vue';

interface Props {
    coords: number[],
}
const props = defineProps<Props>();
const showCoords: Ref<boolean> = ref(false);
</script>