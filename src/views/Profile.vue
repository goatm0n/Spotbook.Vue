<template>
    <ProfileDetail :userId="Number(props.userId)"/>
    <ClipFeed mode="Profile" :userId="Number(props.userId)"/>
</template>

<script setup lang="ts">
import { ClipFeed, ProfileDetail } from '@/components';

interface Props {
    userId: number | string,
}
const props = defineProps<Props>();
</script>