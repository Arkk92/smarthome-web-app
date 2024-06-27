<template>
  <div class="meal card">
    <div class="card-header">
      <div v-if="props.model.id" class="row align-items-center justify-content-between">
        <div class="col">
          <h4 v-if="newModel.name != ''">{{ newModel.name }}</h4>
          <h4 v-else>New Meal</h4>
        </div>
        <div class="col-1">
          <button type="button" class="btn btn-danger" v-on:click="onDeleteMeal"><i class="bi bi-trash-fill"></i></button>
        </div>
      </div>
      <div v-else class="row align-items-center justify-content-between">
        <div class="col"><h4>New meal</h4></div>
      </div>
    </div>
    <div class="card-body">
      <form @submit.prevent="onSubmit">
        <div class="form-group row">
          <label for="name" class="col-sm-2 col-form-label">Name</label>
          <div class="col-sm-10">
            <input class="form-control" id="name" v-model="name">
            <span class="text-danger">{{ nameError }}</span>
          </div>
        </div>
        <div class="form-group row">
          <label for="mealTime" class="col-sm-2 col-form-label">Meal Time</label>
          <div class="col-sm-10">
            <select class="custom-select" v-model="mealTime">
              <option disabled value="">Select meal time...</option>
              <option v-for="time in Object.values(MealTime)" :key="time" :value="time">{{ time }}</option>
            </select>
            <span class="text-danger">{{ mealTimeError }}</span>
          </div>
        </div>
        <div class="form-group row">
          <label for="season" class="col-sm-2 col-form-label">Season</label>
          <div class="col-sm-10">
            <select class="custom-select" v-model="season">
              <option disabled value="">Select the season...</option>
              <option v-for="season in Object.values(Seasons)" :key="season" :value="season">{{ season }}</option>
            </select>
            <span class="text-danger">{{ seasonError }}</span>
          </div>
        </div>
        <div class="form-group row">
          <label class="col-sm-2 col-form-label">Settings</label>
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
          <label for="batchedMeals" class="col-sm-2 col-form-label">Batches</label>
          <div class="col-sm-10">
            <input class="form-control" type="number" min="0" placeholder="0" id="batchedMeals"
              v-model.number="batchMealCount">
            <span class="text-danger">{{ batchMealCountError }}</span>
          </div>
        </div>
        <div class="form-group row">
          <div class="col">
            <IngredientList :ingredient-list="newModel.ingridientList" @update:ingredient-list="handleIngredientListUpdate"/>
          </div>
        </div>
        <div class="form-group row">
          <div class="col">
            <Recipe :recipe="newModel.recipe as string[]" 
            @update:recipe-steps="handleRecipeUpdate" 
            />
          </div>
        </div>
        <div class="form-group row">
          <div class="col-sm-10">
            <button v-if="props.model.id" type="submit" class="btn btn-primary">Update
              meal</button>
            <button v-else type="submit" class="btn btn-primary">Create
              meal</button>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, defineProps, defineEmits } from 'vue';
import { useField, useForm } from 'vee-validate';
import * as yup from 'yup';
import { type MealInterface } from '@/apps/restaurant/domain/entities/Meal';
import IngredientList from './IngredientList.vue';
import type { IngridientInterface } from '@/apps/restaurant/domain/entities/Ingridient';
import Recipe from './Recipe.vue';
import MealApi from '../../services/http/axios/meal/MealApi';
import apiClient from '../../services/http/axios/api';
import defaultMealModel from './defaultMealModel';

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

const mealApi = new MealApi(apiClient);

const emit = defineEmits([
  'change:trigger'
])

const onCreateMeal = async (values: any) => {
  Object.assign(newModel.value, values);
  const model: MealInterface = {
    name: newModel.value.name,
    babyAllowed: newModel.value.babyAllowed,
    isVegetarian: newModel.value.isVegetarian,
    mealTime: newModel.value.mealTime,
    season: newModel.value.season,
    ingridientList: newModel.value.ingridientList,
    recipe: newModel.value.recipe,
    batchMealCount: newModel.value.batchMealCount,
  }
  const response: MealInterface | null = await mealApi.createMeal(model);
  if (response) {
    alert(response.name + " has been created successfully!")
    emit('change:trigger')
  } else {
    alert("Error creating the Meal")
  }
}

const onUpdateMeal = async (values: any) => {
  Object.assign(newModel.value, values);
  const model: MealInterface = {
    id: newModel.value.id,
    name: newModel.value.name,
    babyAllowed: newModel.value.babyAllowed,
    isVegetarian: newModel.value.isVegetarian,
    mealTime: newModel.value.mealTime,
    season: newModel.value.season,
    ingridientList: newModel.value.ingridientList,
    recipe: newModel.value.recipe,
    batchMealCount: newModel.value.batchMealCount,
  }
  const response: MealInterface | null = await mealApi.updateMeal(model);
  if (response) {
    alert(response.name + " has been updated successfully!")
    emit('change:trigger')
  } else {
    alert("Error updating the Meal")
  }
}

const onDeleteMeal = async () => {
  if(newModel.value.id){
    const response = await mealApi.deleteMealById(newModel.value.id as string); 
    if (response) {
      alert("The meal has been deleted successfully!")
      emit('change:trigger')
    } else {
      alert("Error deleting the Meal")
    }
  }
}

const props = defineProps<{
  model: MealInterface
}>()

const newModel = ref<MealInterface>(JSON.parse(JSON.stringify(defaultMealModel)))

const handleRecipeUpdate = (newRecipe: string[]) => {
  newModel.value.recipe = JSON.parse(JSON.stringify(newRecipe));
}

const handleIngredientListUpdate = (newList: IngridientInterface[]) => {
  newModel.value.ingridientList = JSON.parse(JSON.stringify(newList));
}

watch(() => props.model, () => {
  Object.assign(newModel.value, props.model)
  name.value = props.model?.name;
  mealTime.value = props.model?.mealTime;
  season.value = props.model?.season;
  batchMealCount.value = props.model?.batchMealCount;
})

// Validation schema using yup
const schema = yup.object({
  name: yup.string().required('Name is required'),
  mealTime: yup.string().required('Meal Time is required'),
  season: yup.string().required('Season is required'),
  batchMealCount: yup.number().required('Batch count is required').min(0, 'Batch count must be 0 or greater'),
});

const { handleSubmit } = useForm({
  validationSchema: schema,
  initialValues: {
    name: newModel.value.name,
    mealTime: newModel.value.mealTime,
    season: newModel.value.season,
    batchMealCount: newModel.value.batchMealCount,
  },
});

const onSubmit = async () => {
  try {
    if(props.model.id){
      await handleSubmit(onUpdateMeal)();
    } else {
      await handleSubmit(onCreateMeal)();
    }
  } catch (error) {
    console.error('Form submission error:', error);
  }
};

const { value: name, errorMessage: nameError } = useField('name');
const { value: mealTime, errorMessage: mealTimeError } = useField('mealTime');
const { value: season, errorMessage: seasonError } = useField('season');
const { value: batchMealCount, errorMessage: batchMealCountError } = useField('batchMealCount');


</script>
<style scoped></style>
