/**
 * Enum representing error types related to meal operations.
 *
 * @enum
 */
export enum MealErrorType {
    /**
     * Error type indicating that the meal already exists.
     */
    MealAlreadyExists = 'Meal already exists!',
  
    /**
     * Error type indicating that the meal does not exist.
     */
    MealDoesNotExist = 'Meal does not exist!',
  
    /**
     * Error type indicating that no meals were found.
     */
    MealNotFound = 'Meals not found',
  }