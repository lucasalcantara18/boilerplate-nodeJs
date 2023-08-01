import { InvalidParamError, MissingParamError } from '../../../domain/exceptions/exceptions'
import { Controller } from '../../interfaces/controllers/iController'
import { HttpRequest, HttpResponse } from '../../interfaces/http/iHttp'
import { IEmailValidator } from '../../../domain/interfaces/validation/iEmailValidator'
import { badRequest, serverError, success } from '../../helpers/httpHelper'
import { IAddAccount } from '../../../application/useCases/v1/addAccount/iAddAcount'

export class SignUpController implements Controller {
  private readonly emailValidator: IEmailValidator
  private readonly addAccount: IAddAccount

  constructor(emailValidator: IEmailValidator, addAccount: IAddAccount){
    this.emailValidator = emailValidator
    this.addAccount = addAccount
  }

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const requiredFields = ['name', 'email', 'password']
      for (const field of requiredFields) {
        if(!httpRequest.body[field])
          return badRequest(new MissingParamError(field))
      }

      if(httpRequest.body.password !== httpRequest.body.confirmPassword)
        return badRequest(new InvalidParamError('password'))

      if(!this.emailValidator.isValid(httpRequest.body.email))
        return badRequest(new InvalidParamError('email'))

      const { email, name, password } = httpRequest.body
      await this.addAccount.handle({ email, name, password })

      return success()
    } catch (error) {
      return serverError()
    }
  }
}
