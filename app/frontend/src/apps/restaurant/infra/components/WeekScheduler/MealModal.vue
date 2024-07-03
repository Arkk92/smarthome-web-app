<template>
    <div class="meal-modal d-block">
        <!-- Modal -->
        <div class="modal d-block show" data-backdrop="static" data-keyboard="false" tabindex="-1" role="dialog">
            <div class="modal-dialog modal-xl modal-dialog-centered modal-dialog-scrollable" role="document">
                <div class="modal-content">
                    <!-- Modal Header -->
                    <div class="modal-header">
                        <h5 class="modal-title">{{ props.meal.name }}</h5>
                        <button type="button" class="close" @click="onCloseModal">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>

                    <!-- Modal Body -->
                    <div class="modal-body">
                        <div class="row">
                            <label for="mealTime" class="col-sm-2 col-form-label">Meal Time</label>
                            <div class="col-sm-10">
                                <input class="form-control" id="mealTime" :value="props.meal.mealTime">
                            </div>
                        </div>
                        <div class="row">
                            <label for="season" class="col-sm-2 col-form-label">Season</label>
                            <div class="col-sm-10">
                                <input class="form-control" id="season" :value="props.meal.season">
                            </div>
                        </div>
                        <div class="row">
                            <label class="col-sm-2 col-form-label">Settings</label>
                            <div class="col-sm-10">
                                <div class="custom-control custom-switch">
                                    <input type="checkbox" class="custom-control-input" id="vegetarianSwitch"
                                        :value="props.meal.isVegetarian">
                                    <label class="custom-control-label" for="vegetarianSwitch">Vegetarian</label>
                                </div>
                                <div class="custom-control custom-switch">
                                    <input type="checkbox" class="custom-control-input" id="babyAllowedSwitch"
                                        :value="props.meal.babyAllowed">
                                    <label class="custom-control-label" for="babyAllowedSwitch">Allowed for
                                        babies</label>
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <label for="batchedMeals" class="col-sm-2 col-form-label">Batches</label>
                            <div class="col-sm-10">
                                <input class="form-control" type="number" min="0" placeholder="0" id="batchedMeals"
                                    :value="props.meal.batchMealCount">
                            </div>
                        </div>
                        <div class="row">

                            <div class="col table-wrapper-scroll-y my-custom-scrollbar">
                                <table class="table table-striped mb-0">
                                    <thead class="thead-dark">
                                        <tr>
                                            <th>Name</th>
                                            <th>Quantity</th>
                                            <th>Unit</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr v-if="props.meal.ingridientList.length > 0"
                                            v-for="ingredient in props.meal.ingridientList"
                                            :key="ingredient.id?.toString()">
                                            <td>{{ ingredient.name }}</td>
                                            <td>
                                                <input type="number" class="form-control" :value="ingredient.quantity">
                                            </td>
                                            <td>{{ ingredient.unit }}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <div class="row">
                            <label class="col-sm-2 col-form-label">Recipe</label>
                            <div class="col-sm-10">
                                <ol>
                                    <li v-for="step of props.meal.recipe" class="mb-2">
                                        {{ step }}
                                    </li>
                                </ol>

                            </div>
                        </div>
                    </div>

                    <!-- Modal Footer -->
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" @click="onCloseModal">
                            Close
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import type { MealInterface } from '../../domain/entities/MealInterface';


const emit = defineEmits([
    'modal:close'
])
const props = defineProps<{
    meal: MealInterface
}>()

const onCloseModal = async () => {
    emit('modal:close')
    console.log(props.meal.recipe)
}

</script>
<style scoped>

.modal{
    /* bug fix - custom overlay */   
    background-color: rgba(10,10,10,0.45);
}
</style>