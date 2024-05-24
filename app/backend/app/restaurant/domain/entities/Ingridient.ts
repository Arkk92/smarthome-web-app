import { ICreateIngridientRequestDTO } from "../dtos/Ingridient/CreateIngridient";

export interface IngridientInterface {
  name: String;
  quantity: Number;
  apiUri: String;
  unit: String;
}

export class Ingridient implements IngridientInterface{
  private _name: String;
  private _quantity: Number;
  private _apiUri: String;
  private _unit: String;
  
  public get unit(): String {
    return this._unit;
  }
  public set unit(value: String) {
    this._unit = value;
  }
  
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
    this._unit = props.unit;
  }

  static create({ name, quantity, apiUri, unit }: ICreateIngridientRequestDTO) {
    return new Ingridient({ name, quantity, apiUri, unit });
  }
}
