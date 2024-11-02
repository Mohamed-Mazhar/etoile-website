import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders, HttpResponse} from "@angular/common/http";
import {catchError, map, Observable, of, throwError} from "rxjs";
import {environment} from "../../../environments/environment";
import {ApiType} from "../enums/ApiType";
import {RequestType} from "../enums/RequestType";
import {ResponseStatusCode} from "../enums/ResponseStatusCode";
import {SELECTED_BRANCH, USER_TOKEN} from "../utils/constants";
import {TranslateService} from "@ngx-translate/core";
import {ApiErrorHandler} from "./api-error-handler";
import {Branch} from "../data-classes/ConfigModel";


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
      let headers = this.getRequestHeaders({isPostRequest: true})
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
      let queryParameters = new URLSearchParams(request).toString();
      if (!queryParameters.hasActualValue()) {
        queryParameters = ''
      } else {
        queryParameters = `?${queryParameters}`
      }
      let urlWithParameters: string = `${url}${queryParameters}`;
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
        lang: this.translate.currentLang,
      });
    } else {
      headers = new HttpHeaders({
        'lang': this.translate.currentLang,
      })
    }
    if (localStorage.getItem(SELECTED_BRANCH) !== null) {
      let selectedBranch: Branch = JSON.parse(localStorage.getItem(SELECTED_BRANCH)!)
      headers = headers.append("branch-id", `${selectedBranch.id}`)
    }
    if (parameters.isPostRequest) {
      headers = headers.append("Content-Type", "application/json");
    }
    return headers
  }

  private getDefaultParameters(body: any): any {
    return {
      ...body
    }
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

}
