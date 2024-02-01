<template>
    <Likes mode="Spot" :spotId="Number(props.spotId)" />
</template>

<script setup lang="ts">
import { Likes } from '@/components';
interface Props {
    spotId: string,
}
const props = defineProps<Props>();

</script>