<template>
    SpotsFeed {{ props.userId }}
</template>

<script setup lang="ts">

interface Props {
    userId: string | number,
}

const spotListNames: string[] = [
    ''
]

const props = defineProps<Props>();
</script>