<script setup lang="ts">
import type { IngridientInterface } from '@/apps/restaurant/domain/entities/Ingridient';
import { onMounted, ref, watch } from 'vue';
import IngredientApi from '../../services/http/axios/ingredient/IngredientApi';
import apiClient from '../../services/http/axios/api';

const ingredientService = new IngredientApi(apiClient);

const emit = defineEmits(['update:ingredientList']);

// Method to emit the updated list
const updateIngredientList = () => {
  emit('update:ingredientList', selectedIngredients.value);
};
const props = defineProps<{
    
}>();


const selectedIngredients = ref<IngridientInterface[]>([]);

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
    } else {
      error.value = (err as any).message;
    }
  }
}

// Watch for changes in recipeSteps and emit the event
watch(selectedIngredients, () => {
  emit('update:ingredientList', selectedIngredients.value);
});

const isSelected = (ingredient: IngridientInterface): boolean => {
    return selectedIngredients.value.some(
        (selected) => selected.id === ingredient.id
    );
};

const toggleIngredient = (ingredient: IngridientInterface) => {
    const index = selectedIngredients.value.findIndex(
        (selected) => selected.id === ingredient.id
    );

    if (index === -1) {
        selectedIngredients.value.push(ingredient);
    } else {
        selectedIngredients.value.splice(index, 1);
    }
    updateIngredientList();
};

const filter = ref("");
let ingredientAllList: IngridientInterface[] = []
const ingredientToShow = ref<IngridientInterface[]>([])
const error = ref<string | null>(null);

watch(filter, async () => {
    ingredientToShow.value = ingredientAllList.filter((ingredient => filter.value === "" || ingredient.name.includes(filter.value)))
})

</script>

<template>
    <div class="card">
        <div class="card-header">
            Ingredients
        </div>
        <div class="card-body">
            <div class="container">
                <div class="row">
                    <div class="col">
                        <div id="ingredient-filter">
                            <div class="input-group mb-3">
                                <input type="text" class="form-control" placeholder="Search ingredient..."
                                    aria-label="Search ingredient..." aria-describedby="search-ingredient" v-model="filter">
                                <div class="input-group-prepend">
                                    <span class="input-group-text" id="search-ingredient"><i class="bi bi-search"></i></span>
                                </div>
                            </div>
                        </div>
                        <div id="ingredient-list" class="list-group">
                            <a class="list-group-item" v-if="ingredientToShow.length > 0" v-for="ingredient in ingredientToShow"
                                :key="ingredient.id?.toString()">
            
                                <div class="custom-control custom-switch">
                                    <input type="checkbox" class="custom-control-input" :id="'ingredient-' + ingredient.id"
                                        :checked="isSelected(ingredient)" @change="toggleIngredient(ingredient)" />
                                    <label class="custom-control-label" :for="'ingredient-' + ingredient.id">
                                        {{ ingredient.name }}
                                    </label>
                                </div>
            
                            </a>
                            <a class="list-group-item list-group-item-danger" v-else>
                                No ingredients found. Remove filter and try again.
                            </a>
                        </div>
                    </div>
            
                    <div class="col">
                        <table class="table">
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Name</th>
                                    <th>Quantity</th>
                                    <th>Unit</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="ingredient in selectedIngredients" :key="ingredient.id?.toString()">
                                    <td>{{ ingredient.id }}</td>
                                    <td>{{ ingredient.name }}</td>
                                    <td>
                                        <input type="number" class="form-control" placeholder="0"
                                        aria-label="ingredient-{{ingredient.id }}-quantity" aria-describedby="ingredient-{{ingredient.id }}-quantity" v-model="ingredient.quantity">
                                    </td>
                                    <td>{{ ingredient.unit }}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>



<style scoped>
/* Add any custom styles here */
</style>