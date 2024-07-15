<template>
    <Transition name="meal-modal" :appear="true">
        <MealModal v-if="showMealModal" :meal="mealToModal" @modal:close="showMealModal = false" />
    </Transition>
    <Transition name="meal-modal" :appear="true">
        <ShopList v-if="showShopListModal" :ingredient-list="shoppingIngredients" @modal:close="showShopListModal = false" />
    </Transition>
    <div class="weekSchedule card" v-if="weekScheduleModel">
        <div class="card-header">
            <div class="row align-items-center justify-content-between">
                <div class="col">
                    <h4>Week schedule: {{ formatDate(weekScheduleModel.period.start) }} to {{
                        formatDate(weekScheduleModel.period.end) }}</h4>
                </div>
                <div class="col-md-2">
                    <button type="button" class="btn btn-primary" v-on:click="saveWeekSchedule">Save</button>
                    <button type="button" class="btn btn-success" v-on:click="onShoppingList">Shopping List</button>
                </div>
            </div>
        </div>
        <div class="card-body">

            <div class="table-wrapper-scroll my-custom-scrollbar">
                <table class="table table-striped mb-0">
                    <thead class="thead-dark">
                        <tr>
                            <th></th>
                            <th v-for="mealTime of MealTime">
                                <h5>{{ mealTime }}</h5>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(day, rowIndex) in weekScheduleModel.weekDays" :key="day.name">
                            <td style="vertical-align: middle;">{{ day.name }}</td>
                            <td draggable="true" @dragstart="onDragStart($event, rowIndex, 'breakfast')"
                                @dragover="onDragOver" @drop="onDrop($event, rowIndex, 'breakfast')">
                                <div class="card">
                                    <div class="card-header">
                                        <div class="dropdown">
                                            <button class="btn dropdown-toggle" type="button" data-bs-toggle="dropdown"
                                                aria-expanded="false">
                                                <i class="bi bi-arrow-clockwise"></i>
                                            </button>
                                            <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                                <a v-for="meal of availableMealList(MealTime.Breakfast)" class="dropdown-item"
                                                v-on:click="handleMealChange(meal, MealTime.Breakfast, day)">
                                                    {{ meal.name }}
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="card-body" v-on:click="handleMealModalOpen(day.breakfast)">
                                        <div class="background-image">
                                            <div class="content">
                                                {{ day.breakfast.name }}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </td>
                            <td draggable="true" @dragstart="onDragStart($event, rowIndex, 'lunch')"
                                @dragover="onDragOver" @drop="onDrop($event, rowIndex, 'lunch')">
                                <div class="card">
                                    <div class="card-header">
                                        <div class="dropdown">
                                            <button class="btn dropdown-toggle" type="button" data-bs-toggle="dropdown"
                                                aria-expanded="false">
                                                <i class="bi bi-arrow-clockwise"></i>
                                            </button>
                                            <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                                <a v-for="meal of availableMealList(MealTime.Lunch)" class="btn dropdown-item"
                                                v-on:click="handleMealChange(meal, MealTime.Lunch, day)">
                                                    {{ meal.name }}
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="card-body" v-on:click="handleMealModalOpen(day.lunch)">
                                        <div
                                            :class="day.lunch.isVegetarian ? 'background-image-vegan' : 'background-image-meet'">
                                            <div class="content">
                                                {{ day.lunch.name }}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </td>
                            <td draggable="true" @dragstart="onDragStart($event, rowIndex, 'dinner')"
                                @dragover="onDragOver" @drop="onDrop($event, rowIndex, 'dinner')">
                                <div class="card">
                                    <div class="card-header">
                                        <div class="dropdown">
                                            <button class="btn dropdown-toggle" type="button" data-bs-toggle="dropdown"
                                                aria-expanded="false">
                                                <i class="bi bi-arrow-clockwise"></i>
                                            </button>
                                            <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                                <a v-for="meal of availableMealList(MealTime.Dinner)" class="dropdown-item"
                                                v-on:click="handleMealChange(meal, MealTime.Dinner, day)">
                                                    {{ meal.name }}
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="card-body" v-on:click="handleMealModalOpen(day.dinner)">
                                        <div
                                            :class="day.dinner.isVegetarian ? 'background-image-vegan' : 'background-image-meet'">
                                            <div class="content">
                                                {{ day.dinner.name }}
                                            </div>
                                        </div>

                                    </div>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, watch, defineProps, defineEmits, onMounted } from 'vue';
