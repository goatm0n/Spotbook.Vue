<template>
  <div class="sbnav">
    <ul class="nav">
      <li v-for="routeName in routeNames" class="nav-item">
        <RouterLink v-if="!emit" :to="{ name: routeName }" class="nav-link">{{ routeName }}</RouterLink>
        <button v-else class="nav-link" @click="$emit('emitRouteName', routeName)"><span>{{ routeName }}</span></button>
      </li>
      <li v-if="userId && !props.routeNames" class="nav-item">
        <RouterLink :to="`/profile/${userId}`" class="nav-link">Profile</RouterLink>
      </li>
      <li v-if="userId && !props.routeNames" class="nav-item">
        <RouterLink :to="`/spotfeed/${userId}`" class="nav-link">Spotfeed</RouterLink>
      </li>
      <li v-if="userId && !props.routeNames" class="nav-item">
        <RouterLink :to="`/spotlists`" class="nav-link">Spotlists</RouterLink>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { computed, toRef, type ComputedRef } from 'vue';

interface Props {
  routeNames?: string[],
  emit?: boolean,
}
const props = withDefaults(defineProps<Props>(), {
  emit: false,
});
const routeNames = toRef(props.routeNames);
const userId: ComputedRef<string|null> = computed(() => {
  return sessionStorage.getItem('userId')
});

function init() {
  if (props.routeNames === undefined) {
    routeNames.value = [
      'Home', 
      'Users', 
      'Create Account',       
      'Spots',
      'Login'
    ] 
  }
}
init();
</script>

<style>
.sbnav {
  color: green;
}
</style>