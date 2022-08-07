import { HttpRequest, HttpResponse } from '../http/iHttp'

export interface Controller {
  handle: (HttpRequest: HttpRequest) => HttpResponse
}
