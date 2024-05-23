/**
 * Enum representing error types related to ingridient operations.
 *
 * @enum
 */
export enum IngridientErrorType {
    /**
     * Error type indicating that the ingridient already exists.
     */
    IngridientAlreadyExists = 'Ingridient already exists!',
  
    /**
     * Error type indicating that the ingridient does not exist.
     */
    IngridientDoesNotExist = 'Ingridient does not exist!',
  
    /**
     * Error type indicating that no ingridients were found.
     */
    IngridientNotFound = 'Ingridients not found',
  }