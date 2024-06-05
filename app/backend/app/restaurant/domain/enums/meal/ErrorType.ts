/**
 * Enum representing error types related to week schedule operations.
 *
 * @enum
 */
export enum WeekScheduleErrorType {
    /**
     * Error type indicating that the week schedule already exists.
     */
    WeekScheduleAlreadyExists = 'WeekSchedule already exists!',
  
    /**
     * Error type indicating that the week schedule does not exist.
     */
    WeekScheduleDoesNotExist = 'WeekSchedule does not exist!',
  
    /**
     * Error type indicating that no week schedules were found.
     */
    WeekScheduleNotFound = 'WeekSchedules not found',

    /**
     * Error type indicating that there are not enough meals to make a week schedule.
     */
    WeekScheduleNotEnoughMeals = 'Not enough meals to make a week schedule',
  }