import apiClient from '../../services/http/axios/api';
import WeekSchedulerApi from '../../services/http/axios/weekScheduler/WeekSchedulerApi';
import type { WeekScheduleInterface } from '@/apps/restaurant/domain/entities/WeekSchedule';
import { format } from 'date-fns';
import type { DayInterface } from '@/apps/restaurant/domain/valueObj/Day';
import MealModal from './MealModal.vue';
import type MealInterface from '@/apps/restaurant/domain/valueObj/Day';
import MealApi from '../../services/http/axios/meal/MealApi';
import type { Day } from '@/apps/restaurant/domain/valueObj/Day';
import ShopList from './ShopList.vue';
import IngredientApi from '../../services/http/axios/ingredient/IngredientApi';
import type { IngridientInterface } from '@/apps/restaurant/domain/entities/Ingridient';
import { GenerateListOfIngredientsUseCase } from '@/apps/restaurant/application/useCases/implementations/generateListOfIngredients';

enum MealTime {
    Breakfast = "Breakfast",
    Lunch = "Lunch",
    Dinner = "Dinner",
}

const weekSchedulerService = new WeekSchedulerApi(apiClient);
const allMeals = ref<MealInterface[] | null>([])
const shoppingIngredients = ref<IngridientInterface[]>([])
const showMealModal = ref<boolean>(false);
const showShopListModal = ref<boolean>(false);    
const mealToModal = ref<MealInterface | null>(null);
const props = defineProps<{
    model: WeekScheduleInterface
}>()

const weekScheduleModel = ref<WeekScheduleInterface>(props.model);

const emit = defineEmits([
    'createWeek:success'
])

const formatDate = (date: Date) => {
    return format(date, 'MM-dd-yyyy');
}

const getMealOfDayByMealTime = (day: DayInterface, mealTime: MealTime) => {
    switch (mealTime) {
        case MealTime.Breakfast:
            return day.breakfast;
        case MealTime.Dinner:
            return day.dinner;
        case MealTime.Lunch:
            return day.lunch;
    }
}

const handleMealModalOpen = (meal: MealInterface) => {
    showMealModal.value = true;
    mealToModal.value = meal;
}

let draggedItem: { row: number, meal: keyof DayInterface } | null = null;

const onDragStart = (event: DragEvent, row: number, meal: keyof DayInterface) => {
    draggedItem = { row, meal };
    event.dataTransfer?.setData('text/plain', `${row},${meal}`);
};

const onDragOver = (event: DragEvent) => {
    event.preventDefault();
};

const onDrop = (event: DragEvent, row: number, meal: keyof DayInterface) => {
    event.preventDefault();
    if (draggedItem && draggedItem.meal === meal) {
        const isVegetarianCheck = (row: number, meal: keyof DayInterface): boolean => {
            const day = weekScheduleModel.value.weekDays[row];
            const meals = ['lunch', 'dinner'].map(m => day[m as keyof DayInterface]);
            const nonVegetarianCount = meals.filter(m => !m.isVegetarian).length;
            return nonVegetarianCount <= 1;
        };

        if (meal !== 'breakfast' && !isVegetarianCheck(row, meal)) {
            alert('Only one non-vegetarian meal allowed per day (excluding breakfast).');
            return;
        }

        const draggedMeal = weekScheduleModel.value.weekDays[draggedItem.row][draggedItem.meal];
        weekScheduleModel.value.weekDays[draggedItem.row][draggedItem.meal] = weekScheduleModel.value.weekDays[row][meal];
        weekScheduleModel.value.weekDays[row][meal] = draggedMeal;
        draggedItem = null;
    }
};

const saveWeekSchedule = async () => {
    const response = await weekSchedulerService.updateWeekScheduler(weekScheduleModel.value);

    if (response) {
        alert("Week schedule has been updated successfully!")
    } else {
        alert("Error updating the Meal")
    }
}

const availableMealList = (mealTime: MealTime) => {
    const mealsOfWeek = getMealsOfWeek(props.model);
    const allMealsByMealTime = (allMeals.value as MealInterface[]).filter(meal => meal.mealTime === mealTime)

    let result: MealInterface[] = []
    if(allMeals.value){
        switch(mealTime){
            case MealTime.Breakfast:
                result = allMealsByMealTime;
                break;
            case MealTime.Lunch:
                result = allMealsByMealTime.filter(meal => !mealsOfWeek.lunch.some(usedMeal => usedMeal.name === meal.name));
                break;
            case MealTime.Dinner:
                result = allMealsByMealTime.filter(meal => !mealsOfWeek.dinner.some(usedMeal => usedMeal.name === meal.name));
                break;
        }
    } 
    return result;
}

