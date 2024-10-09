import { Injectable } from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {ToastData} from "../data-classes/ToastData";

export declare type ToastType = 'normal' | 'alert'
@Injectable({
  providedIn: 'root'
})
export class ToastService {

  toastSubject = new BehaviorSubject<ToastData | null>(null)

  constructor() { }

  showToast(type: ToastType, message: string) {
    this.toastSubject.next({
      type: type,
      message: message
    })
  }
}
