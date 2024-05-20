import { ICreateIngridientRequestDTO } from "../dtos/Ingridient/CreateIngridient";

export interface IIngridient {
  name: String;
  quantity: Number;
  apiUri: String;
}

export class Ingridient {
  private _name: String;
  private _quantity: Number;
  private _apiUri: String;

  constructor(props: IIngridient) {
    this._name = props.name;
    this._quantity = props.quantity;
    this._apiUri = props.apiUri;
  }

  static create({ name, quantity, apiUri }: ICreateIngridientRequestDTO) {
    return new Ingridient({name, quantity, apiUri})
  }
}
