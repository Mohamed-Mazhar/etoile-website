import { Injectable } from '@angular/core';
import {ConfigModel} from "../data-classes/ConfigModel";
import {BehaviorSubject} from "rxjs";
import {Category} from "../data-classes/Category";

@Injectable({
  providedIn: 'root'
})
export class ConfigModelService {

  public configModelSubject = new BehaviorSubject<ConfigModel | null>(null)
  public categoriesSubject = new BehaviorSubject<Category[]>([])
  constructor() { }

  setConfigModel(configModel: ConfigModel) {
    this.configModelSubject.next(configModel)
  }

  setCategories(categories: Category[]) {
    this.categoriesSubject.next(categories)
  }
}
