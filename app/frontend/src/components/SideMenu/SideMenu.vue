<script setup lang="ts">
import MenuItem from './MenuItem.vue';
import type { SideMenuList } from './SideMenuTypes';

defineProps<{
  itemList: SideMenuList
}>()
</script>

<template>
  <div class="container p-0 m-0">
    <nav class="sidenav bg-dark">
      <div class="d-flex flex-column flex-shrink-0 p-3 bg-dark text-white">
        <ul class="no-bullets m-0 p-0 position-fixed">
          <li v-for="item in itemList">
            <MenuItem :icon="item.iconClass" :link="item.routerLink" :name="item.name" />
          </li>
        </ul>
      </div>
    </nav>
  </div>
</template>

<style scoped>
ul.no-bullets {
  list-style-type: none;
  /* Remove bullets */
}


/* The sidebar menu */
.sidenav {
  height: 100vh;
  /* Full-height: remove this if you want "auto" height */
  width: auto;
  /* Set the width of the sidebar */
  z-index: 100;
  /* Black */
  overflow-x: hidden;
  /* Disable horizontal scroll */
  margin: auto;
  box-shadow: inset;
  display: block; /* Displayed by default */
}

.sidenav-fixed {
  position: fixed;
}

/* On smaller screens, where height is less than 450px, change the style of the sidebar (less padding and a smaller font size) */
@media screen and (max-height: 450px) {
  .sidenav {
    padding-top: 56px;
  }
}
/* Media query for hiding the sidenav on smaller screens */
@media screen and (max-width: 768px) {
  .sidenav {
    display: none; /* Hidden on screens with max-width of 768px */
  }
}
</style>
