import { MissingParamError } from '../../../domain/exceptions/missingParamException'
import { HttpRequest, HttpResponse } from '../../../domain/interfaces/http/iHttp'
import { badRequest, success } from '../../helpers/httpHelper'

export class SignUpController {
  handle(httpRequest: HttpRequest): HttpResponse {
    if(!httpRequest.body.name){
      return badRequest(new MissingParamError('name'))
    }
    if(!httpRequest.body.email){
      return badRequest(new MissingParamError('email'))
    }
    if(!httpRequest.body.password){
      badRequest(new MissingParamError('password'))
    }

    return success()
  }
}
