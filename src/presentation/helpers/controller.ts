import { HttpRequest } from '../protocols/httpRequest'
import { HttpResponse } from '../protocols/httpResponse'

export interface Controller {
  handle (httpRequest: HttpRequest): HttpResponse
}
