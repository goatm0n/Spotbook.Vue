<template>
    <Likes mode="Clip" :clipId="Number(props.clipId)" />
</template>

<script setup lang="ts">
import { Likes } from '@/components';
interface Props {
    clipId: string,
}
const props = defineProps<Props>();

</script>