<script setup lang="ts">
import { onMounted, ref, watch } from 'vue';
import Meal from '../components/Meal/Meal.vue'
import type { MealInterface } from '../../domain/entities/Meal';
import apiClient from '../services/http/axios/api';
import MealApi from '../services/http/axios/meal/MealApi';

const mealService = new MealApi(apiClient);


const filter = ref("");
let mealAllList: MealInterface[] = []
const mealToShow = ref<MealInterface[]>([])
const error = ref<string | null>(null);
const selectedMeal = ref<MealInterface | null>();

onMounted(async () => {
  try {
    const response = await mealService.fetchAllMeals();
    if(response){
      mealAllList = response
      mealToShow.value = mealAllList;
    }
  } catch (err) {
    
    if((err as any).response.status == 404){
      error.value = "No Meals found."
    } else {
      error.value = (err as any).message;
    }
  }
});

function onClickMeal(meal: MealInterface){
  selectedMeal.value = meal;
}


watch(filter, async () => {
  mealToShow.value = mealAllList.filter((meal => filter.value === "" || meal.name.includes(filter.value)))
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
                v-for="meal of mealToShow" v-on:click="onClickMeal(meal as MealInterface)">{{ meal.name }}</a>
              <a class="list-group-item list-group-item-danger" v-else>{{ error }}</a>
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
