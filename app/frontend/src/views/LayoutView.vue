<script setup lang="ts">
import Header from '@/components/Header/Header.vue'
import Footer from '@/components/Footer/Footer.vue'
</script>

<template>
  <div class="container p-0 m-0 mw-100">
    <div class="container-fluid p-0 m-0">
      <div class="row m-0 p-0 sticky-top">
        <Header />
      </div>
      <div class="row m-0">
        <slot name="application"></slot>
      </div>
      <div class="row m-0 p-0 sticky-bottom">
        <Footer/>
      </div>
    </div>

  </div>
</template>

<style scoped>
</style>
