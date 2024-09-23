import { Injectable } from '@angular/core';
import {ConfigModel} from "../data-classes/ConfigModel";
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ConfigModelService {

  public configModelSubject = new BehaviorSubject<ConfigModel | null>(null)

  constructor() { }

  setConfigModel(configModel: ConfigModel) {
    this.configModelSubject.next(configModel)
  }
}
