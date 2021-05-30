import { HttpRequest } from '../protocols/httpRequest'
import { HttpResponse } from '../protocols/httpResponse'
import { MissingParamError } from '../errors/missingParamError'

export class SignUpController {
  handle (httpRequest: HttpRequest): HttpResponse {
    if (!httpRequest.body.name) {
      return {
        statusCode: 400,
        body: new MissingParamError('name')
      }
    }
    if (!httpRequest.body.email) {
      return {
        statusCode: 400,
        body: new MissingParamError('email')
      }
    }

    return {
      statusCode: 200,
      body: {
        message: 'success'
      }
    }
  }
};
