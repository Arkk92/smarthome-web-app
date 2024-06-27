<script setup lang="ts">
import { onMounted, ref, watch } from 'vue';
import Ingredient from '../components/Ingredient/Ingredient.vue'

import apiClient from '../services/http/axios/api';
import IngredientApi from '../services/http/axios/ingredient/IngredientApi';
import defaultIngredientModel from '../components/Ingredient/defaultIngredientModel';
import type { IngridientInterface } from '../../domain/entities/Ingridient';

const ingredientService = new IngredientApi(apiClient);

const filter = ref("");
let ingredientAllList: IngridientInterface[] = []
const ingredientToShow = ref<IngridientInterface[]>([])
const error = ref<string | null>(null);
const selectedIngredient = ref<IngridientInterface>(JSON.parse(JSON.stringify(defaultIngredientModel)));

onMounted(async () => {
  await fetchIngredientList();
});

async function fetchIngredientList() {
  try {
    const response = await ingredientService.fetchAllIngredients();
    if (response) {
      ingredientAllList = response
      ingredientToShow.value = ingredientAllList;
    }
  } catch (err) {

    if ((err as any).response.status == 404) {
      error.value = "No Ingredients found."
      ingredientToShow.value = [];
      selectedIngredient.value = JSON.parse(JSON.stringify(defaultIngredientModel));
    } else {
      error.value = (err as any).message;
    }
  }
}

async function onIngredientChange() {
  await fetchIngredientList();
  await onNewIngredientButton();
}

function onClickIngredient(ingredient: IngridientInterface) {
  selectedIngredient.value = ingredient;
}

async function onNewIngredientButton() {
  selectedIngredient.value = JSON.parse(JSON.stringify(defaultIngredientModel));
}


watch(filter, async () => {
  ingredientToShow.value = ingredientAllList.filter((ingredient => filter.value === "" || ingredient.name.includes(filter.value)))
})
</script>

<template>
  <div class="ingredients-view">
    <div class="card">
      <div class="card-header">Ingredient List</div>
      <div class="card-body">
        <div class="row">
          <div class="col-sm-3">
            <!-- Ingredient filter -->
            <div id="ingredient-filter">
              <div class="input-group mb-3">
                <input type="text" class="form-control" placeholder="Search ingredient..." aria-label="Search ingredient..."
                  aria-describedby="search-ingredient" v-model="filter">
                <div class="input-group-prepend">
                  <span class="input-group-text" id="search-ingredient"><i class="bi bi-search"></i></span>
                </div>
              </div>
            </div>
            <!-- Ingredient List -->
            <div id="ingredient-list" class="list-group">
              <a type="button" class="list-group-item list-group-item-action list-group-item-success"
                v-on:click="onNewIngredientButton">
                <div class="row">
                  <i class="bi bi-clipboard-plus-fill col-sm-1"></i><span class="col">New Ingredient</span>
                </div>
              </a>
              <div class="scrollable">
                <a class="list-group-item list-group-item-action" v-if="ingredientToShow.length > 0" v-for="ingredient of ingredientToShow"
                  v-on:click="onClickIngredient(ingredient as IngridientInterface)">{{ ingredient.name }}</a>
                <a class="list-group-item list-group-item-danger" v-else>{{ error }}</a>
              </div>
            </div>
          </div>
          <!-- Ingredient Details -->
          <div data-spy="scroll" data-offset="0" class="scrollspy-ingredient col">
            <div class="card">
              <Ingredient 
              :model="selectedIngredient as IngridientInterface" 
              @change:trigger="onIngredientChange"/>
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
</style>
