import { ServerError } from '../errors/ServerError'
import { HttpResponse } from '../protocols/httpResponse'

export const badRequest = (error: Error): HttpResponse => ({
  statusCode: 400,
  body: error
})

export const serverError = (error: Error): HttpResponse => ({
  statusCode: 500,
  body: new ServerError(error.stack)
})

export const success = (body: any): HttpResponse => ({
  statusCode: 200,
  body
})
