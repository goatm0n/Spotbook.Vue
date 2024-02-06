<template>
    <div style="margin: auto; text-align: center;">
        <ProfileDetail :userId="Number(props.userId)"/>
        <RouterLink class="btn btn-sm btn-secondary" :to="`/spotsFeed/${props.userId}`">SpotsFeed</RouterLink>
        <ClipFeed mode="Profile" :userId="Number(props.userId)"/>
    </div>
</template>

<script setup lang="ts">
import { ClipFeed, ProfileDetail } from '@/components';

interface Props {
    userId: number | string,
}
const props = defineProps<Props>();
</script>