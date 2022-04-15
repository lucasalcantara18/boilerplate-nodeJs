import { InvalidParamError, MissingParamError } from '../../../domain/exceptions/exceptions'
import { Controller } from '../../../domain/interfaces/controller/iController'
import { HttpRequest, HttpResponse } from '../../../domain/interfaces/http/iHttp'
import { IEmailValidator } from '../../../domain/interfaces/validation/iEmailValidator'
import { badRequest, success } from '../../helpers/httpHelper'

export class SignUpController implements Controller {
  private readonly emailValidator: IEmailValidator

  constructor(emailValidator: IEmailValidator){
    this.emailValidator = emailValidator
  }

  handle(httpRequest: HttpRequest): HttpResponse {
    const requiredFields = ['name', 'email', 'password']
    for (const field of requiredFields) {
      if(!httpRequest.body[field])
        return badRequest(new MissingParamError(field))
    }

    if(!this.emailValidator.isValid(httpRequest.body.email))
      return badRequest(new InvalidParamError('email'))

    return success()
  }
}
