<template>
  <div class="ingredient card">
    <div class="card-header">
      <div v-if="props.model.id" class="row align-items-center justify-content-between">
        <div class="col">
          <h4 v-if="newModel.name != ''">{{ newModel.name }}</h4>
          <h4 v-else>New Ingredient</h4>
        </div>
        <div class="col-1">
          <button type="button" class="btn btn-danger" v-on:click="onDeleteIngredient"><i
              class="bi bi-trash-fill"></i></button>
        </div>
      </div>
      <div v-else class="row align-items-center justify-content-between">
        <div class="col">
          <h4>New ingredient</h4>
        </div>
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
        <div class="form-group row align-items-center">
          <label for="quantity" class="col-sm-2 col-form-label">Quantity</label>
          <div class="col">
            <input class="form-control" type="number" id="quantity" v-model="quantity">
            <span class="text-danger">{{ quantityError }}</span>
          </div>
          <label for="unit" class="col-sm-2">Unit</label>
          <div class="col">
            <input class="form-control" v-model="unit">
            <span class="text-danger">{{ unitError }}</span>
          </div>
        </div>
        <div class="form-group row">
          <label class="col-sm-2 col-form-label">API URL:</label>
          <div class="col-sm-10">
            <input class="form-control" id="apiUri" v-model="apiUri">
            <span class="text-danger">{{ apiUriError }}</span>
          </div>
        </div>
        <div class="form-group row">
          <div class="col-sm-10">
            <button v-if="props.model.id" type="submit" class="btn btn-primary">Update
              ingredient</button>
            <button v-else type="submit" class="btn btn-primary">Create
              ingredient</button>
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
import type { IngridientInterface } from '@/apps/restaurant/domain/entities/Ingridient';
import IngredientApi from '../../services/http/axios/ingredient/IngredientApi';
import apiClient from '../../services/http/axios/api';
import defaultIngredientModel from './defaultIngredientModel';

const ingredientApi = new IngredientApi(apiClient);

const emit = defineEmits([
  'change:trigger'
])

const onCreateIngredient = async (values: any) => {
  Object.assign(newModel.value, values);
  const model: IngridientInterface = {
    name: newModel.value.name,
    apiUri: newModel.value.apiUri,
    quantity: newModel.value.quantity,
    unit: newModel.value.unit
  }
  const response: IngridientInterface | null = await ingredientApi.createIngredient(model);
  if (response) {
    alert(response.name + " has been created successfully!")
    emit('change:trigger')
  } else {
    alert("Error creating the Ingredient")
  }
}

const onUpdateIngredient = async (values: any) => {
  Object.assign(newModel.value, values);

  const model: IngridientInterface = {
    id: newModel.value.id,
    name: newModel.value.name,
    apiUri: newModel.value.apiUri,
    quantity: newModel.value.quantity,
    unit: newModel.value.unit
  }
  const response: IngridientInterface | null = await ingredientApi.updateIngredient(model);
  if (response) {
    alert(response.name + " has been updated successfully!")
    emit('change:trigger')
  } else {
    alert("Error updating the Ingredient")
  }
}

const onDeleteIngredient = async () => {
  if (newModel.value.id) {
    const response = await ingredientApi.deleteIngredientById(newModel.value.id as string);
    if (response) {
      alert("The ingredient has been deleted successfully!")
      emit('change:trigger')
    } else {
      alert("Error deleting the Ingredient")
    }
  }
}

const props = defineProps<{
  model: IngridientInterface,
}>()

const newModel = ref<IngridientInterface>(JSON.parse(JSON.stringify(defaultIngredientModel)))

watch(() => props.model, () => {
  Object.assign(newModel.value, props.model)
  name.value = props.model?.name;
  quantity.value = props.model?.quantity;
  unit.value = props.model?.unit;
  apiUri.value = props.model?.apiUri;
})

// Validation schema using yup
const schema = yup.object({
  name: yup.string().required('Name is required'),
  quantity: yup.number().required('Quantity is required'),
  unit: yup.string().required('Unit is required'),
  apiUri: yup.string()
});

const { handleSubmit } = useForm({
  validationSchema: schema,
  initialValues: {
    name: newModel.value.name,
    quantity: newModel.value.quantity,
    unit: newModel.value.unit,
    apiUri: newModel.value.apiUri,
  },
});

const onSubmit = async () => {
  try {
    if (props.model.id) {
      await handleSubmit(onUpdateIngredient)();
    } else {
      await handleSubmit(onCreateIngredient)();
    }
  } catch (error) {
    console.error('Form submission error:', error);
  }
};

const { value: name, errorMessage: nameError } = useField('name');
const { value: quantity, errorMessage: quantityError } = useField('quantity');
const { value: unit, errorMessage: unitError } = useField('unit');
const { value: apiUri, errorMessage: apiUriError } = useField('apiUri');


</script>
<style scoped></style>
