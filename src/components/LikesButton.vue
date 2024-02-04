<template>
    <RouterLink 
        :to="{name: routeName, params: routeParams}" 
        :class="props.class"
    >
        Likes
        <br>
        {{ props.count }}
    </RouterLink>
</template>

<script setup lang="ts">
import { computed, type ComputedRef } from 'vue';


type Mode = 'Spot' | 'Clip';

interface Props {
    mode: Mode,
    spotId?: number,
    clipId?: number,
    count: number,
    class?: string,
}
const props = withDefaults(defineProps<Props>(), {
    class: "btn btn-primary",
});

const routeName: ComputedRef<string> = computed(() => {
    return props.mode === 'Spot' ? 'Spot Likes' : 'Clip Likes';
})
const routeParams = computed(() => {
    return props.mode === 'Spot' ? { spotId: props.spotId } : { clipId: props.clipId }
})
</script>