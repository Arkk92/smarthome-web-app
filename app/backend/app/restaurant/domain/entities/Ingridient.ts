import { ICreateIngridientRequestDTO } from "../dtos/Ingridient/CreateIngridient";

export interface IngridientInterface {
  name: String;
  quantity: Number;
  apiUri: String;
}

export class Ingridient {
  private _name: String;
  private _quantity: Number;
  private _apiUri: String;
  
  public get name(): String {
    return this._name;
  }
  public set name(value: String) {
    this._name = value;
  }

  public get quantity(): Number {
    return this._quantity;
  }
  public set quantity(value: Number) {
    this._quantity = value;
  }

  public get apiUri(): String {
    return this._apiUri;
  }
  public set apiUri(value: String) {
    this._apiUri = value;
  }

  constructor(props: IngridientInterface) {
    this._name = props.name;
    this._quantity = props.quantity;
    this._apiUri = props.apiUri;
  }

  static create({ name, quantity, apiUri }: ICreateIngridientRequestDTO) {
    return new Ingridient({ name, quantity, apiUri });
  }
}
