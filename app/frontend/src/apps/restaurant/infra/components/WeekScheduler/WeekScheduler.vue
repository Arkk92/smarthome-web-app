<template>
    <Transition name="meal-modal" :appear="true">
        <MealModal v-if="showMealModal" :meal="mealToModal" @modal:close="showMealModal = false" />
    </Transition>
    <div class="weekSchedule card" v-if="weekScheduleModel">
        <div class="card-header">
            <div class="row align-items-center justify-content-between">
                <div class="col">
                    <h4>Week schedule: {{ formatDate(weekScheduleModel.period.start) }} to {{
                        formatDate(weekScheduleModel.period.end) }}</h4>
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
                                    <div class="card-header"></div>
                                    <div class="card-body" v-on:click="handleMealModalOpen(day.breakfast)">
                                        {{ day.breakfast.name }}
                                    </div>
                                </div>
                            </td>
                            <td draggable="true" @dragstart="onDragStart($event, rowIndex, 'lunch')"
                                @dragover="onDragOver" @drop="onDrop($event, rowIndex, 'lunch')">
                                <div class="card">
                                    <div class="card-header"></div>
                                    <div class="card-body" v-on:click="handleMealModalOpen(day.lunch)">
                                        {{ day.lunch.name }}
                                    </div>
                                </div>
                            </td>
                            <td draggable="true" @dragstart="onDragStart($event, rowIndex, 'dinner')"
                                @dragover="onDragOver" @drop="onDrop($event, rowIndex, 'dinner')">
                                <div class="card">
                                    <div class="card-header"></div>
                                    <div class="card-body" v-on:click="handleMealModalOpen(day.dinner)">
                                        {{ day.dinner.name }}
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

enum MealTime {
    Breakfast = "Breakfast",
    Lunch = "Lunch",
    Dinner = "Dinner",
}

const weekSchedulerService = new WeekSchedulerApi(apiClient);

const showMealModal = ref<boolean>(false);
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

onMounted(() => {
    weekScheduleModel.value = props.model;
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
</style>