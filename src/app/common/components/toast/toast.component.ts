import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription, timer} from 'rxjs';
import {ToastService} from "../../services/toast.service";

@Component({
  selector: 'app-toast',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.scss']
})
export class ToastComponent implements OnInit, OnDestroy {

  private timer = timer(1000, 1000)
  private timerSubscription: Subscription | null = null
  toastType = 'success'
  message = ""

  seconds: number = 0

  constructor(
    private toastService: ToastService
  ) {
  }

  ngOnInit(): void {
    this.timerSubscription = this.timer.subscribe(() => {
      if (this.seconds > 0) this.seconds--
      else this.toastService.toastSubject.next(null)
    })
    this.toastService.toastSubject.subscribe({
      next: (toast) => {
        if (toast !== null) {
          this.seconds = 3
          this.message = toast?.message ?? ""
          if (toast?.type === 'normal') {
            this.toastType = 'success'
          } else {
            this.toastType = 'error'
          }
        }
      }
    })
  }

  ngOnDestroy(): void {
    this.timerSubscription?.unsubscribe()
  }

  get styleClass() {
    return this.toastType
  }

}
