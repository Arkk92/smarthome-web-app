<script setup lang="ts">
</script>

<template>
  <div class="app-layout row">
    <div class="sidemenu col-md-1 m-0 p-0 bg-dark">
      <slot name="sidemenu"></slot>
    </div>
    <div class="app col m-0 app-padding">
      <slot name="app"></slot>
    </div>
  </div>
</template>

<style scoped>
.app-padding {
  padding-left: 10px;
  padding-top: 10px;
}
</style>
