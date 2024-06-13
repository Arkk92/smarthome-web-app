<script setup lang="ts">
import SideMenu from '@/components/SideMenu/SideMenu.vue';
import type { SideMenuList } from '@/components/SideMenu/SideMenuTypes'
import AppLayout from '@/components/AppLayout.vue';
import DynamicLoader from '@/components/router/DynamicLoader.vue';

const sideMenuList: SideMenuList = [
  {iconClass: "bi bi-house-door", name: "Home", routerLink: ""},
  {iconClass: "bi bi-egg-fried", name: "Restaurant", routerLink: "restaurant"},
  {iconClass: "bi bi bi-diagram-3", name: "Devices", routerLink: "devices"},
];

</script>

<template>
  <div class="smart-home">
    <AppLayout>
      <template #sidemenu>
        <SideMenu :item-list="sideMenuList" />
      </template>
      <template #app>
        <!-- Build here the App -->
         <DynamicLoader/>
      </template>
    </AppLayout>
  </div>
</template>

<style scoped>
.app-padding {
  padding-left: 10px;
  padding-top: 10px;
}
</style>
