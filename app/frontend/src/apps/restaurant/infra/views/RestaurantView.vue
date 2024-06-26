<script setup lang="ts">
import { ref } from 'vue';
import MealsView from './MealsView.vue'
import IngredientsView from './IngredientsView.vue';

const restaurantOptions = [
  { name: 'List of Meals', componentView: MealsView },
  { name: 'List of Ingredients', componentView: IngredientsView },
  { name: 'Week Schedule', componentView: null }
]
const componentView = ref(MealsView)

</script>

<template>
  <div class="restaurant-view">
    <div class="card">
      <div class="card-header">Restaurant</div>
      <div class="card-body">
        <h5 class="card-title">Build your own menu!</h5>
        <p class="card-text">Tell the cheff what you want to do...</p>
        <div class="btn-group" role="group" aria-label="Restaurant Options button group">
          <button v-for="option of restaurantOptions" class="btn btn-primary" v-on:click="componentView=option.componentView as any">{{ option.name }}</button>
        </div>
      </div>
    </div>
    <br/>
    <component :is="componentView"></component>
    <br/>
  </div>
</template>

<style scoped></style>
