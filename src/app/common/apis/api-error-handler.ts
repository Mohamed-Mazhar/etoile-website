import {HttpErrorResponse} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {ErrorResponse} from "../data-classes/ErrorResponse";

@Injectable({
  providedIn: 'root'
})
export class ApiErrorHandler {

  handleError(error: HttpErrorResponse): string {
    console.log("Handling error inside api-error-handler", error)
    if (error.status === 401 || error.status === 403) {
      return this.getMessage(error.error.errors as ErrorResponse[])
    } else if (error.status === 500) {
      return 'Server error occurred. Please try again later.';
    } else {
      return 'An unexpected error occurred. Please try again.';
    }
  }

  private getMessage(error: ErrorResponse[]): string {
    let message: string = ""
    for (let errorResponse of error) {
     message += errorResponse.message + "\n"
    }
    return message
  }

}
