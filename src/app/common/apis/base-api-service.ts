import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders, HttpResponse} from "@angular/common/http";
import {catchError, map, mergeMap, Observable, of, throwError} from "rxjs";
import {environment} from "../../../environments/environment";
import {ApiType} from "../enums/ApiType";
import {RequestType} from "../enums/RequestType";
import {ResponseStatusCode} from "../enums/ResponseStatusCode";
import {USER_TOKEN} from "../utils/constants";
import {TranslateService} from "@ngx-translate/core";
import {ApiErrorHandler} from "./api-error-handler";


@Injectable({
  providedIn: "root",
})
export class BaseApiService {
  baseUrl = environment.apiUrl
  version = "v1"
  jwtToken: string = ""

  constructor(
    private httpClient: HttpClient,
    private translate: TranslateService,
    private apiErrorHandler: ApiErrorHandler
  ) {
  }

  call<REQUEST, RESPONSE>(parameters: {
    apiType: ApiType,
    pathVariables?: string[]
    body?: REQUEST | null
    getParameters?: string
    dataUrl?: string
    listDataUrl?: string[]
    requestType: RequestType,
  }): Observable<RESPONSE> {
    if (parameters.pathVariables === undefined) parameters.pathVariables = []
    if (parameters.body === undefined) parameters.body = null;
    if (parameters.listDataUrl === undefined) parameters.listDataUrl = [];

    let url: string = `${this.baseUrl}/${parameters.apiType}`

    if (parameters.listDataUrl.isNotEmpty()) {
      url = url.format(...parameters.listDataUrl)
    } else {
      url = url.replace(/{}/g, () => {
        if (parameters.pathVariables && parameters.pathVariables.length > 0) {
          return parameters.pathVariables.shift() ?? '';
        } else {
          return '';
        }
      });
    }

    let request = this.getDefaultParameters(parameters.body);
    console.log("Api request ===> " + url + " " + JSON.stringify(request));
    let response: Observable<HttpResponse<RESPONSE>>
    if (parameters.requestType !== RequestType.GET) {
      let headers = this.getRequestHeaders({isPostRequest: false})
      if (parameters.requestType === RequestType.POST) {
        response = this.httpClient.post<RESPONSE>(url!, request, {
          observe: "response",
          headers: headers!,
          context: undefined,
        })
      } else if (parameters.requestType === RequestType.UPDATE) {
        response = this.httpClient.put<RESPONSE>(url!, request, { // Modified this line
          observe: "response",
          headers: headers!,
          context: undefined,
        })
      } else if (parameters.requestType === RequestType.DELETE) {
        response = this.httpClient.delete<RESPONSE>(url!, {
          observe: "response",
          headers: headers!,
          context: undefined,
        })
      } else {
        throw ""
      }
    } else {
      const queryParameters = new URLSearchParams(request).toString();
      let urlWithParameters: string = `${url}?${queryParameters}`;
      let headers = this.getRequestHeaders({
        isPostRequest: false,
      })
      response = this.httpClient.get<RESPONSE>(urlWithParameters, {
        observe: "response",
        headers: headers,
        context: undefined,
      })
    }
    return response.pipe(
      map((response) => {
        return this.handleResponse(response);
      }),
      catchError(this.handleError<RESPONSE>(parameters))
    );
  }

  private getRequestHeaders(parameters: {
    isPostRequest: boolean;
  }): HttpHeaders {
    let headers: HttpHeaders;
    this.getToken()
    if (this.jwtToken) {
      headers = new HttpHeaders({
        Authorization: `Bearer ${this.jwtToken}`,
      });
    } else {
      headers = new HttpHeaders({});
    }

    if (parameters.isPostRequest) {
      headers.set("Content-Type", "application/json");
    }
    return headers
  }

  private getDefaultParameters(body: any): any {
    let lang = this.translate.currentLang
    return {
      ...body,
      lang: lang,
    };
  }

  private handleResponse<RESPONSE>(response: HttpResponse<RESPONSE>): RESPONSE {
    let statusCode = response.status;
    if (
      statusCode == ResponseStatusCode.OK ||
      statusCode == ResponseStatusCode.CREATED ||
      statusCode == ResponseStatusCode.ACCEPTED
    ) {
      if (response.body != null) {
        console.log("Api response ===> " + response.url, response.body);
        return response.body;
      } else return Object();
    } else {
      throw "Unknown Error";
    }
  }

  private handleError<RESPONSE>(parameters: {
    contentType?: string
    pathVariables?: string[]
    body?: any
  }): (err: any, caught: Observable<RESPONSE>) => Observable<any> {
    return (error, _) => {
      let statusCode = error.status;
      if (
        statusCode == ResponseStatusCode.OK ||
        statusCode == ResponseStatusCode.CREATED ||
        statusCode == ResponseStatusCode.ACCEPTED
      ) {
        let body = error.error.text;
        return of(body);
      } else {
        const processedError = this.apiErrorHandler.handleError(error);
        return throwError(() => processedError);
      }
    };
  }

  private getToken() {
    this.jwtToken = localStorage.getItem(USER_TOKEN) ?? ""
  }

  saveJWTToken(jwtToken: string) {

  }

  // saveJWTToken(jwtToken: JWTToken) {
  //   this.clearJWTToken()
  //   console.log("Received jwt token ", jwtToken)
  //   this.jwtToken = jwtToken
  //   localStorage.setItem("token", this.jwtToken.accessToken)
  //   localStorage.setItem("tokenExpiry", Math.floor(new Date().getTime() / 1000) + this.jwtToken.accessToken)
  //   localStorage.setItem("tokenType", this.jwtToken.tokenType)
  //   if (this.jwtToken != null && this.jwtToken.user != null)
  //     localStorage.setItem("user", JSON.stringify(this.jwtToken.user));
  //   else
  //     localStorage.removeItem("user")
  //
  //   if (this.jwtToken != null && this.jwtToken.customer != null) {
  //     localStorage.setItem("customer", JSON.stringify(this.jwtToken.customer));
  //   } else {
  //     localStorage.removeItem("customer")
  //   }
  //
  //
  //   clearTimeout(this.refreshTokenTimer) // Not sure if this is needed.
  //   let timerTickIn = (this.jwtToken.expiresIn * 0.9)
  //   console.log("refreshing token in " + timerTickIn)
  //   this.refreshTokenTimer = setTimeout(() => {
  //     console.log("refreshing token now")
  //     this.refreshToken().subscribe()
  //   }, timerTickIn * 1000);
  // }

  clearJWTToken() {
    console.log("clearing token now")
    // this.jwtToken = null
    this.jwtToken = ""
    localStorage.clear() // TEST
    // TODO remove mobile number from local storage
  }

  // refreshToken() {
  //   return this.httpClient.post<JWTToken>(this.baseUrl + '/' + this.version + '/account/refreshToken', "")
  //     .pipe(
  //       catchError((error: HttpErrorResponse) => {
  //         if (error.status === 401) {
  //           console.log("Unauthorized response.")
  //         } else if (error.status === 422) {
  //           console.log("Validation error..")
  //         }
  //         // Return an ObservableInput
  //         // return Observable;
  //         // Return an observable with a user-facing error message.
  //         // return throwError(() => new Error('Something bad happened; please try again later.'));
  //         return throwError(() => error)
  //       }),
  //       map((response: JWTToken) => {
  //           this.saveJWTToken(response)
  //           return response
  //         }
  //       )
  //     )
  // }

  getJwt(): string | null {
    return this.jwtToken
  }
}
