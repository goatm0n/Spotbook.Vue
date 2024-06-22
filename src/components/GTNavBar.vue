<template>
  <div class="sbnav">
    <ul class="nav">
      <li v-for="routeName in navRoutes" class="nav-item">
        <RouterLink 
          v-if="!emit" 
          :to="{ name: routeName }" 
          class="nav-link"
        >
          {{ routeName }}
        </RouterLink>
        <button v-else class="nav-link" @click="$emit('emitRouteName', routeName)"><span>{{ routeName }}</span></button>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { useNavBarRouteNames } from '@/composables/useNavigationItems';
import { computed } from 'vue';
import { type RouteRecordName } from 'vue-router';

interface Props {
  routeNames?: string[],
  emit?: boolean,
}
const props = withDefaults(defineProps<Props>(), {
  emit: false,
});
const navRoutes = computed<RouteRecordName[]>(() => {
  if (props.routeNames && props.routeNames.length > 0) {
    return props.routeNames;
  }
  return useNavBarRouteNames();
});
</script>

<style>
.sbnav {
  color: green;
}
</style>