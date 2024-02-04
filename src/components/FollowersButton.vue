<template>
    <RouterLink 
        :to="{name: routeName, params: routeParams}" 
        :class="props.class"
    >
        Followers
        <br>
        {{ props.count }}
    </RouterLink>
</template>

<script setup lang="ts">
import { computed, type ComputedRef } from 'vue';


type Mode = 'Spot' | 'Profile';

interface Props {
    mode: Mode,
    spotId?: number,
    userId?: number,
    count: number,
    class?: string,
}
const props = withDefaults(defineProps<Props>(), {
    class: "btn btn-success"
});

const routeName: ComputedRef<string> = computed(() => {
    return props.mode === 'Spot' ? 'Spot Followers' : 'Profile Followers';
})
const routeParams = computed(() => {
    return props.mode === 'Spot' ? { spotId: props.spotId } : { userId: props.userId }
})
</script>