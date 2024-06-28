<template>
    <link href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" rel="stylesheet" />
    <div class="week-schedule-create card">
        <div class="card-header">
            <div v-if="props.dateStart" class="row align-items-center justify-content-between">
                <div class="col">
                    <h4>Create schedule for the week starting on: {{ formatDate(props.dateStart) }}</h4>
                </div>
            </div>
        </div>
        <div class="card-body">
            <form @submit.prevent="createWeekSchedule">
                <div class="form-group row">
                    <label for="season" class="col-sm-2 col-form-label">Season</label>
                    <div class="col-sm-10">
                        <select class="custom-select" v-model="newWeekScheduleModel.season">
                            <option disabled value="">Select the season...</option>
                            <option v-for="season in Object.values(Seasons)" :key="season" :value="season">{{ season }}
                            </option>
                        </select>
                    </div>
                </div>
                <div class="form-group row">
                    <label for="baby-allowed" class="col-sm-2 col-form-label"></label>
                    <div class="col-sm-10">
                        <div class="custom-control custom-switch">
                            <input type="checkbox" class="custom-control-input" id="vegetarianSwitch"
                                v-model="newWeekScheduleModel.babyAllowed">
                            <label class="custom-control-label" for="vegetarianSwitch">Allowed for babies</label>
                        </div>
                    </div>
                </div>
                <div class="form-group row">
                    <div class="col">
                        <button type="submit" class="btn btn-primary">Create weekSchedule</button>
                    </div>
                </div>

            </form>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, watch, defineProps, defineEmits } from 'vue';
import apiClient from '../../services/http/axios/api';
import WeekSchedulerApi from '../../services/http/axios/weekScheduler/WeekSchedulerApi';
import { format } from 'date-fns';

interface WeekScheduleNewModel {
    season: Seasons
    start: Date
    babyAllowed: boolean
}

enum Seasons {
    Any = "Any",
    Warm = "Warm",
    Cold = "Cold",
}

const weekSchedulerService = new WeekSchedulerApi(apiClient);

const props = defineProps<{
    dateStart: Date
}>()

const emit = defineEmits([
    'createWeek:success'
])
const newWeekScheduleModel = ref<WeekScheduleNewModel>({
    babyAllowed: false,
    season: Seasons.Any,
    start: props.dateStart
})

const createWeekSchedule = async () => {
    try {
        if (newWeekScheduleModel.value) {
            const response = await weekSchedulerService.createWeekScheduler(
                newWeekScheduleModel.value?.season,
                newWeekScheduleModel.value?.babyAllowed,
                newWeekScheduleModel.value?.start
            );
            if (response) {
                alert("Created successfully")
                emit('createWeek:success', response)
            }
        }
    } catch (err) {

        alert(err);
    }
}
const formatDate = (date: Date) => {
    return format(date, 'MM-dd-yyyy');
}
</script>
<style scoped></style>