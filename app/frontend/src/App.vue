<script setup lang="ts">
import SmartHome from './apps/smart-home/SmartHome.vue';
import LayoutView from './apps/common/views/LayoutView.vue';
</script>

<template>
  <LayoutView>
    <template #application>
      <SmartHome/>
    </template>
  </LayoutView>
  
</template>

<style>
</style>