async function fetchMealList(): Promise<MealInterface[]> {
    const mealService = new MealApi(apiClient);
    try {
        return await mealService.fetchAllMeals();

    } catch (err) {

        return []
    }
}

async function fetchIngredientList(): Promise<IngridientInterface[]> {
    const ingredientService = new IngredientApi(apiClient);
    try {
        return await ingredientService.fetchAllIngredients();

    } catch (err) {

        return []
    }
}

function getMealsOfWeek(week: WeekScheduleInterface): {breakfast: MealInterface[], dinner: MealInterface[], lunch: MealInterface[] } {
    const mealList: {breakfast: MealInterface[], dinner: MealInterface[], lunch: MealInterface[] } = {
        breakfast: [],
        dinner: [],
        lunch: []
    }
    for (let day of week.weekDays) {
        if (!mealList.breakfast.includes(day.breakfast)) {
            mealList.breakfast.push(day.breakfast)
        }
        if (!mealList.dinner.includes(day.dinner)) {
            mealList.dinner.push(day.dinner)
        }
        if (!mealList.lunch.includes(day.lunch)) {
            mealList.lunch.push(day.lunch)
        }
    }
    return mealList;
}

const handleMealChange = (meal: MealInterface, mealTime: MealTime, day: Day) => {
    for( var index = 0; index < weekScheduleModel.value.weekDays.length; index++){
        if(weekScheduleModel.value.weekDays[index].name === day.name){
            switch(mealTime){
                case MealTime.Breakfast:
                    weekScheduleModel.value.weekDays[index].breakfast = meal;
                    break;
                case MealTime.Lunch:
                    weekScheduleModel.value.weekDays[index].lunch = meal;
                    break;
                case MealTime.Dinner:
                    weekScheduleModel.value.weekDays[index].dinner = meal;
                    break;
            }
        }
    }
}

const onShoppingList = async () => {
    const ingredientService = new IngredientApi(apiClient);
    const shoppingListGeneratorUseCase = new GenerateListOfIngredientsUseCase(ingredientService)
    const allIngredients = await fetchIngredientList();
    const shoppingListResponse = await shoppingListGeneratorUseCase.execute(weekScheduleModel.value as WeekScheduleInterface)
    if(shoppingListResponse.success){
        shoppingIngredients.value = shoppingListResponse.data;
        showShopListModal.value = true;
    } else {
        alert(shoppingListResponse.data);
    }

}

onMounted(async () => {
    weekScheduleModel.value = props.model;
    allMeals.value = await fetchMealList()
})



</script>
<style scoped>
td {
    text-align: center;
    vertical-align: middle;
}

th {
    text-align: center;
    vertical-align: middle;
}

.table-wrapper-scroll {
    position: relative;
    overflow: auto;
}

.table-wrapper-scroll thead {
    position: sticky;
    top: 0;
    z-index: 1;
    background-color: #343a40;
    /* Bootstrap's dark header background */
}

.background-image-meet::before {
    content: '';
    position: absolute;
    bottom: 0;
    right: 0;
    width: 60%;
    height: 60%;
    background-image: url('@/assets/images/meet.png');
    /* Replace with your image path */
    background-repeat: no-repeat;
    background-position: bottom right;
    background-size: contain;
    /* Adjust as needed */
    opacity: 0.6;
    pointer-events: none;
    /* Ensures content is clickable */
    z-index: 1;
}

.background-image-vegan::before {
    content: '';
    position: absolute;
    bottom: 0;
    right: 0;
    width: 60%;
    height: 60%;
    background-image: url('@/assets/images/vegan.png');
    /* Replace with your image path */
    background-repeat: no-repeat;
    background-position: bottom right;
    background-size: contain;
    /* Adjust as needed */
    opacity: 0.6;
    pointer-events: none;
    /* Ensures content is clickable */
    z-index: 1;
}

.content {
    position: relative;
    z-index: 2;
    /* Ensure content is above the background image */
    padding: 20px;
    /* Adjust padding as needed */
}
</style>