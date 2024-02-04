<template>
    <button 
        v-if="!showLink"
        type="button" 
        class="btn btn-sm btn-secondary" 
        @click="showLink=true"
    >
        Share
    </button>
    <div v-if="showLink">
        {{ link }}
    </div>

</template>

<script setup lang="ts">
import { ref, type Ref } from 'vue';

interface Props {
    link: string,
}
const props = defineProps<Props>();
const showLink: Ref<boolean> = ref(false);
</script>