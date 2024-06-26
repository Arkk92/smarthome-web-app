<script setup lang="ts">
import { onMounted, ref, watch } from 'vue';
import Meal from '../components/Meal/Meal.vue'
import type { MealInterface } from '../../domain/entities/Meal';
import apiClient from '../services/http/axios/api';
import MealApi from '../services/http/axios/meal/MealApi';
import type { IngridientInterface } from '../../domain/entities/Ingridient';
import defaultMealModel from '../components/Meal/defaultMealModel';

const mealService = new MealApi(apiClient);


const filter = ref("");
let mealAllList: MealInterface[] = []
const mealToShow = ref<MealInterface[]>([])
const error = ref<string | null>(null);
const selectedMeal = ref<MealInterface>(JSON.parse(JSON.stringify(defaultMealModel)));
const ingredientList = [{ id: 'asd', name: "ingredient 1", quantity: 2, apiUri: "", unit: "V" } as IngridientInterface]
onMounted(async () => {
  await fetchMealList();
});

async function fetchMealList() {
  try {
    const response = await mealService.fetchAllMeals();
    if (response) {
      mealAllList = response
      mealToShow.value = mealAllList;
    }
  } catch (err) {

    if ((err as any).response.status == 404) {
      error.value = "No Meals found."
      mealToShow.value = [];
      selectedMeal.value = JSON.parse(JSON.stringify(defaultMealModel));
    } else {
      error.value = (err as any).message;
    }
  }
}

async function onMealChange() {
  await fetchMealList();
}

function onClickMeal(meal: MealInterface) {
  selectedMeal.value = meal;
}

async function onNewMealButton() {
  selectedMeal.value = JSON.parse(JSON.stringify(defaultMealModel));
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
            <!-- Meal filter -->
            <div id="meal-filter">
              <div class="input-group mb-3">
                <input type="text" class="form-control" placeholder="Search meal..." aria-label="Search meal..."
                  aria-describedby="search-meal" v-model="filter">
                <div class="input-group-prepend">
                  <span class="input-group-text" id="search-meal"><i class="bi bi-search"></i></span>
                </div>
              </div>
            </div>
            <!-- Meal List -->
            <div id="meal-list" class="list-group">
              <a type="button" class="list-group-item list-group-item-action list-group-item-success"
                v-on:click="onNewMealButton">
                <div class="row">
                  <i class="bi bi-clipboard-plus-fill col-sm-1"></i><span class="col">New Meal</span>
                </div>
              </a>
              <a class="list-group-item list-group-item-action" v-if="mealToShow.length > 0" v-for="meal of mealToShow"
                v-on:click="onClickMeal(meal as MealInterface)">{{ meal.name }}</a>
              <a class="list-group-item list-group-item-danger" v-else>{{ error }}</a>
            </div>
          </div>
          <!-- Meal Details -->
          <div data-spy="scroll" data-offset="0" class="scrollspy-meal col">
            <div class="card">
              <Meal :model="selectedMeal as MealInterface" :ingredient-list="ingredientList"
                @change:trigger="onMealChange"> </Meal>
            </div>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<style scoped></style>
