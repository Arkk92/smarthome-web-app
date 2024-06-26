import type { IngridientInterface } from "@/apps/restaurant/domain/entities/Ingridient";

const defaultIngredientModel: IngridientInterface = {
    id: undefined,
    name: '',
    apiUri: "",
    quantity: 0,
    unit: ""
  }

  export default defaultIngredientModel;