import { HttpRequest } from '../protocols/httpRequest'
import { HttpResponse } from '../protocols/httpResponse'
import { MissingParamError } from '../errors/missingParamError'
import { badRequest, success } from '../helpers/httpHelper'

export class SignUpController {
  handle (httpRequest: HttpRequest): HttpResponse {
    const requiredFields = ['name', 'email', 'password']
    for (const field of requiredFields) {
      if (!httpRequest.body[field]) {
        return badRequest(new MissingParamError(field))
      }
    }

    return success({ message: 'success' })
  }
};
