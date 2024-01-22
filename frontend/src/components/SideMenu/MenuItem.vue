<script setup lang="ts">
import { RouterLink } from 'vue-router'

defineProps<{
  icon: string
  name: string
  link: string
}>()
</script>

<template>
  <RouterLink class="row menu-item" :to="'/' + link" exact-active-class="active">
    <div class="icon col-sm-1">
      <i :class="icon"></i>
    </div>
    <div class="description col">
      {{ name }}
    </div>

  </RouterLink>
</template>
  
<style scoped>
/* The navigation menu links */
.menu-item {
  text-decoration: none;
  font-weight: 500;
  color: #818181;
}

/* When you mouse over the navigation links, change their color */
.menu-item:hover {
  color: #f1f1f1;
}

.active {
  color: darkgreen;
}

/* On smaller screens, where height is less than 450px, change the style of the sidebar (less padding and a smaller font size) */
@media screen and (max-height: 450px) {
  .menu-item {
    font-size: 18px;
  }

}
</style>
  