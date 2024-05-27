import { ICreateIngridientRequestDTO } from "../dtos/Ingridient/CreateIngridient";

export interface IngridientInterface {
  id?: String;
  name: String;
  quantity: Number;
  apiUri: String;
  unit: String;
}

export class Ingridient implements IngridientInterface{
  private _id?: String | undefined;
  private _name: String;
  private _quantity: Number;
  private _apiUri: String;
  private _unit: String;
  
  public get id(): String | undefined {
    return this._id;
  }
  public set id(value: String | undefined) {
    this._id = value;
  }

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
    this._id = props.id;
    this._name = props.name;
    this._quantity = props.quantity;
    this._apiUri = props.apiUri;
    this._unit = props.unit;
  }

  static create(data: ICreateIngridientRequestDTO) {
    return new Ingridient(data);
  }

  static getEntityKeys(): Array<string> {
    const instance:  IngridientInterface = {
      name: "",
      quantity: 1,
      apiUri: "",
      unit: ""
    }
    return Object.keys(instance).map(key => key.trim()) as Array<string>;
  }
}
