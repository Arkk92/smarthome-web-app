<script setup lang="ts">
import { ref, watch } from 'vue';
import { type MealInterface } from '@/apps/restaurant/domain/entities/Meal';
import IngredientList from './IngredientList.vue';
import type { Ingridient, IngridientInterface } from '@/apps/restaurant/domain/entities/Ingridient';
import Recipe from './Recipe.vue';

enum MealTime {
  Breakfast = "Breakfast",
  Lunch = "Lunch",
  Dinner = "Dinner",
}

enum Seasons {
  Any = "Any",
  Warm = "Warm",
  Cold = "Cold",
}

const ingredientList = [{ id: 'asd', name: "ingredient 1", quantity: 2, apiUri: "", unit: "V" } as IngridientInterface]

const onCreateMeal = () => {
  const model: MealInterface = {
    name: newModel.value.name,
    babyAllowed: newModel.value.babyAllowed,
    isVegetarian: newModel.value.isVegetarian,
    mealTime: newModel.value.mealTime,
    season: newModel.value.season,
    ingridientList: newModel.value.ingridientList as Ingridient[],
    recipe: newModel.value.recipe,
    batchMealCount: newModel.value.batchMealCount,
  }
  console.log(model)
}

const onUpdateMeal = () => {
  const model: MealInterface = {
    name: newModel.value.name,
    babyAllowed: newModel.value.babyAllowed,
    isVegetarian: newModel.value.isVegetarian,
    mealTime: newModel.value.mealTime,
    season: newModel.value.season,
    ingridientList: newModel.value.ingridientList as Ingridient[],
    recipe: newModel.value.recipe,
    batchMealCount: newModel.value.batchMealCount,
  }
  console.log(model)
}

const props = defineProps<{
  model?: MealInterface
}>()

const defaultMealModel: MealInterface = {
  id: undefined,
  name: '',
  babyAllowed: false,
  isVegetarian: false,
  mealTime: MealTime.Breakfast,
  season: Seasons.Any,
  ingridientList: [],
  recipe: [],
  batchMealCount: 0,
}

const newModel = ref<MealInterface>({
  id: props.model ? props.model.id : defaultMealModel.id,
  name: props.model ? props.model.name : defaultMealModel.name,
  babyAllowed: props.model ? props.model.babyAllowed : defaultMealModel.babyAllowed,
  isVegetarian: props.model ? props.model.isVegetarian : defaultMealModel.isVegetarian,
  mealTime: props.model ? props.model.mealTime : defaultMealModel.mealTime,
  season: props.model ? props.model.season : defaultMealModel.season,
  ingridientList: props.model ? props.model.ingridientList : defaultMealModel.ingridientList,
  recipe: props.model ? props.model.recipe : defaultMealModel.recipe,
  batchMealCount: props.model ? props.model.batchMealCount : defaultMealModel.batchMealCount,
})

const handleRecipeUpdate = (newRecipe: string[]) => {
  newModel.value.recipe = newRecipe;
}

const handleIngredientListUpdate = (newList: Ingridient[]) => {
  newModel.value.ingridientList = newList;
}
</script>

<template>
  <link href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" rel="stylesheet" />
  <div class="meal card">
    <div class="card-header">
      <div v-if="model">{{ model.name }}</div>
      <div v-else>New meal</div>
    </div>
    <div class="card-body">
      <form @submit.prevent>
        <div class="form-group row">
          <label for="name" class="col-sm-2 col-form-label">Name</label>
          <div class="col-sm-10">
            <input class="form-control" id="name" v-model="newModel.name">
          </div>
        </div>
        <div class="form-group row">
          <label for="inputPassword3" class="col-sm-2 col-form-label">Meal Time</label>
          <div class="col-sm-10">
            <select class="custom-select" v-model="newModel.mealTime">
              <option selected>Select meal time...</option>
              <option v-for="time of MealTime" value="{{time}}">{{ time }}</option>
            </select>

          </div>
        </div>
        <div class="form-group row">
          <label for="inputPassword3" class="col-sm-2 col-form-label">Season</label>
          <div class="col-sm-10">
            <select class="custom-select" v-model="newModel.season">
              <option selected>Select the season...</option>
              <option v-for="season of Seasons" value="{{season}}">{{ season }}</option>
            </select>
          </div>
        </div>
        <div class="form-group row">
          <label for="inputPassword3" class="col-sm-2 col-form-label">Settings</label>
          <div class="col-sm-10">
            <div class="custom-control custom-switch">
              <input type="checkbox" class="custom-control-input" id="vegetarianSwitch" v-model="newModel.isVegetarian">
              <label class="custom-control-label" for="vegetarianSwitch">Vegetarian</label>
            </div>
            <div class="custom-control custom-switch">
              <input type="checkbox" class="custom-control-input" id="babyAllowedSwitch" v-model="newModel.babyAllowed">
              <label class="custom-control-label" for="babyAllowedSwitch">Allowed for babies</label>
            </div>
          </div>
        </div>
        <div class="form-group row">
          <label for="name" class="col-sm-2 col-form-label">Batches</label>
          <div class="col-sm-10">
            <input class="form-control" type="number" min="0" placeholder="0" id="batchedMeals"
              v-model="newModel.batchMealCount">
          </div>
        </div>
        <div class="form-group row">
          <div class="col">
            <IngredientList :ingredient-list="ingredientList" @update:ingredient-list="handleIngredientListUpdate">
            </IngredientList>
          </div>
        </div>
        <div class="form-group row">
          <div class="col">
            <Recipe @update:recipe-steps="handleRecipeUpdate" />
          </div>
        </div>
        <div class="form-group row">
          <div class="col-sm-10">
            <button v-if="model" type="submit" class="btn btn-primary" v-on:click="onCreateMeal()">Create meal</button>
            <button v-else type="submit" class="btn btn-primary" v-on:click="onUpdateMeal()">Create meal</button>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<style scoped></style>
