<template>
    <link href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" rel="stylesheet" />
    <div class="weekSchedule card" v-if="props.model">
        <div class="card-header">
            <div class="row align-items-center justify-content-between">
                <div class="col">
                    <h4>Week schedule: {{ formatDate(props.model.period.start) }} to {{
                        formatDate(props.model.period.end) }}</h4>
                </div>
            </div>
        </div>
        <div class="card-body">
            <table class="table table-striped mb-0">
                <thead class="thead-dark">
                    <tr>
                        <th></th>
                        <th v-for="day of props.model.weekDays">{{ day.name }}</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="mealTime of MealTime">
                        <td>{{ mealTime }}</td>
                        <td v-for="day of props.model.weekDays">
                            {{ getMealOfDayByMealTime(day, mealTime).name }}
                        </td>
                    </tr>
                </tbody>
            </table>

        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, watch, defineProps, defineEmits } from 'vue';
import apiClient from '../../services/http/axios/api';
import WeekSchedulerApi from '../../services/http/axios/weekScheduler/WeekSchedulerApi';
import type { WeekScheduleInterface } from '@/apps/restaurant/domain/entities/WeekSchedule';
import { format } from 'date-fns';
import type { DayInterface } from '@/apps/restaurant/domain/valueObj/Day';

enum MealTime {
  Breakfast = "Breakfast",
  Lunch = "Lunch",
  Dinner = "Dinner",
}

const weekSchedulerService = new WeekSchedulerApi(apiClient);

const props = defineProps<{
    model: WeekScheduleInterface
}>()

const emit = defineEmits([
    'createWeek:success'
])

const formatDate = (date: Date) => {
    return format(date, 'MM-dd-yyyy');
}

const getMealOfDayByMealTime = (day: DayInterface, mealTime: MealTime) => {
    switch(mealTime){
        case MealTime.Breakfast:
            return day.breakfast;
        case MealTime.Dinner:
            return day.dinner;
        case MealTime.Lunch:
            return day.lunch;
    }
}

</script>
<style scoped></style>