<script setup lang="ts">

import { ref, onMounted, watch } from 'vue';
import DatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css'; // Import the CSS for the date picker
import { es } from 'date-fns/locale';
import apiClient from '../services/http/axios/api';
import WeekSchedulerApi from '../services/http/axios/weekScheduler/WeekSchedulerApi';
import type { WeekScheduleInterface } from '../../domain/entities/WeekSchedule';
import CreateWeekScheduler from '../components/WeekScheduler/CreateWeekScheduler.vue';
import WeekScheduler from '../components/WeekScheduler/WeekScheduler.vue';

enum Seasons {
  Any = "Any",
  Warm = "Warm",
  Cold = "Cold",
}

const weekSchedulerService = new WeekSchedulerApi(apiClient);
const weekScheduleModel = ref<WeekScheduleInterface | null>(null);
const error = ref<string | null>(null);
// Selected date
const prevMonday = new Date();
prevMonday.setDate(prevMonday.getDate() - (prevMonday.getDay() + 6) % 7);

const selectedDate = ref<Date>(prevMonday);
// Locale setting
const locale: string = es as any;
const creating = ref<boolean>(false);

onMounted(() => {
  handleDateChange(selectedDate.value);
})

/* Functions */
async function fetchWeekScheduleByDate(date: Date) {
  try {
    const response = await weekSchedulerService.fetchWeekSchedulerByDate(date);
    if (response) {
      weekScheduleModel.value = response
    }
  } catch (err) {

    if ((err as any).response.status == 404) {
      weekScheduleModel.value = null;
    } else {
      error.value = (err as any).message;
    }
  }
}

// Disable dates not part of a complete week (Monday to Sunday)
const isDateDisabled = (date: Date) => {
  const day = date.getDay();
  return day !== 1; // Disable all days except Mondays
};

// Custom class for the day cells
const getDayClass = (date: Date) => {
  const day = date.getDay();
  return day === 1 ? 'week-start' : 'disabled-day';
};

// Custom content for the day cells
const getDayContent = (date: Date) => {
  const day = date.getDay();
  if (day === 1) {
    const weekEnd = new Date(date);
    weekEnd.setDate(date.getDate() + 6);
    return `${date.getDate()} - ${weekEnd.getDate()}`;
  }
  return date.getDate();
};
// Handle date change and set time to 12 PM
const handleDateChange = async (date: Date) => {
  if (date) {
    date.setHours(12, 0, 0, 0); // Set time to 12 PM
    selectedDate.value = date;
    await fetchWeekScheduleByDate(date);
  }
};
const handleCreateWeekSchedule = async (model: WeekScheduleInterface) => {
  weekScheduleModel.value = model;
};

const handleDeleteWeekSchedule = async () => {
  if(weekScheduleModel.value && weekScheduleModel.value.id){
    await weekSchedulerService.deleteWeekSchedulerById(weekScheduleModel.value.id.toString());
    weekScheduleModel.value = null;
  }
}

</script>

<template>
  <div class="weekschedule-view">
    <div class="card">
      <div class="card-header">
        <div class="row align-items-center">
          <div class="col">
            Week Scheduler
          </div>
          <div class="col">
            <DatePicker v-model="selectedDate" :disabled-dates="isDateDisabled" :day-class="getDayClass"
              :day-content="getDayContent" :locale="locale" @update:modelValue="handleDateChange" />
          </div>
          <div class="col" v-if="selectedDate">
            <button v-if="weekScheduleModel" class="btn btn-primary btn-danger" v-on:click="handleDeleteWeekSchedule">Delete</button>
          </div>
        </div>
      </div>
      <div class="card-body" v-if="selectedDate">
        <div v-if="weekScheduleModel">
          <WeekScheduler :model="weekScheduleModel" />
        </div>
        <div v-else>
          <CreateWeekScheduler :date-start="selectedDate" @create-week:success="handleCreateWeekSchedule" />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Styles for the week selection */
.week-start {
  background-color: #e0f7fa;
  color: #00796b;
}

.disabled-day {
  color: #d32f2f;
  pointer-events: none;
}
</style>
