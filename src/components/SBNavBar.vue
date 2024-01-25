<template>
  <div class="sbnav">
    <ul class="nav">
      <li v-for="routeName in props.routeNames" class="nav-item">
        <RouterLink v-if="!emit" :to="{ name: routeName }" class="nav-link">{{ routeName }}</RouterLink>
        <button v-else class="nav-link" @click="$emit('emitRouteName', routeName)"><span>{{ routeName }}</span></button>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
interface Props {
  routeNames?: string[],
  emit?: boolean,
}
const props = withDefaults(defineProps<Props>(), {
  routeNames: [
    'Home', 
    'Admin', 
    'Accounts', 
    'Create Account', 
    'Profiles', 
    'Spots', 
    'Spot Map',
    'Login',
  ] as any,
  emit: false,
});
</script>

<style>
.sbnav {
  color: green;
}
</style>