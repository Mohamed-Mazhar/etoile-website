import {Injectable} from "@angular/core";
import {GoogleTagManagerService} from "angular-google-tag-manager";
import {AnalyticsEvent} from "../models/AnalyticsEvent";
import {AdjustEvent} from "../models/AdjustEvent";
import Adjust from "@adjustcom/adjust-web-sdk";

@Injectable({
  providedIn: 'root'
})
export class AnalyticsService {

  constructor(
    private gtmService: GoogleTagManagerService
  ) {
  }

  logEvent(parameters: { event: AnalyticsEvent, parameters: Map<string, any> | null }) {
    this.gtmService.pushTag({
      event: parameters.event,
      data: Object.fromEntries((parameters.parameters ?? new Map<string, any>).entries())
    }).then()
    console.log("Event tracked ", window.dataLayer)
  }

  logAdjustEvent(parameter: {event: AdjustEvent}) {
    // Adjust.trackEvent({
    //   eventToken: parameter.event
    // }).then(r => console.log("Event tracked"))
  }

}
