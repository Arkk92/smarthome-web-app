<template>
  <div class="card">
    <div class="card-header">Recipe Steps</div>
    <div class="card-body">
      <ol>
        <li v-for="(step, index) in recipeSteps" :key="index" class="mb-2">
          <div class="input-group">
            <textarea type="text" class="form-control" :placeholder="'Step ' + (index + 1)"
              v-model="recipeSteps[index]"
              @input="updateSteps"></textarea>
            <div class="input-group-append">
              <button type="button" class="btn btn-danger" @click="removeStep(index)">Delete</button>
            </div>
          </div>
        </li>
      </ol>
      <button type="button" class="btn btn-primary mt-3" @click="addStep">Add Step</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';

// Define props for the component
const emit = defineEmits(['update:recipeSteps']);

// Define the state for recipe steps
const recipeSteps = ref<string[]>(['']);

// Method to emit the updated steps
const updateSteps = () => {
  emit('update:recipeSteps', recipeSteps.value);
};

const props = defineProps<{
    recipe: string[]
}>();

// Watch for changes in recipeSteps and emit the event
watch(props, () => {
  recipeSteps.value = props.recipe
});

// Method to add a new step
const addStep = () => {
  recipeSteps.value.push('');
  updateSteps();
};

// Method to remove a step
const removeStep = (index: number) => {
  recipeSteps.value.splice(index, 1);
  updateSteps();
};
</script>

<style scoped>
/* Add any custom styles here if needed */
</style>
