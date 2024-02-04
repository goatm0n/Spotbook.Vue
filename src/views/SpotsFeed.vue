<template>
    <SBNavBar :routeNames="spotListNames" :emit="true" @emitRouteName="val => spotListName = val"/>
</template>

<script setup lang="ts">
import { SBNavBar } from '@/components';
import { ref, watch } from 'vue';


interface Props {
    userId: string | number,
}
const spotListName = ref();
const spotListNames: string[] = [
    'following',
    'likes',
]
watch(spotListName, (val) => {
    console.log(val);
});

const props = defineProps<Props>();
</script>