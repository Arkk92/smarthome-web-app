<script setup lang="ts">
import { ref, watch } from 'vue';
import Meal from '../components/Meal/Meal.vue'

const filter = ref("");
const mealAllList = ["meal1", "meal2", "meal3", "meal4"]
const mealToShow = ref(mealAllList);
const selectedMeal = ref("")
watch(filter, async () => {
  mealToShow.value = mealAllList.filter((meal => filter.value === "" || meal.includes(filter.value)))
})
</script>

<template>
  <div class="meals-view">
    <div class="card">
      <div class="card-header">Meals</div>
      <div class="card-body">
        <div class="row">
          <div class="col-sm-3">
            <div id="meal-filter">
              <div class="input-group mb-3">
                <input type="text" class="form-control" placeholder="Search meal..." aria-label="Search meal..."
                  aria-describedby="search-meal" v-model="filter">
                <div class="input-group-prepend">
                  <span class="input-group-text" id="search-meal"><i class="bi bi-search"></i></span>
                </div>
                
              </div>
            </div>
            <div id="meal-list" class="list-group">
              <a class="list-group-item list-group-item-action" v-if="mealToShow.length > 0"
                v-for="meal of mealToShow" v-on:click="selectedMeal=meal">{{ meal }}</a>
              <a class="list-group-item list-group-item-danger" v-else>No meals found. Remove filter and try again</a>
            </div>
          </div>
          <div data-spy="scroll" data-offset="0" class="scrollspy-meal col">
            <div v-if="selectedMeal" class="card">
              <div class="card-header">{{ selectedMeal }}</div>
              <div class="card-body">
              </div>
            </div>
            <div v-else>
              <Meal/>
            </div>

          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<style scoped></style>
