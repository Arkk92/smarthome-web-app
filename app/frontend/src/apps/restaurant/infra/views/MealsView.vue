<script setup lang="ts">
import { onMounted, ref, watch } from 'vue';
import Meal from '../components/Meal/Meal.vue'
import type { MealInterface } from '../../domain/entities/Meal';
import apiClient from '../services/http/axios/api';
import MealApi from '../services/http/axios/meal/MealApi';
import defaultMealModel from '../components/Meal/defaultMealModel';

enum MealTime {
  Breakfast = "Breakfast",
  Lunch = "Lunch",
  Dinner = "Dinner",
}

type MealFilter = {
  breakfast: boolean,
  lunch: boolean,
  dinner: boolean,
  babyAllowed: boolean,
  vegetarian: boolean,
}

const mealService = new MealApi(apiClient);


const textFilter = ref("");
const mealFilter = ref<MealFilter>({
  breakfast: true,
  lunch: true,
  dinner: true,
  babyAllowed: false,
  vegetarian: false,
})
let mealAllList: MealInterface[] = []
const mealToShow = ref<MealInterface[]>([])
const error = ref<string | null>(null);
const selectedMeal = ref<MealInterface>(JSON.parse(JSON.stringify(defaultMealModel)));
const totalMealNumber = ref<number>(0)
const totalBreakfastNumber = ref<number>(0);
const totalLunchNumber = ref<number>(0);
const totalDinnerNumber = ref<number>(0);

onMounted(async () => {
  await fetchMealList();
});

async function fetchMealList() {
  try {
    const response = await mealService.fetchAllMeals();
    if (response) {
      mealAllList = response
      mealToShow.value = mealAllList;
      updateSummaryTable()

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
  await onNewMealButton();
}

function onClickMeal(meal: MealInterface) {
  selectedMeal.value = meal;
}

async function onNewMealButton() {
  selectedMeal.value = JSON.parse(JSON.stringify(defaultMealModel));
}

function filterByName(mealList: MealInterface[], name: string): MealInterface[] {
  if (name === "") {
    return mealList;
  }
  return mealList.filter((meal => meal.name.toLowerCase().includes(name.toLowerCase())))
}
function filterByProperties(mealList: MealInterface[], filter: MealFilter): MealInterface[] {
  let filt = mealList.filter(meal =>
    filter.breakfast && meal.mealTime === MealTime.Breakfast ||
    filter.lunch && meal.mealTime === MealTime.Lunch ||
    filter.dinner && meal.mealTime === MealTime.Dinner
  )
  if(filter.babyAllowed){
    filt = filt.filter(meal => (meal.babyAllowed && filter.babyAllowed))
  }
  if(filter.vegetarian){
    filt = filt.filter(meal => (meal.isVegetarian && filter.vegetarian))
  }
  return filt;
  
}

function updateSummaryTable() {
  totalMealNumber.value = mealToShow.value.length
  totalBreakfastNumber.value = mealToShow.value.filter(meal => meal.mealTime === MealTime.Breakfast).length
  totalLunchNumber.value = mealToShow.value.filter(meal => meal.mealTime === MealTime.Lunch).length
  totalDinnerNumber.value = mealToShow.value.filter(meal => meal.mealTime === MealTime.Dinner).length
}

function resetFilter(){
  mealToShow.value = mealAllList;
  mealFilter.value.babyAllowed = true;
  mealFilter.value.vegetarian = true;
  mealFilter.value.breakfast = true;
  mealFilter.value.dinner = true;
  mealFilter.value.lunch = true;
}

watch(mealFilter.value, async () => {
  const filteredList = filterByProperties(mealAllList, mealFilter.value);
  mealToShow.value = filterByName(filteredList, textFilter.value)
  updateSummaryTable()

})
watch(textFilter, async () => {
  const filteredList  = filterByName(mealAllList, textFilter.value)
  mealToShow.value= filterByProperties(filteredList, mealFilter.value);
  updateSummaryTable()
})
</script>

<template>
  <div class="meals-view">
    <div class="card">
      <div class="card-header">
        <h2>Meals</h2>
      </div>
      <div class="card-body">
        <div class="row">
          <div class="col-sm-3">
            <!-- summary table -->
            <table class="table table-striped mb-0">
              <thead class="thead-light">
                <th>Breakfast</th>
                <th>Lunch</th>
                <th>Dinner</th>
                <th>Total</th>
              </thead>
              <tbody>
                <tr>
                  <td>{{ totalBreakfastNumber }}</td>
                  <td>{{ totalLunchNumber }}</td>
                  <td>{{ totalDinnerNumber }}</td>
                  <td>{{ totalMealNumber }}</td>
                </tr>
              </tbody>
            </table>

            <!-- Meal filter -->
            <div id="meal-filter">
              <div class="input-group mb-3">
                <input type="text" class="form-control" placeholder="Search meal..." aria-label="Search meal..."
                  aria-describedby="search-meal" v-model="textFilter">
                <div class="input-group-prepend">
                  <span class="input-group-text" id="search-meal"><i class="bi bi-search"></i></span>
                </div>
                <div class="dropdown">
                  <button class="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown"
                    aria-expanded="false">
                    <i class="bi bi-filter"></i>
                  </button>
                  <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                    <a v-on:click="resetFilter()">Reset</a>
                    <a v-for="(key, index) in Object.keys(mealFilter)" :key="key" class="dropdown-item"
                      @click.native.capture.stop>
                      <div class="custom-control custom-switch">
                        <input type="checkbox" class="custom-control-input" :id="`switch-${key}`"
                          v-model="mealFilter[key]">
                        <label class="custom-control-label" :for="`switch-${key}`">{{ key.toLowerCase() }}</label>
                      </div>
                    </a>
                  </div>
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
              <div class="scrollable">
                <a class="list-group-item list-group-item-action" v-if="mealToShow.length > 0"
                  v-for="meal of mealToShow" v-on:click="onClickMeal(meal as MealInterface)">{{ meal.name }}</a>
                <a class="list-group-item list-group-item-danger" v-else>{{ error }}</a>
              </div>
            </div>
          </div>
          <!-- Meal Details -->
          <div data-spy="scroll" data-offset="0" class="scrollspy-meal col">
            <div class="card">
              <Meal :model="selectedMeal as MealInterface" @change:trigger="onMealChange" />
            </div>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<style scoped>
.scrollable {
  max-height: 400px;
  /* margin-bottom: 10px; */
  overflow: scroll;
  -webkit-overflow-scrolling: touch;
}

td {
  text-align: center;
}

th {
  text-align: center;
}
</style>
