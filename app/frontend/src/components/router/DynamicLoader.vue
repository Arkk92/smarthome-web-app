<template>
  <component :is="currentComponent"></component>
</template>

<script lang="ts">
import DashboardView from '@/apps/smart-home/views/DashboardView.vue';
import { defineComponent, computed, defineAsyncComponent } from 'vue';
import { useRoute } from 'vue-router';

export default defineComponent({
  name: 'DynamicLoader',
  setup() {
    const route = useRoute();

    const currentComponent = computed(() => {
      const matchedRoute = route.matched[route.matched.length - 1];
      if (matchedRoute && matchedRoute.components?.default) {
        const component = matchedRoute.components.default;
        // If it's a function, we assume it's a dynamic import
        if (typeof component === 'function') {
          return defineAsyncComponent(component as () => Promise<any>);
        } else {
          // If it's not a function, return the component directly
          return component;
        }
      } else {
        // Default to DashboardView component if no match is found
        return DashboardView;
      }
    });
    return {
      currentComponent
    };
  }
});
</script>
