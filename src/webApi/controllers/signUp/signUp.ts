import { MissingParamError } from '../../../domain/exceptions/missingParamException'
import { Controller } from '../../../domain/interfaces/controller/iController'
import { HttpRequest, HttpResponse } from '../../../domain/interfaces/http/iHttp'
import { badRequest, success } from '../../helpers/httpHelper'

export class SignUpController implements Controller {
  handle(httpRequest: HttpRequest): HttpResponse {
    const requiredFields = ['name', 'email', 'password']
    for (const field of requiredFields) {
      if(!httpRequest.body[field])
        return badRequest(new MissingParamError(field))
    }

    return success()
  }
}
