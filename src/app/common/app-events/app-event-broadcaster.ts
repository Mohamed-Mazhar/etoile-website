import {BehaviorSubject, filter, Observable} from "rxjs";
import {AppEventData} from "./app-event-data";
import {AppEvent} from "./app-event";


export class AppEventBroadcaster {
  private static eventStreamController: BehaviorSubject<AppEventData> = new BehaviorSubject<AppEventData>({
    event: AppEvent.initial
  })

  static publish(parameters: { event: AppEvent, data?: any }) {
    this.eventStreamController.next(parameters)
  }

  static on(parameters: { event: AppEvent }): Observable<AppEventData> {
    return this.eventStreamController.asObservable().pipe(filter(event => event.event === parameters.event))
  }
}

