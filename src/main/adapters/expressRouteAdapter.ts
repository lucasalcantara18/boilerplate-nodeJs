import { Request, Response } from 'express'
import { Controller } from '../../presentation/helpers/controller'
import { HttpRequest } from '../../presentation/protocols/httpRequest'

export const adaptRoute = (controller: Controller) => {
  return async (req: Request, res: Response) => {
    const httpRequest: HttpRequest = {
      body: req.body
    }
    const httpResponse = await controller.handle(httpRequest)
    res.status(httpResponse.statusCode).json(httpResponse.body)
  }
}
